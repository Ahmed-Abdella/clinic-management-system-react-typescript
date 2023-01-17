import { useState } from "react";

import { auth } from "../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  // const [error, setError] = useState<string | null>(null);

  // const signup = (email: string, password: string) => {
  //   setError(null);

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((res) => {
  //       console.log(res.user);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //     });
  // };

  // return { error, signup };

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN", payload: res.user });

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

  return { error, isPending, signup };
};
