"use client";

import { useState, useEffect } from "react";
import Style from "./PhotographerBanner.module.scss";

export default function ContactModal({ className, photographerName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // Ouvrir la modale
  const openModal = () => {
    setIsOpen(true);
  };

  // Fermer la modale
  const closeModal = () => {
    setIsOpen(false);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  // Gérer la fermeture avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Empêcher le scroll de la page
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    closeModal();
  };

  // Gérer le clic sur le backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <button className={className} onClick={openModal}>
        Contactez-moi
      </button>

      {isOpen && (
        <div className={Style.modalBackdrop} onClick={handleBackdropClick}>
          <aside
            className={Style.contactModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className={Style.modalHeader}>
              <h2 id="modal-title">
                Contactez-moi <br /> {photographerName}
              </h2>
              <button
                className={Style.closeButton}
                onClick={closeModal}
                aria-label="Fermer la modale"
              >
                ×
              </button>
            </div>

            <form className={Style.contactForm} onSubmit={handleSubmit}>
              <div className={Style.formGroup}>
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.formGroup}>
                <label htmlFor="message">Votre message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className={Style.submitButton}>
                Envoyer
              </button>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}
