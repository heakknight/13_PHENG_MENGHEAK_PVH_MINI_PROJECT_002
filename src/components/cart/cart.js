"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity, color, size) => {
        const cart = get().cart;
        const existingItem = cart.find(
          (item) =>
            item.id === product.id &&
            item.color === color &&
            item.size === size
        );

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;

          if (newQuantity <= 0) {
            set({ cart: cart.filter((item) => item !== existingItem) });
          } else {
            set({
              cart: cart.map((item) =>
                item === existingItem
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            });
          }
        } else {
          if (quantity > 0) {
            set({ cart: [...cart, { ...product, quantity, color, size }] });
          }
        }
      },

      removeFromCart: (productId, color, size) =>
        set({
          cart: get().cart.filter(
            (item) => !(item.id === productId && item.color === color && item.size === size)
          ),
        }),

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'shopping-cart-v2' }
  )
);