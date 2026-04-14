import React from 'react';
import { getAllProductsService, getAllCategoriesService } from '../../../service/product.service';
import ProductFilterLayoutComponent from '../../../components/shop/ProductFilterLayoutComponent';

export default async function Page() {
  const allProducts = await getAllProductsService();
  const products = allProducts?.payload || [];

  const categoriesResponse = await getAllCategoriesService();
  const categories = categoriesResponse?.payload || [];

  const productsWithNames = products.map((product) => {
    const categoryMatch = categories.find(
      (cat) => cat.categoryId === product.categoryId
    );

    return {
      ...product,
      categoryName: categoryMatch ? categoryMatch.name : "General",
    };
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 lg:px-8">
      <ProductFilterLayoutComponent products={productsWithNames} categories={categories} />
    </div>
  );
}