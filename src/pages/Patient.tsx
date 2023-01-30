import React from "react";

import { useParams } from "react-router-dom";

import { useDocument } from "../hooks/useDocument";

import { Timestamp } from "firebase/firestore";

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

export default function Patient() {
  const { id } = useParams();
  const { document: patient, error } = useDocument<patientType>(
    "patients",
    id!
  );
  console.log(patient);

  return (
    <div className="flex flex-col gap-8">
      <div>{patient?.patientName}</div>

      <div>{patient?.patientAge}</div>

      <div>{patient?.diagnosis}</div>

      <div>{patient?.notes}</div>

      <div>{patient?.spices}</div>

      <div>{patient?.gender}</div>

      <div>{String(patient?.createdAt)}</div>
    </div>
  );
}
