"use client";

import { Select } from "./Select";
import { Input } from "./Input";

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
  currentEp: number;
  setCurrentEp: (value: number) => void;
  currentChap: number;
  setCurrentChap: (value: number) => void;
  onSubmit: () => void;
  closeModal: () => void;
}) {
  const options = Object.values(ContentType).map((value) => ({
    label: value,
    value,
  }));

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
        onChange={(val) => setCurrentEp(parseInt(val))}
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
        onChange={(val) => setCurrentChap(parseInt(val))}
        placeholder="Chapter"
        type="number"
      />

      {/* Boutons d'action */}
      <div className="flex justify-between">
        <button
          onClick={closeModal}
          className="bg-gray-400 text-white p-2 uppercase rounded-md shadow-md hover:bg-gray-500 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white p-2 uppercase rounded-md shadow-md hover:bg-green-700 transition-all"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
