import { MdOutlineCancel } from "react-icons/Md"
import { useRef, useState } from "react"
import { Timestamp } from "firebase/firestore"

interface PatientHistory {
  diagnosis?: string
  notes?: string
  spices?: string[]
  createdAt: Timestamp
}

export default function PatientHistoryForm({
  setHistory,
}: {
  setHistory: (patientHistory: PatientHistory[]) => void
}) {
  const spicesInput = useRef<HTMLInputElement | null>(null)
  const [newSpice, setNewSpice] = useState<string>("")

  const [diagnosis, setDiagnosis] = useState<string>("")
  const [notes, setNotes] = useState<string>("")

  const [spices, setSpices] = useState<string[]>([])

  const patientHistory: PatientHistory = {
    createdAt: Timestamp.fromDate(new Date()),
    diagnosis,
    notes,
    spices,
  }

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

  setHistory([patientHistory])

  return (
    <>
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
    </>
  )
}
