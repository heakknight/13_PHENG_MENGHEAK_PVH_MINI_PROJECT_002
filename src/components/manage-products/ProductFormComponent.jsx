"use client";
import { useState, useEffect } from "react";

const COLORS = ["green", "gray", "red", "blue", "white"];
const SIZES = ["s", "m", "l", "xl", "xxl", "xxxl"];

export default function ProductFormComponent({ isOpen, onClose, onSubmit, initialData, categories }) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    imageUrl: "",
    colors: [],
    sizes: [],
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name ?? "",
        price: initialData.price ?? "",
        categoryId: initialData.categoryId ?? "",
        imageUrl: initialData.imageUrl ?? "",
        colors: initialData.colors ?? [],
        sizes: initialData.sizes ?? [],
        description: initialData.description ?? "",
      });
    } else {
      setForm({ name: "", price: "", categoryId: "", imageUrl: "", colors: [], sizes: [], description: "" });
    }
  }, [initialData, isOpen]);

  const toggleItem = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.price) return;
    onSubmit({
      ...form,
      price: parseFloat(form.price),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xl mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              {isEdit ? "Edit product" : "Create product"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Demo CRUD only (local state). Refresh resets changes.</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-lime-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none  focus:border-lime-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none  focus:border-lime-400 bg-white"
              >
                <option value="">Select...</option>

                {categories?.map((cat) => {
                  const id = cat.categoryId || cat.id;
                  const name = cat.categoryName || cat.name;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Image URL (optional)</label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none f focus:border-lime-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-2 block">Colors</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <label key={c} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.colors.includes(c)}
                    onChange={() => toggleItem("colors", c)}
                    className="rounded"
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-2 block">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <label key={s} className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.sizes.includes(s)}
                    onChange={() => toggleItem("sizes", s)}
                    className="rounded"
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Description</label>
            <textarea
              placeholder="Short description shown on the product card..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none  focus:border-lime-400 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
          >
            {isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>
    </div>
  );
}