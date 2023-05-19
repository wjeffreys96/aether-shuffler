"use client";
import React, { createContext, useEffect, useReducer } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "../lib/firebase";

const auth = getAuth(firebaseApp);

const initialState = {
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SETUSER":
      const user = action.payload;
      const token = user.accessToken;
      console.log("authContext SETUSER ", user, token);
      return {
        ...state,
        user: user,
        token: token,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      signOut(auth);
      return {
        ...state,
        user: null,
        token: null,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SETUSER", payload: user });
      } else {
        console.log("no user");
      }
    });
  }, []);

  const authContextValue = {
    user: state.user,
    token: state.token,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
