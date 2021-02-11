import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

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
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <section>
      <h2>Sign up</h2>
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
        <fieldset>
          <label>Password Confirm</label>
          <input type="password" required ref={passwordConfirmRef} />
        </fieldset>
        <button disabled={loading} type="submit">
          Sign up
        </button>
      </form>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </section>
  );
};
