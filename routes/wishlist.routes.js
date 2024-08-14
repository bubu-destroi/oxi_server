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
      if(!foundUser){
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
    console.log(updatedUser)
    res.status(201).json({newWish, updatedUser});
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
    const singleWish = await Wish.findById(wishID);
    res.status(200).json(singleWish);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/wishlist/:wishID', async (req, res, next) => {
  try {
    const { wishID } = req.params;

    const { title, description, category, subcategory, remote, img } = req.body;
    const updatedWish = await Wish.findByIdAndUpdate(
      wishID,
      {
        title,
        description,
        category,
        subcategory,
        remote,
        img,
      },
      { new: true }
    );

    res.status(200).json(updatedWish);
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
