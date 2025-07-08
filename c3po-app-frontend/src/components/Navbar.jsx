import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'index.css';
import logoC3PO from '../assets/C3PO_logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Voulez-vous vraiment vous déconnecter ? ")
    if (confirmLogout) {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    navigate('/');
    }
  };

  return (
    <nav className="navbar-container">
      {/* Liens à gauche */}
      <div className="navbar-side">
        <a href="/reservations">Réservations</a>
      </div>

      {/* Logo centré */}
      <div className="navbar-logo">
        <a href="/">
          <img src={logoC3PO} alt="Logo C3PO" />
        </a>
      </div>

      {/* Déconnexion à droite */}
      <div className="navbar-side">
        <button className="btn btn-yellow logout-link" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
