import { useEffect, useState } from "react";
import { get, ref, set } from "firebase/database";
import { db } from "../../firebase/firebase.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import FilterDropdown from "../../components/FilterDropdown/FilterDropdown.jsx";
import AuthModal from "../../components/AuthModal/AuthModal.jsx";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import styles from "./PsychologistsPage.module.css";

const PAGE_SIZE = 3;

export default function PsychologistsPage() {
  const { user } = useAuth();
  const [all, setAll] = useState([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState("A to Z");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalType, setAuthModalType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "psychologists"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const list = Array.isArray(data) ? data : Object.values(data);
          setAll(list);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }
    const fetchFavorites = async () => {
      const snapshot = await get(ref(db, `users/${user.uid}/favorites`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Array.isArray(data) ? data : Object.values(data);
        setFavorites(list);
      } else {
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleToggleFavorite = async (psychologist) => {
    if (!user) return;
    const exists = favorites.some((p) => p.name === psychologist.name);
    const updated = exists
      ? favorites.filter((p) => p.name !== psychologist.name)
      : [...favorites, psychologist];
    setFavorites(updated);
    await set(ref(db, `users/${user.uid}/favorites`), updated);
  };

  const isFavorite = (psychologist) => {
    if (!user) return false;
    return favorites.some((p) => p.name === psychologist.name);
  };

  const getFiltered = () => {
    switch (filter) {
      case "A to Z":
        return [...all].sort((a, b) => a.name.localeCompare(b.name));
      case "Z to A":
        return [...all].sort((a, b) => b.name.localeCompare(a.name));
      case "Less than 10$":
        return all.filter((p) => p.price_per_hour < 10);
      case "Greater than 10$":
        return all.filter((p) => p.price_per_hour > 10);
      case "Popular":
        return [...all].sort((a, b) => b.rating - a.rating);
      case "Not popular":
        return [...all].sort((a, b) => a.rating - b.rating);
      case "Show all":
        return [...all];
      default:
        return all;
    }
  };

  const filtered = getFiltered();

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loaderWrap}>
          <span className={styles.loader} />
        </div>
      )}
      {!isLoading && (
        <>
          <FilterDropdown
            value={filter}
            onChange={(val) => {
              setFilter(val);
              setVisible(PAGE_SIZE);
            }}
          />
          <ul className={styles.list}>
            {filtered.slice(0, visible).map((p, i) => (
              <li key={i}>
                <PsychologistCard
                  psychologist={p}
                  isFavorite={isFavorite(p)}
                  onToggleFavorite={handleToggleFavorite}
                  isLoggedIn={!!user}
                  onOpenAuth={() => setAuthModalType("login")}
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
        </>
      )}
      {authModalType && (
        <AuthModal
          type={authModalType}
          onClose={() => setAuthModalType(null)}
          onSwitch={(t) => setAuthModalType(t)}
        />
      )}
    </div>
  );
}