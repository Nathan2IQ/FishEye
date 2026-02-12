"use client";

import { useState, useMemo } from "react";
import Filter from "../Filter/Filter";
import MediaGallery from "../MediaGallery/MediaGallery";
import PriceCard from "../PriceCard/PriceCard";

export default function PhotographerContent({
  photographer,
  medias,
  onLikeUpdate,
}) {
  const [filterValue, setFilterValue] = useState("popularity");

  const totalLikes = useMemo(() => {
    return medias.reduce((total, media) => total + media.likes, 0);
  }, [medias]);

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
      <PriceCard price={photographer.price} totalLikes={totalLikes} />
    </>
  );
}
