import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/api';
import { getUserInfo, logout } from '../../services/userService';
import '../../styles/Navbar.css';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
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

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userInfo = await getUserInfo();
          setUser(userInfo);
        } catch (error) {
          console.error("Erreur lors du chargement des informations utilisateur:", error);
          if (error.message.includes('invalid token')) {
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      }
    };

    fetchCategories();
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setUser(null);
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
              <Link to="#" onClick={handleLogout} className="navbar-action-item">
                <i className="fas fa-sign-out-alt"></i>
                <span>Se déconnecter</span>
              </Link>
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