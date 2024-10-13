import React from 'react';
import CreateListingForm from '../components/CreateListingForm';

const CreateListingPage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Créer une nouvelle annonce</h1>
      <CreateListingForm />
    </div>
  );
};

export default CreateListingPage;