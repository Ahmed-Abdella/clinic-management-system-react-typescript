import React, { useState, useRef, useEffect } from "react"

import { MdOutlineCancel } from "react-icons/Md"

import { useFirestore } from "../hooks/useFirestore"

import { Timestamp } from "firebase/firestore"

import { useNavigate } from "react-router-dom"

import { useAuthContext } from "../hooks/useAuthContext"

import useAddDocument from "../hooks/useAddDocument"

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

  const spicesInput = useRef<HTMLInputElement | null>(null)

  const handleAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault()
    const spice = newSpice.trim()
    if (spice && !spices.includes(spice)) {
      setSpices((prevspices) => [...prevspices, spice])
    }

    setNewSpice("")

    spicesInput.current?.focus()
  }

  const removeSpice = (i: string): void => {
    const index = spices.indexOf(i)
    if (index > -1) {
      setSpices(spices.filter((spice) => spice !== i))
    }
  }

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

      <label>
        <span>Diagnosis:</span>

        <textarea
          className="bg-gray-50 h-48 mt-1 p-4 border-b border-sky-600  outline-none"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        ></textarea>
      </label>

      <label>
        <span>Notes:</span>

        <textarea
          className="bg-gray-50  mt-1 p-4 border-b border-sky-600  outline-none"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </label>

      <label>
        <span>Medicine</span>
        <div className="spices">
          <input
            type="text"
            onChange={(e) => setNewSpice(e.target.value)}
            value={newSpice}
            ref={spicesInput}
          />
          <button
            className="ml-2 self-center  text-white bg-green-500 hover:bg-green-600 transition duration-75 font-semibold px-2 py-2 rounded-lg "
            onClick={handleAdd}
          >
            Add one
          </button>
        </div>
      </label>

      <div className=" flex flex-wrap items-center h-10">
        <span className="mr-4">Current Medicines:</span>
        {spices.map((i) => (
          <div
            className=" flex bg-gray-300 py-1  pl-2  pr-1 rounded mr-1 "
            key={i}
          >
            <span className="mr-2 ">{i}</span>

            <button
              onClick={(e) => {
                e.preventDefault()
                removeSpice(i)
              }}
              className="self-start text-sm  cursor-pointer  rounded-full hover:bg-gray-400 transition duration-75"
            >
              <MdOutlineCancel />
            </button>
          </div>
        ))}
      </div>

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
