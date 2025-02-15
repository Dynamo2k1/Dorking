import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, Box, FormControl, InputLabel, Grid } from "@mui/material";

const fileTypes = [
  "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv", "xml", "json",
  "html", "php", "asp", "aspx", "jsp", "sql", "log", "rtf", "odt", "ods", "odp"
];

const operators = {
  intitle: "Search in page title",
  inurl: "Search in URL",
  intext: "Search in page content",
  site: "Limit to a specific site",
  ext: "File extension",
  filetype: "File type",
  AND: "Logical AND",
  OR: "Logical OR",
  NOT: "Logical NOT (exclude term)"
};

const SearchForm = ({ onSearch, isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [operatorValue, setOperatorValue] = useState("");
  const [fileType, setFileType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryPart = selectedOperator ? `${selectedOperator}:${operatorValue}` : "";
    const finalQuery = `${searchText} ${queryPart}`.trim();
    onSearch({ query: finalQuery, fileType });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <TextField
        label="Search Intent"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        size="medium"
        InputProps={{ style: { fontSize: '1.2rem' } }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Operator</InputLabel>
            <Select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
              label="Select Operator"
            >
              {Object.entries(operators).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Operator Value"
            value={operatorValue}
            onChange={(e) => setOperatorValue(e.target.value)}
            fullWidth
            margin="normal"
            disabled={!selectedOperator}
          />
        </Grid>
      </Grid>

      <FormControl fullWidth margin="normal">
        <InputLabel>File Type</InputLabel>
        <Select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          label="File Type"
        >
          <MenuItem value="">None</MenuItem>
          {fileTypes.map((type) => (
            <MenuItem key={type} value={type}>{type.toUpperCase()}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2, py: 1.5 }}
        disabled={isLoading}
      >
        {isLoading ? "Generating Query..." : "Generate Query"}
      </Button>
    </Box>
  );
};

export default SearchForm;