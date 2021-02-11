import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export const Dashboard = () => {
  const { currentUser, logout } = useAuth();

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
  const [error, setError] = useState("");

  return (
    <main>
      <h1>Profile</h1>
      <h2>User: {currentUser.email}</h2>
      <Link to="/update-profile">Update profile</Link>
      {error && <h2>{error}</h2>}

      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </main>
  );
};
