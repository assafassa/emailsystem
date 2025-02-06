const express = require('express');
const mongoose = require('mongoose');
const User = require('../schema/User');

module.exports.signin_post = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if the user already exists
    const existingUser = await User.findOne({ email } );
    if (!existingUser) {
        return res.status(400).json({ result: 'Email does not exists.' });
    }else if (existingUser.password!=password){
        return res.status(400).json({ result: 'Email or Password are incorrect.'}); 
    }

    data={firstName:existingUser.firstName,lastName:existingUser.lastName }

    res.status(200).json({ result: 'Sign in successful.',data});
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: 'Internal server error' });
  }
};