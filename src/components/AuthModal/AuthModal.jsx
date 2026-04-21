import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import AuthForm from "../AuthForm/AuthForm.jsx";
import styles from './AuthModal.module.css';

export default function AuthModal({ type, onClose }) {
    const isLogin = type === "login";

  useEffect(() => {
   document.body.style.overflow ='hidden';

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener("keydown", handleEsc);
        };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} type="button" aria-label="Close modal">
             <IoCloseOutline size={32}/>
        </button>

        <h2 className={styles.title}>{isLogin ? "Log In" : "Register"}</h2>

        <p className={styles.description}>
          {type === isLogin
            ? "Welcome back! Please enter your credentials to access your account and continue your search for a psychologist."
            : "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."}
        </p>

        <AuthForm type={type} closeModal={onClose} />
      </div>
    </div>
  );
}
