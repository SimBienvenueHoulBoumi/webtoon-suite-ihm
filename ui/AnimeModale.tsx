"use client";

import { X } from "lucide-react";
import { Anime } from "@/types/anime";
import CreateAnimeForm from "./CreateAnimeForm";
import UpdateAnimeForm from "./UpdateAnimeForm";
import DeleteAnimeConfirmation from "./DeleteAnimeForm";

interface AnimeModalProps {
  isOpen: boolean;
  closeModal: () => void;
  action: "create" | "update" | "delete";
  selectedAnime?: Anime | null;
  newAnime: Anime;
  setNewAnime: React.Dispatch<React.SetStateAction<Anime>>;
  handleConfirm: () => void;
}

export default function AnimeModal({
  isOpen,
  closeModal,
  action,
  selectedAnime,
  newAnime,
  setNewAnime,
  handleConfirm,
}: AnimeModalProps) {
  if (!isOpen) return null;

  return (
    <div onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <X size={20} />
        </button>

        {action === "create" && (
          <CreateAnimeForm
            isOpen={isOpen}
            closeModal={closeModal}
            newAnime={newAnime}
            setNewAnime={setNewAnime}
            handleConfirm={handleConfirm}
          />
        )}

        {action === "update" && selectedAnime && (
          <UpdateAnimeForm
            isOpen={isOpen}
            closeModal={closeModal}
            selectedAnime={selectedAnime}
            newAnime={newAnime}
            setNewAnime={setNewAnime}
            handleConfirm={handleConfirm}
          />
        )}

        {action === "delete" && selectedAnime && (
          <DeleteAnimeConfirmation
            selectedAnime={selectedAnime}
            handleConfirm={handleConfirm}
            closeModal={closeModal}
            isOpen={false}
          />
        )}
      </div>
    </div>
  );
}
