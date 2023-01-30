import { useState, useEffect, useRef } from "react";

import { db } from "../firebase/firebase";

import { getDoc, doc, onSnapshot, DocumentData } from "firebase/firestore";

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
  const [document, setDocument] = useState<T | null>(null);
  const [error, SetError] = useState<null | string>(null);

  useEffect(() => {
    const docRef: any = doc(db, coll, id);

    const unsub = onSnapshot(
      docRef,
      (doc: DocumentData) => {
        setDocument(doc.data());
      },
      (error) => {
        SetError(error.message);
      }
    );

    return () => unsub();
  }, [coll, id]);

  return { document, error };
}
