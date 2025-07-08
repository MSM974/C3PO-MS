import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuList from '../components/MenuList';
import Navbar from '../components/Navbar';

const MenuListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <div className="menu-page">
      <Navbar />
      {subRole && (
        <MenuList user={{ subRole }} />
      )}
    </div>
  );
};

export default MenuListPage;
