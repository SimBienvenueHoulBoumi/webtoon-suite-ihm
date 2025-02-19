import React from "react";
import { X } from "lucide-react";
import { Anime } from "@/types/anime";

interface ModalProps {
  isModalOpen: boolean;
  modalAction: "create" | "update" | "delete" | null;
  selectedAnime: Anime | null;
  newAnime: Anime;
  setNewAnime: React.Dispatch<React.SetStateAction<Anime>>;
  handleConfirm: () => void;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  modalAction,
  selectedAnime,
  newAnime,
  setNewAnime,
  handleConfirm,
  closeModal,
}) => {
  if (!isModalOpen) return null;

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
        <h2 className="text-xl font-bold mb-4">
          {modalAction === "create"
            ? "Create"
            : modalAction === "update"
            ? "Update"
            : "Delete"}{" "}
          Anime
        </h2>
        {modalAction !== "delete" ? (
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
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600"
            >
              {modalAction === "create" ? "Create" : "Update"}
            </button>
          </form>
        ) : (
          <>
            <p className="mb-4">
              Are you sure you want to delete "{selectedAnime?.title}"?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleConfirm}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
