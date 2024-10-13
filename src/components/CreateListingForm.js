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
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchRegions();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Erreur lors du chargement des catégories');
    }
  };

  const fetchRegions = async () => {
    try {
      const response = await axios.get('/api/regions');
      setRegions(response.data);
    } catch (error) {
      console.error('Error fetching regions:', error);
      setError('Erreur lors du chargement des régions');
    }
  };

  const fetchDepartments = async (regionId) => {
    try {
      const response = await axios.get(`/api/regions/${regionId}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setError('Erreur lors du chargement des départements');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      handleFileChange(files);
    } else if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        categories: checked
          ? [...prevState.categories, value]
          : prevState.categories.filter(id => id !== value)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    if (name === 'region') {
      fetchDepartments(value);
      setFormData(prevState => ({ ...prevState, department: '' }));
    }
  };

  const handleFileChange = (files) => {
    const fileArray = Array.from(files);
    setFormData(prevState => ({
      ...prevState,
      photoFiles: [...prevState.photoFiles, ...fileArray]
    }));

    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const removePhoto = (index) => {
    setFormData(prevState => ({
      ...prevState,
      photoFiles: prevState.photoFiles.filter((_, i) => i !== index)
    }));
    setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
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
            <input 
              type="checkbox" 
              id={`category-${category.id}`} 
              name="categories" 
              value={category.id} 
              checked={formData.categories.includes(category.id.toString())}
              onChange={handleChange} 
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            />
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
        <input 
          type="file" 
          id="photoFiles" 
          name="photoFiles" 
          onChange={handleChange} 
          multiple 
          accept="image/*" 
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Créer l'annonce
      </button>
    </form>
  );
};

export default CreateListingForm;