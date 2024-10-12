const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const getUserInfo = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null; 
  }

  try {
    const response = await fetch(`${API_URL}/user/info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      // Token invalide ou expiré
      localStorage.removeItem('token');
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null; // Retourne null en cas d'erreur au lieu de lancer une exception
  }
};


export const logout = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return; // Déjà déconnecté
  }

  try {
    console.log('Sending logout request to:', `${API_URL}/logout`);
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Logout error response:', errorMessage);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // La déconnexion côté serveur a réussi
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};