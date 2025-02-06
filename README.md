# Email Mockup Project

## Overview
This project is a simple email mockup application built with a Node.js backend and a React frontend. It allows users to sign up, sign in, send messages, and view received messages.

## Steps Implemented

### 1. Create a Backend Node Environment
- Set up a Node.js environment.
- Connected the backend to MongoDB using Mongoose.

### 2. Database Setup
- Created a MongoDB database with two collections:
  - **User**: Stores user credentials and other relevant data.
  - **Message**: Stores email messages sent between users.

### 3. User Authentication
- Implemented **sign-up** and **sign-in** functionality.
- Backend routes with POST requests.
- Created a **Signin component** in React to allow user login.

### 4. Home Page Components
- Built the home page with the following components:
  - **Navbar**: Displays navigation options.
  - **Sidebar**: Display a list of message previews.
  - **MessageView**: Displays the full content of a selected message.
- Implemented a **GET request** to retrieve messages from the backend based on the user's email.
  - Messages that are retrieved if the user is the sender (**fromAddress**) 
  or the recipient (**toAddress**) and the message is **not a draft**.

### 5. Sidebar Functionality
- The **Sidebar** component consists of clickable **MessagePreview** components, that on click shows the display the full message content on the **MessageView**.

### 6. New Message Modal
- Implemented a **NewMessage modal** overlay on the home page.
- Added a **send function** in the backend to store new messages in MongoDB.
- Messages are sent using a **POST request** to `http://localhost:8000/postmessage`.
- The frontend updates the state by prepending new messages to the existing list.

---

## Next Steps

### 7. Implement Message Retrieval Trigger
- Figure out a way to **automatically retrieve received messages** (possibly using WebSockets).

### 8. Additional Features to Complete
- **Saved drafts**: Implement draft-saving functionality.
- **Sorting sidebar messages**: Add buttons to filter messages by **inbox, outbox, and drafts**.

### 9. Sign-Up Component
- Create a dedicated **sign-up component** separate from the sign-in page.

### 10. Security Enhancements
- **Hash user passwords** for secure storage.
- **Implement JWT authentication** to ensure users can only access their messages.

---
