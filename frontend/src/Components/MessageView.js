import React from 'react';

function MessageView({ message }) {
    const {fromAddress, title, createdAt , body}=message
  return (
    <div style={styles.container}>
      
      <p style={styles.sender}>From: {fromAddress}</p>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.date}>{createdAt}</p>
      <div style={styles.messageBox}>
        <p>{body}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    width: '80%',
    height: '100vh',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    marginLeft:'340px',
    
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  sender: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px',
  },
  date: {
    fontSize: '14px',
    color: 'blue',
    marginBottom: '20px',
  },
  messageBox: {
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.5',
  },
};

export default MessageView;