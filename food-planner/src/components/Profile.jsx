import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { UserRef } from "./currentUser/userData";

export const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();

  // grabbing the user data to use in app
  useEffect(() => {
    UserRef(currentUser, setUserData);
  }, []);

  const history = useHistory();

  return (
    <section>
      <Link to={"/"}>Home</Link>
      <h2>Profile</h2>
      {userData && (
        <>
          <h4>Name: {userData.name || userData.email}</h4>
          <h4>Email: {userData.email}</h4>
        </>
      )}
      <button>
        <Link to="/update-profile">Update Profile</Link>
      </button>
    </section>
  );
};
