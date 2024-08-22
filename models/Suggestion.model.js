const { Schema, model } = require('mongoose');

const suggestionSchema = new Schema({
  age: {
    type: Number,
    required: [true, 'age is required']
  },
  comment: {
    type: String,
    required: [true, 'comment is required'],
  },
});

const Suggestion = model('Suggestion', suggestionSchema)
module.exports = Suggestion