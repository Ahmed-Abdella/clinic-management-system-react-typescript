import { useState, useEffect } from "react";

import { useAuthContext } from "../hooks/useAuthContext";

import { Timestamp } from "firebase/firestore";
import { useCollection } from "../hooks/useCollection";

const AllPatients = () => {
  const { user } = useAuthContext();
  const uid = user?.uid;

  const { documents: patients, error } = useCollection("patients", [
    "doctorUid",
    "==",
    uid,
  ]);

  console.log(patients);

  return <div></div>;
};

export default AllPatients;
