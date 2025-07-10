import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar';


const Home = () => {
  const navigate = useNavigate(); 
  const location = useLocation();

   // Récupération du sous-rôle via navigation ou localStorage
  const subRole =
    location.state?.subRole || localStorage.getItem('subRole');

  // Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!subRole) {
      navigate('/');
    }
  }, [subRole, navigate]);

  return (
    <div className="Home">
      <Navbar />
      <div className="Home-container">
        <div className="Home-content">
          <div className="logo">
            <FontAwesomeIcon icon={faFaceSmile} className="smiley-heartbeat" />
          </div>
          <h1 className="Home-title">Bonjour</h1>
          <p className="Home-message">
            Bienvenue sur la page d'accueil de C<span className="text-green">3</span>P<span className="text-warning">O</span><br />
            
          </p>
          {/* Bouton de retour */}
          <button className="btn btn-warning mt-4" onClick={() => navigate('/')}>
            Retour à l'accueil
          </button>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Home;


