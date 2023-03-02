import { useRef } from "react"
import { MdOutlineCancel } from "react-icons/Md"

type SetSpices = (spices: string[]) => void
type SetSpicesFunc = (SetFunc: SetSpices) => void

interface PatientHistoryProbs {
  diagnosis: string
  notes: string
  spices: string[]
  newSpice: string

  onDiagnosisChange: (value: string) => void
  onNotesChange: (value: string) => void
  onSpicesChange: any
  onNewSpiceChange: (spice: string) => void
}

const PatientHistoryForm = ({
  diagnosis,
  notes,
  spices,
  newSpice,
  onDiagnosisChange,
  onNotesChange,
  onSpicesChange,
  onNewSpiceChange,
}: PatientHistoryProbs) => {
  const handleAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault()
    const spice = newSpice.trim()
    if (spice && !spices.includes(spice)) {
      onSpicesChange((prevspices: string[]) => [...prevspices, spice])
    }

    onNewSpiceChange("")

    spicesInput.current?.focus()
  }

  const removeSpice = (i: string): void => {
    const index = spices.indexOf(i)
    if (index > -1) {
      onSpicesChange(spices.filter((spice) => spice !== i))
    }
  }

  const spicesInput = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <label>
        <span>Diagnosis:</span>

        <textarea
          className="bg-gray-50 h-48 mt-1 p-4 border-b border-sky-600  outline-none"
          value={diagnosis}
          onChange={(e) => onDiagnosisChange(e.target.value)}
        ></textarea>
      </label>

      <label>
        <span>Notes:</span>

        <textarea
          className="bg-gray-50  mt-1 p-4 border-b border-sky-600  outline-none"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        ></textarea>
      </label>

      <label>
        <span>Medicine</span>
        <div className="flex">
          <input
            type="text"
            onChange={(e) => onNewSpiceChange(e.target.value)}
            value={newSpice}
            ref={spicesInput}
          />
          <button
            className="ml-2 self-center sm:text-xs bg-green-200 hover:bg-green-300 transition duration-75 font-semibold px-2 py-2 rounded-lg "
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </label>

      <div className=" flex flex-wrap items-center mt-2 ">
        <span className="mr-4 mt-2">Current Medicines:</span>
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

export default PatientHistoryForm
