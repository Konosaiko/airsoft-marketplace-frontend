import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/api';
import { logout as logoutService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Navbar.css';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logoutService();
      logout();
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

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
          {user ? (
            <>
              <Link to="/profile" className="navbar-action-item">
                <i className="fas fa-user"></i>
                <span>{user.username}</span>
              </Link>
              <a href="#" onClick={handleLogout} className="navbar-action-item">
                <i className="fas fa-sign-out-alt"></i>
                <span>Se déconnecter</span>
              </a>
            </>
          ) : (
            <Link to="/login" className="navbar-action-item">
              <i className="fas fa-user"></i>
              <span>Se connecter</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;