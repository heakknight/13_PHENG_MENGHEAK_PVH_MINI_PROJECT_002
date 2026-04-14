import React from 'react';
import ProductDetailsComponent from '../../../../components/shop/ProductDetailsComponent'; 
import { getAllProductsService, getProductByIdService } from '../../../../service/product.service';

const Page = async ({ params }) => {
  const { id } = await params;
  
  const data = await getProductByIdService(id);
  const productData = data.payload || data;

  const allProductsData = await getAllProductsService();
  const allProducts = allProductsData.payload || [];
  
  const currentIndex = allProducts.findIndex(p => p.productId === id);
  
  const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
  const nextProduct = currentIndex < allProducts.length - 1 ? allProducts[currentIndex + 1] : null;

  return (
    <main>
      <ProductDetailsComponent 
        product={productData} 
        prevProduct={prevProduct}
        nextProduct={nextProduct}
      />
    </main>
  );
};

export default Page;