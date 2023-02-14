import { useParams, useNavigate } from "react-router-dom"

import { useDocument } from "../hooks/useDocument"

import { useFirestore } from "../hooks/useFirestore"

// import PatientHistoryForm from "../components/PatientHistoryForm"

import { RxCross2 } from "react-icons/rx"
import { useRef, useState } from "react"
import { Timestamp } from "firebase/firestore"
import { MdPerson } from "react-icons/Md"

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

  const { updateDocument, deleteDocument, response } =
    useFirestore<PatientData>("patients")

  const navigate = useNavigate()

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

    if (!error) {
      setIsHistoryFormOpen(false)
      setDiagnosis("")
      setNotes("")
      setSpices([])
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }

    console.log(response)
  }

  const deletePatient = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault()

    deleteDocument(id)

    if (!response.error) {
      navigate("/")
    }
  }

  return (
    <>
      {patient && (
        <div className="flex flex-col py-4 ">
          <div className="flex items-center gap-2 [&_span]:mr-1 [&_span]:text-sky-500">
            <div className="font-semibold text-lg flex items-center ">
              <MdPerson className="mr-2 text-sky-500" />

              <p className="">{patient?.patientName}</p>
            </div>

            <div className="ml-auto">
              <span>Age:</span>
              {patient?.patientAge}
            </div>

            <div className="ml-2">
              {" "}
              <span>Gender:</span>
              {patient?.gender}
            </div>
            <div className="ml-4 text-gray-400 text-sm">
              {String(patient?.createdAt.toDate().toDateString())}
            </div>
          </div>

          <h2 className="font-semibold text-2xl self-center mt-12">
            Pateint History
          </h2>

          <div className="">
            {patient.patientHistory
              .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
              .map((history, i) => {
                return (
                  <div key={i} className="mt-10">
                    <div className="mt-4 mb-2">
                      <span className="text-gray-400 mr-4">
                        Patient History on:
                      </span>
                      <span className="text-lg font-semibold">
                        {String(history.createdAt.toDate().toDateString())}
                      </span>
                    </div>
                    <div className="mt-4 bg-white p-4 shadow rounded-xl">
                      <div className="mt-2">
                        <h4 className=" text-sky-600 text-lg font-semibold">
                          Diagnosis
                        </h4>

                        <p>{history.diagnosis}</p>
                      </div>
                      <div className="mt-6">
                        <h4 className=" text-sky-600 text-lg font-semibold">
                          Notes
                        </h4>

                        <p>{history.notes}</p>
                      </div>

                      <div className="mt-6">
                        <h4 className=" text-sky-600 text-lg font-semibold">
                          Medicines:
                        </h4>

                        <ul>
                          {history.spices?.map((spice) => {
                            return (
                              <li key={spice}>
                                <span className="ml-1 text-sky-600 text-lg font-semibold">
                                  -
                                </span>{" "}
                                {spice}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className="self-center [&_button]:mr-2">
            <button
              onClick={() => setIsHistoryFormOpen(true)}
              className="mt-8 w-40 self-center bg-sky-600 text-white p-1 rounded-lg hover:bg-sky-700 transition duration-200"
            >
              Add Patient History
            </button>

            <button
              onClick={(e) => deletePatient(e, id!)}
              className="mt-8 w-40 self-center bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete Patient
            </button>
          </div>

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

                <div className="mt-2 flex flex-wrap items-center h-10">
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
                  Add Patient History
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
