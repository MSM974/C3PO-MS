import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleConnexion = () => {
  if (!role) {
    setError('Veuillez sélectionner un rôle pour continuer.');
    setTimeout(() => setError(''), 5000);
    return;
  }

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userRole', role); // Sauvegarde le rôle sélectionné

  if (role === 'Utilisateur' || role === 'Restaurateur' || role === 'Comptable') {
    navigate('/accueil');
  }
};

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="custom-box text-light p-4 shadow" style={{ maxWidth: 600 }}>
        <h1 className="text-center fw-bold">
          BIENVENUE SUR C<span className="text-green">3</span>P<span className="text-warning">O</span>
        </h1>

        <p className="text-center text-warning fw-semibold">Je souhaite me connecter en tant que :</p>
        <div className="text-center">
          <select
            className="form-select w-50 mx-auto"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="">-- Choisissez un rôle --</option>
            <option>Utilisateur</option>
            <option>Restaurateur</option>
            <option>Comptable</option>
          </select>

          <button className="fw-bold btn btn-warning mt-3" onClick={handleConnexion}>
            Se connecter
          </button>
        </div>
      </div>

      {error && <p className="msg-error mt-3">{error}</p>}
    </div>
  );
};

export default Login;
