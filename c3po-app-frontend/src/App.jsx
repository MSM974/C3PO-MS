import React from "react";
import MenuList from "./components/MenuList";
import MenuCard from "./components/MenuCard";
import './assets/css/main.css';
import Navbar from "./components/Navbar";



// ✅ Vérifie si connecté
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const userRole = "utilisateur"; 
const userSubRole = localStorage.getItem('subRole') || "apprenant"; // fallback si null

function App() {
  if (user.role !== "utilisateur") {
    return <h2 className="construction-message">Page en construction</h2>;
  }

  return (
    <div className="app-container">
      {/* ✅ Navbar visible seulement si connecté */}
      {isLoggedIn && <Navbar />}

      <h1 className="main-title">Menus de la semaine</h1>
      <MenuList userSubRole={userSubRole} />

    </div>
  );
}

export default App;
