import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoC3PO from '../assets/images/C3PO_logo.png';

const ROLES = ['Utilisateur', 'Restaurateur', 'Comptable'];

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('userRole') || '');
  const [isOpen, setIsOpen] = useState(false);

   // 🔁 Ce useEffect s'exécute à chaque montage pour synchroniser le rôle avec le localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vous déconnecter ?')) {
      localStorage.removeItem('userRole');
      setRole('');
      navigate('/');
    }
  };

  const filteredRoles = ROLES.filter((r) => r !== role);

  return (
    <nav className="navbar-container">
      {/* Menu burger mobile */}
      <button className="burger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>


      {/* Logo centré */}
      <div className="navbar-logo">
        <a href="/">
          <img src={logoC3PO} alt="Logo C3PO" />
        </a>
      </div>
      {/* Liens à gauche */}
      <div className={`navbar-side ${isOpen ? 'active' : ''}`}>
        <a href="/liste-de-menus">Liste des menus</a>
        {role === 'Restaurateur' && <a href="/#">Gestion des menus</a>}
        {role === 'Comptable' && <a href="/#" >Statistiques</a>}
      </div>

      {/* Rôle + Déconnexion */}
      <div className={`navbar-side ${isOpen ? 'active' : ''}`}>
        <select
          className="form-select me-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">-- Changer de rôle --</option>
          {filteredRoles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button className="logout-link" onClick={handleLogout}>
          Déconnexion
        </button>


      </div>
    </nav>
  );
};

export default Navbar;
