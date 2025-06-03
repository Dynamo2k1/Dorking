import React, { useState } from "react";
import {
  TextField, Select, MenuItem, Button, Box,
  FormControl, InputLabel, Grid, Typography,
  IconButton, ListSubheader
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WarningIcon from "@mui/icons-material/Warning";


// ALL POSSIBLE DORKING OPERATORS (COMPLETE LIST)
const operators = [
  {
    category: "Basic Search Operators",
    items: [
      { id: "text", label: "\"text\"", example: "\"confidential report\"", isDeprecated: false },
      { id: "site", label: "site:", example: "site:example.com", isDeprecated: false },
      { id: "intitle", label: "intitle:", example: "intitle:admin", isDeprecated: false },
      { id: "inurl", label: "inurl:", example: "inurl:login", isDeprecated: false },
      { id: "filetype", label: "filetype:", example: "filetype:pdf", isDeprecated: false },
      { id: "cache", label: "cache:", example: "cache:example.com", isDeprecated: false },
      { id: "link", label: "link:", example: "link:example.com", isDeprecated: false },
      { id: "related", label: "related:", example: "related:example.com", isDeprecated: false },
      { id: "allinurl", label: "allinurl:", example: "allinurl:example.com", isDeprecated: false },
      { id: "allintitle", label: "allintitle:", example: "allintitle:example", isDeprecated: false },
      { id: "allintext", label: "allintext:", example: "allintext:report", isDeprecated: false },
      { id: "allinanchor", label: "allinanchor:", example: "allinanchor:\"click here\"", isDeprecated: false },
      { id: "inanchor", label: "inanchor:", example: "inanchor:\"read more\"", isDeprecated: false },
    ]
  },
  {
    category: "Security/Advanced Search",
    items: [
      { id: "intext", label: "intext:", example: "intext:\"password\"", isDeprecated: false },
      { id: "index_of", label: "\"index of\"", example: "\"index of /backup\"", isDeprecated: false },
      { id: "php_id", label: "inurl:\"php?id=\"", example: "inurl:\"php?id=1\"", isDeprecated: false },
      { id: "admin_title", label: "intitle:\"admin\"", example: "intitle:\"admin panel\"", isDeprecated: false },
      { id: "wp_admin", label: "inurl:wp-admin", example: "inurl:wp-admin/login.php", isDeprecated: false },
      { id: "phpmyadmin", label: "inurl:phpmyadmin", example: "inurl:phpmyadmin/index.php", isDeprecated: false },
      { id: "filetype_log", label: "filetype:log", example: "filetype:log \"error\"", isDeprecated: false },
      { id: "filetype_sql", label: "filetype:sql", example: "filetype:sql \"DROP TABLE\"", isDeprecated: false },
      { id: "filetype_xls", label: "filetype:xls \"password\"", example: "filetype:xls \"credentials\"", isDeprecated: false },
      { id: "intext_password", label: "intext:\"password\"", example: "intext:\"password\"", isDeprecated: false },
      { id: "inurl_config", label: "inurl:config", example: "inurl:config.php", isDeprecated: false },
      { id: "inurl_admin_login", label: "inurl:\"admin login\"", example: "inurl:\"admin login\"", isDeprecated: false },
      { id: "inurl_admin", label: "inurl:admin", example: "inurl:admin", isDeprecated: false },
      { id: "intitle_backup", label: "intitle:\"index of\" \"backup\"", example: "intitle:\"index of\" \"backup\"", isDeprecated: false },
      { id: "warning_mysql", label: "\"Warning: mysql_fetch_array()\"", example: "\"Warning: mysql_fetch_array()\"", isDeprecated: true },
      { id: "filetype_pdf_conf", label: "filetype:pdf \"confidential\"", example: "filetype:pdf \"confidential\"", isDeprecated: false },
      { id: "inurl_signin", label: "inurl:signin", example: "inurl:signin", isDeprecated: false },
      { id: "inurl_login", label: "inurl:login", example: "inurl:login", isDeprecated: false },
      { id: "intitle_login", label: "intitle:login", example: "intitle:login", isDeprecated: false },
      { id: "not_found", label: "\"404 Not Found\"", example: "\"404 Not Found\"", isDeprecated: false },
    ]
  },
  {
    category: "Advanced Search for Specific Data Types",
    items: [
      { id: "inurl_gov", label: "inurl:gov", example: "inurl:gov", isDeprecated: false },
      { id: "filetype_pdf", label: "filetype:pdf", example: "filetype:pdf", isDeprecated: false },
      { id: "filetype_doc", label: "filetype:doc", example: "filetype:doc", isDeprecated: false },
      { id: "filetype_xls2", label: "filetype:xls", example: "filetype:xls", isDeprecated: false },
      { id: "filetype_csv", label: "filetype:csv", example: "filetype:csv", isDeprecated: false },
      { id: "filetype_txt", label: "filetype:txt", example: "filetype:txt", isDeprecated: false },
      { id: "filetype_ppt", label: "filetype:ppt", example: "filetype:ppt", isDeprecated: false },
      { id: "filetype_html", label: "filetype:html", example: "filetype:html", isDeprecated: false },
      { id: "inurl_admin_login_wp", label: "inurl:admin login site:wordpress.com", example: "inurl:admin login site:wordpress.com", isDeprecated: false },
      { id: "allintitle_admin_login", label: "allintitle:\"admin login\"", example: "allintitle:\"admin login\"", isDeprecated: false },
      { id: "intitle_phpmyadmin", label: "intitle:phpMyAdmin", example: "intitle:phpMyAdmin", isDeprecated: false },
      { id: "filetype_bak", label: "filetype:bak", example: "filetype:bak", isDeprecated: false },
      { id: "inurl_admin_slash", label: "inurl:/admin/", example: "inurl:/admin/", isDeprecated: false },
      { id: "inurl_backups", label: "inurl:/backups/", example: "inurl:/backups/", isDeprecated: false },
      { id: "inurl_files", label: "inurl:/files/", example: "inurl:/files/", isDeprecated: false },
    ]
  },
  {
    category: "Vulnerabilities & Information Exposure",
    items: [
      { id: "password_file", label: "\"password file\"", example: "\"password file\"", isDeprecated: false },
      { id: "admin_password", label: "\"admin\" \"password\"", example: "\"admin\" \"password\"", isDeprecated: false },
      { id: "inurl_admin_php", label: "inurl:admin.php", example: "inurl:admin.php", isDeprecated: false },
      { id: "inurl_wp_content", label: "inurl:wp-content", example: "inurl:wp-content", isDeprecated: false },
      { id: "backup_sql", label: "\"backup\" \"sql\"", example: "\"backup\" \"sql\"", isDeprecated: false },
      { id: "inurl_cgi_bin", label: "inurl:/cgi-bin/", example: "inurl:/cgi-bin/", isDeprecated: false },
      { id: "inurl_admin_login2", label: "inurl:admin login", example: "inurl:admin login", isDeprecated: false },
      { id: "index_of_password", label: "\"index of\" \"password\"", example: "\"index of\" \"password\"", isDeprecated: false },
      { id: "inurl_config_sql", label: "inurl:config filetype:sql", example: "inurl:config filetype:sql", isDeprecated: false },
      { id: "login_username_password", label: "\"login\" \"username\" \"password\"", example: "\"login\" \"username\" \"password\"", isDeprecated: false },
      { id: "index_of_config", label: "\"index of\" /config", example: "\"index of\" /config", isDeprecated: false },
      { id: "index_of_backup", label: "\"index of\" /backup", example: "\"index of\" /backup", isDeprecated: false },
      { id: "index_of_private", label: "\"index of\" /private", example: "\"index of\" /private", isDeprecated: false },
      { id: "index_of_admin", label: "\"index of\" /admin", example: "\"index of\" /admin", isDeprecated: false },
    ]
  },
  {
    category: "Information Disclosure",
    items: [
      { id: "file_contains_username", label: "\"file contains\" \"username\"", example: "\"file contains\" \"username\"", isDeprecated: false },
      { id: "file_contains_password", label: "\"file contains\" \"password\"", example: "\"file contains\" \"password\"", isDeprecated: false },
      { id: "index_of_private_dup", label: "\"index of\" /private", example: "\"index of\" /private", isDeprecated: false },
      { id: "intitle_index_log", label: "intitle:\"index of\" \"log\"", example: "intitle:\"index of\" \"log\"", isDeprecated: false },
      { id: "intitle_index_admin", label: "intitle:\"index of\" \"admin\"", example: "intitle:\"index of\" \"admin\"", isDeprecated: false },
      { id: "inurl_wp_login", label: "inurl:wp-login.php", example: "inurl:wp-login.php", isDeprecated: false },
      { id: "inurl_admin_config", label: "inurl:admin/config.php", example: "inurl:admin/config.php", isDeprecated: false },
      { id: "admin_config", label: "\"admin\" \"config\"", example: "\"admin\" \"config\"", isDeprecated: false },
      { id: "intitle_admin_login2", label: "intitle:\"admin\" \"login\"", example: "intitle:\"admin\" \"login\"", isDeprecated: false },
      { id: "index_of_config_database", label: "\"index of\" \"config\" \"database\"", example: "\"index of\" \"config\" \"database\"", isDeprecated: false },
      { id: "index_of_config_db", label: "\"index of\" \"config\" \"db\"", example: "\"index of\" \"config\" \"db\"", isDeprecated: false },
      { id: "index_of_config_root", label: "\"index of\" \"config\" \"root\"", example: "\"index of\" \"config\" \"root\"", isDeprecated: false },
    ]
  },
  {
    category: "Other Useful Operators",
    items: [
      { id: "allintext", label: "allintext:", example: "allintext:report", isDeprecated: false },
      { id: "allinurl", label: "allinurl:", example: "allinurl:example.com", isDeprecated: false },
      { id: "allintitle", label: "allintitle:", example: "allintitle:report", isDeprecated: false },
      { id: "intext_root_password", label: "intext:\"root password\"", example: "intext:\"root password\"", isDeprecated: false },
      { id: "allintext_confidential", label: "allintext:\"confidential data\"", example: "allintext:\"confidential data\"", isDeprecated: false },
      { id: "sql_dump", label: "\"sql dump\"", example: "\"sql dump\"", isDeprecated: false },
      { id: "intitle_backup_dup", label: "intitle:\"index of\" \"backup\"", example: "intitle:\"index of\" \"backup\"", isDeprecated: false },
      { id: "intitle_files", label: "intitle:\"index of\" \"files\"", example: "intitle:\"index of\" \"files\"", isDeprecated: false },
      { id: "inurl_wp_admin_dup", label: "inurl:wp-admin/", example: "inurl:wp-admin/", isDeprecated: false },
      { id: "inurl_cgi_bin_dup", label: "inurl:/cgi-bin/", example: "inurl:/cgi-bin/", isDeprecated: false },
      { id: "index_of_config_pass", label: "\"index of\" \"config\" \"pass\"", example: "\"index of\" \"config\" \"pass\"", isDeprecated: false },
      { id: "intitle_ftp", label: "intitle:\"index of\" \"ftp\"", example: "intitle:\"index of\" \"ftp\"", isDeprecated: false },
      { id: "index_of_ftp_backup", label: "\"index of\" \"ftp\" \"backup\"", example: "\"index of\" \"ftp\" \"backup\"", isDeprecated: false },
      { id: "index_of_ftp_user", label: "\"index of\" \"ftp\" \"user\"", example: "\"index of\" \"ftp\" \"user\"", isDeprecated: false },
      { id: "index_of_ftp_password", label: "\"index of\" \"ftp\" \"password\"", example: "\"index of\" \"ftp\" \"password\"", isDeprecated: false },
    ]
  },
  {
    category: "Web Application & CMS Specific",
    items: [
      { id: "inurl_wp_login_dup", label: "inurl:wp-login.php", example: "inurl:wp-login.php", isDeprecated: false },
      { id: "inurl_wp_content_themes", label: "inurl:wp-content/themes/", example: "inurl:wp-content/themes/", isDeprecated: false },
      { id: "intitle_admin_panel_login", label: "intitle:\"admin panel\" \"login\"", example: "intitle:\"admin panel\" \"login\"", isDeprecated: false },
      { id: "inurl_admin_panel", label: "inurl:admin panel", example: "inurl:admin panel", isDeprecated: false },
      { id: "inurl_joomla", label: "inurl:joomla", example: "inurl:joomla", isDeprecated: false },
      { id: "inurl_site_github", label: "inurl:site:github", example: "inurl:site:github", isDeprecated: false },
      { id: "inurl_phpmyadmin_dup", label: "inurl:phpmyadmin", example: "inurl:phpmyadmin", isDeprecated: false },
      { id: "inurl_wp_admin_setup", label: "inurl:wp-admin/setup-config.php", example: "inurl:wp-admin/setup-config.php", isDeprecated: false },
      { id: "intitle_phpmyadmin_dup", label: "intitle:\"phpMyAdmin\"", example: "intitle:\"phpMyAdmin\"", isDeprecated: false },
      { id: "inurl_admin_php2", label: "inurl:admin.php", example: "inurl:admin.php", isDeprecated: false },
      { id: "inurl_blog_wp_admin", label: "inurl:blog/wp-admin", example: "inurl:blog/wp-admin", isDeprecated: false },
      { id: "inurl_admin_tools", label: "inurl:/admin/tools/", example: "inurl:/admin/tools/", isDeprecated: false },
      { id: "inurl_wp_includes", label: "inurl:/wp-includes/", example: "inurl:/wp-includes/", isDeprecated: false },
      { id: "inurl_admin_config2", label: "inurl:/admin/config.php", example: "inurl:/admin/config.php", isDeprecated: false },
      { id: "inurl_web_config", label: "inurl:/web.config", example: "inurl:/web.config", isDeprecated: false },
      { id: "inurl_admin_settings", label: "inurl:admin/settings.php", example: "inurl:admin/settings.php", isDeprecated: false },
    ]
  },
  {
    category: "Miscellaneous",
    items: [
      { id: "inurl_php_option_com", label: "inurl:php?option=com_", example: "inurl:php?option=com_", isDeprecated: false },
      { id: "inurl_admin_config3", label: "inurl:admin/config.php", example: "inurl:admin/config.php", isDeprecated: false },
      { id: "intitle_login_forgot", label: "intitle:\"Login\" \"Forgot Password\"", example: "intitle:\"Login\" \"Forgot Password\"", isDeprecated: false },
      { id: "email_password", label: "\"email\" \"password\"", example: "\"email\" \"password\"", isDeprecated: false },
      { id: "inurl_signup_email", label: "inurl:\"signup\" \"email\"", example: "inurl:\"signup\" \"email\"", isDeprecated: false },
      { id: "inurl_admin_panel2", label: "inurl:\"admin\" \"panel\"", example: "inurl:\"admin\" \"panel\"", isDeprecated: false },
      { id: "intitle_index_db", label: "intitle:\"index of\" \"db\"", example: "intitle:\"index of\" \"db\"", isDeprecated: false },
      { id: "intitle_backup_confidential", label: "intitle:\"index of\" \"backup\" \"confidential\"", example: "intitle:\"index of\" \"backup\" \"confidential\"", isDeprecated: false },
      { id: "inurl_admin_backup", label: "inurl:\"admin\" \"backup\"", example: "inurl:\"admin\" \"backup\"", isDeprecated: false },
      { id: "index_of_website_files", label: "\"index of\" \"website\" \"files\"", example: "\"index of\" \"website\" \"files\"", isDeprecated: false },
      { id: "inurl_backup_password", label: "inurl:\"backup\" \"password\"", example: "inurl:\"backup\" \"password\"", isDeprecated: false },
      { id: "intitle_index_database", label: "intitle:\"index of\" \"database\"", example: "intitle:\"index of\" \"database\"", isDeprecated: false },
      { id: "filetype_bak_db", label: "filetype:bak \"db\"", example: "filetype:bak \"db\"", isDeprecated: false },
      { id: "index_of_admin_files", label: "\"index of\" \"admin\" \"files\"", example: "\"index of\" \"admin\" \"files\"", isDeprecated: false },
    ]
  }
];  

const SearchForm = ({ onSearch, isLoading, setIsAuthenticated }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [operatorValue, setOperatorValue] = useState("");
  const [operatorList, setOperatorList] = useState([]);
  const [error, setError] = useState("");

  const handleAddOperator = () => {
    if (selectedOperator && operatorValue) {
      const operator = operators
        .flatMap(g => g.items)
        .find(op => op.id === selectedOperator);
      setOperatorList([...operatorList, { ...operator, value: operatorValue }]);
      setSelectedOperator("");
      setOperatorValue("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const queryParts = [
      searchText,
      ...operatorList.map(op => `${op.label}${op.value}`)
    ].filter(part => part && part.trim());
  
    try {
      const result = await generateQuery(queryParts); // Now using it directly
      onSearch(result.query);
    } catch (err) {
      setError(err.message || "Failed to generate query");
      if (err.message.includes('Unauthorized')) {
        setIsAuthenticated(false);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

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
              renderValue={(selected) => {
                const op = operators.flatMap(g => g.items).find(o => o.id === selected);
                return op ? op.label : selected;
              }}
            >
              {operators.map((group) => [
                <ListSubheader key={group.category} sx={{ 
                  bgcolor: "background.paper",
                  fontWeight: 'bold',
                  color: 'primary.main'
                }}>
                  {group.category}
                </ListSubheader>,
                ...group.items.map((op) => (
                  <MenuItem key={op.id} value={op.id} sx={{ py: 1 }}>
                    {op.isDeprecated && (
                      <WarningIcon 
                        color="error" 
                        sx={{ 
                          mr: 1, 
                          verticalAlign: 'middle',
                          fontSize: '1.2rem'
                        }} 
                      />
                    )}
                    <Box>
                      <Typography 
                        component="span" 
                        sx={{ 
                          fontWeight: 500,
                          color: op.isDeprecated ? 'error.main' : 'inherit'
                        }}
                      >
                        {op.label}
                      </Typography>
                      <Typography 
                        component="div" 
                        variant="body2" 
                        sx={{ 
                          color: op.isDeprecated ? 'error.light' : 'text.secondary',
                          fontStyle: 'italic',
                          ml: op.isDeprecated ? 3.5 : 0,
                          fontSize: '0.8rem',
                          mt: 0.5
                        }}
                      >
                        Example: {op.example}
                      </Typography>
                    </Box>
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
          <IconButton 
            onClick={handleAddOperator} 
            color="primary" 
            disabled={!selectedOperator || !operatorValue}
          >
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
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              {op.isDeprecated && (
                <WarningIcon 
                  color="error" 
                  sx={{ mr: 1 }} 
                />
              )}
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500,
                  color: op.isDeprecated ? 'error.main' : 'inherit'
                }}
              >
                {op.label}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  ml: 1,
                  color: op.isDeprecated ? 'error.light' : 'text.primary'
                }}
              >
                {op.value}
              </Typography>
            </Box>
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