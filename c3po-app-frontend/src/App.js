
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import MenuListPage from './pages/MenuListPage';
import ConstructionPage from './pages/ConstructionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Page d'authentification */}
        <Route path="/accueil" element={<HomePage />} />  {/* Page accueil*/}
        <Route path="/liste-de-menus" element={<MenuListPage/>} />  {/* Page Liste des menus */}
        <Route path="/construction" element={<ConstructionPage/>} />  {/* Page en construction */}
      </Routes>
    </Router>
  );
}

export default App;
