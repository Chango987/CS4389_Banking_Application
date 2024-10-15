CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    account_balance DECIMAL(10, 2) DEFAULT 0
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(10, 2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(50),  -- e.g., 'deposit', 'withdrawal'
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);
