import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-20 sm:pt-24">
      <div className="w-full max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">
          Créer un compte
        </h2>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Vous avez déjà un compte ?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}