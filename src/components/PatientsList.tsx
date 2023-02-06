import PatientItem from "./PatientItem"
export default function PatientsList({ patients }: { patients: any[] }) {
  return (
    <div className="flex flex-col ">
      {patients.map((patient) => (
        <PatientItem patient={patient} />
      ))}
    </div>
  )
}
