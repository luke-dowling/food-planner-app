import React, { useState, useEffect } from "react";

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
    }, 500);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <main>
      <h1>Weekly Shop</h1>

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
                      return <li key={i}>{ingredient.ingredient}</li>;
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
