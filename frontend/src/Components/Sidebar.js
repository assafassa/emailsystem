import React from 'react';
import MessagePreview from './MessagePreview'; // Import the MessagePreview component

function Sidebar({messages}) {
  // Sample messages for the preview
  


  return (
    <div style={styles.sidebar}>
      <div style={styles.messageContainer}>
        <ul style={styles.messageList}>
          {messages.map((message) => (
            <MessagePreview
              key={message.id}
              subject={message.subject}
              snippet={message.snippet}
              sender={message.sender}
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
