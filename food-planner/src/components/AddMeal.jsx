import React, { useState } from "react";
import { Firebase } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";

export const AddMeal = () => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("monday");
  const [type, setType] = useState("main");
  const [time, setTime] = useState("morning");

  const { currentUser } = useAuth();
  const history = useHistory();

  const handleSubmit = () => {
    try {
      Firebase.firestore()
        .collection("users")
        .doc(currentUser.uid)
        .collection("mealData")
        .doc("meals")
        .update({
          meals: Firebase.firestore().Pd.firebase_.firestore.FieldValue.arrayUnion(
            { title, day, type, time }
          ),
        });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDaySelect = (e) => {
    setDay(e.target.value);
    console.log(day);
  };

  const handleTypeSelect = (e) => {
    setType(e.target.value);
  };

  const handleTimeSelect = (e) => {
    setTime(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Title</label>
        <input
          type="text"
          onChange={handleTitleChange}
          value={title}
          required
        />
      </fieldset>
      <fieldset>
        <label>Day</label>
        <select name="days" id="days" onChange={handleDaySelect} required>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </fieldset>
      <fieldset>
        <label>Type</label>
        <select name="types" id="types" onChange={handleTypeSelect} required>
          <option value="main">Main</option>
          <option value="snack">Snack</option>
        </select>
      </fieldset>
      <fieldset>
        <label>Time</label>
        {type === "main" ? (
          <select name="main" id="main" onChange={handleTimeSelect} required>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        ) : (
          <select name="snack" id="snack" onChange={handleTimeSelect} required>
            <option value="before-morning">Before Morning</option>
            <option value="between-morning-afternoon">
              Between Morning & Afternoon
            </option>
            <option value="between-afternoon-evening">
              Between Afternoon & Evening
            </option>
            <option value="after-evening">After Evening</option>
          </select>
        )}
      </fieldset>

      <button type="submit">Add meal</button>
    </form>
  );
};
