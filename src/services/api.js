// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Ajustez l'URL selon votre configuration

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    throw error;
  }
};