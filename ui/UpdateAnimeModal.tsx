"use client";

import { X, Pencil, Save } from "lucide-react";
import { Anime } from "@/types/anime";

interface UpdateAnimeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedAnime: Anime | null;
  newAnime: Anime;
  setNewAnime: (anime: Anime) => void;
  handleConfirm: () => void;
}

export default function UpdateAnimeModal({
  isOpen,
  closeModal,
  selectedAnime,
  newAnime,
  setNewAnime,
  handleConfirm,
}: UpdateAnimeModalProps) {
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
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600">
          <Pencil size={24} />
          Update Anime
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Anime Title"
            value={newAnime.title}
            onChange={(e) =>
              setNewAnime({ ...newAnime, title: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
