import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar'
import MessageView from './Components/MessageView';

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
    { id: 1, sender: 'assaf', subject: 'Subject 1', textmessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non libero a metus placerat accumsan...', date: '2025-02-06' },
    { id: 2, sender: 'assaf', subject: 'Subject 2', textmessage: 'Consectetur adipiscing elit. Donec vitae justo nec felis tempor placerat...', date: '2025-02-05' },
    { id: 3, sender: 'assaf', subject: 'Subject 3', textmessage: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...', date: '2025-02-04' },
    { id: 4, sender: 'assaf', subject: 'Subject 4', textmessage: 'Ut labore et dolore magna aliqua. Quisque egestas, lorem at posuere viverra, purus nisl venenatis...', date: '2025-02-03' },
    { id: 5, sender: 'assaf', subject: 'Subject 5', textmessage: 'Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit...', date: '2025-02-02' },
    { id: 6, sender: 'assaf', subject: 'Subject 6', textmessage: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...', date: '2025-02-01' },
    { id: 7, sender: 'assaf', subject: 'Subject 7', textmessage: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...', date: '2025-01-31' },
    { id: 8, sender: 'assaf', subject: 'Subject 8', textmessage: 'Sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium suscipit mauris...', date: '2025-01-30' },
    { id: 9, sender: 'assaf', subject: 'Subject 9', textmessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra arcu vel magna facilisis...', date: '2025-01-29' },
    { id: 10, sender: 'assaf', subject: 'Subject 10', textmessage: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...', date: '2025-01-28' },
    { id: 11, sender: 'assaf', subject: 'Subject 11', textmessage: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...', date: '2025-01-27' },
    { id: 12, sender: 'assaf', subject: 'Subject 12', textmessage: 'Sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium suscipit mauris...', date: '2025-01-26' },
  ];
  return (
    <div>
      <Navbar/>
      <div style={{display: 'flex', flexDirection: 'row',}}>
        <Sidebar messages={messages}/>
        <MessageView
        message={messages[0]}
        />
      </div>
    </div>
  );
}




export default Home;
