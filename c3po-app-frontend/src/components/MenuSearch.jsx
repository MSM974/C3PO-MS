// MenuSearch.js
import React from 'react';
/**
 * Composant de recherche pour filtrer les plats du menu.
 *
 * @param {Object} props
 * @param {string} props.searchTerm - Search term actual.
 * @param {Function} props.onSearch - Function to call when search term changes
 */

const MenuSearch = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher un plat"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      className="form-control mb-4"
      aria-label="Champ de recherche de menu"
    />
  );
};

export default MenuSearch;
