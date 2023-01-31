import { useState, useEffect, useRef } from "react"

import { db } from "../firebase/firebase"

import {
  getDoc,
  doc,
  onSnapshot,
  DocumentData,
  Query,
  DocumentReference,
} from "firebase/firestore"

// firebase imports
// import {
//   collection,
//   onSnapshot,
//   Timestamp,
//   query,
//   where,
//   DocumentData,
//   CollectionReference,
//   Query,
//   QuerySnapshot,
//   WhereFilterOp,
// } from "firebase/firestore";

export function useDocument<T>(coll: string, id: string) {
  const [document, setDocument] = useState<T | null>(null)
  const [error, setError] = useState<null | string>(null)
  const [isPending, setIsPending] = useState<boolean>(false)

  useEffect(() => {
    setIsPending(true)
    const docRef: DocumentReference = doc(db, coll, id)

    // get Document (NO real time)
    getDoc(docRef)
      .then((doc: DocumentData) => {
        setIsPending(false)
        setDocument(doc.data())
      })
      .catch((error) => {
        setIsPending(false)
        setError(error.message)
      })

    // get document (REAL TIME)

    //     const unsub = onSnapshot(
    //       docRef,
    //       (doc: DocumentData) => {
    //         setDocument(doc.data())
    //       },
    //       (error) => {
    //         setError("Cant get data")
    //       }
    //     )

    //     return () => unsub()
  }, [coll, id])

  return { document, error, isPending }
}
