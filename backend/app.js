const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const app = express();
app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());
const dbURI = "mongodb+srv://assaf141:1989Taylor@cluster0.cddb0.mongodb.net/emailsystem?retryWrites=true&w=majority&appName=Cluster0";
const SignupController = require('./controllers/signupcontroller');
const SigninController = require('./controllers/signincontroller');
const PostMessageController = require('./controllers/postmessage'); 
const GetMessageController = require('./controllers/getmessages'); 
const { setupSocket, sendNotificationToUser } = require('./utils/socket'); 
const server = http.createServer(app); // Create an HTTP server for Socket.io
const io = setupSocket(server); 

// Connect to MongoDB and start server if successful
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(8000, () => {
            console.log('Server is running on port 8000');
        });
    })
    .catch((err) => console.log(err));

// Define the signup POST route
app.get('/', (req, res) => {
    res.send('Hello, the server is running!');
  });

app.post('/signup' ,SignupController.signup_post)


app.post('/signin' ,SigninController.signin_post)
app.post('/postmessage', (req, res) => {
    const { fromAddress, toAddress, body } = req.body;

    //add message to mongoDB
    PostMessageController.post_message(req, res);

    // Send the triger to the recipient if they are connected
    sendNotificationToUser(toAddress, { fromAddress, body }, io);

    res.status(200).json({ message: 'Message posted and notification sent' });
});
app.get('/getmessages', GetMessageController.get_messages);