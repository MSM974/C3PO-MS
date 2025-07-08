
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ConstructionPage from './pages/ConstructionPage';
import MenuListPage from './pages/MenuListPage';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Page d'authentification */}
        <Route path="/liste-de-menus" element={<MenuListPage/>} />  {/* Page Liste des menus */}
        <Route path="/restaurateur" element={<ConstructionPage />} />  {/* Page Restaurateur */}
        <Route path="/comptable" element={<ConstructionPage />} />  {/* Page Comptable */}
      </Routes>
    </Router>
  );
}

export default App;
