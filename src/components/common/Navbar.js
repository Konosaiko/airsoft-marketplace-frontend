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
          <Link to="/searches"><i className="fas fa-bell"></i></Link>
          <Link to="/favorites"><i className="fas fa-heart"></i></Link>
          <Link to="/messages"><i className="fas fa-envelope"></i></Link>
          <Link to="/profile"><i className="fas fa-user"></i></Link>
        </div>
      </div>
      <div className="navbar-categories">
        <Link to="/category/immobilier">Réplique courte</Link>
        <Link to="/category/vehicules">Réplique longue</Link>
        <Link to="/category/vacations">Accessoires répliques</Link>
        <Link to="/category/emploi">Gear</Link>
        <Link to="/category/mode">Consommables</Link>
        <Link to="/category/maison">Outdoor</Link>
      </div>
    </nav>
  );
}

export default Navbar;