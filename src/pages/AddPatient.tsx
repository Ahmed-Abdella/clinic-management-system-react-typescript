import { useState } from "react";

const AddPatient: React.FC = () => {
  const [patientName, setPatientName] = useState<string>("");
  const [patientAge, setPatientAge] = useState<number | string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log(patientName, patientAge, diagnosis);
  };
  return (
    <form
      className="flex flex-col w-full px-36 pb-6 [&_label]:mt-6 [&_label]:flex [&_label]:flex-col [&_input]:mt-1 [&_input]:p-2 [&_input]:shadow [&_input]:rounded-lg [&_input]:outline-sky-600 "
      onSubmit={handleSubmit}
    >
      <label>
        <span>Patient name:</span>

        <input
          required
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        ></input>
      </label>

      <label>
        <span>Age:</span>

        <input
          required
          type="number"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
        ></input>
      </label>

      <label>
        <span>Diagnosis:</span>

        <textarea
          className="h-48 mt-1 p-4 rounded-lg shadow-lg outline-sky-600"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        ></textarea>
      </label>

      <button className="mt-8 w-40 self-center bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition duration-200">
        Add Patient
      </button>
    </form>
  );
};

export default AddPatient;
