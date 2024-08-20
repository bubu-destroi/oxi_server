const { Schema, model } = require('mongoose');

const proposalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
  },
  socialMedia: {
    type: String,
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  image: {
    type: String,
    default:
      'https://cdn.myportfolio.com/60cb4387-4320-4a64-9df1-40a0d496f12d/bc6a13c3-fbb5-4eeb-b0aa-f0cb987bb1f6.png?h=5acb79b7d88727c455c86674a58df7a0',
  },
  duration: {
    type: String,
    required: [true, 'Duration is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
  },
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  place: {
    type: String,
    required: [true, 'Place is required.'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required.'],
  },
  teachers: {
    type: String,
  },
  minimum_age: {
    type: Number,
    required: [true],
  },
  maximum_age: {
    type: Number,
  },
  maxParticipants: {
    type: Number,
  },
  minParticipants: {
    type: Number,
    default: 1,
  },
});

const Proposal = model('Proposal', proposalSchema);
module.exports = Proposal;
