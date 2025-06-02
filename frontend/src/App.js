import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress, Button } from "@mui/material";
import SearchForm from "./components/SearchForm";
import QueryPreview from "./components/QueryPreview";
import LoginForm from "./components/LoginForm";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Set token in axios headers
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken("");
    setQuery("");
  };

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/generate-query", {
        queryParts: searchParams.queryParts,
      });
      setQuery(response.data.query);
    } catch (error) {
      console.error("Error generating query:", error);
      alert("Failed to generate query. Please make sure you are logged in.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <LoginForm onLogin={handleLogin} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h3" color="primary">
          Google Dorks Tool
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 2, boxShadow: 3 }}>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <QueryPreview query={query} />
        )}
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 4, color: "text.secondary" }}>
        Use this tool responsibly. Do not misuse it for unethical purposes.
      </Typography>
    </Container>
  );
};

export default App;
