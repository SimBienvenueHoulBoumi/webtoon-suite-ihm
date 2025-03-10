"use client";

import { Trash2, XCircle, Pencil, CheckCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { deleteWatch, updateWatchlist } from "@/services/watchlist.services";
import { WatchData, WatchItem } from "@/types/watchlist";
import { Input } from "./Input"; // Importation du composant Input

export default function WatchTable({
  data,
  watchlistData,
  handlePageChange,
  refreshData,
}: {
  data: WatchItem[];
  watchlistData: WatchData | null;
  handlePageChange: (page: number) => void;
  refreshData: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WatchItem | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<WatchItem | null>(null);
  const [currentEp, setCurrentEp] = useState<number | null>(null);
  const [currentChap, setCurrentChap] = useState<number | null>(null);

  const handleDelete = (item: WatchItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteWatch(selectedItem.id);
      toast.warn(`🗑️ ${selectedItem.title} deleted !`);
      setIsDeleted(true);
    } catch (error) {
      toast.error(`❌ Error when suppression of ${selectedItem.title}`);
    }

    setIsModalOpen(false);
  };

  const handleEdit = (item: WatchItem) => {
    setEditItem(item);
    setCurrentEp(item.currentEp);
    setCurrentChap(item.currentChap);
    setIsEditModalOpen(true);
  };

  const confirmUpdate = async () => {
    if (!editItem) return;

    try {
      await updateWatchlist(editItem.id, currentEp ?? 0, currentChap ?? 0);
      toast.success(`${editItem.title} updated !`);
      refreshData();
    } catch (error) {
      toast.error(`❌ update error of ${editItem.title}`);
    }

    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (!isModalOpen && isDeleted) {
      refreshData();
      setIsDeleted(false);
    }
  }, [isModalOpen, isDeleted]);

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

  return (
    <div className="overflow-x-auto w-3/4">
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="px-6 py-3 text-left">Titre</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-center">Episode</th>
            <th className="px-6 py-3 text-center">Chapitre</th>
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
                <td className="px-7 py-2">{item.title}</td>
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
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="p-1.5 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition-all"
                      onClick={() => handleEdit(item)}
                      aria-label="edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      className="p-1.5 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-all"
                      onClick={() => handleDelete(item)}
                      aria-label="delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                no data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {watchlistData && (
        <div className="mt-4 flex justify-center items-center space-x-2 text-xs">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => handlePageChange(watchlistData.currentPage - 1)}
            disabled={watchlistData.currentPage <= 1}
          >
            ◀
          </button>
          <span>
            Page {watchlistData.currentPage} sur {watchlistData.totalPages}
          </span>
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => handlePageChange(watchlistData.currentPage + 1)}
            disabled={watchlistData.currentPage >= watchlistData.totalPages}
          >
            ▶
          </button>
        </div>
      )}

      {/* Modal de suppression */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Confirm suppression</h2>
          <p>
            Did you really want to suppress{" "}
            <span className="font-bold">{selectedItem?.title}</span> ?
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              onClick={confirmDelete}
            >
              <Trash2 size={15} className="mr-2" /> Delete
            </button>
            <button
              className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all"
              onClick={() => setIsModalOpen(false)}
            >
              <XCircle size={15} className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de mise à jour */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="text-left space-y-2">
          <h2 className="text-lg font-semibold mb-4">
            Modification of {editItem?.title}
          </h2>
          <div>
            <label>Episode :</label>
            <Input
              value={currentEp ?? ""}
              onChange={(value) => setCurrentEp(Number(value))}
              type="number"
              id="currentEp"
            />
          </div>
          <div>
            <label>Chapter :</label>
            <Input
              value={currentChap ?? ""}
              onChange={(value) => setCurrentChap(Number(value))}
              type="number"
              id="currentChap"
            />
          </div>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            onClick={confirmUpdate}
          >
            <CheckCircle size={15} className="mr-2" />
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
}
