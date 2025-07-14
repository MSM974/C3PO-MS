import React from 'react';

const Footer = () => (
  <footer className="footer mt-auto py-3 bg-light text-center text-muted">
    <div className="container">
      <span>
        © {new Date().getFullYear()} C3PO by MS. Tous droits réservés.
      </span>
    </div>
  </footer>
);

export default Footer;
