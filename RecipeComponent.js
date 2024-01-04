import React from 'react';
import PropTypes from 'prop-types';

function RecipeComponent({ recipe }) {
  return (
    <div className="recipe-component">
      <h2>Recipe</h2>
      <p>{recipe}</p>
    </div>
  );
}

RecipeComponent.propTypes = {
  recipe: PropTypes.string.isRequired,
};

export default RecipeComponent;
