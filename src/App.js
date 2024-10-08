// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import CreateListingPage from './pages/CreateListingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import './styles/App.css';
import CategoryBar from './components/common/CategoryBar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <CategoryBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listing/:id" element={<ListingPage />} />
            <Route path="/create-listing" element={<CreateListingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;