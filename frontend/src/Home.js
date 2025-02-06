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
  const [socket,setSocket]=useState()
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
        fetchMessages()
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
    ]
  );

  const [currentMessage,setCurrentMessage]=useState(null)
  useEffect(() => {
    if (messages.length!=0){
      setCurrentMessage(messages[0]._id)
    }
  
    
  }, [messages])
  

  const fetchMessages = async () => {
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
    
  };
  
  useEffect(() => {
    if (!userEmail) {
      navigate('/'); 
    }else {
      //retriving data
      fetchMessages()
      // Initialize the socket connection
      const newSocket = io('http://localhost:8000'); // URL to your server
      setSocket(newSocket);

      // When a new message arrives, update the state
      newSocket.on('newMessageReceived', (data) => { // Event name matches backend
        fetchMessages(); // Trigger data retrieval on new message
      });

      // Emit user login event when the component mounts
      newSocket.emit('user_login', userEmail);
    
      // Cleanup on unmount
      return () => {
          newSocket.disconnect();
      };

    }
  }, [userEmail]);
  
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
        {currentMessage&&(<MessageView
        message={messages.filter((message)=>message._id==currentMessage)[0]}
        
        />)}
        
        {isModalOpen&&(<NewMessageModal isModalOpen={isModalOpen}  setIsOpen={setIsModalOpen} sendMessage={handleSendMessage } />)}
        
      </div>
    </div>
  );
}




export default Home;
