const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/users');

module.exports.signup_post = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ result: 'Username or email already exists.' });
    }

    // Creating a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ result: 'Sign up successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: 'Internal server error' });
  }
};
