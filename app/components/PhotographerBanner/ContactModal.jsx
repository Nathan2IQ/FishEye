"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
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

  return (
    <>
      <button className={className} onClick={openModal}>
        Contactez-moi
      </button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        ariaLabel={`Formulaire de contact pour ${photographerName}`}
        className={Style.contactModal}
      >
        <div className={Style.modalHeader}>
          <h2 id="modal-title">
            Contactez-moi <br /> {photographerName}
          </h2>
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
      </Modal>
    </>
  );
}
