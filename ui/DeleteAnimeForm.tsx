"use client";

import { Trash2, XCircle } from "lucide-react";
import { Anime } from "@/types/anime";

interface DeleteAnimeConfirmationProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedAnime: Anime | null;
  handleConfirm: () => void;
}

export default function DeleteAnimeConfirmation({
  selectedAnime,
  handleConfirm,
  closeModal,
}: DeleteAnimeConfirmationProps) {
  return (
    <form className="text-sm w-96">
      <h2 className="font-bold mb-4 flex items-center gap-2 text-red-600">
        <Trash2 size={18} />
        Delete Anime
      </h2>

      <p className="mb-4">
        Are you sure you want to delete{" "}
        <span className="font-semibold">"{selectedAnime?.title}"</span>?
      </p>

      <div className="flex justify-between">
        <button
          onClick={handleConfirm}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
        >
          <Trash2 size={18} />
          Delete
        </button>

        <button
          onClick={closeModal}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center gap-2"
        >
          <XCircle size={18} />
          Cancel
        </button>
      </div>
    </form>
  );
}
