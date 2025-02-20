"use client";

import { FilePlus, CheckCircle } from "lucide-react";
import { Anime } from "@/types/anime";

interface CreateAnimeFormProps {
  isOpen: boolean;
  closeModal: () => void;
  newAnime: Anime;
  setNewAnime: React.Dispatch<React.SetStateAction<Anime>>;
  handleConfirm: () => void;
}

export default function CreateAnimeForm({
  newAnime,
  setNewAnime,
  handleConfirm,
}: CreateAnimeFormProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FilePlus size={24} className="text-indigo-500" />
        Create Anime
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirm();
        }}

        className="text-sm w-96"
      >
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

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 flex items-center justify-center gap-2"
        >
          <CheckCircle size={18} />
          Create
        </button>
      </form>
    </div>
  );
}
