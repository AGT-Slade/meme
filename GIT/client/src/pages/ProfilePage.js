import React, { useState, useEffect } from 'react';
import { useGlobal } from '../context/GlobalContext'; // Import useGlobal
import { updateUserProfile } from '../services/api';



const ProfilePage = () => {
  const { state: globalState, updateGlobalState } = useGlobal();

  // Local state initialized from global state
  const [localState, setLocalState] = useState({
    email: globalState.email,
    firstName: globalState.firstName,
    lastName: globalState.lastName,
    phoneNumber: globalState.phoneNumber,
  });

  // Sync local state with global state when global state changes
  useEffect(() => {
    setLocalState({
      email: globalState.email,
      firstName: globalState.firstName,
      lastName: globalState.lastName,
      phoneNumber: globalState.phoneNumber,
    });
  }, [globalState.email, globalState.firstName, globalState.lastName, globalState.phoneNumber]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save changes to global state
  const saveChanges = () => {
    updateGlobalState(localState);
  };

  return (
    <div style={styles.container}>
      <h1>Profile Page</h1>
      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={localState.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={localState.firstName}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={localState.lastName}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={localState.phoneNumber}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <button onClick={saveChanges} style={styles.button}>
          Save Changes
        </button>
      </div>
    </div>
  );
};



// Inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
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
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ProfilePage;