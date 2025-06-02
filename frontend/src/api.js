// frontend/src/api/api.js

const apiUrl = process.env.REACT_APP_API_URL;

export const generateQuery = async (queryParts) => {
  try {
    const response = await fetch(`${apiUrl}/generate-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ queryParts }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate query');
    }

    const data = await response.json();
    return data.query;
  } catch (error) {
    console.error('Error generating query:', error);
    throw error;
  }
};
