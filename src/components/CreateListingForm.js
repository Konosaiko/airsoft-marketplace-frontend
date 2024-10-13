import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateListingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    state: '',
    categories: [],
    region: '',
    department: '',
    photoFiles: []
  });
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch categories, regions on component mount
    fetchCategories();
    fetchRegions();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get('/api/regions');
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const fetchDepartments = async (regionId) => {
    try {
      const response = await axios.get(`/api/regions/${regionId}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : 
               type === 'file' ? files :
               value
    }));

    if (name === 'region') {
      fetchDepartments(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'categories') {
          formData[key].forEach(categoryId => formDataToSend.append('categories[]', categoryId));
        } else if (key === 'photoFiles') {
          Array.from(formData.photoFiles).forEach(file => formDataToSend.append('photoFiles[]', file));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      await axios.post('/api/listings', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/'); // Redirect to home page or listing page
    } catch (error) {
      setError('Une erreur est survenue lors de la création de l\'annonce.');
      console.error('Error creating listing:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre de l'annonce</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix (€)</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>

      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">État</label>
        <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Catégories</label>
        {categories.map(category => (
          <div key={category.id} className="flex items-center">
            <input type="checkbox" id={`category-${category.id}`} name="categories" value={category.id} onChange={handleChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            <label htmlFor={`category-${category.id}`} className="ml-2">{category.name}</label>
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700">Région</label>
        <select id="region" name="region" value={formData.region} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="">Sélectionnez une région</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Département</label>
        <select id="department" name="department" value={formData.department} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" disabled={!formData.region}>
          <option value="">Sélectionnez un département</option>
          {departments.map(department => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="photoFiles" className="block text-sm font-medium text-gray-700">Photos</label>
        <input type="file" id="photoFiles" name="photoFiles" onChange={handleChange} multiple accept="image/jpeg,image/png" className="mt-1 block w-full" />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Créer l'annonce
      </button>
    </form>
  );
};

export default CreateListingForm;