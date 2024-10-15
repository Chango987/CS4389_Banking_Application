// models.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  accountBalance: Number,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  type: String, // e.g., 'deposit', 'withdrawal'
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { User, Transaction };
