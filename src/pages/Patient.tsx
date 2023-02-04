import React from "react"

import { useParams } from "react-router-dom"

import { useDocument } from "../hooks/useDocument"

import { Timestamp } from "firebase/firestore"

interface PatientType {
  id?: string
  doctorUid: string | undefined
  patientName: string
  patientAge: number | string
  diagnosis?: string
  notes?: string
  gender: string
  spices: string[]
  createdAt: Timestamp
}

export default function Patient() {
  const { id } = useParams()
  const {
    document: patient,
    error,
    isPending,
  } = useDocument<PatientType>("patients", id!)
  console.log(patient)

  return (
    <>
      {patient && (
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <div>{patient?.patientName}</div>

            <div>{patient?.patientAge}</div>

            <div>{patient?.gender}</div>
          </div>

          <div>{String(patient?.createdAt.toDate().toDateString())}</div>

          <div>{patient?.diagnosis}</div>

          <div>{patient?.notes}</div>

          <div>{patient?.spices}</div>
        </div>
      )}
      {isPending && <p className="text-2xl text-sky-600">Loading....</p>}
      {error && (
        <p className="text-red-600 bg-red-100 px-3 py-2 rounded">{error}</p>
      )}
    </>
  )
}
