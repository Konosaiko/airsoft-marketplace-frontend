// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/api';
import '../../styles/Navbar.css';

function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

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
          <Link to="/login" className="navbar-action-item">
            <i className="fas fa-user"></i>
            <span>Se connecter</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;