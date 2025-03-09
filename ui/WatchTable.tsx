import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal"; // Assure-toi d'importer la modal

interface WatchItem {
  id: number;
  title: string;
  type: string;
  currentEp: number | null;
  currentChap: number | null;
  status: string;
}

interface WatchData {
  total: number;
  currentPage: number;
  totalPages: number;
}

export default function WatchTable({
  data,
  watchlistData,
  handlePageChange,
}: {
  data: WatchItem[];
  watchlistData: WatchData | null;
  handlePageChange: (page: number) => void;
}) {
  // États pour la modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WatchItem | null>(null);
  const [actionType, setActionType] = useState<"update" | "delete" | null>(
    null
  );

  const handleUpdate = async (id: number) => {
    setActionType("update");
    setSelectedItem(data.find((item) => item.id === id) || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setActionType("delete");
    setSelectedItem(data.find((item) => item.id === id) || null);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (selectedItem && actionType) {
      if (actionType === "update") {
        // Effectuer l'action de mise à jour ici
        toast.success(`Mise à jour de ${selectedItem.title}`);
      } else if (actionType === "delete") {
        // Effectuer l'action de suppression ici
        toast.success(`Suppression de ${selectedItem.title}`);
      }
    }

    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto w-3/4">
      <table className="bg-white shadow-md rounded-lg overflow-hidden w-full">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-center">Episode</th>
            <th className="px-4 py-2 text-center">Chapter</th>
            <th className="px-4 py-2 text-center">Update</th>
            <th className="px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.type}</td>
                <td className="px-4 py-2 text-center">
                  {item.currentEp ?? "-"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.currentChap ?? "-"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    <button
                      className="flex items-center gap-2 px-3 py-1 font-medium text-white bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600 hover:opacity-80 transition-all"
                      onClick={() => handleUpdate(item.id)}
                    >
                      <Pencil size={16} /> Update
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    <button
                      className="flex items-center gap-2 px-3 py-1 font-medium text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 hover:opacity-80 transition-all"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {watchlistData && (
        <div className="mt-4 flex justify-center items-center space-x-2 text-xs">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handlePageChange(watchlistData.currentPage - 1)}
            disabled={watchlistData.currentPage <= 1}
          >
            Précédent
          </button>
          <span>
            Page {watchlistData.currentPage} sur {watchlistData.totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => handlePageChange(watchlistData.currentPage + 1)}
            disabled={watchlistData.currentPage >= watchlistData.totalPages}
          >
            Suivant
          </button>
        </div>
      )}

      {/* Modal pour confirmer l'action */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">
            {actionType === "update"
              ? "Confirmer la mise à jour"
              : "Confirmer la suppression"}
          </h2>
          <p>
            Voulez-vous vraiment{" "}
            {actionType === "update" ? "mettre à jour" : "supprimer"}{" "}
            <span className="font-bold">{selectedItem?.title}</span> ?
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={handleConfirmAction}
            >
              Confirmer
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
