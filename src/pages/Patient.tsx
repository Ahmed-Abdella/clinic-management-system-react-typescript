import { useParams } from "react-router-dom"

import { useDocument } from "../hooks/useDocument"

import { Timestamp } from "firebase/firestore"

interface PatientHistory {
  diagnosis?: string
  notes?: string
  spices?: string[]
  createdAt: Timestamp
}

interface PatientData {
  createdAt: Timestamp
  doctorUid: string | undefined
  patientName: string
  patientAge: number | string
  gender: string
  patientHistory: PatientHistory[]
}
export default function Patient() {
  const { id } = useParams()
  const {
    document: patient,
    error,
    isPending,
  } = useDocument<PatientData>("patients", id!)
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

          <div>
            {patient.patientHistory.map((history, i) => {
              return (
                <div key={i}>
                  <div>{String(history.createdAt.toDate().toDateString())}</div>
                  <div>{history.diagnosis}</div>
                  <div>
                    {history.spices?.map((spice) => {
                      return <div key={spice}>{spice}</div>
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          {/* <div>{patient?.patientHistory.diagnosis}</div>

          <div>{patient?.patientHistory.notes}</div>

          <div>{patient?.patientHistory.spices}</div> */}
        </div>
      )}
      {isPending && <p className="text-2xl text-sky-600">Loading....</p>}
      {error && (
        <p className="text-red-600 bg-red-100 px-3 py-2 rounded">{error}</p>
      )}
    </>
  )
}
