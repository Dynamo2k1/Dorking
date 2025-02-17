import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  IconButton,
  ListSubheader,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WarningIcon from "@mui/icons-material/Warning";

// All Google Dork Operators (Grouped)
const operators = [
  // Basic Search Modifiers
  {
    category: "Basic Search Modifiers",
    items: [
      { id: "intitle", label: "intitle:", example: "intitle:admin", deprecated: false },
      { id: "inurl", label: "inurl:", example: "inurl:login", deprecated: false },
      { id: "intext", label: "intext:", example: "intext:password", deprecated: false },
      { id: "site", label: "site:", example: "site:example.com", deprecated: false },
      { id: "filetype", label: "filetype:", example: "filetype:pdf", deprecated: false },
      { id: "ext", label: "ext:", example: "ext:php", deprecated: false },
    ],
  },
  // Advanced Search Modifiers
  {
    category: "Advanced Search Modifiers",
    items: [
      { id: "cache", label: "cache:", example: "cache:example.com", deprecated: false },
      { id: "link", label: "link:", example: "link:example.com", deprecated: false },
      { id: "related", label: "related:", example: "related:example.com", deprecated: false },
      { id: "info", label: "info:", example: "info:example.com", deprecated: false },
      { id: "define", label: "define:", example: "define:SEO", deprecated: false },
      { id: "phonebook", label: "phonebook:", example: "phonebook:John", deprecated: true },
      { id: "stocks", label: "stocks:", example: "stocks:GOOG", deprecated: true },
    ],
  },
  // Logical Operators
  {
    category: "Logical Operators",
    items: [
      { id: "AND", label: "AND", example: "apple AND orange", deprecated: false },
      { id: "OR", label: "OR", example: "apple OR orange", deprecated: false },
      { id: "NOT", label: "NOT", example: "apple NOT orange", deprecated: false },
      { id: "|", label: "| (OR)", example: "apple | orange", deprecated: false },
      { id: "-", label: "- (Exclude)", example: "apple -orange", deprecated: false },
    ],
  },
  // Date Filters
  {
    category: "Date Filters",
    items: [
      { id: "daterange", label: "daterange:", example: "daterange:20230101-20231231", deprecated: false },
      { id: "after", label: "after:", example: "after:2023-01-01", deprecated: false },
      { id: "before", label: "before:", example: "before:2023-12-31", deprecated: false },
    ],
  },
  // File Types (Extended List)
  {
    category: "File Types",
    items: [
      { id: "filetype_pdf", label: "filetype:pdf", example: "filetype:pdf", deprecated: false },
      { id: "filetype_doc", label: "filetype:doc", example: "filetype:doc", deprecated: false },
      { id: "filetype_xls", label: "filetype:xls", example: "filetype:xls", deprecated: false },
      { id: "filetype_sql", label: "filetype:sql", example: "filetype:sql", deprecated: false },
      { id: "filetype_log", label: "filetype:log", example: "filetype:log", deprecated: false },
      // Add 50+ more file types here...
    ],
  },
  // Deprecated Operators
  {
    category: "Deprecated Operators",
    items: [
      { id: "allintext", label: "allintext:", example: "allintext:password", deprecated: true },
      { id: "allintitle", label: "allintitle:", example: "allintitle:admin", deprecated: true },
      { id: "allinurl", label: "allinurl:", example: "allinurl:login", deprecated: true },
      { id: "inanchor", label: "inanchor:", example: "inanchor:click", deprecated: true },
    ],
  },
];

const SearchForm = ({ onSearch, isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [operatorValue, setOperatorValue] = useState("");
  const [operatorList, setOperatorList] = useState([]);

  const handleAddOperator = () => {
    if (selectedOperator && operatorValue) {
      const operator = operators
          .flatMap((group) => group.items)
          .find((op) => op.id === selectedOperator);
      setOperatorList([...operatorList, { ...operator, value: operatorValue }]);
      setSelectedOperator("");
      setOperatorValue("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const operatorQuery = operatorList.map((op) => `${op.label}${op.value}`).join(" ");
    const finalQuery = `${searchText} ${operatorQuery}`.trim();
    onSearch({ query: finalQuery });
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
            InputProps={{ style: { fontSize: "1.2rem" } }}
        />

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={5}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Operator</InputLabel>
              <Select
                  value={selectedOperator}
                  onChange={(e) => setSelectedOperator(e.target.value)}
                  label="Select Operator"
              >
                {operators.map((group) => [
                  <ListSubheader key={group.category} sx={{ bgcolor: "background.paper" }}>
                    {group.category}
                  </ListSubheader>,
                  ...group.items.map((op) => (
                      <MenuItem key={op.id} value={op.id}>
                        {op.deprecated && <WarningIcon color="error" sx={{ mr: 1 }} />}
                        {op.label} - <em>{op.example}</em>
                      </MenuItem>
                  )),
                ])}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5}>
            <TextField
                label="Operator Value"
                value={operatorValue}
                onChange={(e) => setOperatorValue(e.target.value)}
                fullWidth
                margin="normal"
                disabled={!selectedOperator}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={handleAddOperator} color="primary" disabled={!selectedOperator || !operatorValue}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        {operatorList.length > 0 && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Added Operators:
              </Typography>
              {operatorList.map((op, index) => (
                  <Typography key={index} variant="body1" color={op.deprecated ? "error" : "inherit"}>
                    {op.deprecated && <WarningIcon color="error" sx={{ mr: 1 }} />}
                    <strong>{op.label}</strong> {op.value}
                  </Typography>
              ))}
            </Box>
        )}

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