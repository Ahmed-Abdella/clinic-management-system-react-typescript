import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { useAuthContext } from "../hooks/useAuthContext";

import { Timestamp } from "firebase/firestore";

interface patientType {
  uid: string | undefined;
  patientName: string;
  patientAge: number | string;
  diagnosis?: string;
  notes?: string;
  gender: string;
  spices: string[];
  createdAt: Timestamp;
}

const AllPatients = () => {
  const [patients, setPatients] = useState<patientType[]>([]);
  const { user } = useAuthContext();
  const uid = user?.uid;

  useEffect(() => {
    const colRef = collection(db, "patients");
    getDocs(colRef)
      .then((snapshot) => {
        // const patientsArr = snapshot.docs.map((doc) => doc.data())
        if (!snapshot.empty) {
          setPatients(
            snapshot.docs.map((doc) => {
              return {
                uid: uid,
                patientName: doc.data().patientName,
                patientAge: doc.data().patientAge,
                diagnosis: doc.data().diagnosis,
                notes: doc.data().notes,
                gender: doc.data().gender,
                spices: doc.data().spices,
                createdAt: doc.data().createdAt,
              };
            })
          );
        } else {
          throw new Error("cant get documents");
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  console.log(patients);

  return <div></div>;
};

export default AllPatients;
