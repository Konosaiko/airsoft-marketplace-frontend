import React, { useState, useEffect } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { getCategories } from '../../services/api';
import '../../styles/CategoryBar.css';

const CategoryBar = () => {
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
    <nav className="category-bar">
      {categories.map(category => (
        <CategoryDropdown key={category.id} category={category} />
      ))}
    </nav>
  );
};

export default CategoryBar;