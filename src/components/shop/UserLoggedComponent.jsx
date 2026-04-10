"use client";

import React from 'react';
import { useState } from "react";
import { signOut,useSession } from "next-auth/react";

const UserLoggedComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data: session} = useSession();
  
  const getLetterName = () => {
    if (!session?.user) return "U";

    if (session.user.lastName) {
      return session.user.lastName.charAt(0).toUpperCase();
    }

    if (session.user.name) {
      const parts = session.user.name.split(" ");
      return parts[parts.length - 1].charAt(0).toUpperCase();
    }

    return "U";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
      >
        {getLetterName()}
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
