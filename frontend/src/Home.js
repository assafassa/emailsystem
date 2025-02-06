import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar'

function Home() {
  const navigate = useNavigate();
  const { userEmail, clearUser } = useUser();

  const handleLogout = () => {
    clearUser(); // Clear user data on logout
    navigate('/'); // Navigate to the SignIn page
  };

  useEffect(() => {
    if (!userEmail) {
      
      navigate('/'); 
    }
  }, [userEmail, navigate]);
  const messages = [
    { id: 1,sender:'assaf', subject: "Subject 1", snippet: "Lorem ipsum dolor sit amet..." },
    { id: 2,sender:'assaf', subject: "Subject 2", snippet: "Consectetur adipiscing elit..." },
    { id: 3,sender:'assaf', subject: "Subject 3", snippet: "Sed do eiusmod tempor incididunt..." },
    { id: 4,sender:'assaf', subject: "Subject 4", snippet: "Ut labore et dolore magna aliqua..." },
    { id: 5,sender:'assaf', subject: "Subject 5", snippet: "Nostrud exercitation ullamco laboris..." },
    { id: 6,sender:'assaf', subject: "Subject 6", snippet: "Duis aute irure dolor in reprehenderit..." },
    { id: 7,sender:'assaf', subject: "Subject 7", snippet: "Excepteur sint occaecat cupidatat non proident..." },
    { id: 8,sender:'assaf', subject: "Subject 8", snippet: "Sunt in culpa qui officia deserunt mollit anim..." },
    { id: 9,sender:'assaf', subject: "Subject 5", snippet: "Nostrud exercitation ullamco laboris..." },
    { id: 10,sender:'assaf', subject: "Subject 6", snippet: "Duis aute irure dolor in reprehenderit..." },
    { id: 11,sender:'assaf', subject: "Subject 7", snippet: "Excepteur sint occaecat cupidatat non proident..." },
    { id: 12,sender:'assaf', subject: "Subject 8", snippet: "Sunt in culpa qui officia deserunt mollit anim..." },
    // Add more messages as needed
  ];
  return (
    <div>
      <Navbar/>
      <Sidebar messages={messages}/>
      <h2>Welcome, {userEmail ? userEmail : 'Guest'}!</h2>
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}




export default Home;
