import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext'; // Import useGlobal
import { transfer } from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const { username, email, firstName, lastName, phoneNumber } = useGlobal(); // Use global state
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  // Redirect to login if no token is found
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await transfer({ from: localStorage.getItem('userId'), to, amount });
      alert('Transfer successful!');
      setTo('');
      setAmount('');
    } catch (err) {
      alert('Transfer failed: ' + err.message);
    }
  };

  return (
    <div style={styles.content}>
      <h1>Meme Coin Transfer</h1>
      <form onSubmit={handleTransfer} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Recipient ID:</label>
          <input
            type="text"
            placeholder="Recipient ID"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Amount:</label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Transfer
        </button>
      </form>

      {/* Display user profile information */}
      <div style={styles.profileInfo}>
        <h2>Your Profile Information</h2>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
      </div>
    </div>
  );
};

// Inline styles for the content
const styles = {
  content: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box', // Ensure padding doesn't affect width
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  profileInfo: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
};

export default HomePage;