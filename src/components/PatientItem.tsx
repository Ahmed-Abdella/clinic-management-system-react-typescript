import React from "react"
import { Link } from "react-router-dom"
import { useFirestore } from "../hooks/useFirestore"

import { MdPerson } from "react-icons/Md"

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
    <div
      key={patient.id}
      className="border-b flex items-center  px-4  bg-sky-50 hover:bg-sky-100 transition duration-100"
    >
      <Link
        to={`/patient/${patient.id}`}
        className="py-2 mr-2 flex-grow [&_span]:text-gray-500   grid grid-cols-5 gap-2 items-center justify-between transition duration-200  "
      >
        <div className="col-span-3   transition duration-75 flex items-center ">
          <MdPerson className="inline-block mr-2" />
          <p className="text-sky-700">{patient.patientName}</p>
        </div>

        <div className=" ">
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
          {response.isPending ? "Deleting....." : "delete patient"}
        </button>
      </div>
    </div>
  )
}
