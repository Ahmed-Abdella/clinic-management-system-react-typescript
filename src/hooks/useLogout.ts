import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { logout };
};
