// Updated db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { promisify } = require('util');

const db = new sqlite3.Database(
  path.resolve(__dirname, 'database.sqlite3'),
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) console.error('Database connection error:', err);
  }
);

// Promisify methods
db.run = promisify(db.run);
db.get = promisify(db.get);
db.all = promisify(db.all);

// Initialize database (add this)
const initDB = async () => {
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )
  `);
};

initDB();

module.exports = db;