import React, { useState } from 'react';
import { useUser } from './UserContext';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signin successful:', data);
        // Handle successful signup (e.g., navigate to another page)
        loginUser(email); 
        window.location.href = '/home';
      } else {
        console.error('Signin failed:', data.result);
        // Handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during signin:', error);
      // Handle network or other errors
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        // Handle successful signup \
        loginUser(email); // Update the context with the logged-in email
        // Redirect to home page after successful sign-in
        window.location.href = '/home';
      } else {
        console.error('Signup failed:', data.result);
        // Handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle network or other errors
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.square}>
        <h2>WELCOME</h2>
        <div style={styles.text}>Email</div>
        <input 
          type="email" 
          placeholder="some@email.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={styles.input} 
        />
        <div style={styles.text}>Password</div>
        <input 
          type="password" 
          placeholder="*******" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={styles.input} 
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px',width: '80%',paddingLeft:'25px' }}>
          <button style={styles.button} onClick={handleLogin}>Login</button>
          <button style={styles.button} onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: 0,
  },
  square: {
    width: '250px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: '10px',
    marginBottom: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor:'#9EB5D6',
  },
  button: {
    width: '80%',
    padding: '10px',
    marginTop: '10px',
    fontWeight:'bold',
    fontSize:'18px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  text:{
    width:'80%',
    textAlign:'left',
    paddingLeft:'20px',
    fontWeight: 'bold',
  }

};

export default App;
