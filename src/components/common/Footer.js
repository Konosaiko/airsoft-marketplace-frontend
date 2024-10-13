import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-4">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">À PROPOS</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-sm hover:text-white">Qui sommes-nous</Link></li>
                  <li><Link to="/contact" className="text-sm hover:text-white">Nous contacter</Link></li>
                  <li><Link to="/faq" className="text-sm hover:text-white">FAQ</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">LIENS RAPIDES</h3>
                <ul className="space-y-2">
                  <li><Link to="/search" className="text-sm hover:text-white">Recherche</Link></li>
                  <li><Link to="/create-listing" className="text-sm hover:text-white">Créer une annonce</Link></li>
                  <li><Link to="/login" className="text-sm hover:text-white">Connexion</Link></li>
                  <li><Link to="/register" className="text-sm hover:text-white">Inscription</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">LÉGAL</h3>
                <ul className="space-y-2">
                  <li><Link to="/terms" className="text-sm hover:text-white">Conditions d'utilisation</Link></li>
                  <li><Link to="/privacy" className="text-sm hover:text-white">Politique de confidentialité</Link></li>
                  <li><Link to="/cookies" className="text-sm hover:text-white">Politique de cookies</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">CONTACT</h3>
                <ul className="space-y-2">
                  <li className="text-sm">Email: contact@airsoftmarketplace.fr</li>
                  <li className="text-sm">Téléphone: (+33) 00 00 00 00</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              INSCRIVEZ-VOUS À NOTRE NEWSLETTER
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Les dernières nouvelles, articles et ressources, envoyés dans votre boîte mail chaque semaine.
            </p>
            <form className="sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Adresse email</label>
              <input type="email" name="email-address" id="email-address" autoComplete="email" required
                className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Entrez votre email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button type="submit" className="w-full bg-[#2f5a0c] border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-[#3a6f0f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-[#2f5a0c]">
                  S'abonner
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 xl:text-center">
            &copy; 2024 Airsoft Marketplace. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;