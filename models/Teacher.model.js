const { Schema, model } = require('mongoose');

const teacherSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
  },
  socialMedia: {
    type: String,
  },
  previous_workshops: [{
    type: Schema.Types.ObjectId,
    ref: 'Workshop',
  }],
});

const Teacher = model('Teacher', teacherSchema);
module.exports = Teacher;
