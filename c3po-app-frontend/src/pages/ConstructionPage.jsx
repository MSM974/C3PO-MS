import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import '../css/style.css'; 

const Construction = () => {
  const navigate = useNavigate(); // ✅ Initialise la navigation

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="construction-container">
      <div className="construction-content">
        <div className="logo">
          <FontAwesomeIcon icon={faGear} className="rotating-icon" />
        </div>
        <h1 className="construction-title">Page en Construction</h1>
        <p className="construction-message">
          Nous travaillons sur notre site pour améliorer votre expérience.
        </p>

        {/* ✅ Bouton de retour */}
        <button className="btn btn-warning mt-4" onClick={handleBackHome}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Construction;
