import { Check } from 'lucide-react';
import React from 'react';

export const SuccessToast = ({ t, message, description }) => {
  return (
    <div
      className="group flex min-w-20 flex-col items-start gap-1 rounded-3xl bg-black p-2 text-white shadow-2xl transition-all duration-300 ease-in-out hover:scale-[1.02]"
    >
      <div className="flex items-center gap-3">
          <Check color='green' size={15}/>
        <span className="text-sm tracking-wide">{message}</span>
      </div>

      <div className="max-h-0 overflow-hidden text-xs text-gray-400 transition-all duration-500 ease-in-out group-hover:max-h-20 group-hover:mt-2">
        <p className="leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};