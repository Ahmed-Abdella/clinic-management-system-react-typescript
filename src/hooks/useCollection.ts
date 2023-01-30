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
} from "firebase/firestore";

interface patientType {
  id?: string;
  uid: string | undefined;
  patientName: string;
  patientAge: number | string;
  diagnosis?: string;
  notes?: string;
  gender: string;
  spices: string[];
  createdAt: Timestamp;
}

export const useCollection = (coll: string, _q?: any) => {
  const [documents, setDocuments] = useState<any[]>([]);

  const q = useRef(_q).current;

  useEffect(() => {
    let ref: any = collection(db, coll);

    if (q) {
      ref = query(ref, where(q[0], q[1], q[2]));
    }

    const unsub = onSnapshot(ref, (snapshot: any) => {
      let results: patientType[] = [];
      snapshot.docs.forEach((doc: any) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setDocuments(results);
    });

    return () => unsub();
  }, [coll, q]);

  return { documents };
};
