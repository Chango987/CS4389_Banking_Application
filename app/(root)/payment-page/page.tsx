"use client";
import HeaderBox from "@/components/HeaderBox";
import React, { useState } from "react";
import axios from 'axios';


interface PaymentFormProps {
  senderId: string;
}


const PaymentForm: React.FC<PaymentFormProps> = ({ senderId }) => {
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/send_payment/', {
        sender_id: senderId,
        receiver_id: receiverId,
        amount: parseFloat(amount),
      });
      setMessage("Transaction successful!");
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.header}>Start a Payment Transfer</h2>
        
        <label style={styles.label}>
          Receiver ID:
          <input
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Amount:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>Send Payment</button>
        
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f2f2f2',
  },
  form: {
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#0179FE',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },
  message: {
    marginTop: '15px',
    textAlign: 'center',
    color: 'green',
  },
};

export default PaymentForm;
