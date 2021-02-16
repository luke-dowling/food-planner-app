import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { UserRef, MealsRef } from "./currentUser/userData";
import { Nav } from "./Nav";

import styles from "../css/Dashboard.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [dt, setDt] = useState({});
  const [meals, setMeals] = useState();
  const [userData, setUserData] = useState();
  const [todaysMeals, setTodaysMeals] = useState([]);

  // grabbing the user data to use in app
  useEffect(() => {
    UserRef(currentUser, setUserData);
    MealsRef(currentUser, setMeals);
  }, []);

  useEffect(() => {
    let dt = DateTime.local();
    setDt(dt);
  }, []);

  useEffect(() => {
    meals !== undefined &&
      setTodaysMeals(
        meals.meals.filter(
          (item) =>
            item.day === dt.toLocaleString({ weekday: "long" }).toLowerCase()
        )
      );
  }, [meals]);

  return (
    <>
      <Nav />
      <main className={styles.container}>
        <h1 className={styles.heading}>
          Hey
          {userData && userData.name !== undefined
            ? ` ${userData.name}!`
            : "there!"}{" "}
          It's {dt.toLocaleString({ weekday: "long" })}, what you cooking?
        </h1>

        {/* show a menu where you can see all your meals */}
        {todaysMeals.length > 0 && (
          <ul className={styles.mealsList}>
            {todaysMeals.map((meal, i) => {
              return (
                <li key={i}>
                  <Link
                    className={styles.mealListLink}
                    to={{ pathname: `/meal/${meal.title}`, state: { meal } }}
                  >
                    {meal.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <Link to="/add-meal">
          <button className={styles.addMealBtn}>
            <h3>
              <AiOutlinePlusCircle />
            </h3>
          </button>
        </Link>

        {/* on the front page should be what it does, or maybe what todays meals are */}
      </main>
    </>
  );
};
