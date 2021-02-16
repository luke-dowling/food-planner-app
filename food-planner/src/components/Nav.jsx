import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import styles from "../css/Nav.module.css";

export const Nav = () => {
  const { logout } = useAuth();
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
    <nav className={styles.container}>
      <ul>
        <li className={styles.navListItem}>
          <Link to="/">Home</Link>
        </li>
        {/*<li>Blogs</li>*/}
        <li className={styles.navListItem}>
          <Link to="/weekly-plan">Weekly Plan</Link>
        </li>
        <li className={styles.navListItem}>
          <Link to="/update-profile">Update profile</Link>
        </li>
        {/* this will come when i set out the ingredients : <li>Your shopping</li>*/}
      </ul>

      {error && <h4>{error}</h4>}
      <button
        className={styles.navBtn}
        onClick={handleLogout}
        onTouchEnd={handleLogout}
      >
        Log Out
      </button>
    </nav>
  );
};
