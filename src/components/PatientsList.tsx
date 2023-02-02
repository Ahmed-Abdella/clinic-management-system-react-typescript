import { Link } from "react-router-dom"
import { useFirestore } from "../hooks/useFirestore"

import { MdPerson } from "react-icons/Md"

export default function PatientsList({ patients }: { patients: any[] }) {
  const { deleteDocument } = useFirestore("patients")

  const deletePatient = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault()

    deleteDocument(id)
  }

  return (
    <div className="flex flex-col font-semibold">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="border-b flex items-center py-2 px-4  bg-sky-50"
        >
          <Link
            to={`/patient/${patient.id}`}
            className="mr-2 flex-grow [&_span]:text-sky-600   flex gap-8 items-center transition duration-200  "
          >
            <div className="   transition duration-75 flex items-center ">
              <MdPerson className="inline-block mr-2" />
              <span>{patient.patientName}</span>
            </div>

            <div>
              <span>Age: </span>
              {patient.patientAge}
            </div>
            <div>
              <span>Gender: </span>
              {patient.gender}
            </div>
          </Link>
          <div className="ml-auto">
            <button
              onClick={(e) => {
                deletePatient(e, patient.id)
              }}
              className=" text-white text-sm bg-red-500  py-1 px-2 rounded hover:bg-red-600 transition duration-75"
            >
              Delete patient
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
