import { useEffect } from "react"

import { useParams, useNavigate } from "react-router-dom"

import { useDocument } from "../hooks/useDocument"

import { useFirestore } from "../hooks/useFirestore"

import PatientHistoryForm from "../components/PatientHistoryForm"

import { useState } from "react"
import { Timestamp } from "firebase/firestore"
import PatientHeader from "../components/PatientHeader"
import PatientHistory from "../components/PatientHistory"

interface PatientHistory {
  diagnosis?: string
  notes?: string
  spices?: string[]
  createdAt: Timestamp
}

export interface PatientData {
  createdAt: Timestamp
  doctorUid: string | undefined
  patientName: string
  patientAge: number | string
  gender: string
  patientHistory: PatientHistory[]
}

export default function Patient() {
  const [isHistoryFormOpen, setIsHistoryFormOpen] = useState<boolean>(false)

  const [newSpice, setNewSpice] = useState<string>("")

  const [diagnosis, setDiagnosis] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const [spices, setSpices] = useState<string[]>([])

  const { updateDocument, deleteDocument, response } =
    useFirestore<PatientData>("patients")

  const navigate = useNavigate()

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

  useEffect(() => {
    if (isHistoryFormOpen) {
      document.body.style.overflow = "hidden"
    } else if (!isHistoryFormOpen) {
      document.body.style.overflow = "unset"
    }
  }, [isHistoryFormOpen])

  return (
    <>
      {patient && (
        <div className="flex flex-col py-4 ">
          <PatientHeader patient={patient} />

          <h2 className="font-semibold text-2xl self-center mt-12">
            Pateint History
          </h2>

          <PatientHistory patient={patient} />

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
                className="z-40 px-40 lg:px-36 md:px-24 sm:px-4 bg-gray-200 bg-opacity-80 fixed inset-0 "
              >
                <button
                  onClick={() => setIsHistoryFormOpen(false)}
                  className="fixed top-4 right-4  text-2xl text-sky-600"
                >
                  X
                </button>
              </div>

              <form
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg z-40  fixed inset-x-36 inset-y-12 xl:inset-x-24 lg:inset-x-20 md:inset-x-12 sm:inset-x-4  overflow-y-scroll flex flex-col px-10 pb-6 [&_label]:mt-6 [&>label]:flex [&>label]:flex-col [&_input]:bg-gray-50  [&_input]:mt-1 [&_input]:p-2  [&_input]:border-b  [&_input]:border-sky-600      [&_input]:outline-none "
                onSubmit={handleSubmit}
              >
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
