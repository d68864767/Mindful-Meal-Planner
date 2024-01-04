import React, { useState } from 'react';
import axios from 'axios';

function UserComponent({ user, onMealPlanGeneration }) {
  const [dietaryPreferences, setDietaryPreferences] = useState(user ? user.dietaryPreferences : '');
  const [healthGoals, setHealthGoals] = useState(user ? user.healthGoals : '');
  const [tasteProfiles, setTasteProfiles] = useState(user ? user.tasteProfiles : '');

  const handlePreferencesChange = async () => {
    try {
      const response = await axios.put('/user/preferences', { username: user.username, dietaryPreferences, healthGoals, tasteProfiles });
      if (response.data.message === 'Preferences updated successfully') {
        onMealPlanGeneration(dietaryPreferences, healthGoals, tasteProfiles);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="UserComponent">
      <h2>Welcome, {user ? user.username : 'Guest'}</h2>
      {user && (
        <div>
          <label>
            Dietary Preferences:
            <input type="text" value={dietaryPreferences} onChange={e => setDietaryPreferences(e.target.value)} />
          </label>
          <label>
            Health Goals:
            <input type="text" value={healthGoals} onChange={e => setHealthGoals(e.target.value)} />
          </label>
          <label>
            Taste Profiles:
            <input type="text" value={tasteProfiles} onChange={e => setTasteProfiles(e.target.value)} />
          </label>
          <button onClick={handlePreferencesChange}>Update Preferences</button>
        </div>
      )}
    </div>
  );
}

export default UserComponent;
