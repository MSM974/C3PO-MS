import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoC3PO from '../assets/images/C3PO_logo.png';

const ROLES = ['Utilisateur', 'Restaurateur', 'Comptable'];

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('userRole') || '');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleConnexion = () => {
    if (!role) {
      setError('Veuillez sélectionner un rôle.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    localStorage.setItem('userRole', role);
    navigate('/liste-de-menus');
  };

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

      {/* Liens à gauche */}
      <div className={`navbar-side ${isOpen ? 'active' : ''}`}>
        <a href="/liste-de-menus">Liste des menus</a>
        {role === 'Restaurateur' && <a href="/#">Gestion des menus</a>}
        {role === 'Comptable' && <a href="/#">Statistiques</a>}
      </div>

      {/* Logo centré */}
      <div className="navbar-logo">
        <a href="/">
          <img src={logoC3PO} alt="Logo C3PO" />
        </a>
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

        {error && <div className="text-danger mt-1">{error}</div>}
      </div>
    </nav>
  );
};

export default Navbar;
