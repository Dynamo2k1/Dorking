require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const db = require('./db');
const { log } = require('./audit');
const { generateQuery } = require('./services/queryGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());

const whitelist = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

app.use(helmet({
  contentSecurityPolicy: false // Disable for simplicity in dev
}));

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
// Update the login route
app.post('/login', 
  authLimiter,
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    try {
      const { username, password } = req.body;
      const user = await db.get(
        'SELECT * FROM users WHERE username = ?', 
        [username]
      );

      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
      }

      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ 
          success: false,
          message: 'Invalid credentials' 
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 3600000
      }).json({ 
        success: true,
        message: 'Login successful',
        user: { id: user.id, username: user.username }
      });

    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Server error' 
      });
    }
  }
);

app.post('/validate-session', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
});

// In your generate-query route
app.post('/generate-query',
  apiLimiter,
  authenticateToken,
  body('queryParts').isArray().withMessage('queryParts must be an array'),
  body('queryParts.*').isString().withMessage('Each query part must be a string'),
  async (req, res) => {
    console.log('Received generate-query request:', {
      body: req.body,
      user: req.user
    }); 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => err.msg)
      });
    }

    try {
      const { queryParts } = req.body; // Destructure properly
      const result = generateQuery(queryParts);
      
      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.json({
        success: true,
        query: result.query
      });
    } catch (err) {
      console.error('Query generation error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error during query generation'
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://loca  lhost:${PORT}`);
});