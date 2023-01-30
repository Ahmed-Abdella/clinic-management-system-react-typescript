import { useAuthContext } from "../hooks/useAuthContext";

import { useCollection } from "../hooks/useCollection";

import { Timestamp } from "firebase/firestore";
import PatientsList from "../components/PatientsList";

interface patientType {
  id?: string;
  doctorUid: string | undefined;
  patientName: string;
  patientAge: number | string;
  diagnosis?: string;
  notes?: string;
  gender: string;
  spices: string[];
  createdAt: Timestamp;
}

const AllPatients = () => {
  const { user } = useAuthContext();
  const uid = user?.uid;

  const { documents: patients, error } = useCollection<patientType>(
    "patients",
    ["doctorUid", "==", uid]
  );

  console.log(patients);

  return <PatientsList patients={patients} />;
};

export default AllPatients;
