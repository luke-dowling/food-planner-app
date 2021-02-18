import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AllMealsRef } from "./currentUser/userData";
import styles from "../css/WeeklyPlanner.module.css";
import { Nav } from "./Nav";

export const WeeklyPlan = () => {
  const { currentUser } = useAuth();
  const [meals, setMeals] = useState();

  const daysOfTheWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // grabbing the user data to use in app
  useEffect(() => {
    AllMealsRef(currentUser, setMeals);
  }, []);

  return (
    <main>
      <Nav />
      <h1>Check out your meals this week!</h1>

      {daysOfTheWeek.map((day, i) => {
        if (meals && meals.meals.length > 0) {
          const specificDayMeals = meals.meals.filter(
            (meal) => meal.day === day
          );
          if (specificDayMeals.length > 0) {
            return (
              <div key={i}>
                <h2>{day}</h2>
                <ul className={styles.mealsList}>
                  {specificDayMeals.map((meal, i) => {
                    return (
                      <li key={i}>
                        <Link
                          className={styles.mealListLink}
                          to={{
                            pathname: `/meal/${meal.title}`,
                            state: { meal },
                          }}
                        >
                          {meal.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          }
        } else {
          return (
            <h1>
              You currently have no meals, go to the home page and add a meal!
            </h1>
          );
        }
      })}
    </main>
  );
};
