import React from "react";
import "../css/App.css";
import { Routes } from "../routes/Routes";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
