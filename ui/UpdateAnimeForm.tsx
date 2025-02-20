"use client";

import { Pencil, Save } from "lucide-react";
import { Anime } from "@/types/anime";

interface UpdateAnimeFormProps {
    isOpen: boolean;
    closeModal: () => void;
    selectedAnime: Anime | null;
    newAnime: Anime;
    setNewAnime: React.Dispatch<React.SetStateAction<Anime>>;
    handleConfirm: () => void;
  }

export default function UpdateAnimeForm({
  newAnime,
  setNewAnime,
  handleConfirm,
}: UpdateAnimeFormProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600">
        <Pencil size={24} />
        Update Anime
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
        className="text-sm w-96"
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
  );
}
