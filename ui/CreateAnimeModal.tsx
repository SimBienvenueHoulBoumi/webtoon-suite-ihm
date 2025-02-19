"use client";

import { X, FilePlus, CheckCircle } from "lucide-react";
import { Anime } from "@/types/anime";

interface CreateAnimeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  newAnime: Anime;
  setNewAnime: (anime: Anime) => void;
  handleConfirm: () => void;
}

export default function CreateAnimeModal({
  isOpen,
  closeModal,
  newAnime,
  setNewAnime,
  handleConfirm,
}: CreateAnimeModalProps) {
  if (!isOpen) return null;

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

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FilePlus size={24} className="text-indigo-500" />
          Create Anime
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          {/* Input avec icône */}
          <div className="relative mb-2">
            <FilePlus
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              className="border p-2 pl-10 w-full rounded-md focus:ring-2 focus:ring-indigo-300"
              placeholder="Anime Title"
              value={newAnime.title}
              onChange={(e) =>
                setNewAnime({ ...newAnime, title: e.target.value })
              }
              required
            />
          </div>

          {/* Bouton de soumission avec icône */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
