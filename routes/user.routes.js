const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

router.get('/users/', async (req, res, next) => {
  try {
    const { userID } = req.params;
    const allUsers = await User.find()
      .populate('wishes', 'title')
      .populate('signedUp_workshops', 'title')
      .populate('userWaitingList', 'title')
      .populate('userWishWaitingList', 'title');


    if (!allUsers) {
      return res.status(404).json({ message: 'Users not found' });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


router.get('/users/:userID', async (req, res, next) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID)
      .populate('wishes', 'title')
      .populate('signedUp_workshops', 'title')
      .populate('userWaitingList', 'title')
      .populate('userWishWaitingList', 'title');


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.put('/users/:userID', async (req, res, next) => {
  try {
    const { userID } = req.params;
const {
  admin,
  approved,
  parent_name,
  address,
  phone_number,
  id_card_picture,
  email,
  password,
  learner_username,
  date_of_birth,
  age,
  wishes,
  signedUp_workshops,
  userWaitingList,
  courses_taken} = req.body

    const updatedUser = await User.findByIdAndUpdate(userID, {
      admin,
      approved,
      parent_name,
      address,
      phone_number,
      id_card_picture,
      email,
      password,
      learner_username,
      date_of_birth,
      age,
      wishes,
      signedUp_workshops,
      userWaitingList,
      courses_taken})
      .populate('wishes', 'title')
      .populate('signedUp_workshops', 'title')
      .populate('userWaitingList', 'title')
      .populate('userWishWaitingList', 'title');


    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


module.exports = router;
