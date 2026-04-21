import { useEffect, useState } from "react";
import { get, ref, set } from "firebase/database";
import { db } from "../../firebase/firebase.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown.jsx";
import styles from "./FavoritesPage.module.css";

const PAGE_SIZE = 3;

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState("A to Z");

  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      const snapshot = await get(ref(db, `users/${user.uid}/favorites`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Array.isArray(data) ? data : Object.values(data);
        setFavorites(list);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleToggleFavorite = async (psychologist) => {
    const updated = favorites.filter((p) => p.name !== psychologist.name);
    setFavorites(updated);
    await set(ref(db, `users/${user.uid}/favorites`), updated);
  };

  const getFiltered = () => {
    switch (filter) {
      case "A to Z":
        return [...favorites].sort((a, b) => a.name.localeCompare(b.name));
      case "Z to A":
        return [...favorites].sort((a, b) => b.name.localeCompare(a.name));
      case "Popular":
        return [...favorites].sort((a, b) => b.rating - a.rating);
      case "Not popular":
        return [...favorites].sort((a, b) => a.rating - b.rating);
      case "Less than 10$":
        return favorites.filter((p) => p.price_per_hour < 10);
      case "Greater than 10$":
        return favorites.filter((p) => p.price_per_hour > 10);
      default:
        return favorites;
    }
  };

  const filtered = getFiltered();

  return (
    <div className={styles.container}>
      <FilterDropdown
        value={filter}
        onChange={(val) => {
          setFilter(val);
          setVisible(PAGE_SIZE);
        }}
      />

      {filtered.length === 0 && (
        <p className={styles.empty}>No favorites yet 🤍</p>
      )}

      <ul className={styles.list}>
        {filtered.slice(0, visible).map((p, i) => (
          <li key={i}>
            <PsychologistCard
              psychologist={p}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
              isLoggedIn={!!user}
            />
          </li>
        ))}
      </ul>

      {visible < filtered.length && (
        <div className={styles.loadMoreWrap}>
          <button
            type="button"
            className={styles.loadMoreBtn}
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
