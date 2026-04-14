"use server";

import {
  patchProductRatingService,
  getAllCategoriesService,
  getAllProductsService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../service/product.service";
import { revalidatePath } from "next/cache";

export const rateProductAction = async (productId, rating) => {
  const result = await patchProductRatingService(productId, rating);
  if (result.success) {
    revalidatePath(`/products/${productId}`);
  }
  return result;
};

export const getAllCategoriesAction = async () => {
  const result = await getAllCategoriesService();
  if (!result) return { message: "Failed", payload: [] };
  return { message: "success", payload: result.payload ?? result };
};

export const getAllProductsAction = async () => {
  const result = await getAllProductsService();
  if (!result) return { message: "Failed to fetch products", payload: [] };
  return { message: "success", payload: result.payload ?? [] };
};

export const createProductAction = async (payload) => {
  const result = await createProductService(payload);
  if (!result.success) return { success: false, error: result.error };
  revalidatePath("/manage-products");
  return { success: true, payload: result.payload };
};

export const updateProductAction = async (productId, payload) => {
  const result = await updateProductService(productId, payload);
  if (!result.success) return { success: false, error: result.error };
  revalidatePath("/manage-products");
  return { success: true, payload: result.payload };
};

export const deleteProductAction = async (productId) => {
  const result = await deleteProductService(productId);
  if (!result.success) return { success: false, error: result.error };
  revalidatePath("/manage-products");
  return { success: true };
};
