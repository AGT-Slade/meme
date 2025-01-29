import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/api';

const VerifyEmailPage = () => {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying email...');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false); // Track verification status

  // Use useEffect to handle the verification process
  useEffect(() => {
    if (!isVerifying) {
      setIsVerifying(true); // Mark verification as started
  
      const verifyUserEmail = async () => {
        try {
          const response = await verifyEmail(verificationToken);
          setMessage(response.message);
          setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
          const errorMessage = err.response?.data?.message || err.message;
          setError(errorMessage);
          setTimeout(() => navigate('/'), 5000);
        }
      };
  
      verifyUserEmail();
    }
  }, [verificationToken, isVerifying, navigate]); // Remove isVerifying from dependencies

  return (
    <div style={styles.container}>
      <h1>Email Verification</h1>
      <p style={styles.message}>{message}</p>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// Inline styles for the verify email page
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  message: {
    color: '#007bff',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default VerifyEmailPage;