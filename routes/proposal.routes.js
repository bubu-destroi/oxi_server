const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal.model');
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

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

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < tomorrow) {
      return res
        .status(400)
        .json({ message: 'The date must be tomorrow or later.' });
    }

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

    const proposalDetails = `
      New Workshop Proposal Submitted

      Name: ${name}
      Bio: ${bio}
      Email: ${email}
      Social Media: ${socialMedia}
      Title: ${title}
      Description: ${description}
      Teachers: ${name}
      Image URL: ${image}
      Duration: ${duration}
      Price: €${price}
      Category: ${category}
      Subcategory: ${subcategory}
      Remote: ${remote ? 'Yes' : 'No'}
      Place: ${place}
      Date: ${new Date(date).toLocaleDateString()}
      Minimum Age: ${minimum_age}
      Maximum Age: ${maximum_age || 'None'}
      Maximum Participants: ${maxParticipants || 'No limit'}
      Minimum Participants: ${minParticipants}
    `;

    // Email notification logic
    const mailOptionsAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Workshop Proposal Submitted',
      text: proposalDetails,
    };

    const mailOptionsUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Workshop Proposal Confirmation',
      text: `Dear ${name},\n\nThank you for submitting your workshop proposal. Here are the details:\n\n${proposalDetails}\n\nWe will review your proposal and get back to you soon.\n\n If there is anything missing, please get in touch. \n\n Best regards,\nOXITOFICINA Team`,
    };

    transporter.sendMail(mailOptionsAdmin, (error, info) => {
      if (error) {
        return res.status(500).json({
          message: 'Proposal created, but failed to send email to admin',
        });
      }

      // Attempt to send email to user
      transporter.sendMail(mailOptionsUser, (userError, userInfo) => {
        if (userError) {
          return res.status(500).json({
            message: 'Proposal created, but failed to send email to user',
          });
        }

        res.status(201).json({
          message: 'Proposal submitted and emails sent successfully',
          newProposal,
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

router.get('/proposals', async (req, res, next) => {
  try {
    const allProposals = await Proposal.find();
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
    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalID,
      {
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
      },
      { new: true }
    );
    res.status(200).json(updatedProposal);
  } catch (error) {
    next(error);
  }
});

router.delete('/proposals/:proposalID', async (req, res, next) => {
  try {
    const { proposalID } = req.params;
    await Proposal.findByIdAndDelete(proposalID);
    res.status(200).json({ message: 'Proposal deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
