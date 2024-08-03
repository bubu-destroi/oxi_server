const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop.model');

router.post('/workshops', async (req, res, next) => {
  try {
    const {
      title,
      description,
      duration,
      price,
      category,
      remote,
      place,
      subcategory,
      date,
      teacher,
      minimum_age,
      maximum_age,
      maxParticipants,
      minParticipants,
      signedupUsers,
    } = req.body;

    if (
      title === '' ||
      description === '' ||
      duration === '' ||
      price === '' ||
      category === '' ||
      remote === '' ||
      place === '' ||
      subcategory === '' ||
      date === '' ||
      teacher === '' ||
      minimum_age === '' ||
      maxParticipants === '' ||
      minParticipants === ''
    ) {
      res.status(400).json({ message: 'Provide the required information' });
      return;
    }

    const newWorkshop = await Workshop.create({
      title,
      description,
      duration,
      price,
      category,
      remote,
      place,
      subcategory,
      date,
      teacher,
      minimum_age,
      maximum_age,
      maxParticipants,
      minParticipants,
      signedupUsers,
    });
    res.status(201).json(newWorkshop);
  } catch (error) {
    next(error);
  }
});

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

module.exports = router;
