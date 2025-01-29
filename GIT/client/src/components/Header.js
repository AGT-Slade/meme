import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobal } from '../context/GlobalContext'; // Import useGlobal

const Header = () => {
  const navigate = useNavigate();
  const { username, isLoggedIn, logout, theme, toggleTheme } = useGlobal(); // Use global state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header style={{ ...styles.header, backgroundColor: theme === 'light' ? '#f8f9fa' : '#333' }}>
      <div style={styles.userInfo}>
        {isLoggedIn && (
          <>
            <span onClick={toggleDropdown} style={styles.username}>
              Welcome, {username}!
            </span>
            {isDropdownOpen && (
              <div style={styles.dropdown}>
                <Link to="/profile" style={styles.dropdownLink}>
                  Profile
                </Link>
                <button onClick={handleLogout} style={styles.dropdownLink}>
                  Logout
                </button>
                <button onClick={toggleTheme} style={styles.dropdownLink}>
                  Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'})
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={{ ...styles.navLink, color: theme === 'light' ? '#333' : '#fff' }}>
          Home
        </Link>
        {!isLoggedIn && (
          <Link to="/login" style={{ ...styles.navLink, color: theme === 'light' ? '#333' : '#fff' }}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

// Inline styles for the header
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
  },
  userInfo: {
    fontSize: '18px',
    fontWeight: 'bold',
    position: 'relative',
  },
  username: {
    cursor: 'pointer',
    color: '#ffffff',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
  },
  dropdownLink: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
  },
  nav: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Header;