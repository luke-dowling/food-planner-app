import React, { useState } from "react";
import { Firebase } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

export const AddMeal = () => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("monday");
  const [type, setType] = useState("main");
  const [time, setTime] = useState("morning");
  const [ingredientsArray, setIngredientsArray] = useState([
    { id: 0, ingredient: "" },
  ]);
  const [instructionsArray, setInstructionsArray] = useState([
    { id: 0, instruction: "" },
  ]);

  const { currentUser } = useAuth();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = Firebase.firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("mealsData");

    try {
      console.log("something is happening");
      db.add({
        title,
        day,
        type,
        time,
        ingredients: ingredientsArray,
        instructions: instructionsArray,
      })
        .then((docRef) => {
          console.log("this worked");
          //Add the id to the meal to help delete it later
          db.doc(docRef.id).update({ id: docRef.id });
        })
        .then(() => {
          console.log("and this");
          history.push("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  // basic selects and names
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDaySelect = (e) => {
    setDay(e.target.value);
  };

  const handleTypeSelect = (e) => {
    setType(e.target.value);
  };

  const handleTimeSelect = (e) => {
    setTime(e.target.value);
  };

  // modifies the current element in the array
  const handleArrayChange = (e, state, stateItem, setState) => {
    console.log(state[e.target.id]);
    setState([...state], (state[e.target.id][`${stateItem}`] = e.target.value));
  };

  // add an array element and an input
  const addArrayElement = (e, state, stateItem, setState) => {
    e.preventDefault();
    setState([
      ...state,
      {
        id: state.length,
        stateItem: "",
      },
    ]);
  };

  // removes an array element and an input
  const removeArrayElement = (e, id, state, setState) => {
    e.preventDefault();
    state.splice(id, 1);
    state.map((item) => {
      if (item.id > id) {
        item.id -= 1;
      }
    });
    setState([...state]);
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

      {ingredientsArray.map((ingredient) => {
        return (
          <fieldset key={ingredient.id}>
            <span>{"-"}</span>
            <input
              type="text"
              id={ingredient.id}
              value={ingredient.ingredient}
              onChange={(e) =>
                handleArrayChange(
                  e,
                  ingredientsArray,
                  "ingredient",
                  setIngredientsArray
                )
              }
            />
            <button
              onClick={(e) =>
                removeArrayElement(
                  e,
                  ingredient.id,
                  ingredientsArray,
                  setIngredientsArray
                )
              }
            >
              Delete Ingredient
            </button>
          </fieldset>
        );
      })}
      <button
        onClick={(e) => {
          addArrayElement(
            e,
            ingredientsArray,
            "ingredient",
            setIngredientsArray
          );
        }}
      >
        Add Ingredient
      </button>

      {instructionsArray.map((instruction) => {
        return (
          <fieldset key={instruction.id}>
            <span>{instruction.id}</span>
            <input
              type="text"
              id={instruction.id}
              value={instruction.instruction}
              onChange={(e) =>
                handleArrayChange(
                  e,
                  instructionsArray,
                  "instruction",
                  setInstructionsArray
                )
              }
            />
            <button
              onClick={(e) =>
                removeArrayElement(
                  e,
                  instruction.id,
                  instructionsArray,
                  setInstructionsArray
                )
              }
            >
              Delete Instruction
            </button>
          </fieldset>
        );
      })}
      <button
        onClick={(e) => {
          addArrayElement(
            e,
            instructionsArray,
            "instruction",
            setInstructionsArray
          );
        }}
      >
        Add Ingredient
      </button>

      <div>
        <button type="submit">Add meal</button>
      </div>
    </form>
  );
};
