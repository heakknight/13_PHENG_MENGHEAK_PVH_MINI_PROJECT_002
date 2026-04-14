"use client";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export default function ProductManageCardComponent({
  product,
  onEdit,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowConfirm(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await onDelete(product.productId);

      setShowConfirm(false);
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleting(false);
    }
  };

  const stars = product.star ?? 0;

  return (
    <>
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50">

        {/* IMAGE */}
        <div className="relative w-full aspect-square bg-gray-50">
          <img
            src={
              product.imageUrl ||
              "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400"
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* MENU */}
        <div ref={menuRef} className="absolute top-3 right-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
          >
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white border rounded-xl shadow-lg z-10">

              {/* EDIT */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(product);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
              >
                <Pencil size={14} /> Edit
              </button>

              {/* DELETE */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowConfirm(true);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <Trash2 size={14} /> Delete
              </button>

            </div>
          )}
        </div>

        {/* INFO */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-sm ${
                  s <= stars ? "text-yellow-400" : "text-gray-200"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-400 ml-1">
              {stars > 0 ? stars : "—"}
            </span>
          </div>

          <h3 className="font-semibold text-sm">{product.name}</h3>

          <p className="text-sm text-gray-700">
            ${product.price?.toFixed(2)}
          </p>
        </div>

        {/* + BUTTON */}
        <div className="absolute bottom-3 right-3">
          <button className="w-11 h-11 rounded-full bg-lime-400 flex items-center justify-center shadow hover:bg-lime-500 transition">
            +
          </button>
        </div>
      </div>

      {/* DELETE MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">

            <h2 className="text-base font-bold mb-2">
              Delete product?
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              This will delete{" "}
              <span className="font-semibold text-gray-800">
                {product.name}
              </span>
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm border rounded-lg"
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>

            </div>

          </div>
        </div>  
      )}
    </>
  );
}