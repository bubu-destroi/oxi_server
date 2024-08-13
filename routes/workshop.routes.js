const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop.model');
const Teacher = require('../models/Teacher.model');
const User = require('../models/User.model');

router.post('/workshops', async (req, res, next) => {
  try {
    const {
      title,
      description,
      image,
      duration,
      price,
      category,
      remote,
      place,
      subcategory,
      date,
      teachers,
      minimum_age,
      maximum_age,
      maxParticipants,
      minParticipants,
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
      teachers === '' ||
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
      image: image
        ? image
        : 'https://cdn.myportfolio.com/60cb4387-4320-4a64-9df1-40a0d496f12d/bc6a13c3-fbb5-4eeb-b0aa-f0cb987bb1f6.png?h=5acb79b7d88727c455c86674a58df7a0',
      duration,
      price,
      category,
      remote,
      place,
      subcategory,
      date,
      teachers,
      minimum_age,
      maximum_age,
      maxParticipants,
      minParticipants,
    });
    //fazer push de um id para dentro dum array
    //$ sintaxe mongoDB
    const foundTeachers = await Teacher.find({ _id: { $in: teachers } });
    if (foundTeachers) {
      foundTeachers.forEach(async (singleTeacher) => {
        singleTeacher.previous_workshops.push(newWorkshop._id);
        await singleTeacher.save();
      });
    }

    /*    await Teacher.findByIdAndUpdate(teacher, {
      $push: {
        previous_workshops: newWorkshop._id,
      },
    }); */
    res.status(201).json(newWorkshop);
  } catch (error) {
    next(error);
  }
});

router.get('/workshops', async (req, res, next) => {
  try {
    const allWorkshops = await Workshop.find().populate('teachers','name');
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
    ).populate('teachers', 'name')
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
      image,
      duration,
      price,
      category,
      remote,
      place,
      subcategory,
      date,
      teachers,
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
        image,
        duration,
        price,
        category,
        remote,
        place,
        subcategory,
        date,
        teachers,
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

router.put('/workshops/:workshopID/join', async (req, res, next) => {
  
  try {
    
    const { workshopID } = req.params;
    const { userID } = req.body;
    //enviar frontend 

    const foundWorkshop = await Workshop.findById(workshopID)
    if(foundWorkshop.maxParticipants <= foundWorkshop.signedupUsers.length){
      await Workshop.findByIdAndUpdate(
        workshopID,
        {
          $push: {
            waitingList: userID,
          },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        userID,
        {
          $push: {
            userWaitingList: workshopID,
          },
        },
        { new: true }
      );
      res.status(400).json({message: 'workshop full! you are in the waiting list :) '})
      return
    }
    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      workshopID,
      {
        $push: {
          signedupUsers: userID,
        },
      },
      { new: true }
    );
//copiar isto para a rota wish no primeiro post
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        $push: {
          signedUp_workshops: workshopID,
        },
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
