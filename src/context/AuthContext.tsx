import React, { createContext, useReducer, useEffect, ReactNode } from "react";

import { auth } from "../firebase";

import { onAuthStateChanged } from "firebase/auth";

interface authContextType {
  authIsReady: boolean;
  user: any;
  dispatch?: any;
}

export const AuthContext = createContext<authContextType>({
  user: null,
  authIsReady: false,
});

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
