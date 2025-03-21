/**
 * @file Select.tsx
 * @description Composant de sélection déroulante simple.
 * 
 * ## Utilisation simple :
 * 
 * ```tsx
 * import { useState } from "react";
 * import { Select } from "./Select";
 * 
 * function App() {
 *   const [selected, setSelected] = useState("");
 *   const options = [
 *     { label: "Option 1", value: "option1" },
 *     { label: "Option 2", value: "option2" }
 *   ];
 * 
 *   return (
 *     <Select options={options} value={selected} onChange={setSelected} placeholder="Choisir..." />
 *   );
 * }
 * 
 * export default App;
 * ```
 */

import { useState } from "react";

interface SelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full bg-gray-100 rounded-md">
      <button
        className="w-full px-4 py-2 text-black rounded-lg flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder || "Sélectionner..."}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-gray-100 text-black rounded-lg shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-4 py-1.5 cursor-pointer hover:bg-gray-200 transition-all rounded-lg m-1"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
