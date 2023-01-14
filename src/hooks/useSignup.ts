import { useState } from "react";

import { auth } from "../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);

  const signup = (email: string, password: string) => {
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, signup };
};
