const express = require('express');
const mongoose = require('mongoose');
const apiController = require('./apiController');
const userController = require('./userController');
const communityController = require('./communityController');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mindful-meal-planner', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Middleware for parsing request body
app.use(express.json());

// Routes
app.use('/api', apiController);
app.use('/user', userController);
app.use('/community', communityController);

// Serve static files for React app
app.use(express.static('public'));

// Catch-all route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
