import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Firebase } from "../firebase";

export const EditMeal = () => {
  //grabing the specific meal information from the link
  const location = useLocation();
  const { meal } = location.state;
  console.log(meal);

  const { currentUser } = useAuth();
  const history = useHistory();

  const [title, setTitle] = useState(meal.title);
  const [day, setDay] = useState(meal.day);
  const [type, setType] = useState(meal.type);
  const [time, setTime] = useState(meal.time);
  const [instructionsArray, setInstructionsArray] = useState(meal.instructions);
  const [ingredientsArray, setIngredientsArray] = useState(meal.ingredients);

  const handleSubmit = () => {
    try {
      Firebase.firestore()
        .collection("users")
        .doc(currentUser.uid)
        .collection("mealsData")
        .doc(meal.id)
        .update({
          meals: Firebase.firestore().Pd.firebase_.firestore.FieldValue.arrayUnion(
            {
              title,
              day,
              type,
              time,
              ingredients: ingredientsArray,
              instructions: instructionsArray,
              id: meal.id,
            }
          ),
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{meal.title}</h1>
      <Link to={"/"}>Home</Link>
      <Link to={{ pathname: `/veiw/${meal.title}`, state: { meal } }}>
        Back
      </Link>
      {meal.img ? (
        <img src={meal.img} alt={meal.imgalt} />
      ) : (
        <h6>insert img here</h6>
      )}

      <h2>Information</h2>
      <button>Edit information</button>
      <h2>Ingredients</h2>
      <button>Edit ingredients</button>
      <h2>Instructions</h2>
      <button>Edit Instructions</button>

      <div></div>
    </div>
  );
};

/*

 const handleSubmit = () => {
   try {
     Firebase.firestore()
       .collection("users")
       .doc(currentUser.uid)
       .collection("mealData")
       .doc("meals")
       .update({
         meals: Firebase.firestore().Pd.firebase_.firestore.FieldValue.arrayUnion(
           {
             title,
             day,
             type,
             time,
             ingredients: ingredientsArray,
             instructions,
           }
         ),
       });
     history.push("/");
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
 const handleIngredientChange = (e) => {
   setIngredientsArray(
     [...ingredientsArray],
     (ingredientsArray[e.target.id].ingredient = e.target.value)
   );
 };

 // add an array element and an input
 const addIngredient = (e) => {
   e.preventDefault();
   setIngredientsArray([
     ...ingredientsArray,
     {
       id: ingredientsArray.length,
       ingredient: "",
     },
   ]);
 };

 // removes an array element and an input
 const removeIngredient = (e, id) => {
   e.preventDefault();
   ingredientsArray.splice(id, 1);
   ingredientsArray.map((ingredient) => {
     if (ingredient.id > id) {
       ingredient.id -= 1;
       console.log("ingredient", ingredient);
     }
   });
   setIngredientsArray([...ingredientsArray]);
 };

 const handleInstructionsChange = (e) => {
   setInstructions(e.target.value);
 };

 return (
   <form onSubmit={handleSubmit}>
     <fieldset>
       <label>Title</label>
       <input type="text" onChange={handleTitleChange} value={title} required />
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
           <span>{ingredient.id + 1}</span>
           <input
             type="text"
             id={ingredient.id}
             value={ingredient.ingredient}
             onChange={handleIngredientChange}
           />
           <button onClick={(e) => removeIngredient(e, ingredient.id)}>
             Delete Ingredient
           </button>
         </fieldset>
       );
     })}
     <button onClick={addIngredient}>Add Ingredient</button>

     <fieldset>
       <textarea
         name="instructions"
         id="instructions"
         placeholder="Add your cooking instructions"
         onChange={handleInstructionsChange}
       />
     </fieldset>

     <button type="submit">Add meal</button>
   </form>
 );

 */
