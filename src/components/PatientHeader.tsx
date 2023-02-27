import { MdPerson } from "react-icons/Md"
import { PatientData } from "../pages/Patient"

export default function PatientHeader({ patient }: { patient: PatientData }) {
  return (
    <div className="flex items-center gap-0  [&_span]:mr-1 [&_span]:text-sky-500 lg:text-sm md:text-xs">
      <div className="font-semibold text-lg lg:text-sm sm:text-xs  flex items-center ">
        <MdPerson className="mr-2 lg:mr-1 text-sky-500" />

        <p className="">{patient?.patientName}</p>
      </div>

      <div className="ml-auto">
        <span>Age:</span>
        {patient.patientAge}
      </div>

      <div className="ml-2">
        {" "}
        <span>Gender:</span>
        {patient.gender}
      </div>
      <div className="ml-4 text-gray-400 text-sm lg:text-xs">
        {String(patient.createdAt.toDate().toDateString())}
      </div>
    </div>
  )
}
