import React from "react";
import { Box, Typography, Button } from "@mui/material";

const QueryPreview = ({ query }) => {
  const handleSearch = () => {
    if (query) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  };

  return (
    <Box sx={{ mt: 4, p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Generated Query:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, fontFamily: "monospace" }}>
        {query || "Your query will appear here..."}
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={handleSearch}
        disabled={!query}
        fullWidth
      >
        Search on Google
      </Button>
    </Box>
  );
};

export default QueryPreview;