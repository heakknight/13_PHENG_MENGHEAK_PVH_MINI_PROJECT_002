"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InteractiveStarRating } from "../ProductCardComponent";
import { Button } from "@heroui/react";

import {useCartStore} from "../cart/cart";
import { sileo } from "sileo";
import {
  Heart,
  ShoppingBag,
  ChevronRight,
  Plus,
  Minus,
  RotateCcw,
  ChevronLeft,
} from "lucide-react";

export default function ProductDetailsComponent({
  product,
  prevProduct,
  nextProduct,
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);

  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
   addToCart(product, quantity, selectedColor, selectedSize);

    sileo.success({
      title: "Added To Cart",
      description: `${quantity} × ${product.name} — open the cart when you're ready to checkout.`
    });
  };

  const rating = product?.star ?? 0;
  const image =
    product?.imageUrl ||
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800";

  const getSelectedColorStyle = (color) => {
    switch (color.toLowerCase()) {
      case "green":
        return "bg-green-100 border-green-500 text-green-700";
      case "gray":
        return "bg-gray-200 border-gray-400 text-gray-700";
      case "white":
        return "bg-white border-gray-400 text-gray-900";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white min-h-screen">
      <nav className="mb-8 flex items-center gap-2 text-[13px] font-medium text-gray-400 overflow-hidden">
        <Link href="/" className="hover:text-black whitespace-nowrap">
          Home
        </Link>
        <ChevronRight size={14} className="flex-shrink-0" />
        <Link href="/products" className="hover:text-black whitespace-nowrap">
          Products
        </Link>
        <ChevronRight size={14} className="flex-shrink-0" />
        <span className="text-gray-900 font-semibold truncate max-w-[200px] md:max-w-none">
          {product?.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        <div className="space-y-6">
          <div className="relative aspect-square w-full rounded-[10px] border border-gray-100 overflow-hidden shadow-sm">
            <Image
              src={image}
              alt={product?.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link
                href={prevProduct ? `/products/${prevProduct.productId}` : "#"}
                className={`p-2 rounded-full border border-gray-200 transition-all ${!prevProduct ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"}`}
              >
                <ChevronLeft size={20} />
              </Link>

              <div className="flex gap-4">
                {prevProduct && (
                  <Link
                    href={`/products/${prevProduct.productId}`}
                    className="w-20 aspect-square rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden opacity-60 hover:opacity-100 transition-opacity relative"
                  >
                    <Image
                      src={prevProduct.imageUrl}
                      alt={prevProduct.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                )}

                <div className="w-20 aspect-square rounded-2xl bg-white border-2 border-blue-600 overflow-hidden shadow-md relative">
                  <Image
                    src={product?.imageUrl}
                    alt="current"
                    fill
                    className="object-cover"
                  />
                </div>

                {nextProduct && (
                  <Link
                    href={`/products/${nextProduct.productId}`}
                    className="w-20 aspect-square rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden opacity-60 hover:opacity-100 transition-opacity relative"
                  >
                    <Image
                      src={nextProduct.imageUrl}
                      alt={nextProduct.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                )}
              </div>

              <Link
                href={nextProduct ? `/products/${nextProduct.productId}` : "#"}
                className={`p-2 rounded-full border border-gray-200 transition-all ${!nextProduct ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"}`}
              >
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {product?.name}
            </h1>

            <InteractiveStarRating initialRating={rating} productId={product?.productId} />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <p className="text-2xl font-bold text-blue-900">
              ${product?.price?.toFixed(2)}
            </p>

            {product?.oldPrice && (
              <p className="text-lg text-gray-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </p>
            )}
          </div>

          <div className="space-y-8 mt-6">
            {product?.colors?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Choose a color
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium capitalize transition-all
                        ${
                          selectedColor === c
                            ? getSelectedColorStyle(c)
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                        }
                      `}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product?.sizes?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Choose a size
                </h3>

                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-semibold transition-all
                        ${
                          selectedSize === s
                            ? "border-blue-500 text-blue-900 bg-blue-50 shadow-sm"
                            : "border-gray-200 text-gray-500 hover:border-gray-400 bg-white"
                        }
                      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {product?.description ||
                "High-quality daily skincare essentials designed to refresh and revitalize your skin."}
            </p>

            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-5 h-10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="hover:text-blue-600 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="font-semibold text-gray-900 w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="hover:text-blue-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button onClick={handleAddToCart} className="flex-1 min-w-[150px] h-10 rounded-full bg-blue-950 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <ShoppingBag size={16} />
                Add to cart
              </Button>

              <button className="p-2 rounded-full border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-100 transition-all">
                <Heart size={20} />
              </button>
            </div>

            <div className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4 bg-gray-50/50">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <RotateCcw size={20} className="text-blue-900" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  Free 30-day returns
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  See return policy details in cart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
