require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('./auth');
const { generateQuery } = require('./services/queryGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Enforce HTTPS
// app.use((req, res, next) => {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

// Simulated user database (hashed password for 'password123')
const users = [
  {
    id: 1,
    username: 'testuser',
    passwordHash: '$2b$10$hsDJ8XSsvzw5uTYntgc98OXeENZ3Ze2KLMqnhJh.PQwdruC7nN74S' // 'password123'
  }
];

// Login Route
app.post(
  '/login',
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  }
);

// Protected route to generate Google Dork query
app.post(
  '/generate-query',
  authenticateToken,
  body('queryParts').isArray({ min: 1 }).withMessage('queryParts must be a non-empty array'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { queryParts } = req.body;

    try {
      const query = generateQuery(queryParts);
      res.json({ query });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
