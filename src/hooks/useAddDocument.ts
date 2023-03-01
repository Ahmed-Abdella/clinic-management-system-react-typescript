import { useState, useEffect } from "react"

import { WithFieldValue, DocumentData } from "firebase/firestore"

import { collection } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { addDoc } from "firebase/firestore"

export default function useAddDocument(coll: string) {
  const [isCancelled, setIsCancelled] = useState<any>(true)
  const [document, setDocument] = useState<any>(null)
  const [isPending, setIsPending] = useState<any>(false)
  const [success, setSuccess] = useState<any>(false)
  const [error, setError] = useState<any>("")

  const ref = collection(db, coll)
  const addDocument = async (doc: WithFieldValue<DocumentData>) => {
    if (!isCancelled) {
      setIsPending(true)
      setError(null)
    }
    try {
      const addedDocument = await addDoc(ref, { ...doc })
      if (!isCancelled) {
        setIsPending(false)
        setSuccess(true)
        setDocument(addedDocument)
        setError(null)
      }
    } catch (err) {
      if (err instanceof Error) {
        if (!isCancelled) {
          setIsPending(false)
          setSuccess(false)
          setError(err.message)
          setDocument(null)
        }
      }
    }
  }

  useEffect(() => {
    setIsCancelled(false)
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return [addDocument, document, error, isPending, success]
}
