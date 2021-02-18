import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { UserRef, TodaysMealsRef } from "./currentUser/userData";
import { Nav } from "./Nav";

import styles from "../css/Dashboard.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { dateTime } = useContext(AppContext);

  const [meals, setMeals] = useState([]);
  const [userData, setUserData] = useState();

  // grabbing the user data to use in app
  useEffect(() => {
    UserRef(currentUser, setUserData);
    TodaysMealsRef(currentUser, meals, setMeals, dateTime);
  }, []);

  //! console.log("why is this run three times? => ", meals);

  return (
    <>
      <Nav />
      <main className={styles.container}>
        <h1 className={styles.heading}>
          Hey
          {userData && userData.name !== undefined
            ? ` ${userData.name},`
            : " there,"}
        </h1>
        {meals && meals.length > 0 ? (
          <h1 className={styles.heading}>Here's your plan for today!</h1>
        ) : (
          <h1>Set up your plan for today by adding a recipe!</h1>
        )}

        {/* show a menu where you can see all your meals */}
        {meals.length > 0 && (
          <ul className={styles.mealsList}>
            {meals.map((meal, i) => {
              return (
                <li key={i}>
                  <Link
                    className={styles.mealListLink}
                    to={{ pathname: `/veiw/${meal.title}`, state: { meal } }}
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
