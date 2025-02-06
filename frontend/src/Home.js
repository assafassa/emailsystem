import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar'
import MessageView from './Components/MessageView';

function Home() {
  const navigate = useNavigate();
  const { userEmail, clearUser } = useUser();
  const [messages,setMessages] = useState([
    {
      "_id": "67a49f9c1394c557cdd1e726",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "assaf@gmail.com",
      "toAddress": "jane.smith@example.com",
      "createdAt": "2025-02-06T08:30:00Z"
    },
    {
      "_id": "67a49f9e1394c557cdd1e728",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "assaf@gmail.com",
      "toAddress": "jane.smith@example.com",
      "createdAt": "2025-02-06T09:00:00Z"
    },
    {
      "_id": "67a49f9f1394c557cdd1e72a",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "assaf@gmail.com",
      "toAddress": "jane.smith@example.com",
      "createdAt": "2025-02-06T09:30:00Z"
    },
    {
      "_id": "67a49fa01394c557cdd1e72c",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "assaf@gmail.com",
      "toAddress": "jane.smith@example.com",
      "createdAt": "2025-02-06T10:00:00Z"
    },
    {
      "_id": "67a49fb01394c557cdd1e72e",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "jane.smith@example.com",
      "toAddress": "assaf@gmail.com",
      "createdAt": "2025-02-06T10:30:00Z"
    },
    {
      "_id": "67a49fb11394c557cdd1e730",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "jane.smith@example.com",
      "toAddress": "assaf@gmail.com",
      "createdAt": "2025-02-06T11:00:00Z"
    },
    {
      "_id": "67a49fb31394c557cdd1e732",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "jane.smith@example.com",
      "toAddress": "assaf@gmail.com",
      "createdAt": "2025-02-06T11:30:00Z"
    },
    {
      "_id": "67a49fb41394c557cdd1e734",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "jane.smith@example.com",
      "toAddress": "assaf@gmail.com",
      "createdAt": "2025-02-06T12:00:00Z"
    },
    {
      "_id": "67a49fc71394c557cdd1e736",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "assaf@gmail.com",
      "toAddress": "jane.smith@example.com",
      "createdAt": "2025-02-06T12:30:00Z"
    },
    {
      "_id": "67a49fc91394c557cdd1e738",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "assaf@gmail.com",
      "toAddress": "jane.smith@example.com",
      "createdAt": "2025-02-06T13:00:00Z"
    }
  ]);

  const [currentMessage,setCurrentMessage]=useState("67a49f9c1394c557cdd1e726")


  const handleLogout = () => {
    clearUser(); // Clear user data on logout
    navigate('/'); // Navigate to the SignIn page
  };
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userEmail) {
        navigate('/'); // Redirect to login page if no email
      } else {
        try {
          const response = await fetch(`http://localhost:8000/getmessages?email=${userEmail}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          if (response.ok) {
            console.log(data.messages);
          } else {
            console.error('Fetching messages failed:', data.result);
            // Handle failure (e.g., show error message)
          }
        } catch (error) {
          console.error('Error during fetching messages:', error);
          // Handle network or other errors
        }
      }
    };

    fetchMessages();
  }, [userEmail, navigate]);
  
  return (
    <div>
      <Navbar/>
      <div style={{display: 'flex', flexDirection: 'row',}}>
        <Sidebar messages={messages}
        setCurrentMessage={setCurrentMessage}
        currentMessage={currentMessage}
        />
        <MessageView
        message={messages.filter((message)=>message._id==currentMessage)[0]}
        
        />
      </div>
    </div>
  );
}




export default Home;
