"use server";

import { createOrderService,getOrdersService } from "../service/order.service";

export const createOrderAction = async (payload) => {
  const result = await createOrderService(payload);

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true, payload: result.payload };
};

export const getOrderAction = async () => {
  const result = await getOrdersService();

  if (!result.success) {
    return { message: result.error, payload: [] };
  }

  return { message: "success", payload: result.payload };
};