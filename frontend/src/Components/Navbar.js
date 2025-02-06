import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

function Navbar({setIsModalOpen}) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { clearUser,userEmail } = useUser();

  const handleLogout = () => {
    clearUser(); // Clear user data on logout
    navigate('/'); // Navigate to the SignIn page
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    // Perform search or navigate to a search results page
  };

  return (
    <nav style={styles.navbar}>
      <button onClick={() => navigate('/inbox')} style={styles.navButton}>Inbox</button>
      <button onClick={() => navigate('/outbox')} style={styles.navButton}>Outbox</button>
      <button onClick={() => navigate('/draft')} style={styles.navButton}>Draft</button>

      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>
      </div>

      <button onClick={() => setIsModalOpen(true)} style={styles.navButton}>New Email</button>
      <div>{userEmail}</div>
      <button onClick={handleLogout} style={styles.navButton}>Logout</button>
    </nav>
  );
}

// Inline styles for the navbar
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9EB5D6',
    padding: '10px 20px',
    color: 'white',
    fontSize: '16px',
  },
  navButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '10px',
    margin: '0 5px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px',
    fontSize: '16px',
    marginRight: '5px',
  },
  searchButton: {
    backgroundColor: '#f1f1f1',
    padding: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Navbar;
