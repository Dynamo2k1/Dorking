import React, { useState } from "react";
import {
  TextField, Select, MenuItem, Button, Box,
  FormControl, InputLabel, Grid, Typography,
  IconButton, ListSubheader
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import WarningIcon from "@mui/icons-material/Warning";

const operators = [
  {
    category: "Basic Search Operators",
    items: [
      { id: "text", label: "\"text\"", example: "\"confidential report\"" },
      { id: "site", label: "site:", example: "site:example.com" },
      { id: "intitle", label: "intitle:", example: "intitle:admin" },
      { id: "inurl", label: "inurl:", example: "inurl:login" },
      { id: "filetype", label: "filetype:", example: "filetype:pdf" },
      { id: "cache", label: "cache:", example: "cache:example.com" },
      { id: "link", label: "link:", example: "link:example.com" },
      { id: "related", label: "related:", example: "related:example.com" },
      { id: "allinurl", label: "allinurl:", example: "allinurl:example.com" },
      { id: "allintitle", label: "allintitle:", example: "allintitle:example" },
      { id: "allintext", label: "allintext:", example: "allintext:report" },
      { id: "allinanchor", label: "allinanchor:", example: "allinanchor:\"click here\"" },
      { id: "inanchor", label: "inanchor:", example: "inanchor:\"read more\"" },
    ]
  },
  {
    category: "Security/Advanced Search",
    items: [
      { id: "intext", label: "intext:", example: "intext:\"password\"" },
      { id: "index_of", label: "\"index of\"", example: "\"index of /backup\"" },
      { id: "php_id", label: "inurl:\"php?id=\"", example: "inurl:\"php?id=1\"" },
      { id: "admin_title", label: "intitle:\"admin\"", example: "intitle:\"admin panel\"" },
      { id: "wp_admin", label: "inurl:wp-admin", example: "inurl:wp-admin/login.php" },
      { id: "phpmyadmin", label: "inurl:phpmyadmin", example: "inurl:phpmyadmin/index.php" },
      { id: "filetype_log", label: "filetype:log", example: "filetype:log \"error\"" },
      { id: "filetype_sql", label: "filetype:sql", example: "filetype:sql \"DROP TABLE\"" },
      { id: "filetype_xls", label: "filetype:xls \"password\"", example: "filetype:xls \"credentials\"" },
      { id: "intext_password", label: "intext:\"password\"", example: "intext:\"password\"" },
      { id: "inurl_config", label: "inurl:config", example: "inurl:config.php" },
      { id: "inurl_admin_login", label: "inurl:\"admin login\"", example: "inurl:\"admin login\"" },
      { id: "inurl_admin", label: "inurl:admin", example: "inurl:admin" },
      { id: "intitle_backup", label: "intitle:\"index of\" \"backup\"", example: "intitle:\"index of\" \"backup\"" },
      { id: "warning_mysql", label: "\"Warning: mysql_fetch_array()\"", example: "\"Warning: mysql_fetch_array()\"" },
      { id: "filetype_pdf_conf", label: "filetype:pdf \"confidential\"", example: "filetype:pdf \"confidential\"" },
      { id: "inurl_signin", label: "inurl:signin", example: "inurl:signin" },
      { id: "inurl_login", label: "inurl:login", example: "inurl:login" },
      { id: "intitle_login", label: "intitle:login", example: "intitle:login" },
      { id: "not_found", label: "\"404 Not Found\"", example: "\"404 Not Found\"" },
    ]
  },
  {
    category: "Advanced Search for Specific Data Types",
    items: [
      { id: "inurl_gov", label: "inurl:gov", example: "inurl:gov" },
      { id: "filetype_pdf", label: "filetype:pdf", example: "filetype:pdf" },
      { id: "filetype_doc", label: "filetype:doc", example: "filetype:doc" },
      { id: "filetype_xls2", label: "filetype:xls", example: "filetype:xls" },
      { id: "filetype_csv", label: "filetype:csv", example: "filetype:csv" },
      { id: "filetype_txt", label: "filetype:txt", example: "filetype:txt" },
      { id: "filetype_ppt", label: "filetype:ppt", example: "filetype:ppt" },
      { id: "filetype_html", label: "filetype:html", example: "filetype:html" },
      { id: "inurl_admin_login_wp", label: "inurl:admin login site:wordpress.com", example: "inurl:admin login site:wordpress.com" },
      { id: "allintitle_admin_login", label: "allintitle:\"admin login\"", example: "allintitle:\"admin login\"" },
      { id: "intitle_phpmyadmin", label: "intitle:phpMyAdmin", example: "intitle:phpMyAdmin" },
      { id: "filetype_bak", label: "filetype:bak", example: "filetype:bak" },
      { id: "inurl_admin_slash", label: "inurl:/admin/", example: "inurl:/admin/" },
      { id: "inurl_backups", label: "inurl:/backups/", example: "inurl:/backups/" },
      { id: "inurl_files", label: "inurl:/files/", example: "inurl:/files/" },
    ]
  },
  {
    category: "Vulnerabilities & Information Exposure",
    items: [
      { id: "password_file", label: "\"password file\"", example: "\"password file\"" },
      { id: "admin_password", label: "\"admin\" \"password\"", example: "\"admin\" \"password\"" },
      { id: "inurl_admin_php", label: "inurl:admin.php", example: "inurl:admin.php" },
      { id: "inurl_wp_content", label: "inurl:wp-content", example: "inurl:wp-content" },
      { id: "backup_sql", label: "\"backup\" \"sql\"", example: "\"backup\" \"sql\"" },
      { id: "inurl_cgi_bin", label: "inurl:/cgi-bin/", example: "inurl:/cgi-bin/" },
      { id: "inurl_admin_login2", label: "inurl:admin login", example: "inurl:admin login" },
      { id: "index_of_password", label: "\"index of\" \"password\"", example: "\"index of\" \"password\"" },
      { id: "inurl_config_sql", label: "inurl:config filetype:sql", example: "inurl:config filetype:sql" },
      { id: "login_username_password", label: "\"login\" \"username\" \"password\"", example: "\"login\" \"username\" \"password\"" },
      { id: "index_of_config", label: "\"index of\" /config", example: "\"index of\" /config" },
      { id: "index_of_backup", label: "\"index of\" /backup", example: "\"index of\" /backup" },
      { id: "index_of_private", label: "\"index of\" /private", example: "\"index of\" /private" },
      { id: "index_of_admin", label: "\"index of\" /admin", example: "\"index of\" /admin" },
    ]
  },
  {
    category: "Information Disclosure",
    items: [
      { id: "file_contains_username", label: "\"file contains\" \"username\"", example: "\"file contains\" \"username\"" },
      { id: "file_contains_password", label: "\"file contains\" \"password\"", example: "\"file contains\" \"password\"" },
      { id: "index_of_private_dup", label: "\"index of\" /private", example: "\"index of\" /private" },
      { id: "intitle_index_log", label: "intitle:\"index of\" \"log\"", example: "intitle:\"index of\" \"log\"" },
      { id: "intitle_index_admin", label: "intitle:\"index of\" \"admin\"", example: "intitle:\"index of\" \"admin\"" },
      { id: "inurl_wp_login", label: "inurl:wp-login.php", example: "inurl:wp-login.php" },
      { id: "inurl_admin_config", label: "inurl:admin/config.php", example: "inurl:admin/config.php" },
      { id: "admin_config", label: "\"admin\" \"config\"", example: "\"admin\" \"config\"" },
      { id: "intitle_admin_login2", label: "intitle:\"admin\" \"login\"", example: "intitle:\"admin\" \"login\"" },
      { id: "index_of_config_database", label: "\"index of\" \"config\" \"database\"", example: "\"index of\" \"config\" \"database\"" },
      { id: "index_of_config_db", label: "\"index of\" \"config\" \"db\"", example: "\"index of\" \"config\" \"db\"" },
      { id: "index_of_config_root", label: "\"index of\" \"config\" \"root\"", example: "\"index of\" \"config\" \"root\"" },
    ]
  },
  {
    category: "Other Useful Operators",
    items: [
      { id: "allintext", label: "allintext:", example: "allintext:report" },
      { id: "allinurl", label: "allinurl:", example: "allinurl:example.com" },
      { id: "allintitle", label: "allintitle:", example: "allintitle:report" },
      { id: "intext_root_password", label: "intext:\"root password\"", example: "intext:\"root password\"" },
      { id: "allintext_confidential", label: "allintext:\"confidential data\"", example: "allintext:\"confidential data\"" },
      { id: "sql_dump", label: "\"sql dump\"", example: "\"sql dump\"" },
      { id: "intitle_backup_dup", label: "intitle:\"index of\" \"backup\"", example: "intitle:\"index of\" \"backup\"" },
      { id: "intitle_files", label: "intitle:\"index of\" \"files\"", example: "intitle:\"index of\" \"files\"" },
      { id: "inurl_wp_admin_dup", label: "inurl:wp-admin/", example: "inurl:wp-admin/" },
      { id: "inurl_cgi_bin_dup", label: "inurl:/cgi-bin/", example: "inurl:/cgi-bin/" },
      { id: "index_of_config_pass", label: "\"index of\" \"config\" \"pass\"", example: "\"index of\" \"config\" \"pass\"" },
      { id: "intitle_ftp", label: "intitle:\"index of\" \"ftp\"", example: "intitle:\"index of\" \"ftp\"" },
      { id: "index_of_ftp_backup", label: "\"index of\" \"ftp\" \"backup\"", example: "\"index of\" \"ftp\" \"backup\"" },
      { id: "index_of_ftp_user", label: "\"index of\" \"ftp\" \"user\"", example: "\"index of\" \"ftp\" \"user\"" },
      { id: "index_of_ftp_password", label: "\"index of\" \"ftp\" \"password\"", example: "\"index of\" \"ftp\" \"password\"" },
    ]
  },
  {
    category: "Web Application & CMS Specific",
    items: [
      { id: "inurl_wp_login_dup", label: "inurl:wp-login.php", example: "inurl:wp-login.php" },
      { id: "inurl_wp_content_themes", label: "inurl:wp-content/themes/", example: "inurl:wp-content/themes/" },
      { id: "intitle_admin_panel_login", label: "intitle:\"admin panel\" \"login\"", example: "intitle:\"admin panel\" \"login\"" },
      { id: "inurl_admin_panel", label: "inurl:admin panel", example: "inurl:admin panel" },
      { id: "inurl_joomla", label: "inurl:joomla", example: "inurl:joomla" },
      { id: "inurl_site_github", label: "inurl:site:github", example: "inurl:site:github" },
      { id: "inurl_phpmyadmin_dup", label: "inurl:phpmyadmin", example: "inurl:phpmyadmin" },
      { id: "inurl_wp_admin_setup", label: "inurl:wp-admin/setup-config.php", example: "inurl:wp-admin/setup-config.php" },
      { id: "intitle_phpmyadmin_dup", label: "intitle:\"phpMyAdmin\"", example: "intitle:\"phpMyAdmin\"" },
      { id: "inurl_admin_php2", label: "inurl:admin.php", example: "inurl:admin.php" },
      { id: "inurl_blog_wp_admin", label: "inurl:blog/wp-admin", example: "inurl:blog/wp-admin" },
      { id: "inurl_admin_tools", label: "inurl:/admin/tools/", example: "inurl:/admin/tools/" },
      { id: "inurl_wp_includes", label: "inurl:/wp-includes/", example: "inurl:/wp-includes/" },
      { id: "inurl_admin_config2", label: "inurl:/admin/config.php", example: "inurl:/admin/config.php" },
      { id: "inurl_web_config", label: "inurl:/web.config", example: "inurl:/web.config" },
      { id: "inurl_admin_settings", label: "inurl:admin/settings.php", example: "inurl:admin/settings.php" },
    ]
  },
  {
    category: "Miscellaneous",
    items: [
      { id: "inurl_php_option_com", label: "inurl:php?option=com_", example: "inurl:php?option=com_" },
      { id: "inurl_admin_config3", label: "inurl:admin/config.php", example: "inurl:admin/config.php" },
      { id: "intitle_login_forgot", label: "intitle:\"Login\" \"Forgot Password\"", example: "intitle:\"Login\" \"Forgot Password\"" },
      { id: "intitle_login_forgot", label: "intitle:\"Login\" \"Forgot Password\"", example: "intitle:\"Login\" \"Forgot Password\"" },
      { id: "email_password", label: "\"email\" \"password\"", example: "\"email\" \"password\"" },
      { id: "inurl_signup_email", label: "inurl:\"signup\" \"email\"", example: "inurl:\"signup\" \"email\"" },
      { id: "inurl_admin_panel2", label: "inurl:\"admin\" \"panel\"", example: "inurl:\"admin\" \"panel\"" },
      { id: "intitle_index_db", label: "intitle:\"index of\" \"db\"", example: "intitle:\"index of\" \"db\"" },
      { id: "intitle_backup_confidential", label: "intitle:\"index of\" \"backup\" \"confidential\"", example: "intitle:\"index of\" \"backup\" \"confidential\"" },
      { id: "inurl_admin_backup", label: "inurl:\"admin\" \"backup\"", example: "inurl:\"admin\" \"backup\"" },
      { id: "index_of_website_files", label: "\"index of\" \"website\" \"files\"", example: "\"index of\" \"website\" \"files\"" },
      { id: "inurl_backup_password", label: "inurl:\"backup\" \"password\"", example: "inurl:\"backup\" \"password\"" },
      { id: "intitle_index_database", label: "intitle:\"index of\" \"database\"", example: "intitle:\"index of\" \"database\"" },
      { id: "filetype_bak_db", label: "filetype:bak \"db\"", example: "filetype:bak \"db\"" },
      { id: "index_of_admin_files", label: "\"index of\" \"admin\" \"files\"", example: "\"index of\" \"admin\" \"files\"" },
    ]
  }
];

const SearchForm = ({ onSearch, isLoading }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [operatorValue, setOperatorValue] = useState("");
  const [operatorList, setOperatorList] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare query parts for backend validation
    const queryParts = [
      searchText,
      ...operatorList.map((op) => `${op.label}${op.value}`)
    ].filter(Boolean); // Remove empty strings

    // Send queryParts to backend
    onSearch({ queryParts });
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