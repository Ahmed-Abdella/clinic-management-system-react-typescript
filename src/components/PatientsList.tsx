import { Link } from "react-router-dom";

export default function PatientsList({ patients }: { patients: any[] }) {
  return (
    <div className="flex flex-col">
      {patients.map((patient) => (
        <Link
          to={`/patient/${patient.id}`}
          key={patient.id}
          className=" [&_span]:text-sky-600   flex gap-8 items-center py-4 px-4 border-b-2 border-gray-200  text-lg hover:bg-gray-200 transition duration-200  "
        >
          <div className="mr-auto">
            <span>Name: </span>
            {patient.patientName}
          </div>
          <div>
            <span>Age: </span>
            {patient.patientAge}
          </div>
          <div>
            <span>Gender: </span>
            {patient.gender}
          </div>
        </Link>
      ))}
    </div>
  );
}
