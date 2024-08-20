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
      teachers,
      minimum_age,
      maximum_age,
      maxParticipants,
      minParticipants,
    });

    // Email notification logic
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Workshop Proposal Submitted',
      text: `A new proposal has been submitted:\n\nTitle: ${title}\nDescription: ${description}\nCategory: ${category}\nSubcategory: ${subcategory}\nProposed by: ${name}\nEmail: ${email}`,
    };
 
    const mailOptionsUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Workshop Proposal Confirmation',
      text: `Dear ${name},\n\nThank you for submitting a workshop proposal. Here are the details:\n\nTitle: ${title}\nDescription: ${description}\nCategory: ${category}\nSubcategory: ${subcategory}\n\nWe will review your proposal and get back to you soon.\n\nBest regards,\nThe Team`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Proposal created, but failed to send email' });
      }
      res.status(201).json({ message: 'Proposal submitted and email sent successfully', newProposal });
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

module.exports = router;
