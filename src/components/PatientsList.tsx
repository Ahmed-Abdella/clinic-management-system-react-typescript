import PatientItem from "./PatientItem"
import { MdPerson } from "react-icons/Md"
export default function PatientsList({ patients }: { patients: any[] }) {
  return (
    <div className="flex flex-col ">
      <div className="border-b flex items-center   px-4   md:text-sm sm:text-xs ">
        <div className="py-2 mr-2 flex-grow [&_span]:text-gray-500  grid grid-cols-5 lg:grid-cols-9 gap-2 md:gap-0 items-center justify-between ">
          <div className="col-span-3 lg:col-span-5 flex items-center ">
            <p className="">Patient Name</p>
          </div>

          <div className=" lg:col-span-2">
            <span>Age</span>
          </div>
          <div className="lg:col-span-2">
            <span>Gender</span>
          </div>
        </div>
        <div className="ml-auto w-16"></div>
      </div>

      {patients.map((patient) => (
        <div
          key={patient.id}
          className="border-b flex items-center  px-4  even:bg-sky-50 odd:bg-white hover:bg-sky-100 transition duration-100  md:text-sm sm:text-xs"
        >
          <PatientItem patient={patient} />
        </div>
      ))}
    </div>
  )
}
