const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  firstName:{
    type: String,
    required: true,
    minlength: 2,
  },
  lastName:{
    type: String,
    required: true,
    minlength: 2,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
