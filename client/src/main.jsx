import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

function AppRoutes() {
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <div style={{
        minHeight: "100vh", background: "#09090b",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "IBM Plex Sans, sans-serif",
        color: "rgba(255,255,255,0.2)", fontSize: "14px", letterSpacing: "0.05em"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<App />} />
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);