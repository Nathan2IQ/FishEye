"use client";

import { useState } from "react";
import Filter from "../Filter/Filter";
import MediaGallery from "../MediaGallery/MediaGallery";

export default function PhotographerContent({ medias, onLikeUpdate }) {
  const [filterValue, setFilterValue] = useState("popularity");

  // Tri des médias selon le filtre sélectionné
  const sortedMedias = [...medias].sort((a, b) => {
    switch (filterValue) {
      case "date":
        return new Date(b.date) - new Date(a.date);
      case "title":
        return a.title.localeCompare(b.title);
      case "popularity":
      default:
        return b.likes - a.likes;
    }
  });

  return (
    <>
      <Filter onFilterChange={setFilterValue} />
      <MediaGallery medias={sortedMedias} onLikeUpdate={onLikeUpdate} />
    </>
  );
}
