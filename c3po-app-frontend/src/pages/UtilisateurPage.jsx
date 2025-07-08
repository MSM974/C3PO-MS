// src/pages/UtilisateurPage.jsx

import React from 'react';
import MenuList from "../components/MenuList";
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/style.css'; 

const UtilisateurPage = () => {
  const location = useLocation();

  // Obtenez l'utilisateur ou autres données via le `location` ou l'état global
  const userSubRole = location.state?.subRole || "apprenant"; // Par défaut "apprenant"

  return (
    <div className="utilisateur-page">
      <Navbar />
      <MenuList userSubRole={userSubRole} /> {/* Affiche MenuList avec subRole */}
    </div>
  );
};

export default UtilisateurPage;
