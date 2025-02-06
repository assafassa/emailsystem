const socketIo = require('socket.io');

let connectedUsers = {}; // Keep track of connected users by email

// This function sets up socket.io and listens for connections
function setupSocket(server) {
    const io = socketIo(server, {
        cors: {
            origin: "http://localhost:3000", // Allow requests from your frontend URL
            methods: ["GET", "POST"], // Allow GET and POST methods
            allowedHeaders: ["Content-Type"], // Allow specific headers if needed
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected',connectedUsers);
        
        // Register the user when they connect
        socket.on('user_login', (email) => {
            connectedUsers[email] = socket.id; // Map the email to the socket ID
            console.log(`User registered: ${email}`,connectedUsers);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            for (const [email, socketId] of Object.entries(connectedUsers)) {
                if (socketId === socket.id) {
                    delete connectedUsers[email];
                    console.log(`User disconnected: ${email}`);
                    break;
                }
            }
        });
    });

    // Return the io instance to be used for emitting messages
    return io;
}

// Function to send a message to a specific connected user
function sendNotificationToUser(toAddress, io) {
    if (connectedUsers[toAddress]) {
        const data = { message: "new message received" };
        io.to(connectedUsers[toAddress]).emit('newMessageReceived', data);
        console.log(`Notification sent to ${toAddress}`);
    }
}

module.exports = { setupSocket, sendNotificationToUser };
