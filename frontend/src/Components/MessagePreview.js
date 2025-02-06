function MessagePreview({ sender, subject, snippet, setCurrentMessage, currentMessage, id }) {
  // Handle click to set current message
  const handleClick = () => {
    setCurrentMessage(id); // Set current message based on the key
  };

  // Style conditionally if the message is the current one
  const itemStyle = currentMessage === id ? styles.currentMessageItem : styles.messageItem;

  return (
    <li style={itemStyle} onClick={handleClick}>
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
    color: 'blue',
  },
  messageSender: {
    fontWeight: 'bold',
    display: 'block',
  },
  messageSnippet: {
    fontSize: '14px',
    color: '#bdc3c7',
  },
  currentMessageItem: {
    padding: '10px',
    borderBottom: '1px solid #34495e',
    cursor: 'pointer',
    backgroundColor: '#8AA6CE', // Darker gray when selected
  },
};

export default MessagePreview;
