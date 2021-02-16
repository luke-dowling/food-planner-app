import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export const MealEdit = () => {
  //grabing the specific meal information from the link
  const location = useLocation();
  const { meal } = location.state;
  console.log(meal.day);
  // grabbing the user data to use in app

  return (
    <div>
      <h1>{meal.title}</h1>
      <Link to={"/"}>Home</Link>
      {meal.img ? (
        <img src={meal.img} alt={meal.imgalt} />
      ) : (
        <h6>insert img here</h6>
      )}
      <h2>Information</h2>
      <ul>
        <li>{meal.day}</li>
        <li>{meal.time}</li>
        <li>{meal.type}</li>
      </ul>
      <h2>Instructions</h2>
      <p>meal instructions go here</p>
    </div>
  );
};
