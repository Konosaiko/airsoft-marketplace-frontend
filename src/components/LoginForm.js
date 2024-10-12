import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        
        // Récupérer les informations de l'utilisateur
        const userResponse = await fetch('http://localhost:8000/api/user/info', {
          headers: {
            'Authorization': `Bearer ${data.token}`,
          },
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          login(userData); // Mettre à jour le contexte avec les informations de l'utilisateur
          navigate('/'); // Rediriger vers la page d'accueil après la connexion
        } else {
          throw new Error('Impossible de récupérer les informations de l\'utilisateur');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nom d'utilisateur"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default LoginForm;