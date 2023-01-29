import { useState, useEffect } from "react";

import { auth } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (dispatch) {
        dispatch({ type: "LOGIN", payload: res.user });
      }

      setIsPending(false);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setIsPending(false);
        setError(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  return { error, isPending, login };
};
