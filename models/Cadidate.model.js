const { Schema, model } = require('mongoose');

const candidateSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
  },
  socialMedia: {
    type: String,
  },
});

const Candidate = model('Candidate', candidateSchema);
module.exports = Candidate;
