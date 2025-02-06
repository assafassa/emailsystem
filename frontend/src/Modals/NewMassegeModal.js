import React, { useState } from 'react';

function NewMessageModal({ isOpen, setIsOpen, sendMessage }) {
  const [toAddress, setToAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const[error,seterror]=useState(null)

  // Close modal when clicking the cancel button or outside the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let sent=await sendMessage({ toAddress, subject, body,draft:false });
    }
    catch(err){
      seterror(error)
      setTimeout(() => {
        seterror(null)
      }, 1500);
    }
    if (!error){
      closeModal();
    }
    
  };
  const handleDraft = (e) => {
    e.preventDefault();
    sendMessage({ toAddress, subject, body,draft:true });
    closeModal();
  };
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        
        <div style={styles.header}>
            <div style={styles.buttons}>
                <button type="submit" style={styles.sendButton} onClick={handleSubmit}>Send</button>
                <button type="button" onClick={handleDraft} style={styles.cancelButton}>Cancel</button>
            </div>
            <button onClick={closeModal} style={styles.closeButton}>X</button>
          
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="toAddress">To:</label>
            <input
              id="toAddress"
              type="email"
              placeholder="Enter recipient's email"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="subject">Subject:</label>
            <input
              id="subject"
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="body">Message:</label>
            <textarea
              id="body"
              placeholder="Enter your message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              style={styles.textArea}
            />
          </div>

          
        </form>
        {error&&(<div>{error}</div>)}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '65%',
    height:'70%',
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  closeButton: {
    fontSize: '18px',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#e74c3c',
  },
  inputGroup: {
    margin: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
  },
  buttons: {
    display: 'flex',
    width:'100%',
    justifyContent: 'space-between',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    border: 'none',
    color: 'white',
    borderRadius: '30px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    border: 'none',
    color: 'white',
    borderRadius: '30px',
    cursor: 'pointer',
  },
};

export default NewMessageModal;
