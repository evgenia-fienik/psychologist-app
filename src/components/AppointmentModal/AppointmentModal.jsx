import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoCloseOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import styles from "./AppointmentModal.module.css";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Format: +380XXXXXXXXX")
    .required("Phone is required"),
  time: yup.string().required("Time is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string(),
});
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

export default function AppointmentModal({ psychologist, onClose }) {
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedTime = watch("time");

  //закриття Esc

  useEffect(() => {
    const hendleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", hendleKeyDown);
    return () => window.removeEventListener("keydown", hendleKeyDown);
  }, [onClose]);

  //Блокує скрол
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = (data) => {
    console.log("Appointment data:", data);
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          ariq-label="Close"
        >
          <IoCloseOutline size={24} />
        </button>
        <h2 className={styles.title}>
          Make an appointment with a psychologists
        </h2>
        <p className={styles.description}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        {/* Психолог */}
        <div className={styles.psychologist}>
          <img
            src={psychologist.avatar_url}
            alt={psychologist.name}
            className={styles.avatar}
          />
          <div className={styles.psychologistBox}>
            <p className={styles.psychologistLabel}>Your psychologists</p>
            <p>{psychologist.name}</p>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className={styles.fieldWrap}>
            <input
              {...register("name")}
              placeholder="Name"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          {/* Phone + Time */}
          <div className={styles.row}>
            <div className={styles.fieldWrap}>
              <input
                {...register("phone")}
                placeholder="+380"
                className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
              />
              {errors.phone && (
                <p className={styles.error}>{errors.phone.message}</p>
              )}
            </div>

            {/* Time picker */}
            <div className={styles.fieldWrap}>
              <div className={styles.timePickerWrap}>
                <input
                  {...register("time")}
                  placeholder="00:00"
                  readOnly
                  onClick={() => setIsTimeOpen((prev) => !prev)}
                  className={`${styles.input} ${errors.time ? styles.inputError : ""}`}
                />
                <span className={styles.clockIcon}>
                  <GoClock size={20} />
                </span>
                {isTimeOpen && (
                  <ul className={styles.timeList}>
                    <p className={styles.timeTitle}>Meeting time</p>
                    {timeSlots.map((slot) => (
                      <li
                        key={slot}
                        className={`${styles.timeItem} ${selectedTime === slot ? styles.timeItemActive : ""}`}
                        onClick={(e) => {
                          e.stopPropagation(); // ← зупиняє спливання до інпуту
                          setValue("time", slot, { shouldValidate: true });
                          setIsTimeOpen(false);
                        }}
                      >
                        {slot.replace(":", " : ")}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className={styles.fieldWrap}>
            <input
              {...register("email")}
              placeholder="Email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          {/* Comment */}
          <div className={styles.fieldWrap}>
            <textarea
              {...register("comment")}
              placeholder="Comment"
              className={`${styles.textarea} ${errors.comment ? styles.inputError : ""}`}
            />
            {errors.comment && (
              <p className={styles.error}>{errors.comment.message}</p>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
