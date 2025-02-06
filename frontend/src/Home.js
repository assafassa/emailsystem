import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; 
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar'
import MessageView from './Components/MessageView';
import NewMessageModal from './Modals/NewMassegeModal';
import { io } from 'socket.io-client';

function Home() {
  const navigate = useNavigate();
  const { userEmail, clearUser } = useUser();
  const  [sortby,setSortBy]=useState("Inbox")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSendMessage = async (message) => {
    const { toAddress, subject, body,draft} = message;
  
    const newMessage = {
      title: subject,
      body: body,
      fromAddress: userEmail,
      toAddress: toAddress,
      draft:  draft||false, // Set draft to false if not provided
    };
  
    try {
      const response = await fetch('http://localhost:8000/postmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Message sent successfully:', data);
        // Optionally handle success (e.g., show confirmation message)
        setMessages([newMessage,...messages])
      } else {
        console.error('Sending message failed:', data.result);
        // Optionally handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during sending message:', error);
      // Handle network or other errors
    }
  };
  


  const [messages,setMessages] = useState([
    {
      "_id": "67a49f9c1394c557cdd1e726",
      "title": "Meeting Reminder",
      "body": "This is a reminder about the meeting scheduled for tomorrow at 10 AM.",
      "fromAddress": "assaf@gmail.com",
      "toAddress": "jane.smith@example.com",
      "createdAt": "2025-02-06T08:30:00Z",
      "draft": "false"
    }]
  );

  const [currentMessage,setCurrentMessage]=useState("67a49f9c1394c557cdd1e726")


  
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
            setMessages(data.messages);
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
      <Navbar setIsModalOpen={setIsModalOpen}
      setSortBy={setSortBy}
      sortby={sortby}/>
      <div style={{display: 'flex', flexDirection: 'row',}}>
        <Sidebar messages={messages}
        setCurrentMessage={setCurrentMessage}
        currentMessage={currentMessage}
        sortby={sortby}
        userEmail={userEmail}
        />
        <MessageView
        message={messages.filter((message)=>message._id==currentMessage)[0]}
        
        />
        {isModalOpen&&(<NewMessageModal isModalOpen={isModalOpen}  setIsOpen={setIsModalOpen} sendMessage={handleSendMessage } />)}
        
      </div>
    </div>
  );
}




export default Home;
