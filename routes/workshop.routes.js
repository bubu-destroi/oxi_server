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

router.get('/workshops', async (req, res, next) => {
  try {
    const allWorkshops = await Workshop.find();
    res.status(200).json(allWorkshops);
  } catch (error) {
    next(error);
  }
});

router.get('/workshops/:workshopID', async (req, res, next) => {
  try {
    const { workshopID } = req.params;
    const singleWorkshop = await Workshop.findById(
      workshopID
    ); /* .populate('teacher', 'user') */
    res.status(200).json(singleWorkshop);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/workshops/:workshopID', async (req, res, next) => {
  try {
    const { workshopID } = req.params;
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

    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      workshopID,
      {
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
      },
      { new: true }
    );

    res.status(200).json(updatedWorkshop);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/workshops/:workshopID', async (req, res, next) => {
  try {
    const { workshopID } = req.params;
    await Workshop.findByIdAndDelete(workshopID);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
