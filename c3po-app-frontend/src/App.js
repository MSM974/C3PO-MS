
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ConstructionPage from './pages/ConstructionPage';
import MenuList from './components/MenuList';
import MenuCard from './components/MenuCard';
import UtilisateurPage from './pages/UtilisateurPage';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Page d'authentification */}

        <Route path="/utilisateur" element={<UtilisateurPage/>} />  {/* Page Utilisateur */}
        <Route path="/restaurateur" element={<ConstructionPage />} />  {/* Page Restaurateur */}
        <Route path="/comptable" element={<ConstructionPage />} />  {/* Page Comptable */}
      </Routes>
    </Router>
  );
}

export default App;
