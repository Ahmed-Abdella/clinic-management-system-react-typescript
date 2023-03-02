import React from "react"
import { Link } from "react-router-dom"
import { useFirestore } from "../hooks/useFirestore"

export default function PatientItem({ patient }: any) {
  const { deleteDocument, response } = useFirestore("patients")

  const deletePatient = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault()

    deleteDocument(id)
  }

  return (
    <>
      <Link
        to={`/patient/${patient.id}`}
        className="py-2 mr-2 flex-grow [&_span]:text-gray-500    grid grid-cols-5 lg:grid-cols-9 gap-2 md:gap-0 items-center justify-between transition duration-200  "
      >
        <div className="col-span-3 lg:col-span-5   transition duration-75 flex items-center ">
          <p className="text-sky-700">{patient.patientName}</p>
        </div>

        <div className=" lg:col-span-2">{patient.patientAge}</div>
        <div className="lg:col-span-2">{patient.gender}</div>
      </Link>
      <div className="ml-auto">
        <button
          onClick={(e) => {
            deletePatient(e, patient.id)
          }}
          className="w-16 text-white text-sm md:text-xs bg-red-500  py-1 px-2 rounded hover:bg-red-600 transition duration-75"
        >
          {response.isPending ? "Deleting..." : "delete"}
        </button>
      </div>
    </>
  )
}
