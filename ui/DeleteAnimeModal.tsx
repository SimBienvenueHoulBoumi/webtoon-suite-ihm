"use client";

import { X, Trash2, XCircle } from "lucide-react";
import { Anime } from "@/types/anime";

interface DeleteAnimeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedAnime: Anime | null;
  handleConfirm: () => void;
}

export default function DeleteAnimeModal({
  isOpen,
  closeModal,
  selectedAnime,
  handleConfirm,
}: DeleteAnimeModalProps) {
  if (!isOpen || !selectedAnime) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-600">
          <Trash2 size={24} />
          Delete Anime
        </h2>

        <p className="mb-4">
          Are you sure you want to delete <span className="font-semibold">"{selectedAnime.title}"</span>?
        </p>

        <div className="flex justify-between">
          {/* Bouton Delete avec icône */}
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete
          </button>

          {/* Bouton Cancel avec icône */}
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center gap-2"
          >
            <XCircle size={18} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
