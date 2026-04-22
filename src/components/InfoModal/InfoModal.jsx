import styles from "./InfoModal.module.css";

export default function InfoModal({ onClose, onLogin }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.title}>Access restricted</h3>
        <p className={styles.text}>
          This feature is available for authorized users only. Please log in or
          register to continue.
        </p>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.loginBtn}
            onClick={onLogin}
          >
            Log In
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}