const { Schema, model } = require('mongoose');

const workshopSchema = new Schema(
  {
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
    remote: {
      type: Boolean,
    },
    place: {
      type: String,
      required: [true, 'Place is required.'],
    },
    subcategory: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, 'Date is required.'],
    },
    teacher: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
      },
    ],
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
    signedupUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Workshop = model('Workshop', workshopSchema);

module.exports = Workshop;
