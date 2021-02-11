import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export const UpdateProfile = () => {
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

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
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
          <label>Email</label>
          <input
            type="email"
            required
            ref={emailRef}
            defaultValue={currentUser.email}
          />
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
