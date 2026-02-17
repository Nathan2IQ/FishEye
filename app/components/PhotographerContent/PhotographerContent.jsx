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
  const [localMedias, setLocalMedias] = useState(medias);

  const totalLikes = useMemo(() => {
    return localMedias.reduce((total, media) => total + media.likes, 0);
  }, [localMedias]);

  const handleLikeUpdate = async (mediaId, newNumberOfLikes) => {
    // Mettre à jour l'état local immédiatement
    setLocalMedias((prevMedias) =>
      prevMedias.map((media) =>
        media.id === mediaId ? { ...media, likes: newNumberOfLikes } : media,
      ),
    );

    // Appeler la fonction de mise à jour de la base de données
    if (onLikeUpdate) {
      await onLikeUpdate(mediaId, newNumberOfLikes);
    }
  };

  // Tri des médias selon le filtre sélectionné
  const sortedMedias = [...localMedias].sort((a, b) => {
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
      <MediaGallery medias={sortedMedias} onLikeUpdate={handleLikeUpdate} />
      <PriceCard price={photographer.price} totalLikes={totalLikes} />
    </>
  );
}
