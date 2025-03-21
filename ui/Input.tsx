/**
 * @file Input.tsx
 * @description Composant champ de saisie réutilisable.
 * 
 * ## Utilisation simple :
 * 
 * ```tsx
 * import { useState } from "react";
 * import { Input } from "./Input";
 * 
 * function App() {
 *   const [text, setText] = useState("");
 * 
 *   return (
 *     <Input
 *       id="example"
 *       value={text}
 *       onChange={setText}
 *       placeholder="Entrez du texte"
 *       type="text"
 *     />
 *   );
 * }
 * 
 * export default App;
 * ```
 * 
 * Ce composant gère automatiquement l'état de focus et applique des styles dynamiques.
 */

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
