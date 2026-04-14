"use client";

import React, { useState, useEffect } from "react";
import { Slider, CheckboxGroup, Checkbox, Button } from "@heroui/react";
import ShopCardComponent from "./ShopCardComponent";
import SearchProductComponent from "./SearchProductComponent";

const ProductFilterLayoutComponent = ({ products = [], categories = [] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [price, setPrice] = useState(300);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredProducts = products.filter((product) => {
    const productPrice = Number(product.price) || 0;
    const withinPrice = productPrice <= price;
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.categoryId);
    const productName = (product.name || product.productName || "").toLowerCase();
    const matchesSearch = productName.includes(searchQuery.toLowerCase());

    return withinPrice && matchesCategory && matchesSearch;
  });

  if (!isMounted) return null;

  return (
    <div className="w-full">
      <header className="mb-10 flex flex-col items-start gap-6 pb-2 md:flex-row md:items-center justify-between w-full">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Luxury beauty products</h1>
          <p className="mt-2 text-gray-500">Use the filters to narrow by price and brand.</p>
        </div>
        <div className="flex w-full md:w-auto md:justify-end">
          <SearchProductComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </header>

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full flex-shrink-0 md:w-72">
          <div className="rounded-2xl border border-gray-200 bg-transparent p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
              <Button
                size="sm"
                variant="light"
                className="text-gray-900 border border-gray-200"
                onPress={() => {
                  setPrice(300);
                  setSelectedCategories([]);
                  setSearchQuery("");
                }}
              >
                Reset filters
              </Button>
            </div>

            {/* PRICE RANGE */}
            <div className="mb-10">
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-900">PRICE RANGE</p>
              <p className="mt-2 text-xs text-gray-500 mb-4">
                $0 - ${price} {price === 300 && "(no limit)"}
              </p>
              <Slider
                aria-label="PRICE RANGE"
                step={1}
                minValue={0}
                maxValue={300}
                value={price}
                onChange={setPrice}
                color="foreground"
                formatOptions={{ style: "currency", currency: "USD" }}
              />
            </div>

            {/* QUICK SELECT */}
            <div className="mb-8">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-900">Quick Select</h4>
              <div className="grid grid-cols-2 gap-2">
                {[50, 100, 150, 300].map((val) => (
                  <Button 
                    key={val}
                    size="sm" 
                    variant="flat" 
                    className={`border transition-all ${
                      price === val 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`} 
                    onPress={() => setPrice(val)}
                  >
                    {val === 300 ? "All prices" : `Under $${val}`}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase text-gray-900">Categories</h4>
              <CheckboxGroup 
                value={selectedCategories} 
                onChange={setSelectedCategories}
                color="foreground"
                className="gap-3"
              >
                {categories.map((cat) => {
                  const catId = cat.categoryId || cat.id;
                  const catName = cat.name || cat.categoryName;
                  const categoryCount = products.filter(p => p.categoryId === catId).length;
                  
                  const isSelected = selectedCategories.includes(catId);

                  return (
                    <div key={catId} className="flex items-center justify-between">
                      <Checkbox 
                        value={catId} 
                        size="sm"
                        aria-label={`Filter by ${catName}`}
                        classNames={{
                          wrapper: `
                            border-gray-290 transition-all
                            ${isSelected 
                              ? "bg-black text-white border-black hover:bg-black"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                            }
                          `,
                          label: "text-sm text-gray-700 font-medium"
                        }}
                      >
                        {catName}
                      </Checkbox>

                      <div className="flex h-6 min-w-[32px] items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 text-[10px] font-bold text-gray-500 transition-colors">
                        {categoryCount}
                      </div>
                    </div>
                  );
                })}
              </CheckboxGroup>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mb-4 text-sm text-gray-500">
            Showing <span className="font-bold text-black">{filteredProducts.length}</span> results
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ShopCardComponent product={product} key={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="mt-12 text-center text-gray-500">
              No products found matching these filters.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductFilterLayoutComponent;