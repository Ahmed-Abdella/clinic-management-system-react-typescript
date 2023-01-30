import { useState, useEffect, useRef } from "react";

import { db } from "../firebase/firebase";

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
} from "firebase/firestore";

export function useCollection<T>(
  coll: string,
  _q?: [string, WhereFilterOp, string | undefined]
) {
  const [documents, setDocuments] = useState<T[]>([]);
  const [error, SetError] = useState<null | string>(null);

  const q = useRef(_q).current;

  useEffect(() => {
    let ref: any = collection(db, coll);

    if (q) {
      ref = query(ref, where(q[0], q[1], q[2]));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot: any) => {
        let results: T[] = [];
        snapshot.docs.forEach((doc: any) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
      },
      (error) => {
        SetError(error.message);
      }
    );

    return () => unsub();
  }, [coll, q]);

  return { documents, error };
}
