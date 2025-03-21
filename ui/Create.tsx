/**
 * @file Create.tsx
 * @description Composant pour ajouter un contenu (Anime, Manga, Webtoon).
 * 
 * ## Utilisation simple :
 * 
 * ```tsx
 * import { useState } from "react";
 * import Create from "./Create";
 * 
 * function App() {
 *   const [type, setType] = useState("");
 *   const [title, setTitle] = useState("");
 *   const [episode, setEpisode] = useState("");
 *   const [chapter, setChapter] = useState("");
 * 
 *   const handleSave = () => {
 *     console.log("Ajouté :", { type, title, episode, chapter });
 *   };
 * 
 *   return (
 *     <Create
 *       selectedValue={type}
 *       setSelectedValue={setType}
 *       title={title}
 *       setTitle={setTitle}
 *       currentEp={episode}
 *       setCurrentEp={setEpisode}
 *       currentChap={chapter}
 *       setCurrentChap={setChapter}
 *       onSubmit={handleSave}
 *       closeModal={() => console.log("Fermeture du formulaire")}
 *     />
 *   );
 * }
 * 
 * export default App;
 * ```
 * 
 * Ce composant utilise :
 * - `react-toastify` pour les notifications
 * - `lucide-react` pour les icônes
 * - `./Select` et `./Input` pour les champs de saisie
 */


"use client";

import { Select } from "./Select";
import { Input } from "./Input";
import { Delete, CheckCircleIcon } from "lucide-react";
import { toast } from "react-toastify";

export enum ContentType {
  ANIME = "ANIME",
  MANGA = "MANGA",
  WEBTOON = "WEBTOON",
}

export default function Create({
  selectedValue,
  setSelectedValue,
  title,
  setTitle,
  currentEp,
  setCurrentEp,
  currentChap,
  setCurrentChap,
  onSubmit,
  closeModal,
}: {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  currentEp: number | "";
  setCurrentEp: (value: number | "") => void;
  currentChap: number | "";
  setCurrentChap: (value: number | "") => void;
  onSubmit: () => void;
  closeModal: () => void;
}) {
  const options = Object.values(ContentType).map((value) => ({
    label: value,
    value,
  }));

  const resetForm = () => {
    setSelectedValue("");
    setTitle("");
    setCurrentEp("");
    setCurrentChap("");
  };

  const handleSubmit = () => {
    if (!title.trim() || !selectedValue) {
      toast.error("Title and content type are required!");
      return;
    }

    try {
      onSubmit();
      toast.success("Content added successfully!");
      resetForm();
      closeModal();
    } catch (error) {
      toast.error("An error occurred while adding content.");
    }
  };

  return (
    <div className="p-2 space-y-3">
      <h2 className="text-xl font-semibold text-left uppercase">
        Create New Content
      </h2>

      {/* Sélection du type de contenu */}
      <label
        htmlFor="contentType"
        className="block text-sm font-medium text-gray-700"
      >
        Content Type
      </label>
      <Select
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder="Choose a content type"
        options={options}
      />

      {/* Champ Titre */}
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        Title
      </label>
      <Input
        id="title"
        value={title}
        onChange={setTitle}
        placeholder="Title"
        type="text"
      />

      {/* Champ Épisode */}
      <label
        htmlFor="currentEp"
        className="block text-sm font-medium text-gray-700"
      >
        Current Episode
      </label>
      <Input
        id="currentEp"
        value={currentEp}
        onChange={(val) => setCurrentEp(val ? parseInt(val) : "")}
        placeholder="Episode"
        type="number"
      />

      {/* Champ Chapitre */}
      <label
        htmlFor="currentChap"
        className="block text-sm font-medium text-gray-700"
      >
        Current Chapter
      </label>
      <Input
        id="currentChap"
        value={currentChap}
        onChange={(val) => setCurrentChap(val ? parseInt(val) : "")}
        placeholder="Chapter"
        type="number"
      />

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-2 text-xs">
        <button
          onClick={closeModal}
          className="bg-gray-400 text-white p-2 uppercase rounded-md shadow-md hover:bg-gray-500 transition-all flex items-center gap-2"
        >
          <Delete size={15} /> Delete
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white p-2 uppercase rounded-md shadow-md hover:bg-green-700 transition-all flex items-center gap-2"
        >
          <CheckCircleIcon size={15} /> Confirm
        </button>
      </div>
    </div>
  );
}
