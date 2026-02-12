"use client";

import { useState, useEffect, useRef } from "react";
import Style from "./Filter.module.scss";

export default function Filter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "popularity",
    label: "Popularité",
  });

  const dropdownRef = useRef(null);

  const options = [
    { value: "popularity", label: "Popularité" },
    { value: "date", label: "Date" },
    { value: "title", label: "Titre" },
  ];

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(option.value);
    }
  };

  // Filtrer les options pour ne pas afficher celle qui est sélectionnée
  const availableOptions = options.filter(
    (option) => option.value !== selectedOption.value,
  );

  return (
    <div className={Style.container} ref={dropdownRef}>
      <p className={Style.label}>Trier par</p>

      <div className={Style.selectWrapper}>
        <div className={Style.selectHeader} onClick={handleToggle}>
          <span>{selectedOption.label}</span>
          <i
            className={`fa-solid fa-angle-down ${isOpen ? Style.rotate : ""}`}
          ></i>
        </div>

        {isOpen && (
          <div className={Style.dropdown}>
            {availableOptions.map((option) => (
              <div
                key={option.value}
                className={Style.option}
                onClick={() => handleSelect(option)}
              >
                {option.label}
                <br />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
