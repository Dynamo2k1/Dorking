import React, { useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import SearchForm from "./components/SearchForm";
import QueryPreview from "./components/QueryPreview";
import axios from "axios";

const App = () => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (searchParams) => {
        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/generate-query", {
                queryParts: searchParams.queryParts
            });
            setQuery(response.data.query);
        } catch (error) {
            console.error("Error generating query:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h3" align="center" color="primary" gutterBottom>
                Google Dorks Tool
            </Typography>
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
