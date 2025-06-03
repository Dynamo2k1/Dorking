import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Alert } from '@mui/material';
import LoginForm from './components/LoginForm';
import SearchForm from './components/SearchForm';
import QueryPreview from './components/QueryPreview';
import { login, logout, validateSession, generateQuery } from './api';

const App = () => {
  const [query, setQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        await validateSession();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      setError('');
      await login(credentials);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setIsAuthenticated(false);
      setQuery('');
    } catch (err) {
      setError('Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (requestBody) => {
    try {
      setIsLoading(true);
      setError('');
      const result = await generateQuery(requestBody.queryParts);
      setQuery(result.query);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <button onClick={handleLogout} disabled={isLoading}>
              {isLoading ? 'Logging out...' : 'Logout'}
            </button>
          </Box>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <SearchForm onSearch={handleSearch} isLoading={isLoading}setIsAuthenticated={setIsAuthenticated}/>
          
          {isLoading ? (
            <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
          ) : (
            <QueryPreview query={query} />
          )}
        </>
      )}
    </Container>
  );
};

export default App;