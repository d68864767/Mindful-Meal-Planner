const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dietaryPreferences: { type: Array, default: [] },
  healthGoals: { type: Array, default: [] },
  tasteProfiles: { type: Array, default: [] },
  sharedMealPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan' }]
});

// Define the MealPlan schema
const MealPlanSchema = new mongoose.Schema({
  meals: { type: Array, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shared: { type: Boolean, default: false }
});

// Define the Recipe schema
const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: String, required: true },
  mealPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan' }
});

// Define the models
const User = mongoose.model('User', UserSchema);
const MealPlan = mongoose.model('MealPlan', MealPlanSchema);
const Recipe = mongoose.model('Recipe', RecipeSchema);

// Export the models
module.exports = {
  User,
  MealPlan,
  Recipe
};
