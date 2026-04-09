"use client";

import React from 'react';
import { useState } from "react";
import { signOut } from "next-auth/react";

const UserLoggedComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
      >
        U
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
          <button
            onClick={() => signOut({ callbackUrl: "/" })} 
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserLoggedComponent
