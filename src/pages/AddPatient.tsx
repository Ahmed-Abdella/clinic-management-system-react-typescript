import { useState } from "react";

const AddPatient: React.FC = () => {
  const [patientName, setPatientName] = useState<string>("");
  const [patientAge, setPatientAge] = useState<number | string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log(patientName, patientAge);
  };
  return (
    <form className="flex flex-col w-full px-10" onSubmit={handleSubmit}>
      <label>
        <span>Patient name</span>

        <input
          required
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        ></input>
      </label>

      <label>
        <span>Age</span>

        <input
          required
          type="number"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
        ></input>
      </label>

      <label>
        <span>Diagnosis</span>

        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        ></textarea>
      </label>
    </form>
  );
};

export default AddPatient;
