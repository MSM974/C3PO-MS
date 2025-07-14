import React from "react";
import MenuList from "./components/MenuList";
import Navbar from "./components/Navbar";
import './assets/css/main.css';
import Footer from "./components/MyFooter";

// Loading role and connexion status
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const userRole = localStorage.getItem("userRole") || "Utilisateur";


function App() {
  return (
    <div className="app-container">
      {isLoggedIn && <Navbar />}
      <MenuList userRole={userRole} />
      <Footer/>
    </div>
  );
}

export default App;
