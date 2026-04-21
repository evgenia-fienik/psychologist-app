import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AppointmentModal from "../AppointmentModal/AppointmentModal.jsx";

import styles from "./PsychologistCard.module.css";

export default function PsychologistCard({
  psychologist,
  isFavorite,
  onToggleFavorite,
  isLoggedIn,
}) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
  } = psychologist;

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      alert(
        "This feature is available for authorized users only. Please log in."
      );
      return;
    }
    onToggleFavorite(psychologist);
  };
  return (
    <div className={`${styles.card} ${isFavorite ? styles.cardFavorite : ""}`}>
      <div className={styles.avatarWrap}>
        <span className={styles.onlineDot} />
        <img src={avatar_url} alt={name} className={styles.avatar} />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span className={styles.label}>Psychologist</span>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.meta}>
            <FaStar className={styles.star} />
            <span>Rating: {rating}</span>
            <span className={styles.divider}>|</span>
            <span>
              Price / 1 hour:{" "}
              <span className={styles.price}>{price_per_hour}$</span>
            </span>
            <button
              type="button"
              className={styles.heartBtn}
              onClick={handleHeartClick}
              aria-label="Toggle favorite"
            >
              {isFavorite ? (
                <FaHeart className={styles.heartFilled} />
              ) : (
                <FaRegHeart className={styles.heartEmpty} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.tags}>
          <span className={styles.tag}>
            Experience: <strong>{experience}</strong>
          </span>
          <span className={styles.tag}>
            License: <strong>{license}</strong>
          </span>
          <span className={styles.tag}>
            Specialization: <strong>{specialization}</strong>
          </span>
          <span className={styles.tag}>
            Initial_consultation: <strong>{initial_consultation}</strong>
          </span>
        </div>

        <p className={styles.about}>{about}</p>

        {!expanded && (
          <button
            type="button"
            className={styles.readMore}
            onClick={() => setExpanded(true)}
          >
            Read more
          </button>
        )}

        {expanded && (
          <div className={styles.reviews}>
            {reviews.map((review, i) => (
              <div key={i} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewAvatar}>
                    {review.reviewer[0]}
                  </div>
                  <div>
                    <p className={styles.reviewerName}>{review.reviewer}</p>
                    <div className={styles.reviewRating}>
                      <FaStar className={styles.star} />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}

            <button
              type="button"
              className={styles.appointmentBtn}
              onClick={() => setShowModal(true)}
            >
              Make an appointment
            </button>

            {showModal && (
              <AppointmentModal
                psychologist={psychologist}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
