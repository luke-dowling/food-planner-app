import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { AllMealsRef } from "./currentUser/userData";

export const WeeklyShop = () => {
  const { currentUser } = useAuth();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const setData = () => {
    setLoading(true);
    setTimeout(() => {
      AllMealsRef(currentUser, setMeals);
    }, 100);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <main>
      <h1>Weekly Shop</h1>
      <Link to="/">Home</Link>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {meals.length > 0 && (
            <ul>
              {meals.map((meal, i) => {
                return (
                  <React.Fragment key={i}>
                    {meal.ingredients.map((ingredient, i) => {
                      if (ingredient.ingredient.trim()) {
                        return <li key={i}>{ingredient.ingredient}</li>;
                      }
                    })}
                  </React.Fragment>
                );
              })}
            </ul>
          )}
        </>
      )}
    </main>
  );
};
