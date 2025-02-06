const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
  },
  body: {
    type: String,
    required: true,
  },
  fromAddress: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  toAddress: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  draft: {
    type: Boolean,
    default: false, 
  },
}, { timestamps: true }); 

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
