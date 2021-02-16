import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

import styles from "../css/Auth.module.css";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Log In</h2>
      {error && <h1 className={styles.error}>{error}</h1>}

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
        <button disabled={loading} type="submit" className={styles.btn}>
          Log In
        </button>
      </form>
      <div className={styles.links}>
        <Link to="/forgot-password">Forget Password?</Link>
      </div>
      <div className={styles.links}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </section>
  );
};
