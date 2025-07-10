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
          <h1 className="Home-title">Bienvenue<br></br> sur la page d'accueil de <br></br><span className='logo-text'>C<span className="text-green">3</span>P<span className="text-warning">O</span></span></h1>
          <p className="Home-message">

          Votre espace de réservation de repas en entreprise.<br></br>
          Consultez les menus proposés cette semaine <br></br>et réservez 
          vos repas en quelques clics !
          </p>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Home;


