const { Schema, model } = require('mongoose');

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
    default: 'logo oxitoficina'
  },
});
