import { useReducer, useEffect, useState } from "react"

import { db } from "../firebase/firebase"
import {
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore"

import { DocumentReference } from "firebase/firestore"
import { DocumentData } from "firebase/firestore"

interface patientType {
  doctorUid: string | undefined
  patientName: string
  patientAge: number | string
  diagnosis?: string
  notes?: string
  gender: string
  spices: string[]
  createdAt: Timestamp
}

interface StateType {
  document: null | patientType
  isPending: boolean
  error: null | string
  success: null | boolean
}

interface ActionType {
  type: string

  // payload type problem
  payload?: DocumentReference<DocumentData> | patientType | string | any
}

let initialState: StateType = {
  document: null,
  isPending: false,
  error: null,
  success: null,
}

const firestoreReducer = (state: StateType, action: ActionType) => {
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

export const useFirestore = (coll: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // coll ref
  const ref = collection(db, coll)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action: ActionType) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc: patientType) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const addedDocument = await addDoc(ref, { ...doc })
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

  // delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const docRef: DocumentReference = doc(db, coll, id)
      await deleteDoc(docRef)
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" })
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" })
    }
  }

  //update document
  // const updateDocument = async (id:string, updates:patientType) => {
  //   dispatch({type:"IS_PENDING"})
  //         try {
  //           const updatedDocument = await ref.doc(id).update(updates)
  //           dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument });
  //           return updatedDocument
  //         }
  //         catch(err) {
  //           dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
  //           return null
  //         }

  // }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
