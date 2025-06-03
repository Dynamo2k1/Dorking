const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';



const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Invalid response from server');
  }

  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    if (data.errors) error.errors = data.errors;
    error.response = response;
    throw error;
  }
  
  return data;
};

export const login = (credentials) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(handleResponse);
};

export const logout = () => {
  return fetch(`${apiUrl}/logout`, {
    method: 'POST',
    credentials: 'include'
  }).then(handleResponse);
};

export const validateSession = () => {
  return fetch(`${apiUrl}/validate-session`, {
    method: 'POST',
    credentials: 'include'
  }).then(handleResponse);
};

export const generateQuery = (queryParts) => {
  console.log('Sending queryParts:', queryParts);
  return fetch(`${apiUrl}/generate-query`, {
    method: 'POST',
    credentials: 'include',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ queryParts })
  })
  .then(async (response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response from server');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || 'Request failed');
      error.response = data;
      throw error;
    }
    
    return data;
  })
  .catch(error => {
    console.error('API Error:', error);
    throw error;
  });
};