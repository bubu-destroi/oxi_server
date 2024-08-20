const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal.model');

router.post('/proposals', async (req, res, next) => {
  try {
    const {
      name,
      bio,
      email,
      socialMedia,
      title,
      description,
      image,
      duration,
      price,
      category,
      subcategory,
      remote,
      place,
      date,
      teachers,
      minimum_age,
      maximum_age,
      maxParticipants,
      minParticipants,
    } = req.body;

    if (
      name === '' ||
      bio === '' ||
      email === '' ||
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
      res.status(400).json({ message: 'Provide all info' });
      return;
    }

    const newProposal = await Proposal.create({
      name,
      email,
      bio,
      socialMedia,
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
      teachers: name,
      minimum_age,
      maximum_age,
      maxParticipants,
      minParticipants,
    });
    res.status(201).json(newProposal);
  } catch (error) {
    next(error);
  }
  pm;
});

router.get('/proposals', async (req, res, next) => {
  try {
    const allProposals = await Proposal.find(); /* .populate(
        'workshops'
      ); */
    res.status(200).json(allProposals);
  } catch (error) {
    next(error);
  }
});

router.get('/proposals/:proposalID', async (req, res, next) => {
  try {
    const { proposalID } = req.params;
    const singleProposal = await Proposal.findById(proposalID);
    res.status(200).json(singleProposal);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put('/proposals/:proposalID', async (req, res, next) => {
  try {
    const { proposalID } = req.params;
    const {
      name,
      bio,
      email,
      socialMedia,
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

    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalID,
      {
        name,
        email,
        bio,
        socialMedia,
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
      },
      { new: true }
    );

    res.status(200).json(updatedProposal);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/proposals/:proposalID', async (req, res, next) => {
  try {
    const { proposalID } = req.params;
    await Proposal.findByIdAndDelete(proposalID);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
