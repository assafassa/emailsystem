const Message = require('../schema/Message');  // Import the Message model

module.exports.post_message = async (req, res) => {
  try {
    const { title, body, fromAddress, toAddress, draft } = req.body;

    // Validate required fields
    if (!title || !body || !fromAddress || !toAddress) {
      return res.status(400).json({ result: 'Missing required fields' });
    }

    // Check if email addresses match the required format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromAddress) || !emailRegex.test(toAddress)) {
      return res.status(400).json({ result: 'Invalid email format' });
    }

    // Create a new message instance
    const newMessage = new Message({
      title,
      body,
      fromAddress,
      toAddress,
      draft: draft || false,  
    });

    // Save the message to the database
    await newMessage.save();

    // Send a success response
    res.status(201).json({ result: 'Message sent successfully', message: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: 'Internal server error' });
  }
};

