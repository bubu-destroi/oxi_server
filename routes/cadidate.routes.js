const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher.model');

router.post('/teachers', async (req, res, next) => {
  try {
    const { name, bio, email, socialMedia } = req.body;

    if (name === '' || bio === '' || email === '') {
      res.status(400).json({ message: 'Provide at least name and bio' });
      return;
    }

    const newTeacher = await Teacher.create({
      name,
      email,
      bio,
      socialMedia,
    });
    res.status(201).json(newTeacher);
  } catch (error) {
    next(error);
  }
});

router.get('/teachers', async (req, res, next) => {
  try {
    const allTeachers = await Teacher.find(); /* .populate(
        'workshops'
      ); */
    res.status(200).json(allTeachers);
  } catch (error) {
    next(error);
  }
});

router.get('/teachers/:teacherID', async (req, res, next) => {
  try {
    const { teacherID } = req.params;
    const singleTeacher = await Teacher.findById(teacherID).populate(
      'previous_workshops'
    );
    res.status(200).json(singleTeacher);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/teachers/:teacherID', async (req, res, next) => {
  try {
    const { teacherID } = req.params;
    const { name, bio, email, socialMedia, previous_workshops } = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherID,
      { name, email, bio, socialMedia, previous_workshops },
      { new: true }
    );

    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/teachers/:teacherID', async (req, res, next) => {
  try {
    const { teacherID } = req.params;
    await Teacher.findByIdAndDelete(teacherID);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
