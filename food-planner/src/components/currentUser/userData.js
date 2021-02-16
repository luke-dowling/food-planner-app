import { Firebase } from "../../firebase";

export const UserRef = (currentUser, setState) => {
  Firebase.firestore()
    .collection("users")
    .doc(currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return setState(doc.data());
      } else {
        console.log("data doesnt exsist");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const MealsRef = (currentUser, setState) => {
  Firebase.firestore()
    .collection("users")
    .doc(currentUser.uid)
    .collection("mealData")
    .doc("meals")
    .get()
    .then((doc) => {
      if (doc.exists) {
        return setState(doc.data());
      } else {
        console.log("data doesnt exsist");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
