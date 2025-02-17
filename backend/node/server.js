const express = require("express");
const cors = require("cors");
const { generateQuery } = require("./services/queryGenerator");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to generate Google Dork query
app.post("/generate-query", (req, res) => {
  const { queryParts } = req.body;

  try {
    const query = generateQuery(queryParts);
    res.json({ query });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Google Dorks Tool Backend");
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});