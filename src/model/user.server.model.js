/* eslint-disable no-underscore-dangle */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const config = require('../../config');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  hash: String,
  name: {
    required: true,
    type: String,
  },
  salt: String,
  steamId: {
    type: Number,
    unique: true,
  },
}, {
  collection: 'users',
});

userSchema.methods.setPassword = function setPassword(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function validatePasswort(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function generateJWT() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
    id: this._id,
    name: this.name,
  }, config.session.secret);
};

userSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    token: this.generateJWT(),
  };
};

// create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);