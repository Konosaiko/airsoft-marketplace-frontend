import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/api';
import { logout as logoutService } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext';

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
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-[#2f5a0c]">AirsoftMarket</Link>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Rechercher</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input id="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#2f5a0c] focus:border-[#2f5a0c] sm:text-sm" placeholder="Rechercher sur AirsoftMarket" type="search" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/create-listing" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2f5a0c] hover:bg-[#3a6f0f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2f5a0c]">
              Déposer une annonce
            </Link>
            <Link to="/searches" className="ml-6 text-sm font-medium text-gray-700 hover:text-[#2f5a0c]">
              <i className="fas fa-bell mr-1"></i>
              Recherches
            </Link>
            <Link to="/favorites" className="ml-6 text-sm font-medium text-gray-700 hover:text-[#2f5a0c]">
              <i className="fas fa-heart mr-1"></i>
              Favoris
            </Link>
            <Link to="/messages" className="ml-6 text-sm font-medium text-gray-700 hover:text-[#2f5a0c]">
              <i className="fas fa-envelope mr-1"></i>
              Messages
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="ml-6 text-sm font-medium text-gray-700 hover:text-[#2f5a0c]">
                  <i className="fas fa-user mr-1"></i>
                  {user.username}
                </Link>
                <button onClick={handleLogout} className="ml-6 text-sm font-medium text-gray-700 hover:text-[#2f5a0c]">
                  <i className="fas fa-sign-out-alt mr-1"></i>
                  Se déconnecter
                </button>
              </>
            ) : (
              <Link to="/login" className="ml-6 text-sm font-medium text-gray-700 hover:text-[#2f5a0c]">
                <i className="fas fa-user mr-1"></i>
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;