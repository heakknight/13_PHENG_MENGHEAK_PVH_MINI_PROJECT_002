"use client";
import { useState, useEffect } from "react";
import {
  getAllProductsAction,
  getAllCategoriesAction,
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "../../action/product.action";

import ProductManageCardComponent from "./ProductManageCardComponent";
import ProductFormComponent from "./ProductFormComponent";
import { sileo } from "sileo";

export default function ManageProductsComponent() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("name-asc");
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const res = await getAllProductsAction();
      const catRes = await getAllCategoriesAction();

      setProducts(res?.payload || []);
      setCategories(catRes?.payload || []);

      setLoading(false);
    };

    load();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    if (sort === "name-desc") return b.name.localeCompare(a.name);
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return 0;
  });

  const handleCreate = async (payload) => {
    const result = await createProductAction(payload);

    if (result.success) {
      setProducts((prev) => [...prev, result.payload]);

      sileo.success({
        title: "Product Created",
        description: "Product created successfully"
      });
    }
  };

  const handleUpdate = async (payload) => {
    const result = await updateProductAction(editProduct.productId, payload);

    if (result.success) {
      setProducts((prev) =>
        prev.map((p) =>
          p.productId === editProduct.productId ? result.payload : p
        )
      );

      sileo.success({
        title: "Product Updated",
        description: "Product updated successfully"
      });
    }
  };

  const handleDelete = async (productId) => {
    const result = await deleteProductAction(productId);
    
    if (result.success) {
      setProducts((prev) => prev.filter(p => p.productId !== productId));

      sileo.success({
         title: "Product Delete",
         description: "Product deleted successfully"
       });
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormOpen(true);
  };

  const handleOpenCreate = () => {
    setEditProduct(null);
    setFormOpen(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 bg-white min-h-screen">
      
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Products
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Create, update, and delete products
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200">
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold">Products</h2>

          <button
            onClick={handleOpenCreate}
            className="bg-lime-400 text-white px-4 py-2 rounded-full"
          >
            + Create
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : sortedProducts.length === 0 ? (
          <p className="text-center text-gray-400">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => {
            console.log("RENDER:", product);
            return (
              <ProductManageCardComponent
                key={product.productId} 
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            );
          })}
          </div>
        )}
      </div>
      <ProductFormComponent
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditProduct(null);
        }}
        onSubmit={editProduct ? handleUpdate : handleCreate}
        initialData={editProduct}
        categories={categories}
      />
    </div>
  );
}