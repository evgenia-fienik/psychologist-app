import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import AuthModal from "../AuthModal/AuthModal.jsx";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import styles from "./Header.module.css";

export default function Header({ variant = "default", theme, setTheme }) {
  const auth = useAuth();
  const user = auth?.user || null;
  const logout = auth?.logout || (() => {});

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const closeMenu = () => setMenuOpen(false);

  const userName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "User";

  const getDesktopLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  const getMobileLinkClass = ({ isActive }) =>
    isActive
      ? `${styles.mobileLink} ${styles.mobileActiveLink}`
      : styles.mobileLink;

  return (
    <header
      className={`${styles.header} ${
        variant === "home" ? styles.headerHome : styles.headerDefault
      }`}
    >
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoAccent}>psychologists.</span>
            services
          </Link>

          <nav className={styles.desktopNav}>
            <NavLink to="/" end className={getDesktopLinkClass}>
              Home
            </NavLink>

            <NavLink to="/psychologists" className={getDesktopLinkClass}>
              Psychologists
            </NavLink>

            {user && (
              <NavLink to="/favorites" className={getDesktopLinkClass}>
                Favorites
              </NavLink>
            )}
          </nav>
        </div>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>

        <div className={styles.desktopAuth}>
          {user ? (
            <>
              <div className={styles.userBox}>
                <span className={styles.userIcon}>
                  <FaUser size={24} />
                </span>
                <span className={styles.userName}>{userName}</span>
              </div>

              <button
                type="button"
                className={styles.logoutBtn}
                onClick={logout}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.logBtn}
                onClick={() => setModalType("login")}
              >
                Log In
              </button>

              <button
                type="button"
                className={styles.regBtn}
                onClick={() => setModalType("register")}
              >
                Registration
              </button>
            </>
          )}
          <div
            className={styles.themePicker}
            aria-label="Choose theme"
            role="group"
          >
            <button
              type="button"
              className={`${styles.themeDot} ${
                theme === "theme-green" ? styles.active : ""
              }`}
              onClick={() => setTheme("theme-green")}
              aria-label="Green theme"
            />
            <button
              type="button"
              className={`${styles.themeDot} ${
                theme === "theme-blue" ? styles.active : ""
              }`}
              onClick={() => setTheme("theme-blue")}
              aria-label="Blue theme"
            />
            <button
              type="button"
              className={`${styles.themeDot} ${
                theme === "theme-orange" ? styles.active : ""
              }`}
              onClick={() => setTheme("theme-orange")}
              aria-label="Orange theme"
            />
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMenu}>
          <div
            className={styles.mobileMenu}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <IoCloseOutline size={24} />
            </button>

            <nav className={styles.mobileNav}>
              <NavLink
                to="/"
                end
                className={getMobileLinkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>

              <NavLink
                to="/psychologists"
                className={getMobileLinkClass}
                onClick={closeMenu}
              >
                Psychologists
              </NavLink>

              {user && (
                <NavLink
                  to="/favorites"
                  className={getMobileLinkClass}
                  onClick={closeMenu}
                >
                  Favorites
                </NavLink>
              )}
            </nav>

            <div className={styles.mobileAuth}>
              {user ? (
                <>
                  <div className={styles.userBox}>
                    <span className={styles.userIcon}>
                      <FaUser size={18} />
                    </span>
                    <span className={styles.userName}>{userName}</span>
                  </div>

                  <button
                    type="button"
                    className={styles.logoutBtn}
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.logBtn}
                    onClick={() => {
                      setModalType("login");
                      closeMenu();
                    }}
                  >
                    Log In
                  </button>

                  <button
                    type="button"
                    className={styles.regBtn}
                    onClick={() => {
                      setModalType("register");
                      closeMenu();
                    }}
                  >
                    Registration
                  </button>
                </>
              )}
              <div
                className={styles.themePicker}
                aria-label="Choose theme"
                role="group"
              >
                <button
                  type="button"
                  className={`${styles.themeDot} ${
                    theme === "theme-green" ? styles.active : ""
                  }`}
                  onClick={() => setTheme("theme-green")}
                  aria-label="Green theme"
                />
                <button
                  type="button"
                  className={`${styles.themeDot} ${
                    theme === "theme-blue" ? styles.active : ""
                  }`}
                  onClick={() => setTheme("theme-blue")}
                  aria-label="Blue theme"
                />
                <button
                  type="button"
                  className={`${styles.themeDot} ${
                    theme === "theme-orange" ? styles.active : ""
                  }`}
                  onClick={() => setTheme("theme-orange")}
                  aria-label="Orange theme"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType && (
        <AuthModal type={modalType} onClose={() => setModalType(null)} />
      )}
    </header>
  );
}