const express = require('express');
const User = require('./models/User');
const router = express.Router();

// Route to register a new user
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, dietaryPreferences, healthGoals, tasteProfiles } = req.body;

    // Create a new user
    const user = new User({ username, password, dietaryPreferences, healthGoals, tasteProfiles });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
});

// Route to login a user
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    // Check if user exists and password is correct
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Send a success response
    res.json({ message: 'User logged in successfully' });
  } catch (err) {
    next(err);
  }
});

// Route to update a user's preferences
router.put('/preferences', async (req, res, next) => {
  try {
    const { username, dietaryPreferences, healthGoals, tasteProfiles } = req.body;

    // Find the user and update their preferences
    const user = await User.findOneAndUpdate(
      { username },
      { dietaryPreferences, healthGoals, tasteProfiles },
      { new: true }
    );

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send a success response
    res.json({ message: 'Preferences updated successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
