import { useReducer, useEffect, useState } from "react"

import { db } from "../firebase/firebase"
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  WithFieldValue,
  DocumentSnapshot,
  updateDoc,
} from "firebase/firestore"

import { DocumentReference } from "firebase/firestore"
import { DocumentData } from "firebase/firestore"

interface StateType<T> {
  document: null | T
  isPending: boolean
  error: null | string
  success: boolean
}

interface ActionType {
  type: string

  // payload type problem
  payload?: any
}

let initialState: StateType<null> = {
  document: null,
  isPending: false,
  error: null,
  success: false,
}

const firestoreReducer = <T>(state: StateType<T>, action: ActionType) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null }
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null }
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      }
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const useFirestore = <T>(coll: string) => {
  const [response, dispatch] = useReducer(firestoreReducer<T>, initialState)
  const [isCancelled, setIsCancelled] = useState(false)
  const [document, setDocument] = useState<any>(null)

  // coll ref
  const ref = collection(db, coll)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action: ActionType) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document

  const addDocument = async (doc: WithFieldValue<DocumentData>) => {
    dispatchIfNotCancelled({ type: "IS_PENDING" })

    try {
      const addedDocument = await addDoc(ref, { ...doc })
      setDocument(addedDocument)
      console.log(document)
      console.log(addedDocument)

      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      })
    } catch (err) {
      if (err instanceof Error) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
      }
    }
  }

  // const addDocument = (doc: WithFieldValue<DocumentData>) => {
  //   dispatchIfNotCancelled({ type: "IS_PENDING" })

  //   addDoc(ref, { ...doc })
  //     .then((addedDocument) => {
  //       dispatchIfNotCancelled({
  //         type: "ADDED_DOCUMENT",
  //         payload: addedDocument,
  //       })
  //     })
  //     .catch((err) => {
  //       if (err instanceof Error) {
  //         dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
  //       }
  //     })
  // }

  // delete a document
  const deleteDocument = async (id: string) => {
    dispatchIfNotCancelled({ type: "IS_PENDING" })

    try {
      const docRef: DocumentReference = doc(db, coll, id)
      await deleteDoc(docRef)
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" })
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" })
    }
  }

  const updateDocument = async (id: string, updates: any) => {
    dispatchIfNotCancelled({ type: "IS_PENDING" })
    try {
      const docRef: DocumentReference = doc(db, coll, id)
      const updatedDocument = await updateDoc(docRef, updates)
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      })
      return updatedDocument
    } catch (err) {
      if (err instanceof Error) {
        dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        return null
      }
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return { addDocument, deleteDocument, updateDocument, response }
}
