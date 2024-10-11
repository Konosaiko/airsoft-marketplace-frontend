const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const getUserInfo = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await fetch(`${API_URL}/user/info`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 0) {
        console.error('CORS error or network failure');
        throw new Error('Network error: Possible CORS issue');
      }
      throw new Error('Failed to fetch user info');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};