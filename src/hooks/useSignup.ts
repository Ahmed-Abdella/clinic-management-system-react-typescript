import { useState } from "react"

import { auth } from "../firebase/firebase"
import { updateProfile } from "firebase/auth"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./useAuthContext"

import { storage } from "../firebase/firebase"

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage"

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

  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (
    email: string,
    password: string,
    displayName: string,

    thumbnail: any
  ) => {
    setError(null)
    setIsPending(true)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const storageRef = ref(storage, uploadPath)
      const snapshot = await uploadBytes(storageRef, thumbnail)

      const imgURL = await getDownloadURL(snapshot.ref)

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: imgURL,
        })
      }

      if (dispatch) {
        dispatch({ type: "LOGIN", payload: res.user })
      }

      setIsPending(false)
      setError(null)
    } catch (err) {
      if (err instanceof Error) {
        setIsPending(false)
        setError(err.message)
      } else {
        console.log("Unexpected error", err)
      }
    }
  }

  return { error, isPending, signup }
}
