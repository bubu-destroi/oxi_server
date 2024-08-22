const express = require('express');
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');

// ℹ️ Handles password encryption
const jwt = require('jsonwebtoken');


// Require the User model in order to interact with the database
const User = require('../models/User.model');

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require('../middleware/jwt.middleware.js');


const sendEmail = require('../mailer')

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;



// POST /auth/signup  - Creates a new user in the database
router.post('/signup', async (req, res, next) => {
  try {
    const {
      admin = false,
      parent_name,
      address,
      phone_number,
      id_card_picture,
      email,
      password,
      learner_username,
      date_of_birth,
      age,
      wishes,
      courses_taken,
    } = req.body;

    // Check if email or password or name are provided as empty strings
    if (
      email === '' ||
      password === '' ||
      parent_name === '' ||
      address === '' ||
      phone_number === '' ||
      id_card_picture === '' ||
      learner_username === '' ||
      date_of_birth === '' ||
      wishes === '' ||
      courses_taken === ''
    ) {
      res.status(400).json({ message: 'Provide the required information' });
      return;
    }

    // This regular expression check that the email is of a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Provide a valid email address.' });
      return;
    }

    // This regular expression checks password for special characters and minimum length
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
      });
      return;
    }

    /*   // Check the users collection if a user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: 'User already exists.' });
        return;
      }
 */
    // If email is unique, proceed to hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user in the database
    // We return a pending promise, which allows us to chain another `then`

    const newUser = await User.create({
      admin,
      parent_name,
      address,
      phone_number,
      id_card_picture,
      email,
      password: hashedPassword,
      learner_username,
      date_of_birth,
      age,
      wishes,
      courses_taken,
    });

    const emailSubject = 'Welcome to OXITOFICINA Platform';
    const emailContent = `<h1>Hello ${learner_username},</h1><p>Thank you for an account on our platform!\n\n We will approve your profile as soon as possible, but in the meanwhile you can start signing up for workshops and placing your wishes!\n\n See you soon\n\n Zarolina from OXITOFICINA</p>`;

    const notificationSubject = 'New User Signup Notification';
    const notificationContent = `<h1>New User Signup</h1><p>A new user has signed up with the following details:</p><ul><li>Email: ${email}</li><li>Username: ${learner_username}</li><li>Date of Birth: ${date_of_birth}</li></ul>`;
 
    const adminEmail = process.env.EMAIL_USER
  

    try {
      await sendEmail(email, emailSubject, emailContent);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }

    try {

      await sendEmail(adminEmail, notificationSubject, notificationContent);
      console.log('Notification email sent successfully.');
    } catch (error) {
      console.error('Error sending notification email:', error);
    }

    const cleanUser = {
      admin: newUser.admin,
      _id: newUser._id,
      parent_name: newUser.parent_name,
      address: newUser.address,
      phone_number: newUser.phone_number,
      id_card_picture: newUser.id_card_picture,
      email: newUser.email,
      learner_username: newUser.learner_username,
      date_of_birth: newUser.date_of_birth,
      age: newUser.age,
      wishes: newUser.wishes,
      courses_taken: newUser.courses_taken,
    };

    

    res.status(201).json(cleanUser);
  } catch (error) {
    console.log("Error during signup:", error)
    next(error);
  }
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      res.status(400).json({ message: 'provide a valid email and password' });
    }
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(400).json({ message: 'user not found' });
    }

    //compare passwords
    const passwordCorrect = bcrypt.compareSync(password, userExists.password);
    if (!passwordCorrect) {
      res.status(400).json({ message: 'invalid credentials' });
      return;
    }

    const { _id, learner_username, admin } = userExists;
    //same as: const payload= {_id: userExists._id, username: userExists.username, email}
    const payload = {
      admin,
      _id,
      email,
      learner_username,
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '14d',
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, async (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;
