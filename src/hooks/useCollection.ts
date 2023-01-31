import { useState, useEffect, useRef } from "react"

import { db } from "../firebase/firebase"

// firebase imports
import {
  collection,
  onSnapshot,
  Timestamp,
  query,
  where,
  DocumentData,
  CollectionReference,
  Query,
  QuerySnapshot,
  WhereFilterOp,
  getDocs,
  doc,
} from "firebase/firestore"

export function useCollection<T>(
  coll: string,
  _q?: [string, WhereFilterOp, string | undefined]
) {
  const [documents, setDocuments] = useState<T[] | null>(null)
  const [error, setError] = useState<null | string>(null)
  const [isPending, setIsPending] = useState<boolean>(false)

  const q = useRef(_q).current

  useEffect(() => {
    setIsPending(true)
    let ref: Query = collection(db, coll)

    if (q) {
      ref = query(ref, where(q[0], q[1], q[2]))
    }

    getDocs(ref)
      .then((snapshot) => {
        console.log(snapshot)

        setIsPending(false)

        setDocuments(
          snapshot.docs.map((doc: DocumentData) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      })
      .catch((error) => {
        setError(`can't fetch data: ${error.message}`)
        setIsPending(false)
      })

    // const unsub = onSnapshot(
    //   ref,
    //   (snapshot: any) => {
    //     let results: T[] = [];
    //     snapshot.docs.forEach((doc: any) => {
    //       results.push({ ...doc.data(), id: doc.id });
    //     });

    //     setDocuments(results);
    //   },
    //   (error) => {
    //     setError(error.message);
    //   }
    // );

    // return () => unsub();
  }, [coll, q])

  return { documents, error, isPending }
}
