import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";

import styles from "../css/Nav.module.css";

export const Nav = () => {
  const { logout } = useAuth();
  const { dateTime } = useContext(AppContext);
  const [error, setError] = useState("");

  const history = useHistory();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <div className={styles.topNavContainer}>
        {dateTime && (
          <h4>
            {dateTime.toLocaleString({
              weekday: "long",
              month: "long",
              day: "2-digit",
            })}
          </h4>
        )}
        <button
          className={styles.navBtn}
          onClick={handleLogout}
          onTouchEnd={handleLogout}
        >
          Log Out
        </button>
      </div>
      {error && <h4>{error}</h4>}

      <nav className={styles.container}>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <Link to="/" className={styles.navListLink}>
              Home
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link to="/weekly-plan" className={styles.navListLink}>
              Diary
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link to="/profile" className={styles.navListLink}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
