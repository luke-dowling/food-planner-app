import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for futher instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  };

  return (
    <section>
      <h2>Password Reset</h2>
      {error && <h1>{error}</h1>}
      {message && <h1>{message}</h1>}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Email</label>
          <input type="email" required ref={emailRef} />
        </fieldset>
        <button disabled={loading} type="submit">
          Reset Password
        </button>
      </form>
      <Link to="/login">Log In</Link>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </section>
  );
};
