const { Schema, model } = require('mongoose');
const User = require('../models/User.model')

const wishSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    enum: [
      'math',
      'arts',
      'science',
      'dance',
      'sports',
      'religion',
      'social studies',
      'philosophy',
      'literature',
      'technologies',
    ],
  },
  subcategory: {
    type: String,
  },
  remote: {
    type: Boolean,
  },
  img: {
    type: String,
    default:
      'https://cdn.myportfolio.com/60cb4387-4320-4a64-9df1-40a0d496f12d/bc6a13c3-fbb5-4eeb-b0aa-f0cb987bb1f6.png?h=5acb79b7d88727c455c86674a58df7a0',
  },
  age_of_wisher: {
    type: Date,
  },
});

const Wish = model('Wish', wishSchema);
module.exports = Wish;
