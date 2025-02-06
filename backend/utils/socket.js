const socketIo = require('socket.io');

let connectedUsers = {}; // Keep track of connected users by email

// This function sets up socket.io and listens for connections
function setupSocket(server) {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected');
        
        // Register the user when they connect
        socket.on('register', (email) => {
            connectedUsers[email] = socket.id; // Map the email to the socket ID
            console.log(`User registered: ${email}`);
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
function sendNotificationToUser(toAddress, data, io) {
    if (connectedUsers[toAddress]) {
        io.to(connectedUsers[toAddress]).emit('newMessageReceived', data);
        console.log(`Notification sent to ${toAddress}`);
    }
}

module.exports = { setupSocket, sendNotificationToUser };
