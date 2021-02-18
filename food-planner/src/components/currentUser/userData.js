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

export const TodaysMealsRef = (currentUser, state, setState, dateTime) => {
  Firebase.firestore()
    .collection("users")
    .doc(currentUser.uid)
    .collection("mealsData")
    .where(
      "day",
      "==",
      `${dateTime.toLocaleString({ weekday: "long" }).toLowerCase()}`
    )
    .get()
    .then((querySnapshot) => {
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        dataArray.push(doc.data());
      });
      setState(dataArray);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const AllMealsRef = (currentUser, state, setState) => {
  Firebase.firestore()
    .collection("users")
    .doc(currentUser.uid)
    .collection("mealsData")
    .get()
    .then((querySnapshot) => {
      const dataArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        dataArray.push(doc.data());
      });
      setState(dataArray);
    })
    .catch((err) => {
      console.error(err);
    });
};
