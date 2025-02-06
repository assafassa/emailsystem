const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, //Template for coreect email
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
