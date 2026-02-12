"use client";

import { useState, useEffect, useRef } from "react";
import Style from "./Filter.module.scss";

export default function Filter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "popularity",
    label: "Popularité",
  });

  const [focusedIndex, setFocusedIndex] = useState(0);

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
    setFocusedIndex(0);
  };

  const handleToggleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(availableOptions.length - 1);
    }
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(option.value);
    }
  };

  const handleOptionKeyDown = (e, option, index) => {
    e.preventDefault();

    if (e.key === "Enter" || e.key === " ") {
      handleSelect(option);
    } else if (e.key === "ArrowDown") {
      setFocusedIndex((index + 1) % availableOptions.length);
    } else if (e.key === "ArrowUp") {
      setFocusedIndex(
        (index - 1 + availableOptions.length) % availableOptions.length,
      );
    } else if (e.key === "Escape") {
      setIsOpen(false);
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
        <div
          className={Style.selectHeader}
          onClick={handleToggle}
          onKeyDown={handleToggleKeyDown}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Trier les médias"
        >
          <span>{selectedOption.label}</span>
          <i
            className={`fa-solid fa-angle-down ${isOpen ? Style.rotate : ""}`}
            aria-hidden="true"
          ></i>
        </div>

        {isOpen && (
          <div className={Style.dropdown} role="listbox">
            {availableOptions.map((option, index) => (
              <div
                key={option.value}
                className={`${Style.option} ${index === focusedIndex ? Style.focused : ""}`}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => handleOptionKeyDown(e, option, index)}
                role="option"
                tabIndex={0}
                aria-selected={index === focusedIndex}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
