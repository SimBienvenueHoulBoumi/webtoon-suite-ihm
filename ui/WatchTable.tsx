import { ArrowLeftToLine, ArrowRightToLine, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

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

  // Fonction pour définir la couleur en fonction du type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "ANIME":
        return "bg-blue-500";
      case "MANGA":
        return "bg-green-500";
      case "WEBTOON":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

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
        toast.success(`updated success of ${selectedItem.title}`);
      } else if (actionType === "delete") {
        toast.success(`deleted success of ${selectedItem.title}`);
      }
    }

    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto w-3/4">
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-center">Episode</th>
            <th className="px-6 py-3 text-center">Chapter</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-xs">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-100 transition-all"
              >
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md ${getTypeColor(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {item.currentEp ?? "-"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.currentChap ?? "-"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      className="p-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition-all"
                      onClick={() => handleUpdate(item.id)}
                      aria-label="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete"
                    >
                      <Trash size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {watchlistData && (
        <div className="mt-4 flex justify-center items-center space-x-2 text-xs">
          <button
            className="p-2 rounded-full bg-gray-200  hover:bg-gray-300"
            onClick={() => handlePageChange(watchlistData.currentPage - 1)}
            disabled={watchlistData.currentPage <= 1}
          >
            <ArrowLeftToLine size={13} />
          </button>
          <span>
            page {watchlistData.currentPage} on {watchlistData.totalPages}
          </span>
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => handlePageChange(watchlistData.currentPage + 1)}
            disabled={watchlistData.currentPage >= watchlistData.totalPages}
          >
            <ArrowRightToLine size={13} />
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
