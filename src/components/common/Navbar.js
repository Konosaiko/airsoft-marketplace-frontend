// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">AirsoftMarket</Link>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Rechercher sur AirsoftMarket" />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="navbar-actions">
          <Link to="/post-ad" className="post-ad-button">Déposer une annonce</Link>
          <Link to="/searches" className="navbar-action-item">
            <i className="fas fa-bell"></i>
            <span>Recherches</span>
          </Link>
          <Link to="/favorites" className="navbar-action-item">
            <i className="fas fa-heart"></i>
            <span>Favoris</span>
          </Link>
          <Link to="/messages" className="navbar-action-item">
            <i className="fas fa-envelope"></i>
            <span>Messages</span>
          </Link>
          <Link to="/profile" className="navbar-action-item">
            <i className="fas fa-user"></i>
            <span>Se connecter</span>
          </Link>
        </div>
      </div>
      <div className="navbar-categories">
        <Link to="/category/replique-courte">Réplique courte</Link>
        <Link to="/category/replique-longue">Réplique longue</Link>
        <Link to="/category/accessoires-repliques">Accessoires répliques</Link>
        <Link to="/category/gear">Gear</Link>
        <Link to="/category/consommables">Consommables</Link>
        <Link to="/category/outdoor">Outdoor</Link>
      </div>
    </nav>
  );
}

export default Navbar;