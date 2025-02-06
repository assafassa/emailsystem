const Message = require('../schema/Message');

module.exports.get_messages = async (req, res) => {
  try {
    const { email } = req.query;  // Get the email address from the query params

    
    if (!email) {
      return res.status(400).json({ result: 'Email address is required' });
    }

    const messages = await Message.find({
      $or: [
        { fromAddress: email }, 
        { toAddress: email, draft: false }
      ]
    });

    if (messages.length === 0) {
      return res.status(404).json({ result: 'No messages found' });
    }

    res.status(200).json({ result: 'Messages retrieved successfully', messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: 'Internal server error' });
  }
};
