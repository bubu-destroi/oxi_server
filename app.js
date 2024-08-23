// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api', userRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const workshopRoutes = require('./routes/workshop.routes');
app.use('/api', workshopRoutes);

const wishlistRoutes = require('./routes/wishlist.routes');
app.use('/api', wishlistRoutes);

const teacherRoutes = require('./routes/teacher.routes');
app.use('/api', teacherRoutes);

const proposalRoutes = require('./routes/proposal.routes');
app.use('/api', proposalRoutes);

const suggestionlRoutes = require('./routes/suggestions.routes');
app.use('/api', suggestionlRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error details to the console
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
