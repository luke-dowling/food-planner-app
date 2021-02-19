import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { UserRef, TodaysMealsRef } from "./currentUser/userData";
import { Nav } from "./Nav";
import { Firebase } from "../firebase";

import styles from "../css/Dashboard.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { dateTime } = useContext(AppContext);

  const timesOfDay = [
    "before-morning",
    "morning",
    "between-morning-afternoon",
    "afternoon",
    "between-afternoon-evening",
    "evening",
    "after-evening",
  ];
  const [meals, setMeals] = useState([]);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);

  const deleteMeal = (meal) => {
    let deleteDocument = Firebase.firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("mealsData")
      .doc(meal.id)
      .delete();
    return deleteDocument;
  };

  const setData = () => {
    setLoading(true);
    setMeals([]);
    setTimeout(() => {
      UserRef(currentUser, setUserData);
      TodaysMealsRef(currentUser, setMeals, dateTime);
    }, 100);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // grabbing the user data to use in app
  useEffect(() => {
    setData();
  }, []);

  //! console.log("why is this run three times? => ", meals);

  return (
    <>
      <Nav />
      <main className={styles.container}>
        {loading && <h1>Loading...</h1>}
        {!loading && (
          <h1 className={styles.heading}>
            Hey
            {userData && userData.name !== undefined
              ? ` ${userData.name},`
              : " there,"}
          </h1>
        )}
        {!loading &&
          (meals.length > 0 ? (
            <h1 className={styles.heading}>Here's your plan for today!</h1>
          ) : (
            <h1 className={styles.heading}>
              Set up your plan for today by adding a recipe!
            </h1>
          ))}

        {!loading &&
          meals.length > 0 &&
          // we need to see what time of day these things happen first
          timesOfDay.map((time) => {
            let hasBeenObsereved = false;
            return (
              <React.Fragment>
                {meals.map((meal, i) => {
                  if (meal.time === time && !hasBeenObsereved) {
                    hasBeenObsereved = true;
                    return (
                      <div className={styles.mealsList} key={i}>
                        <h2>{time}</h2>
                      </div>
                    );
                  }
                })}
                {meals.map((meal, i) => {
                  if (meal.time === time) {
                    return (
                      <div className={styles.mealsList} key={i}>
                        <Link
                          className={styles.mealListLink}
                          to={{
                            pathname: `/veiw/${meal.title}`,
                            state: { meal },
                          }}
                        >
                          {meal.title}
                        </Link>
                        <button
                          id="reset"
                          onClick={() => {
                            deleteMeal(meal);
                            setData();
                          }}
                        >
                          <Link to="/">Delete this meal</Link>
                        </button>
                      </div>
                    );
                  }
                })}
              </React.Fragment>
            );
          })}
        <Link to="/add-meal">
          <button className={styles.addMealBtn}>
            <h3>
              <AiOutlinePlusCircle />
            </h3>
          </button>
        </Link>
      </main>
    </>
  );
};
