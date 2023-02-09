import { useParams } from "react-router-dom"

import { useDocument } from "../hooks/useDocument"

import { useFirestore } from "../hooks/useFirestore"

import PatientHistoryForm from "../components/PatientHistoryForm"

import { RxCross2 } from "react-icons/rx"
import { useRef, useState } from "react"
import { Timestamp } from "firebase/firestore"
import Login from "./Login"

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
  const [isHistoryFormOpen, setIsHistoryFormOpen] = useState<boolean>(false)

  const spicesInput = useRef<HTMLInputElement | null>(null)
  const [newSpice, setNewSpice] = useState<string>("")

  const [diagnosis, setDiagnosis] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const [spices, setSpices] = useState<string[]>([])

  const { updateDocument, response } = useFirestore<PatientData>("patients")

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

  const { id } = useParams()
  const {
    document: patient,
    error,
    isPending,
  } = useDocument<PatientData>("patients", id!)

  const patientHistory: PatientHistory = {
    createdAt: Timestamp.fromDate(new Date()),
    diagnosis,
    notes,
    spices,
  }

  const updatedDoc = {
    patientHistory: patient?.patientHistory.concat([patientHistory]),
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateDocument(id!, updatedDoc)
    console.log(response)
  }

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

          <button onClick={() => setIsHistoryFormOpen(true)}>
            Update Patient
          </button>

          {isHistoryFormOpen && (
            <>
              <div
                onClick={() => setIsHistoryFormOpen(false)}
                className=" px-40 bg-gray-200 bg-opacity-80 fixed inset-0 "
              >
                <button
                  onClick={() => setIsHistoryFormOpen(false)}
                  className="fixed top-10 right-10  text-4xl text-sky-600"
                >
                  X
                </button>
              </div>

              <form
                onClick={(e) => e.stopPropagation()}
                className="bg-white z-10  fixed inset-x-36 inset-y-8 overflow-y-scroll flex flex-col px-10 pb-6 [&_label]:mt-6 [&>label]:flex [&>label]:flex-col [&_input]:bg-gray-50  [&_input]:mt-1 [&_input]:p-2  [&_input]:border-b  [&_input]:border-sky-600      [&_input]:outline-none "
                onSubmit={handleSubmit}
              >
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
                        <RxCross2 />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-8 w-40 self-center bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition duration-200">
                  Update patient
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {isPending && <p className="text-2xl text-sky-600">Loading....</p>}
      {error && (
        <p className="text-red-600 bg-red-100 px-3 py-2 rounded">{error}</p>
      )}
    </>
  )
}
