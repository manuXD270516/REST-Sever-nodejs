require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

app.post('/login', (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email }, (err, userDb) => {
    if (err) {
      return res.status(500).json({ ok: false, err });
    }
    if (!userDb) {
      return res.status(400).json({ ok: false, err: { message: 'user failure' } });
    } else {
      // verify match password
      let { password: passUserDb } = userDb;
      let matchPassword = bcrypt.compareSync(password, passUserDb);
      if (!matchPassword) {
        return res.status(400).json({ ok: false, err: { message: 'password failure' } });
      }
      let token = jwt.sign({ user: userDb }, process.env.SIGN_TOKEN, {
        expiresIn: process.env.EXPIRES_IN_TOKEN,
      });
      return res.json({ ok: true, user: userDb, token: token });
    }
  });
});

module.exports = app;
