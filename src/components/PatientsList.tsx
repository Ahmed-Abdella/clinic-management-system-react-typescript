import PatientItem from "./PatientItem"
export default function PatientsList({ patients }: { patients: any[] }) {
  return (
    <div className="flex flex-col ">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="border-b flex items-center  px-4  bg-sky-50 hover:bg-sky-100 transition duration-100"
        >
          <PatientItem patient={patient} />
        </div>
      ))}
    </div>
  )
}
