"use client";

import { useState } from "react";

interface InputProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  id: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  type = "text",
  id,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-gray-100 text-black rounded-lg transition-all
          ${isFocused ? "border-green-600 shadow-md" : "border-gray-200"}
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};
