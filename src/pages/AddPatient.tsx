import React, { useState, useEffect } from "react"

import { useFirestore } from "../hooks/useFirestore"

import { Timestamp } from "firebase/firestore"

import { useNavigate } from "react-router-dom"

import { useAuthContext } from "../hooks/useAuthContext"

import useAddDocument from "../hooks/useAddDocument"

import PatientHistoryForm from "../components/PatientHistoryForm"

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

const AddPatient: React.FC = () => {
  const [patientName, setPatientName] = useState<string>("")
  const [patientAge, setPatientAge] = useState<number | string>("")
  const [gender, setGender] = useState<string>("")
  const [diagnosis, setDiagnosis] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const [newSpice, setNewSpice] = useState<string>("")
  const [spices, setSpices] = useState<string[]>([])

  // const { addDocument, response } = useFirestore<PatientData>("patients")

  const patientHistory = {
    createdAt: Timestamp.fromDate(new Date()),
    diagnosis,
    notes,
    spices,
  }

  const { user } = useAuthContext()

  const navigate = useNavigate()

  const [addDocument, document, error, isPending, success] =
    useAddDocument("patients")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const createdAt = Timestamp.fromDate(new Date())
    const doctorUid = user?.uid

    addDocument({
      createdAt,
      doctorUid,
      patientName,
      patientAge,
      gender,
      patientHistory: [patientHistory],
    })

    // await addDocument({
    //   createdAt,
    //   doctorUid,
    //   patientName,
    //   patientAge,
    //   gender,
    //   patientHistory: [patientHistory],
    // })
  }

  useEffect(() => {
    console.log(document, error)
    if (success) {
      navigate(`/patient/${document.id}`)
    }
  }, [document, error, success, isPending])

  return (
    <form
      className="flex flex-col w-full px-36 xl:px-20 lg:px-12 md:px-4 sm:px-2  pb-6 [&_label]:mt-6 [&>label]:flex [&>label]:flex-col [&_input]:bg-gray-50  [&_input]:mt-1 [&_input]:p-2  [&_input]:border-b  [&_input]:border-sky-600      [&_input]:outline-none "
      onSubmit={handleSubmit}
    >
      {document && (
        <p className="fixed top-6 right-10 bg-green-400 p-4">
          patient added succesfully
        </p>
      )}

      {error && (
        <p className="fixed top-6 right-10 bg-red-400 p-4">Can't add patient</p>
      )}
      <label>
        <span>Patient name:</span>

        <input
          required
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        ></input>
      </label>

      <label>
        <span>Age:</span>

        <input
          required
          type="number"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
        ></input>
      </label>

      <div className="mt-2 [&>*]:mr-10 [&_input]:ml-1">
        <span>Gender:</span>
        <label className="">
          <span className="text-center">Male</span>
          <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>

        <label>
          <span>Female</span>
          <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
      </div>
      <PatientHistoryForm
        onDiagnosisChange={(value: string) => setDiagnosis(value)}
        onNotesChange={(value: string) => setNotes(value)}
        onSpicesChange={(spices: string[]) => setSpices(spices)}
        onNewSpiceChange={(spice: string) => setNewSpice(spice)}
        spices={spices}
        notes={notes}
        diagnosis={diagnosis}
        newSpice={newSpice}
      />

      {isPending && (
        <p className="text-xl my-4 text-sky-500">Adding The Patient</p>
      )}
      <button className="mt-8 w-40 self-center bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition duration-200">
        Add Patient
      </button>
    </form>
  )
}

export default AddPatient
