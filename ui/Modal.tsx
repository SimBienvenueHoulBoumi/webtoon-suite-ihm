"use client";
import { XCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed -inset-4 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-xl p-3 w-full max-w-md relative"
        >
          <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-gray-800">
            <XCircleIcon size={24} />
          </button>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
