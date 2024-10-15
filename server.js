const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to get all users with their transactions
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.name, u.email, u.account_balance, json_agg(t.*) AS transactions
      FROM users u
      LEFT JOIN transactions t ON u.id = t.user_id
      GROUP BY u.id
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get transactions for a specific user
app.get('/api/users/:userId/transactions', async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
