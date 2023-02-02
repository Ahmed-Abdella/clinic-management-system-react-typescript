import { useAuthContext } from "../hooks/useAuthContext"

import { useCollection } from "../hooks/useCollection"

import { Timestamp } from "firebase/firestore"
import PatientsList from "../components/PatientsList"

interface patientType {
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

const AllPatients = () => {
  const { user } = useAuthContext()
  const uid = user?.uid

  const {
    documents: patients,
    error,
    isPending,
  } = useCollection<patientType>("patients", ["doctorUid", "==", uid])

  return (
    <div className="flex flex-col [&>*]:mb-3">
      <h2 className="text-2xl font-semibold">All Patients</h2>

      {patients && (
        <>
          <p className="text-sm text-gray-500 font-semibold">
            {`${patients.length}`} patients
          </p>
          <PatientsList patients={patients} />
        </>
      )}

      {error && <p className="text-red-600">{error}</p>}
      {isPending && <p className="text-2xl text-sky-600">Loading....</p>}
    </div>
  )
}

export default AllPatients
