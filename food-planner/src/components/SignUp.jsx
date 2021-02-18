import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

import styles from "../css/Auth.module.css";

export const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setTimeout(() => {
        history.push("/");
      }, 4000);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Sign up</h2>
      {error && <h2 className={styles.error}>{error}</h2>}
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <fieldset className={styles.fieldsets}>
          <label className={styles.labels}>Email</label>
          <input
            className={styles.inputs}
            type="email"
            required
            ref={emailRef}
          />
        </fieldset>
        <fieldset className={styles.fieldsets}>
          <label className={styles.labels}>Password</label>
          <input
            className={styles.inputs}
            type="password"
            required
            ref={passwordRef}
          />
        </fieldset>
        <fieldset className={styles.fieldsets}>
          <label className={styles.labels}>Password Confirm</label>
          <input
            className={styles.inputs}
            type="password"
            required
            ref={passwordConfirmRef}
          />
        </fieldset>
        <button disabled={loading} type="submit" className={styles.btn}>
          Sign up
        </button>
      </form>
      <div className={styles.links}>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </section>
  );
};
