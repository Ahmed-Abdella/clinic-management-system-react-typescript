import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface patientType {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
}

const AllPatients = () => {
  const [patients, setPatients] = useState<patientType[]>([]);

  const colRef = collection(db, "patients");
  getDocs(colRef).then((snapshot) => {
    console.log(snapshot.docs);
  });

  return <div></div>;
};

export default AllPatients;
