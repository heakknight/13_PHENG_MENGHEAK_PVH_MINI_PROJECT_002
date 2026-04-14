"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "./cart";
import { Button } from "@heroui/react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { createOrderAction } from "../../action/order.action";

export default function CartComponent() {
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const router = useRouter();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError(null);

    const payload = {
      orderDetailRequests: cart.map((item) => ({
        productId: item.productId ?? item.id,
        orderQty: item.quantity,
      })),
    };

    const result = await createOrderAction(payload);

    if (result.success) {
      clearCart();
      router.push("/orders");
    }

    setIsCheckingOut(false);
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 bg-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your cart</h1>
        <p className="text-sm text-gray-400 mb-10">
          Cart is stored in memory for this visit — refreshing the page clears it.
        </p>
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-6">
          <div className="bg-gray-50 rounded-full p-8">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">Your cart is empty.</p>
          <Link href="/products">
            <Button className="bg-blue-950 text-white rounded-lg px-10 font-bold h-11 hover:opacity-90 transition-opacity">
              Go Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 bg-white">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Your cart</h1>
      <p className="text-sm text-gray-400 mb-4">
        Cart is stored in memory for this visit — refreshing the page clears it.
      </p>
      <p className="text-sm text-gray-700 mb-3">
        <span className="font-bold">{cart.length}</span>{" "}
        {cart.length === 1 ? "product" : "products"} in cart
      </p>

      <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4">
        {cart.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`flex items-center gap-4 px-5 py-4 bg-white ${
              index !== cart.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="relative h-16 w-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.color && <span>{item.color}</span>}
                {item.color && item.size && <span> · </span>}
                {item.size && <span>{item.size}</span>}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(item, -1, item.color, item.size)}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-black transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm font-semibold text-gray-900 w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => addToCart(item, 1, item.color, item.size)}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-black transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
              <p className="text-sm font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id, item.color, item.size)}
                className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-2xl px-5 py-5 bg-white">
        <div className="flex justify-between items-center mb-1">
          <span className="font-semibold text-gray-900 text-base">Subtotal</span>
          <span className="font-bold text-gray-900 text-base">${subtotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-400 mb-5">Tax and shipping calculated at checkout (demo).</p>
        <div className="space-y-3">
          {checkoutError && (
            <p className="text-xs text-red-500 font-medium text-center">{checkoutError}</p>
          )}
          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full h-11 rounded-lg bg-blue-950 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isCheckingOut ? "Placing order..." : "Checkout"}
          </Button>
          <Button
            onClick={clearCart}
            className="w-full h-11 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            Clear cart
          </Button>
        </div>
      </div>
    </div>
  );
}