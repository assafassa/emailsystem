import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // After logout, navigate to SignIn page
    navigate('/');
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}

export default Home;
