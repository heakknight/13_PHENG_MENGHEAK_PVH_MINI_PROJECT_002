  "use client";

  import Image from "next/image";
  import Link from "next/link";
  import ButtonAddComponent from "./ButtonAddComponent";
  import { useState } from "react";
  import { Star } from "lucide-react";
  import { rateProductAction } from "../action/product.action";

  export function StarRow({ rating = 0 }) {
    return (
      <div className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
        {[1, 2, 3, 4, 5].map((index) => (
          <span
            key={index}
            className={`text-sm ${
              index <= rating ? "text-amber-400" : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  }

  export default function ProductCardComponent({ product }) {
    const { productId, productName, price, imageUrl } = product;

    return (
      <article className="group relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
        <Link href={`/products/${productId}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-linear-to-br from-gray-100 to-lime-50/30 text-gray-400">
                ◇
              </div>
            )}
          </div>
        </Link>
        <div className="relative mt-4 pr-14">
          <StarRow />
          <Link href={`/products/${productId}`}>
            <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 hover:text-lime-700">
              {productName}
            </h3>
          </Link>
          <p className="mt-2 text-base font-semibold tabular-nums text-gray-900">${price}</p>
        </div>
        <div className="absolute bottom-4 right-4">
          <ButtonAddComponent productId={productId} />
        </div>
      </article>
    );
  }

  export function InteractiveStarRating({ productId,initialRating = 0 }) {
    const [rating, setRating] = useState(initialRating); 
    const [hover, setHover] = useState(0);               
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingSubmit = async (rating) => {
      setRating(rating);
      setIsSubmitting(true);

      const result = await rateProductAction(productId, rating);

      if (!result.success) {
        if (result.error === "unauthorized") {
          alert("Please log in to rate this product!");
        } else {
          console.error("Failed to save rating");
        }
        setRating(initialRating); 
      }

      setIsSubmitting(false);
    };

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((index) => {
            const isActive = index <= (hover || rating);
            return (
              <button
                key={index}
                type="button"
                disabled={isSubmitting}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRatingSubmit(index)}
              >
                <Star
                  size={28} 
                  className={`transition-colors ${
                    isActive ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              </button>
            );
          })}
        </div>
        {isSubmitting && <span className="text-xs text-gray-400 animate-pulse">Saving...</span>}
      </div>
    );
  }