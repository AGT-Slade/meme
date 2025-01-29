import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component

const Layout = () => {
  return (
    <div style={styles.layout}>
      {/* Header */}
      <Header />

      {/* Main content (changes based on the route) */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Inline styles for the layout
const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Full viewport height
  },
  main: {
    flex: 1, // Takes up remaining space
    padding: '20px',
  },
};

export default Layout;