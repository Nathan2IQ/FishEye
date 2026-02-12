"use client";

import { useState } from "react";
import Style from "./MediaGallery.module.scss";
import Media from "./Media";
import LightboxModal from "../LightboxModal/LightboxModal";

export default function MediaGallery({
  medias = [],
  onMediaClick,
  onLikeUpdate,
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  // Protection si medias est undefined ou null
  if (!medias || medias.length === 0) {
    return <div className={Style.mediaGallery}>Aucun média à afficher</div>;
  }

  const handleMediaClick = (media) => {
    // Trouver l'index du média cliqué
    const index = medias.findIndex((m) => m.id === media.id);
    setSelectedMediaIndex(index);
    setIsLightboxOpen(true);

    // Appeler le callback personnalisé si fourni
    if (onMediaClick) {
      onMediaClick(media);
    }
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      <div className={Style.mediaGallery}>
        {medias.map((item) => (
          <Media
            key={item.id}
            media={item}
            onClick={handleMediaClick}
            onLikeUpdate={onLikeUpdate}
          />
        ))}
      </div>

      <LightboxModal
        media={medias}
        initialIndex={selectedMediaIndex}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
