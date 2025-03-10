"use client";

import { useState, useEffect } from "react";
import Modal from "@/ui/Modal";
import { CirclePlus } from "lucide-react";
import Create from "@/ui/Create";
import { toast } from "react-toastify";
import { createWatchlist, getWatchlist } from "@/services/watchlist.services";
import WatchTable from "@/ui/WatchTable";
import { WatchData, WatchItem } from "@/types/watchlist";

export default function Page() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [currentEp, setCurrentEp] = useState<number | "">("");
  const [currentChap, setCurrentChap] = useState<number | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchlistData, setWatchlistData] = useState<WatchData | null>(null);
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Évite les soumissions multiples

  const fetchWatchlist = async (page: number = 1) => {
    try {
      const response = await getWatchlist(page);

      if (response.success && response.data) {
        const data = response.data as unknown as WatchData;

        if (data.watchlists && Array.isArray(data.watchlists)) {
          const transformedWatchlist: WatchItem[] = data.watchlists.map(
            (watch) => ({
              id: watch.id,
              title: watch.content.title,
              type: watch.content.type,
              currentEp: watch.currentEp,
              currentChap: watch.currentChap,
              status: watch.status,
            })
          );

          setWatchlist(transformedWatchlist);
          setWatchlistData(data);
        } else {
          throw new Error("Aucune liste de surveillance trouvée.");
        }
      } else {
        throw new Error(response.message || "Erreur lors du chargement.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue.";
      toast.error(errorMessage);
      setWatchlist([]);
      setWatchlistData(null);
    }
  };

  const handlePageChange = (page: number) => {
    if (!watchlistData) return;
    if (page < 1 || page > watchlistData.totalPages) return;
    fetchWatchlist(page);
  };

  const refreshData = () => {
    fetchWatchlist(watchlistData?.currentPage || 1);
  };

  useEffect(() => {
    fetchWatchlist(1);
  }, []);

  const resetForm = () => {
    setSelectedValue("");
    setTitle("");
    setCurrentEp("");
    setCurrentChap("");
  };

  const handleCreateSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!selectedValue || !title) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createWatchlist(
        title,
        selectedValue,
        currentEp || 0,
        currentChap || 0
      );
      resetForm();
      setIsModalOpen(false);
      refreshData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-start space-y-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white p-2 uppercase rounded-md shadow-md hover:bg-green-700 transition-all"
      >
        <CirclePlus size={20} />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Create
          selectedValue={selectedValue}
          title={title}
          currentEp={currentEp}
          currentChap={currentChap}
          setSelectedValue={setSelectedValue}
          setTitle={setTitle}
          setCurrentEp={setCurrentEp}
          setCurrentChap={setCurrentChap}
          onSubmit={handleCreateSubmit}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>

      <WatchTable
        data={watchlist}
        watchlistData={watchlistData}
        handlePageChange={handlePageChange}
        refreshData={refreshData}
      />
    </div>
  );
}
