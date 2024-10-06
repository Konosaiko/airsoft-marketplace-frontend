import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/CategoryDropdown.css';

const CategoryDropdown = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderSubcategories = (subcategories) => (
    <div className="subcategory-menu">
      {subcategories.map(subcategory => (
        <div key={subcategory.id} className="subcategory-item">
          <Link to={`/category/${subcategory.slug}`}>
            {subcategory.name}
          </Link>
          {subcategory.children && subcategory.children.length > 0 && renderSubcategories(subcategory.children)}
        </div>
      ))}
    </div>
  );

  return (
    <div 
      className="category-dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link to={`/category/${category.slug}`} className="category-main">
        {category.name}
      </Link>
      {isOpen && category.children && category.children.length > 0 && renderSubcategories(category.children)}
    </div>
  );
};

export default CategoryDropdown;