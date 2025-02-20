"use client";

import { useState } from "react";
import CustomTable from "@/ui/CustomTable";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { initialAnimeList } from "@/utils/mockdata";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AnimePage() {
  const [animeList, setAnimeList] = useState(initialAnimeList);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 4;

  const logActivity = (message: string, type: "success" | "info" | "error") => {
    setActivityLog((prev) => [message, ...prev.slice(0, 9)]);
    toast[type](message);
  };

  const handleAnimeSelect = (anime: any) => {
    logActivity(`📌 ${anime.title}`, "success");
  };

  const handleAnimeUpdate = (anime: any) => {
    logActivity(`✏️ ${anime.title}`, "info");
  };

  const handleAnimeDelete = (id: number) => {
    const deletedAnime = animeList.find((anime) => anime.id === id);
    if (deletedAnime) {
      logActivity(`🗑️ ${deletedAnime.title}`, "error");
    }
    setAnimeList(animeList.filter((anime) => anime.id !== id));
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = activityLog.slice(indexOfFirstLog, indexOfLastLog);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.max(1, Math.ceil(activityLog.length / logsPerPage));

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
      <div className="w-full lg:w-1/3">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">History</h3>
        <ul className="text-sm space-y-2 bg-white p-4 rounded-lg shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 ease-in-out">
          {currentLogs.length === 0 ? (
            <li className="text-gray-500 text-center py-2">No activity</li>
          ) : (
            currentLogs.map((log, index) => {
              const isAdded = log.startsWith("ADD:");
              const isUpdated = log.startsWith("MODIFY:");
              const isDeleted = log.startsWith("DELETE:");

              return (
                <li
                  key={index}
                  className="flex items-center gap-2 p-2 transition-all text-xs"
                >
                  {isAdded && <PlusCircle className="text-green-500 w-5 h-3" />}
                  {isUpdated && <Pencil className="text-blue-500 w-5 h-3" />}
                  {isDeleted && <Trash2 className="text-red-500 w-5 h-3" />}

                  <span className="text-gray-700 font-medium">{log}</span>
                </li>
              );
            })
          )}
        </ul>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2 items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="bg-indigo-500 text-white p-1 rounded-full flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition"
            >
            <ChevronLeft size={20} />
          </button>

          <span className="self-center font-medium text-gray-700 text-md">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="bg-indigo-500 text-white p-1 rounded-full flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition"
            >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
