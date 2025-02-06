import React, { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { loginUser, userEmail } = useUser();
  const navigate = useNavigate();
  const [error,seterror]=useState(null)

  const handleSignup = async () => {
    if (password !== repeatPassword) {
      console.error('Passwords do not match');
      seterror('Passwords do not match')
      return; // Exit if passwords do not match
    }
    if(lastName.length<2 | firstName.length| email.length<3){
      console.error('Information is missing');
      seterror('Information is missing')
      return; // Exit if passwords do not match
    }

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        // Handle successful signup 
        loginUser(email,{firstName,lastName} ); // Update the context with the logged-in email
        // Redirect to home page after successful sign-in
        window.location.href = '/home';
      } else {
        console.error('Signup failed:', data.result);
        // Handle failure (e.g., show error message)
      }
    } catch (error) {
      console.error('Error during signup:', error);
      seterror(error)
      setTimeout(() => {
        seterror(null)
      }, 1500);
      // Handle network or other errors
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.square}>
        <div style={{display:"flex", alignItems:"row", justifyContent:"space-between", width:"70%"}}>
          <div style={{marginTop:"20px"}} onClick={() => {navigate('/')}}>Back</div>
          <h2>SIGN-UP</h2>
        </div>
        <div style={{display:"flex", alignItems:"row", justifyContent:"space-between", width:"100%"}}>
            <div style={styles.text}>First Name</div>
            <div style={styles.text}>Last Name</div>
        </div>
        <div style={{display:"flex", alignItems:"row", justifyContent:"space-between", width:"90%", marginLeft:"10px",gap: '5px'}}>
            <input 
            type="text" 
            placeholder="John" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            style={styles.input} 
            />
            
            <input 
            type="text" 
            placeholder="Doe" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            style={styles.input} 
            />
        </div>
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
        <div style={styles.text}>Repeat Password</div>
        <input 
          type="password" 
          placeholder="*******" 
          value={repeatPassword} 
          onChange={(e) => setRepeatPassword(e.target.value)} 
          style={styles.input} 
        />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '80%', paddingLeft: '25px' }}>
          <button style={styles.button} onClick={handleSignup}>Sign Up</button>
        </div>
        {error&&(<div>{error}</div>)}
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
    margin: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#9EB5D6',
  },
  button: {
    width: '80%',
    padding: '10px',
    marginTop: '10px',
    fontWeight: 'bold',
    fontSize: '18px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  text: {
    width: '80%',
    textAlign: 'left',
    paddingLeft: '20px',
    fontWeight: 'bold',
  },
};

export default SignUp;
