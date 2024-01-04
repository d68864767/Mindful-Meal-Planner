const express = require('express');
const User = require('./models/User');
const MealPlan = require('./models/MealPlan');
const router = express.Router();

// Route to share a meal plan
router.post('/share', async (req, res, next) => {
  try {
    const { username, mealPlanId } = req.body;

    // Find the user and the meal plan
    const user = await User.findOne({ username });
    const mealPlan = await MealPlan.findOne({ _id: mealPlanId });

    // Check if user and meal plan exist
    if (!user || !mealPlan) {
      return res.status(404).json({ message: 'User or meal plan not found' });
    }

    // Add the meal plan to the user's shared meal plans
    user.sharedMealPlans.push(mealPlan);
    await user.save();

    // Send a success response
    res.json({ message: 'Meal plan shared successfully' });
  } catch (err) {
    next(err);
  }
});

// Route to get shared meal plans
router.get('/shared', async (req, res, next) => {
  try {
    const { username } = req.query;

    // Find the user
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user's shared meal plans
    res.json(user.sharedMealPlans);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
