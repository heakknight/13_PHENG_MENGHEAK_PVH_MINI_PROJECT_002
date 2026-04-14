import Link from "next/link";
import Image from "next/image";
import { StarRow } from "../ProductCardComponent";

const categoryTone = {
  Skincare: "bg-sky-50 text-sky-800",
  Makeup: "bg-violet-50 text-violet-800",
  Fragrance: "bg-amber-50 text-amber-900",
  Haircare: "bg-emerald-50 text-emerald-900",
};

function badgeClass(label) {
  return categoryTone[label] ?? "bg-indigo-50 text-indigo-800";
}

const btnClass =
  "mt-2 block w-full rounded-xl border border-gray-900 bg-gray-900 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800";

export default function ShopCardComponent({ product }) {
  if (!product) return null;
  const rating = product.star ?? 0;

  const isValidUrl = product?.imageUrl?.startsWith("http") || product?.imageUrl?.startsWith("data:");
  
  const image = isValidUrl 
    ? product.imageUrl 
    : "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=1000&fit=crop";

  const catName = product?.categoryName || "Item";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={product?.name || product?.productName || "Product Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
          priority={true}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-semibold leading-snug text-gray-900">
            {product?.name || product?.productName || "Unnamed Product"}
          </h3>
          <p className="mt-1 min-h-10 line-clamp-2 text-sm leading-5 text-gray-500">
            {product?.description || "No description available."}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
           <StarRow rating={rating} />
           <span className="text-xs font-medium text-gray-400">({rating}.0)</span>
        </div>

        
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2">
          <p className="text-xl font-semibold tabular-nums text-gray-900">
            ${product?.price || 0}
          </p>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass(catName)}`}
          >
            {catName}
          </span>
        </div>
        
        <Link 
          href={`/products/${product?.productId}`} 
          className={btnClass}
        >
          View Product
        </Link>
      </div>
    </article>
  );
}