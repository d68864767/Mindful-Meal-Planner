import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommunityComponent({ user }) {
  const [sharedMealPlans, setSharedMealPlans] = useState([]);

  useEffect(() => {
    // Fetch shared meal plans on initial render
    const fetchSharedMealPlans = async () => {
      try {
        const response = await axios.get('/community/shared', { params: { username: user.username } });
        setSharedMealPlans(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      fetchSharedMealPlans();
    }
  }, [user]);

  const handleShareMealPlan = async (mealPlanId) => {
    try {
      const response = await axios.post('/community/share', { username: user.username, mealPlanId });
      if (response.data.message === 'Meal plan shared successfully') {
        setSharedMealPlans(prevSharedMealPlans => [...prevSharedMealPlans, mealPlanId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="CommunityComponent">
      <h2>Shared Meal Plans</h2>
      {sharedMealPlans.length > 0 ? (
        sharedMealPlans.map(mealPlan => (
          <div key={mealPlan._id}>
            <h3>{mealPlan.name}</h3>
            <button onClick={() => handleShareMealPlan(mealPlan._id)}>Share this meal plan</button>
          </div>
        ))
      ) : (
        <p>No shared meal plans yet.</p>
      )}
    </div>
  );
}

export default CommunityComponent;
