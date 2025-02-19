import { useState } from "react";
import { Plus, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { Anime } from "@/types/anime";
import CreateAnimeModal from "./CreateAnimeModal";
import UpdateAnimeModal from "./UpdateAnimeModal";
import DeleteAnimeModal from "./DeleteAnimeModal";

interface CustomTableProps {
  data: Anime[];
  onUpdateAnime: (anime: Anime) => void;
  onDeleteAnime: (id: number) => void;
  onCreateAnime: (anime: Anime) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  onUpdateAnime,
  onDeleteAnime,
  onCreateAnime,
}) => {
  const [modalType, setModalType] = useState<
    "create" | "update" | "delete" | null
  >(null);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [newAnime, setNewAnime] = useState<Anime>({
    id: Date.now(),
    title: "",
    season: 1,
    episodesWatched: 0,
    totalEpisodes: 10,
    status: "Ongoing",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const openModalHandler = (
    type: "create" | "update" | "delete",
    anime?: Anime
  ) => {
    setModalType(type);
    setSelectedAnime(anime || null);
    setNewAnime(anime ? { ...anime } : { ...newAnime, id: Date.now() });
  };

  const closeModal = () => setModalType(null);

  const handleConfirm = () => {
    if (modalType === "create") onCreateAnime(newAnime);
    if (modalType === "update" && selectedAnime)
      onUpdateAnime({ ...selectedAnime, ...newAnime });
    if (modalType === "delete" && selectedAnime)
      onDeleteAnime(selectedAnime.id);
    closeModal();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="max-w-full overflow-hidden">
      <div className="flex items-center mb-4 justify-end">
        <button
          className="bg-indigo-400 uppercase text-xs hover:bg-indigo-200 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
          onClick={() => openModalHandler("create")}
        >
          <Plus size={20} /> Add Anime
        </button>
      </div>

      <table className="w-full mt-4 border-collapse table-auto text-xs bg-white rounded-md shadow-xl border border-gray-200">
        <thead>
          <tr className="bg-indigo-100 text-indigo-900 uppercase text-xs font-semibold">
            <th className="border-b p-4 text-left">Title</th>
            <th className="border-b p-4 text-left">Season</th>
            <th className="border-b p-4 text-left">Episodes Watched</th>
            <th className="border-b p-4 text-left">Total Episodes</th>
            <th className="border-b p-4 text-left">Status</th>
            <th className="border-b p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No anime found. Add new now !
              </td>
            </tr>
          ) : (
            currentData.map((anime) => (
              <tr key={anime.id} className="text-gray-800 hover:bg-indigo-50">
                <td className="border-b p-4">{anime.title}</td>
                <td className="border-b p-4">{anime.season}</td>
                <td className="border-b p-4">
                  <span className="text-sm text-gray-800 font-semibold">
                    {anime.episodesWatched}
                  </span>
                </td>

                <td className="border-b p-4">
                  <span className="text-sm text-gray-800 font-semibold">
                    {anime.totalEpisodes}
                  </span>
                </td>

                <td className="border-b p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold 
                    ${
                      anime.status === "Ongoing"
                        ? "bg-yellow-200 text-yellow-800"
                        : ""
                    }
                    ${
                      anime.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : ""
                    }
                    ${
                      anime.status === "On Hold"
                        ? "bg-gray-200 text-gray-800"
                        : ""
                    }
                  `}
                  >
                    {anime.status}
                  </span>
                </td>
                <td className="border-b py-4 p-4 flex justify-start gap-3">
                  <button
                    className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                    onClick={() => openModalHandler("update", anime)}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700 transition-colors duration-200"
                    onClick={() => openModalHandler("delete", anime)}
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-indigo-500 text-white px-6 py-2 rounded-md transition-all duration-200 hover:bg-indigo-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        {/* Sélecteur de page */}
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-sm"
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <option key={page} value={page}>
                {page}
              </option>
            )
          )}
        </select>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-indigo-500 text-white px-6 py-2 rounded-md transition-all duration-200 hover:bg-indigo-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <CreateAnimeModal
        isOpen={modalType === "create"}
        closeModal={closeModal}
        newAnime={newAnime}
        setNewAnime={setNewAnime}
        handleConfirm={handleConfirm}
      />
      <UpdateAnimeModal
        isOpen={modalType === "update"}
        closeModal={closeModal}
        selectedAnime={selectedAnime}
        newAnime={newAnime}
        setNewAnime={setNewAnime}
        handleConfirm={handleConfirm}
      />
      <DeleteAnimeModal
        isOpen={modalType === "delete"}
        closeModal={closeModal}
        selectedAnime={selectedAnime}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default CustomTable;
