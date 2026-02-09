"use client";

import { useEffect } from "react";
import Style from "./Modal.module.scss";

export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel = "Modale",
  className = "",
  closeOnBackdrop = true,
  closeOnEscape = true,
}) {
  // Gérer la fermeture avec Escape et bloquer le scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Empêcher le scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Gérer le clic sur le backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  // Ne rien afficher si la modale est fermée
  if (!isOpen) return null;

  return (
    <div className={Style.modalBackdrop} onClick={handleBackdropClick}>
      <aside
        className={`${Style.modalContent} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {/* Bouton de fermeture commun à toutes les modales */}
        <button
          className={Style.closeButton}
          onClick={onClose}
          aria-label="Fermer la modale"
        >
          ×
        </button>

        {/* Contenu spécifique de la modale */}
        {children}
      </aside>
    </div>
  );
}
