import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { auth } from "../../firebase/firebase";
import { getAuthSchema } from "./authSchema.js";
import styles from "./AuthForm.module.css";

const getAuthErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email format";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Incorrect email or password";
    case "auth/email-already-in-use":
      return "This email is already in use";
    case "auth/weak-password":
      return "Password must contain at least 6 characters";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later";
    default:
      return "Something went wrong. Please try again";
  }
};

export default function AuthForm({ type, closeModal }) {
  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(() => getAuthSchema(type), [type]);
  const isRegister = type === "register";

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isRegister
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    clearErrors("root");
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        await updateProfile(userCredential.user, {
          displayName: data.name,
        });
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }

      closeModal();
    } catch (error) {
      const message = getAuthErrorMessage(error.code);

      if (error.code === "auth/invalid-email") {
        setError("email", {
          type: "manual",
          message,
        });
        return;
      }

      if (error.code === "auth/weak-password") {
        setError("password", {
          type: "manual",
          message,
        });
        return;
      }

      setError("root", {
        type: "manual",
        message,
      });

      console.error(error.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {isRegister && (
        <div className={styles.field}>
          <input
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            {...register("name")}
            placeholder="Name"
            type="text"
            autoComplete="name"
          />
          <p className={styles.error}>{errors.name?.message}</p>
        </div>
      )}

      <div className={styles.field}>
        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          {...register("email")}
          placeholder="Email"
          type="email"
          autoComplete="email"
        />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>

      <div className={styles.field}>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.input} ${styles.passwordInput} ${
              errors.password ? styles.inputError : ""
            }`}
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            autoComplete={isRegister ? "new-password" : "current-password"}
          />

          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <IoEyeOutline size={18} />
            ) : (
              <IoEyeOffOutline size={18} />
            )}
          </button>
        </div>

        <p className={styles.error}>{errors.password?.message}</p>
      </div>

      <p className={styles.error}>{errors.root?.message}</p>

      <button
        className={styles.submitButton}
        type="submit"
        disabled={isSubmitting}
      >
        {isRegister ? "Sign Up" : "Log In"}
      </button>
    </form>
  );
}
