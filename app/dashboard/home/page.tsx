"use client";

import { useState } from "react";
import CustomTable from "@/ui/CustomTable";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importation des icônes Lucide React

const initialAnimeList = [
  {
    id: 1,
    title: "Attack on Titan",
    season: 4,
    episodesWatched: 16,
    totalEpisodes: 25,
    status: "Ongoing",
  },
  {
    id: 2,
    title: "Demon Slayer",
    season: 2,
    episodesWatched: 12,
    totalEpisodes: 26,
    status: "Completed",
  },
  {
    id: 3,
    title: "One Piece",
    season: 20,
    episodesWatched: 900,
    totalEpisodes: 1000,
    status: "Ongoing",
  },
  {
    id: 4,
    title: "My Hero Academia",
    season: 5,
    episodesWatched: 15,
    totalEpisodes: 25,
    status: "Ongoing",
  },
  {
    id: 5,
    title: "Fullmetal Alchemist",
    season: 1,
    episodesWatched: 10,
    totalEpisodes: 20,
    status: "Completed",
  },
  {
    id: 6,
    title: "Naruto",
    season: 5,
    episodesWatched: 50,
    totalEpisodes: 200,
    status: "Completed",
  },
  {
    id: 7,
    title: "Bleach",
    season: 7,
    episodesWatched: 80,
    totalEpisodes: 150,
    status: "Ongoing",
  },
  {
    id: 8,
    title: "One Punch Man",
    season: 3,
    episodesWatched: 10,
    totalEpisodes: 12,
    status: "Ongoing",
  },
  {
    id: 9,
    title: "Naruto",
    season: 5,
    episodesWatched: 50,
    totalEpisodes: 200,
    status: "Completed",
  },
  {
    id: 10,
    title: "Bleach",
    season: 7,
    episodesWatched: 80,
    totalEpisodes: 150,
    status: "Ongoing",
  },
  {
    id: 11,
    title: "One Punch Man",
    season: 3,
    episodesWatched: 10,
    totalEpisodes: 12,
    status: "Ongoing",
  },
  {
    id: 12,
    title: "Naruto",
    season: 5,
    episodesWatched: 50,
    totalEpisodes: 200,
    status: "Completed",
  },
  {
    id: 13,
    title: "Bleach",
    season: 7,
    episodesWatched: 80,
    totalEpisodes: 150,
    status: "Ongoing",
  },
  {
    id: 14,
    title: "One Punch Man",
    season: 3,
    episodesWatched: 10,
    totalEpisodes: 12,
    status: "Ongoing",
  },
  {
    id: 15,
    title: "Naruto",
    season: 5,
    episodesWatched: 50,
    totalEpisodes: 200,
    status: "Completed",
  },
  {
    id: 16,
    title: "Bleach",
    season: 7,
    episodesWatched: 80,
    totalEpisodes: 150,
    status: "Ongoing",
  },
  {
    id: 17,
    title: "One Punch Man",
    season: 3,
    episodesWatched: 10,
    totalEpisodes: 12,
    status: "Ongoing",
  },
];

export default function AnimePage() {
  const [animeList, setAnimeList] = useState(initialAnimeList);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 4;

  const logActivity = (message: string) => {
    setActivityLog((prev) => [message, ...prev.slice(0, 9)]);
  };

  const handleAnimeSelect = (anime: any) => {
    logActivity(`ajouté: ${anime.title}`);
  };

  const handleAnimeUpdate = (anime: any) => {
    logActivity(`modifié: ${anime.title}`);
  };

  const handleAnimeDelete = (id: number) => {
    const deletedAnime = animeList.find((anime) => anime.id === id);
    if (deletedAnime) {
      logActivity(`supprimé: ${deletedAnime.title}`);
    }
    setAnimeList(animeList.filter((anime) => anime.id !== id));
  };

  // Pagination: Calculer les indices pour la pagination des logs
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = activityLog.slice(indexOfFirstLog, indexOfLastLog);

  // Fonction de changement de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(activityLog.length / logsPerPage);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 max-w-screen-full mx-auto">
      {/* Table */}
      <div className="w-full lg:w-2/3">
        <CustomTable
          data={animeList}
          onUpdateAnime={handleAnimeUpdate}
          onDeleteAnime={handleAnimeDelete}
          onCreateAnime={handleAnimeSelect}
        />
      </div>

      {/* Activity Log */}
      <div className="w-full lg:w-1/3 py-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">History</h3>
        <ul className="text-sm space-y-2 bg-white p-6 rounded-lg shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out">
          {currentLogs.length === 0 ? (
            <li className="text-gray-500">No activity</li>
          ) : (
            currentLogs.map((log, index) => (
              <li
                key={index}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 ease-in-out"
              >
                {log}
              </li>
            ))
          )}
        </ul>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="self-center font-medium text-gray-700 text-md">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
