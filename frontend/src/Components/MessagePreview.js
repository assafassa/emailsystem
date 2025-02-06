import React from 'react';

function MessagePreview({sender, subject, snippet }) {
  return (
    <li style={styles.messageItem}>
      <span style={styles.messageSender}>{sender}</span>  
      <span style={styles.messageTitle}>{subject}</span>
      <span style={styles.messageSnippet}>{snippet}...</span>
    </li>
  );
}

const styles = {
  messageItem: {
    padding: '10px',
    borderBottom: '1px solid #34495e',
    cursor: 'pointer',
  },
  messageTitle: {
    fontWeight: 'bold',
    display: 'block',
    color:'blue',
  },
  messageSender: {
    fontWeight: 'bold',
    display: 'block',
  },
  messageSnippet: {
    fontSize: '14px',
    color: '#bdc3c7',
  },
};

export default MessagePreview;
