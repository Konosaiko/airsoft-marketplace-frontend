// src/components/common/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>Airsoft Marketplace est la plateforme de référence pour acheter et vendre du matériel d'airsoft.</p>
        </div>
        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li><Link to="/search">Recherche</Link></li>
            <li><Link to="/create-listing">Créer une annonce</Link></li>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@airsoftmarketplace.com</p>
          <p>Téléphone: (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Airsoft Marketplace. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;