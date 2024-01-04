import React from 'react';

function MealPlanComponent({ mealPlan, onRecipeGeneration }) {
  const handleRecipeClick = (mealName) => {
    onRecipeGeneration(mealName);
  };

  return (
    <div className="MealPlanComponent">
      <h2>Your Personalized Meal Plan</h2>
      {mealPlan.map((meal, index) => (
        <div key={index} className="meal">
          <h3>{meal.name}</h3>
          <p>{meal.description}</p>
          <button onClick={() => handleRecipeClick(meal.name)}>Get Recipe</button>
        </div>
      ))}
    </div>
  );
}

export default MealPlanComponent;
