import { useAuthContext } from "../hooks/useAuthContext"

import { useCollection } from "../hooks/useCollection"

import { Timestamp } from "firebase/firestore"
import PatientsList from "../components/PatientsList"

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

const AllPatients = () => {
  const { user } = useAuthContext()
  const uid = user?.uid

  const {
    documents: patients,
    error,
    isPending,
  } = useCollection<PatientData>("patients", ["doctorUid", "==", uid])

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-center ">
        <h2 className="mr-4 text-2xl font-semibold">All Patients</h2>

        {patients && (
          <div className=" text-gray-500 font-medium">
            {`(${patients.length} patients)`}
          </div>
        )}
      </div>

      {patients && <PatientsList patients={patients} />}

      {error && <p className="text-red-600">{error}</p>}
      {isPending && <p className="text-2xl text-sky-600">Loading....</p>}
    </div>
  )
}

export default AllPatients
