import React from "react";
import "../css/App.css";
import { Routes } from "../routes/Routes";
import { AuthProvider } from "../context/AuthContext";
import { AppProvider } from "../context/AppContext";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
