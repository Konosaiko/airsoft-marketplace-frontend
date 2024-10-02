// src/components/common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

function Header() {
  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/">Airsoft Marketplace</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/search">Recherche</Link></li>
          <li><Link to="/create-listing">Créer une annonce</Link></li>
          <li><Link to="/login">Connexion</Link></li>
          <li><Link to="/register">Inscription</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;