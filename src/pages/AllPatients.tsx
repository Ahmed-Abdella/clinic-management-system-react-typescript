import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface patientType {
  name: string;
  age: number;
  diagnosis: string;
}

const AllPatients = () => {
  const [patients, setPatients] = useState<patientType[]>([]);

  useEffect(() => {
    const colRef = collection(db, "patients");
    getDocs(colRef)
      .then((snapshot) => {
        // const patientsArr = snapshot.docs.map((doc) => doc.data())
        if (!snapshot.empty) {
          setPatients(
            snapshot.docs.map((doc) => {
              return {
                name: doc.data().name,
                age: doc.data().age,
                diagnosis: doc.data().diagnosis,
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
