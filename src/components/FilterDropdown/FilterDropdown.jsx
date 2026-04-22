import { useState, useEffect, useRef } from "react";
import styles from "./FilterDropdown.module.css";

const options = [
  "A to Z",
  "Z to A",
  "Less than 10$",
  "Greater than 10$",
  "Popular",
  "Not popular",
  "Show all",
];

export default function FilterDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => 
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  return (
    <div className={styles.filterWrap}>
      <p className={styles.filterLabel}>Filters</p>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          type="button"
          className={styles.dropdownBtn}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{value}</span>
          <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`} />
        </button>

        {isOpen && (
          <ul className={styles.dropdownList}>
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={`${styles.dropdownItem} ${value === option ? styles.dropdownItemActive : ""}`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
