"use client";

import React from "react";
import { Search } from "lucide-react";

export default function SearchProductComponent({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      
      <input
        type="text"
        placeholder="Search product here..."
        className="w-[300px] rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-2 text-sm text-gray-900 
                   focus:border-lime-400 
                   focus:ring-1 
                   focus:ring-lime-400 
                   focus:outline-none 
                   transition-all shadow-sm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}