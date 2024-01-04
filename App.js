import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlanComponent from './MealPlanComponent';
import RecipeComponent from './RecipeComponent';
import CommunityComponent from './CommunityComponent';
import UserComponent from './UserComponent';

function App() {
  const [user, setUser] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch user data on initial render
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user');
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleMealPlanGeneration = async (dietaryPreferences, healthGoals, tasteProfiles) => {
    try {
      const response = await axios.post('/api/mealplan', { dietaryPreferences, healthGoals, tasteProfiles });
      setMealPlan(response.data.mealPlan);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecipeGeneration = async (mealName) => {
    try {
      const response = await axios.post('/api/recipe', { mealName });
      setRecipe(response.data.recipe);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <UserComponent user={user} onMealPlanGeneration={handleMealPlanGeneration} />
      {mealPlan && <MealPlanComponent mealPlan={mealPlan} onRecipeGeneration={handleRecipeGeneration} />}
      {recipe && <RecipeComponent recipe={recipe} />}
      <CommunityComponent user={user} />
    </div>
  );
}

export default App;
