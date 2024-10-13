// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';

import ListingPage from './pages/ListingPage';
import CreateListingPage from './pages/CreateListingPage';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import './styles/App.css';
import CategoryBar from './components/common/CategoryBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
    <Router>
    <Layout>
      <div className="app">
        
        <CategoryBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listing/:id" element={<ListingPage />} />
            <Route path="/create-listing" element={<CreateListingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </main>
        
      </div>
      </Layout>
    </Router>
    </AuthProvider>
  );
}

export default App;