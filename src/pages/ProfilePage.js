import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../services/api.js';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        setLoading(false);
      } catch (error) {
        setError('Impossible de charger le profil utilisateur.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Utilisateur non trouvé.</div>;

  return (
    <div className="profile-page">
      <h1>Profil de {user.username}</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Date d'inscription: {new Date(user.createdAt).toLocaleDateString()}</p>
        {/* Ajoutez d'autres informations de profil ici */}
      </div>
      {/* Vous pouvez ajouter des sections pour les annonces de l'utilisateur, 
          ses favoris, ses messages, etc. */}
    </div>
  );
}

export default ProfilePage;