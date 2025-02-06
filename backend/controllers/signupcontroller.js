const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/User');

module.exports.signup_post = async (req, res) => {
  try {
    const {  email, password,firstName,lastName } = req.body;

    // if the user already exists
    const existingUser = await User.findOne( { email } );
    if (existingUser) {
      return res.status(400).json({ result: 'email already exists.' });
    }

    // Creating a new user
    const newUser = new User({ email, password ,firstName,lastName});
    await newUser.save();

    res.status(201).json({ result: 'Sign up successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: 'Internal server error' });
  }
};
