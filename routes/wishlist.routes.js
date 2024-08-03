const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish.model');

router.post('/wishlist', async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      subcategory,
      remote,
      img,
      age_of_wisher,
    } = req.body;
    if (title === '' || description === '' || age_of_wisher === '') {
      res.status(400).json({
        message:
          'provide at least title, description and age of person creating the wish',
      });
      return;
    }
    const newWish = await Wish.create({
      title,
      description,
      category,
      subcategory,
      remote,
      img,
      age_of_wisher,
    });
    res.status(201).json(newWish);
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

    const {
      title,
      description,
      category,
      subcategory,
      remote,
      img,
      age_of_wisher,
    } = req.body;

    const updatedWish = await Wish.findByIdAndUpdate(
      wishID,
      {
        title,
        description,
        category,
        subcategory,
        remote,
        img,
        age_of_wisher,
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
