const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    admin: {
      type: Boolean,
    },
    parent_name: {
      type: String,
      required: [true, 'Parent name is required'],
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },
    phone_number: {
      type: Number,
      required: [true, 'Phone number is required'],
    },
    id_card_picture: {
      type: String,
      required: [true, 'ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    learner_username: {
      type: String,
      required: [true, 'Learner username is required.'],
    },
    date_of_birth: {
      type: Date,
      required: [
        true,
        'date of birth is required for the workshops conditions',
      ],
    },
    age: {
      type: Number,
      required: [true, 'Age is required for the workshops conditions'],
    },
    wishes: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Wish' 
      }
    ],
    signedUp_workshops: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Workshop',
      },
    ],
    userWaitingList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Workshop',
      },
    ],
    courses_taken: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Workshop',
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
