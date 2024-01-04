const express = require('express');
const axios = require('axios');
const router = express.Router();

// OpenAI API Key
const OPENAI_API_KEY = 'your_openai_api_key';

// OpenAI API URL
const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// Set up axios instance for OpenAI API
const openai = axios.create({
  baseURL: OPENAI_API_URL,
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Route to generate meal plan
router.post('/mealplan', async (req, res, next) => {
  try {
    const { dietaryPreferences, healthGoals, tasteProfiles } = req.body;

    // Generate prompt for OpenAI API
    const prompt = `Generate a meal plan for a person with the following dietary preferences: ${dietaryPreferences}, health goals: ${healthGoals}, and taste profiles: ${tasteProfiles}.`;

    // Request meal plan from OpenAI API
    const response = await openai.post('/', { prompt, max_tokens: 200 });

    // Extract meal plan from response
    const mealPlan = response.data.choices[0].text.trim();

    // Send meal plan in response
    res.json({ mealPlan });
  } catch (err) {
    next(err);
  }
});

// Route to generate recipe
router.post('/recipe', async (req, res, next) => {
  try {
    const { mealName } = req.body;

    // Generate prompt for OpenAI API
    const prompt = `Generate a recipe for ${mealName}.`;

    // Request recipe from OpenAI API
    const response = await openai.post('/', { prompt, max_tokens: 200 });

    // Extract recipe from response
    const recipe = response.data.choices[0].text.trim();

    // Send recipe in response
    res.json({ recipe });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
