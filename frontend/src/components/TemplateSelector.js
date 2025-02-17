import React from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";

const templates = [
    {
        name: "Find Login Pages",
        query: "intitle:login inurl:login",
        description: "Discover login portals across websites"
    },
    {
        name: "Exposed Database Backups",
        query: "filetype:sql \"DROP TABLE\"",
        description: "Find potentially exposed SQL database dumps"
    },
    {
        name: "WordPress Admin Panels",
        query: "inurl:wp-admin site:wordpress.com",
        description: "Locate WordPress admin interfaces"
    },
    {
        name: "Find Confidential PDFs",
        query: "filetype:pdf \"confidential\"",
        description: "Search for confidential PDF documents"
    },
    {
        name: "Locate Backup Files",
        query: "intitle:\"index of\" \"backup\"",
        description: "Find directories containing backup files"
    },
    {
        name: "Academic Research Papers",
        query: "site:edu filetype:pdf",
        description: "Find academic papers and research documents"
    },
    {
        name: "Exposed Config Files",
        query: "inurl:config filetype:sql",
        description: "Search for exposed configuration files"
    },
    {
        name: "Index of Sensitive Data",
        query: "\"index of\" \"/private\"",
        description: "Locate directories with potentially sensitive information"
    },
    // Additional templates can be added here
];

export default function TemplateSelector({ onSelect }) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Prebuilt Templates
            </Typography>
            <Autocomplete
                options={templates}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField {...params} label="Select a template" />
                )}
                renderOption={(props, option) => (
                    <li {...props}>
                        <div>
                            <strong>{option.name}</strong>
                            <Typography variant="body2" color="text.secondary">
                                {option.description}
                            </Typography>
                        </div>
                    </li>
                )}
                onChange={(event, value) => value && onSelect(value.query)}
            />
        </Box>
    );
}
