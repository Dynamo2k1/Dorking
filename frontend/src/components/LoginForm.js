import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";

const LoginForm = ({ onLogin, isLoading, error: propError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // Client-side validation
    if (!username.trim()) {
      setLocalError("Username is required");
      return;
    }

    if (!password) {
      setLocalError("Password is required");
      return;
    }

    try {
      await onLogin({ 
        username: username.trim(), 
        password 
      });
    } catch (err) {
      // Handle both server errors and local validation errors
      setLocalError(err.message || "Login failed. Please try again.");
    }
  };

  // Combine prop error (from parent) and local error
  const errorToShow = propError || localError;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!localError && !username.trim()}
        helperText={!username.trim() && localError ? " " : ""} // Maintain spacing
      />
      
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!localError && !password}
        helperText={!password && localError ? " " : ""}
      />
      
      {errorToShow && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {errorToShow}
        </Alert>
      )}
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Login"
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;