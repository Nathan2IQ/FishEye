"use client";

import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Style from "./LightboxModal.module.scss";

export default function LightboxModal({
  media,
  initialIndex = 0,
  isOpen,
  onClose,
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Réinitialiser l'index à chaque ouverture de la lightbox
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Navigation vers le média précédent
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1,
    );
  };

  // Navigation vers le média suivant
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Gérer la navigation au clavier
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isOpen]);

  if (!media || media.length === 0) return null;

  const currentMedia = media[currentIndex];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Visionneuse d'images"
      className={Style.lightboxModal}
      closeOnBackdrop={true}
      closeOnEscape={true}
    >
      <div className={Style.lightboxContent}>
        {/* Navigation précédent */}
        <button
          className={`${Style.navButton} ${Style.prevButton}`}
          onClick={goToPrevious}
          aria-label="Image précédente"
        >
          <em className="fa-solid fa-angle-left"></em>
        </button>

        {/* Média affiché */}
        <div className={Style.mediaContainer}>
          {currentMedia.image ? (
            <img
              src={`/${currentMedia.image}`}
              alt={currentMedia.title}
              className={Style.media}
            />
          ) : (
            <video
              src={`/${currentMedia.video}`}
              controls
              className={Style.media}
              aria-label={currentMedia.title}
              autoPlay
              muted
              loop
            >
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          )}

          {/* Titre du média */}
          <p className={Style.mediaTitle}>{currentMedia.title}</p>
        </div>

        {/* Navigation suivant */}
        <button
          className={`${Style.navButton} ${Style.nextButton}`}
          onClick={goToNext}
          aria-label="Image suivante"
        >
          <em className="fa-solid fa-angle-right"></em>
        </button>
      </div>
    </Modal>
  );
}
