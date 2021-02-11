import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

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
    <section>
      <h2>Log In</h2>
      {error && <h1>{error}</h1>}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Email</label>
          <input type="email" required ref={emailRef} />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input type="password" required ref={passwordRef} />
        </fieldset>
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>
      <Link to="/forgot-password">Forget Password?</Link>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </section>
  );
};
