import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    signOut(auth)
      .then(() => {
        if (dispatch) {
          dispatch({ type: "LOGOUT", payload: null });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { logout };
};
