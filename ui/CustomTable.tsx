import { useState } from "react";
import { Plus, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { Anime } from "@/types/anime";
import CreateAnimeForm from "./CreateAnimeForm";
import UpdateAnimeForm from "./UpdateAnimeForm";
import DeleteAnimeConfirmation from "./DeleteAnimeForm";
import Modal from "react-modal"; // Import de la bibliothèque modal

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
    title: "One Piece",
    type: "ANIME",
    status: "WATCHING",
    episodes: 1000,
    chapters: 500,
    currentEp: 100,
    currentChap: 50,
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
    if (modalType === "delete" && selectedAnime?.id !== undefined)
      onDeleteAnime(selectedAnime.id);
    closeModal();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

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
          <Plus size={16} /> Add Anime
        </button>
      </div>

      <table className="w-full mt-4 border-collapse table-auto text-xs bg-white rounded-md shadow-xl border border-gray-200">
        <thead>
          <tr className="bg-indigo-100 text-indigo-900 uppercase font-semibold">
            <th className="border-b p-4 text-left">Title</th>
            <th className="border-b p-4 text-left">Season</th>
            <th className="border-b p-4 text-left">Episodes Watched</th>
            <th className="border-b p-4 text-left">Total Episodes</th>
            <th className="border-b p-4 text-left">Type</th>
            <th className="border-b p-4 text-left">Status</th>
            <th className="border-b p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No anime found. Add new now!
              </td>
            </tr>
          ) : (
            currentData.map((anime) => (
              <tr key={anime.id} className="text-gray-800 hover:bg-indigo-50">
                <td className="border-b p-4">{anime.title}</td>
                <td className="border-b p-4">{anime.season}</td>
                <td className="border-b p-4">{anime.currentEp}</td>
                <td className="border-b p-4">{anime.episodes}</td>
                <td className="border-b p-4">
                  <span
                    className={`${
                      anime.type === "ANIME"
                        ? "bg-blue-100 text-blue-600"
                        : anime.type === "MANGA"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                    } px-2 py-1 rounded-full text-xs`}
                  >
                    {anime.type}
                  </span>
                </td>
                <td className="border-b p-4">
                  <span
                    className={`${
                      anime.status === "WATCHING"
                        ? "bg-yellow-100 text-yellow-600"
                        : anime.status === "COMPLETED"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    } px-2 py-1 rounded-full text-xs`}
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
      <div className="flex justify-center space-x-3 items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-indigo-500 text-white p-1 rounded-full flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-gray-700 font-semibold text-md">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-indigo-500 text-white p-1 rounded-full flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Modal Logic */}
      <Modal
        isOpen={modalType !== null}
        onRequestClose={closeModal}
        contentLabel="Anime Form"
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        {modalType === "create" && (
          <CreateAnimeForm
            isOpen={modalType === "create"}
            closeModal={closeModal}
            newAnime={newAnime}
            setNewAnime={setNewAnime}
            handleConfirm={handleConfirm}
          />
        )}
        {modalType === "update" && (
          <UpdateAnimeForm
            isOpen={modalType === "update"}
            closeModal={closeModal}
            selectedAnime={selectedAnime}
            newAnime={newAnime}
            setNewAnime={setNewAnime}
            handleConfirm={handleConfirm}
          />
        )}
        {modalType === "delete" && (
          <DeleteAnimeConfirmation
            isOpen={modalType === "delete"}
            closeModal={closeModal}
            selectedAnime={selectedAnime}
            handleConfirm={handleConfirm}
          />
        )}
      </Modal>
    </div>
  );
};

export default CustomTable;
