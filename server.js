// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { User, Transaction } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint to get users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().populate('transactions');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to get transactions for a specific user
app.get('/api/users/:userId/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
