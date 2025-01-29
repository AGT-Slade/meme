import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2023 Meme Coin. All rights reserved.</p>
    </footer>
  );
};

// Inline styles for the footer
const styles = {
  footer: {
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #ddd',
    padding: '10px 20px',
    textAlign: 'center',
  },
};

export default Footer;