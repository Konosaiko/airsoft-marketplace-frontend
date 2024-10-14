import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Assurez-vous que cette URL correspond à l'URL de base de votre API backend
const API_BASE_URL = 'http://localhost:8000'; // Ajustez si nécessaire

function HomePage() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/listing/recent`);
        console.log("Données des annonces:", response.data);
        setListings(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Bienvenue sur la Marketplace Airsoft</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Annonces récentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="h-48 bg-gray-300">
                  {listing.listingPhotos && listing.listingPhotos.length > 0 ? (
                    <img 
                    src={`${API_BASE_URL}/uploads/listings_photos/${listing.listingPhotos[0].filename}`}
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = '';
                    }}
                  />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Pas d'image disponible
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{listing.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold">{listing.price} €</span>
                    <Link to={`/listing/${listing.id}`} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                      Voir l'annonce
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Commencez dès maintenant</h2>
          <div className="space-x-4">
            <Link to="/create-listing" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
              Créer une annonce
            </Link>
            <Link to="/search" className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
              Rechercher des annonces
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
