import React from "react";
import { Edit, Trash } from "lucide-react";
import { Anime } from "@/types/anime";

interface TableProps {
  data: Anime[];
  openModal: (action: "create" | "update" | "delete", anime?: Anime) => void;
  onUpdateAnime: (anime: Anime) => void; 
  onDeleteAnime: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ data, openModal }) => {
  return (
    <div className="overflow-x-auto max-h-96 overflow-y-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Season</th>
            <th className="p-2 border">Episodes Watched</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((anime) => (
            <tr key={anime.id} className="border-b">
              <td className="p-2 border">{anime.title}</td>
              <td className="p-2 border">{anime.season}</td>
              <td className="p-2 border">
                {anime.episodesWatched} / {anime.totalEpisodes}
              </td>
              <td className="p-2 border">{anime.status}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => openModal("update", anime)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => openModal("delete", anime)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
