// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Bienvenue sur la Marketplace Airsoft</h1>
      <section className="featured-listings">
        <h2>Annonces en vedette</h2>
        <div className="listing-grid">
          {/* Ces div seront remplacées par de vrais composants d'annonce plus tard */}
          <div className="listing-card">Annonce 1s</div>
          <div className="listing-card">Annonce 2</div>
          <div className="listing-card">Annonce 3</div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Commencez dès maintenant</h2>
        <Link to="/create-listing" className="cta-button">Créer une annonce</Link>
        <Link to="/search" className="cta-button">Rechercher des annonces</Link>
      </section>
    </div>
  );
}

export default HomePage;