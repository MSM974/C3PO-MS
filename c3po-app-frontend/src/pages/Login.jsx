import React, { useState } from 'react';
import '../css/style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [role, setRole] = useState('');
  const [subRole, setSubRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConnexion = () => {
    if (!role) {
      setError('Veuillez sélectionner un rôle pour continuer.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    if (role === 'Utilisateur' && !subRole) {
      setError("Quel type d'utilisateur êtes-vous?");
      setTimeout(() => setError(''), 5000);
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');

    if (role === 'Utilisateur') {
      localStorage.setItem('subRole', subRole);
      navigate('/utilisateur', { state: { subRole } });
    } else if (role === 'Restaurateur') {
      navigate('/restaurateur');
    } else if (role === 'Comptable') {
      navigate('/comptable');
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
              setSubRole(''); // reset subRole when changing role
            }}
          >
            <option value="">-- Choisissez un rôle --</option>
            <option>Utilisateur</option>
            <option>Restaurateur</option>
            <option>Comptable</option>
          </select>

          {role === 'Utilisateur' && (
            <div className="text-center mt-3">
              <label htmlFor="subRole" className="form-label fw-semibold text-warning">
                Sélectionnez votre sous-rôle :
              </label>
              <select
                id="subRole"
                className="form-select w-50 mx-auto"
                value={subRole}
                onChange={(e) => setSubRole(e.target.value)}
              >
                <option value="">-- Choisissez un sous-rôle --</option>
                <option value="Apprenant">Apprenant</option>
                <option value="Formateur">Formateur</option>
                <option value="Administratif">Administratif</option>
                <option value="Technique">Technique</option>
              </select>

            </div>
          )}

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
