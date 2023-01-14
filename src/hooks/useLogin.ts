import { useState } from "react";

import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, login };
};
