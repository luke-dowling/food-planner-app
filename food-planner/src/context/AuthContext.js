import React, { useContext, createContext, useState, useEffect } from "react";
import { Firebase, auth } from "../firebase";
import { mealData } from "../data";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      const userRef = Firebase.firestore().collection("users");
      userRef.doc(cred.user.uid).set({
        email: cred.user.email,
      });
      userRef
        .doc(cred.user.uid)
        .collection("mealData")
        .doc("meals")
        .set({
          meals: mealData,
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    auth.signOut();
  };

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const updateEmail = (email) => {
    return currentUser.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
