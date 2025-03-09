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
  const [currentEp, setCurrentEp] = useState<number>(0);
  const [currentChap, setCurrentChap] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [watchlistData, setWatchlistData] = useState<WatchData | null>(null);
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);

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

  useEffect(() => {
    // On refait le fetch seulement si `watchlistData` et `currentPage` ont changé
    if (watchlistData?.currentPage) {
      fetchWatchlist(watchlistData.currentPage);
    }
  }, [watchlistData?.currentPage]); // Effect dépendant de l'état de la page courante

  const handleCreateSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!selectedValue || !title) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    try {
      await createWatchlist(title, selectedValue, currentEp, currentChap);
      toast.success("📌 Données enregistrées avec succès !");
      setIsModalOpen(false);
      fetchWatchlist();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement.");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    // On charge les données initiales (page 1 par défaut)
    if (watchlistData) {
      fetchWatchlist(watchlistData.currentPage); // Charge la page actuelle de manière dynamique
    } else {
      fetchWatchlist(1); // Si pas de pagination, commencer par la page 1
    }
  }, [watchlistData?.currentPage]); // Change uniquement quand `watchlistData` est modifié.

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
      />
    </div>
  );
}
