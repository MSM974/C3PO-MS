import React from "react";
import MenuList from "./components/MenuList";
import './assets/css/main.css';
import Navbar from "./components/Navbar";

// ✅ Chargement du rôle et statut de connexion
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const userRole = localStorage.getItem("userRole") || "Utilisateur";
const userSubRole = localStorage.getItem("subRole") || "apprenant"; // si encore utilisé

function App() {
  return (
    <div className="app-container">
      {isLoggedIn && <Navbar />}

      <h1 className="main-title">Menus de la semaine</h1>

      {/* 🔁 MenuList peut s’adapter si besoin selon le rôle */}
      <MenuList userSubRole={userSubRole} userRole={userRole} />
    </div>
  );
}

export default App;
