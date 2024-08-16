const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish.model');
const User = require('../models/User.model');

router.post('/wishlist', async (req, res, next) => {
  try {
    const { title, description, category, subcategory, img, remote, userID } =
      req.body;
    const foundUser = await User.findById(userID);
    if (title === '' || description === '') {
      res.status(400).json({
        message: 'provide at least title, description',
      });
      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return;
    }
    const newWish = await Wish.create({
      title,
      description,
      category,
      subcategory,
      remote,
      img,
      age_of_wisher: foundUser.age,
      created_by: foundUser._id,
    });
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $push: {
          wishes: newWish._id,
        },
      },
      { new: true }
    ).populate('wishes', 'title');
    console.log(updatedUser);
    res.status(201).json({ newWish, updatedUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/wishlist', async (req, res, next) => {
  try {
    const allWishes = await Wish.find();
    res.status(200).json(allWishes);
  } catch {
    console.log(error);
  }
});

router.get('/wishlist/:wishID', async (req, res, next) => {
  try {
    const { wishID } = req.params;
    const singleWish = await Wish.findById(wishID).populate('interested_users');
    res.status(200).json(singleWish);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/wishlist/:wishID', async (req, res, next) => {
  try {
    const { wishID } = req.params;

    const { title, description, category, subcategory, remote, img, userID } =
      req.body;
    const updatedWish = await Wish.findByIdAndUpdate(
      wishID,
      {
        title,
        description,
        category,
        subcategory,
        remote,
        img,
        created_by,
      },
      { new: true }
    );

    res.status(200).json(updatedWish);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
router.put('/wishlist/:wishID/join', async (req, res, next) => {
  try {
    const { wishID } = req.params;
    const { userID } = req.body;
    const foundWish = await Wish.findById(wishID);
    const foundUser = await User.findById(userID);
    //added age_of_wisher, created_by, interested_users
    /*   const {
      title,
      description,
      category,
      subcategory,
      remote,
      img,
      age_of_wisher,
      created_by,
      interested_users,
    } = req.body; */
    const isInWaitingList = foundWish.interested_users.includes(userID);
    if (isInWaitingList) {
      return res
        .status(400)
        .json({
          messge: 'You have already shown interested to join this workshop!',
        });
    }
    const updatedWish = await Wish.findByIdAndUpdate(
      wishID,
      {
        $push: {
          interested_users: userID,
        },
      },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $push: {
          userWishWaitingList: wishID,
        },
      },
      { new: true }
    );

    res.status(200).json({ updatedWish, updatedUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/wishlist/:wishID', async (req, res, next) => {
  try {
    const { wishID } = req.params;
    await Wish.findByIdAndDelete(wishID);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
