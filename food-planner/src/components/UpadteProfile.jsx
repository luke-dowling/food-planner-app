import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Firebase } from "../firebase";
import { UserRef } from "./currentUser/userData";

export const UpdateProfile = () => {
  const db = Firebase.firestore().collection("users");

  const [userData, setUserData] = useState();

  // grabbing the user data to use in app
  useEffect(() => {
    UserRef(currentUser, setUserData);
  }, []);

  const nameRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (nameRef.current.value !== userData.name) {
      db.doc(currentUser.uid).update({
        name: nameRef.current.value,
      });
    }

    if (ageRef.current.value !== userData.age) {
      db.doc(currentUser.uid).update({
        age: ageRef.current.value,
      });
    }

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        db.doc(currentUser.uid).update({
          email: emailRef.current.value,
        });
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <h2>Update Profile</h2>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Name</label>
          <input
            type="text"
            ref={nameRef}
            defaultValue={userData && userData.name}
          />
        </fieldset>
        <fieldset>
          <label>Age</label>
          <input
            type="number"
            ref={ageRef}
            defaultValue={userData && userData.age}
          />
        </fieldset>
        <fieldset>
          <label>Email</label>
          <input type="email" ref={emailRef} defaultValue={currentUser.email} />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Leave blank to stay the same"
          />
        </fieldset>
        <fieldset>
          <label>Password Confirm</label>
          <input
            type="password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to stay the same"
          />
        </fieldset>
        <button disabled={loading} type="submit">
          Update
        </button>
      </form>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </section>
  );
};
