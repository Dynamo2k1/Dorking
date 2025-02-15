const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to generate Google Dork query
app.post("/generate-query", (req, res) => {
  const { searchText, fileType, site, intitle, intext, andTerm, orTerm, notTerm } = req.body;
  let query = `"${searchText}"`;

  if (fileType) query += ` filetype:${fileType}`;
  if (site) query += ` site:${site}`;
  if (intitle) query += ` title:${intitle}`;
  if (intext) query += ` text:${intext}`;
  if (andTerm) query += ` AND ${andTerm}`;
  if (orTerm) query += ` OR ${orTerm}`;
  if (notTerm) query += ` -${notTerm}`;

  res.json({ query });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});