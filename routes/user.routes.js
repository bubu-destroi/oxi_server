const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

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

module.exports = router;
