"use server";

import { patchProductRatingService } from "../service/product.service";
import { revalidatePath } from "next/cache";

export const rateProductAction = async (productId, rating) => {
  const result = await patchProductRatingService(productId, rating);
  
  if (result.success) {
    revalidatePath(`/products/${productId}`);
  }
  
  return result;
};