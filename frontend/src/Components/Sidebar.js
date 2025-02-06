import React from 'react';
import MessagePreview from './MessagePreview'; // Import the MessagePreview component

function Sidebar({messages,setCurrentMessage,currentMessage,sortby,userEmail}) {
  // Sample messages for the preview
  
  const filteredMessages = messages.filter((message) => {
    
    if (sortby == "Inbox") {
      return message.toAddress == userEmail;
    } else if (sortby == "Outbox") {
      return message.fromAddress == userEmail ;
    } else if (sortby == "Draft") {
      return message.fromAddress == userEmail && message.draft == true;
    }
    return true; // Default case: Show all messages if no valid sortby value
  });

  return (
    <div style={styles.sidebar}>
      <div style={styles.messageContainer}>
        <ul style={styles.messageList}>
          {filteredMessages.map((message) => (
            <MessagePreview
              key={message._id}
              id={message._id}
              subject={message.title}
              snippet={message.body.slice(0, 30)}
              sender={message.fromAddress}
              setCurrentMessage={setCurrentMessage}
              currentMessage={currentMessage}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

// Inline styles for the sidebar
const styles = {
  sidebar: {
    width: '300px',
    backgroundColor: 'white',
    color: 'black',
    height: '100vh',
    padding: '20px',
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '18px',
    marginBottom: '15px',
    color: 'black',
  },
  messageContainer: {
    flex: 1,
    overflowY: 'auto', // Enable vertical scrolling
    paddingRight: '10px', // Optional: to prevent messages from touching the right edge
  },
  messageList: {
    listStyleType: 'none',
    padding: '0',
    marginTop: '20px',
  },
};

export default Sidebar;
