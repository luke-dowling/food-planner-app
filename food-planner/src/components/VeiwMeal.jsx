import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export const VeiwMeal = () => {
  //grabing the specific meal information from the link
  const location = useLocation();
  const { meal } = location.state;
  console.log(meal.day);
  // grabbing the user data to use in app

  return (
    <div>
      <h1>{meal.title}</h1>
      <div>
        <Link to={{ pathname: `/edit/${meal.title}`, state: { meal } }}>
          Edit Meal
        </Link>
      </div>
      <div>
        <Link to={"/"}>Home</Link>
      </div>
      {meal.img && <img src={meal.img} alt={meal.imgalt} />}
      <h2>Information</h2>
      <ul>
        <li>{meal.day}</li>
        <li>{meal.time}</li>
        <li>{meal.type}</li>
      </ul>
      <h2>Ingredients</h2>
      <ul>
        {meal.ingredients ? (
          meal.ingredients.map((ingredient) => {
            return <li key={ingredient.id}>{ingredient.ingredient}</li>;
          })
        ) : (
          <p>You have no ingredients for this meal yet</p>
        )}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {meal.instructions ? (
          meal.instructions.map((instruction) => {
            return <li key={instruction.id}>{instruction.instruction}</li>;
          })
        ) : (
          <p>You have no instructions for this meal yet</p>
        )}
      </ol>
    </div>
  );
};
