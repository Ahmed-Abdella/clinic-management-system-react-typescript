import { useState } from "react"

import { WithFieldValue, DocumentData } from "firebase/firestore"

import { collection } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { addDoc } from "firebase/firestore"

export default function useAddDocument(coll: string) {
  const ref = collection(db, coll)

  const [document, setDocument] = useState<any>(null)
  const [isPending, setIsPending] = useState<any>(false)
  const [success, setSuccess] = useState<any>(false)
  const [error, setError] = useState<any>("")

  const addDocument = async (doc: WithFieldValue<DocumentData>) => {
    try {
      const addedDocument = await addDoc(ref, { ...doc })
      setIsPending(false)
      setSuccess(true)
      setDocument(addedDocument)
      setError(null)
    } catch (err) {
      if (err instanceof Error) {
        setIsPending(false)
        setSuccess(false)
        setError(err.message)
        setDocument(null)
      }
    }
  }

  return [addDocument, document, error, isPending, success]
}
