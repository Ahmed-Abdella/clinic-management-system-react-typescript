import React, { useState, useRef } from "react";

import { RxCross2 } from "react-icons/rx";

const AddPatient: React.FC = () => {
  const [patientName, setPatientName] = useState<string>("");
  const [patientAge, setPatientAge] = useState<number | string>("");
  const [gender, setGender] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");

  const [newSpice, setNewSpice] = useState<string>("");
  const [spices, setSpices] = useState<string[]>([]);

  // const onGenderChange = (e:React.FormEvent<HTMLFormElement>) => {

  // }

  const spicesInput = useRef<HTMLInputElement | null>(null);

  const handleAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const spice = newSpice.trim();
    if (spice && !spices.includes(spice)) {
      setSpices((prevspices) => [...prevspices, spice]);
    }

    setNewSpice("");

    spicesInput.current?.focus();
  };

  const removeSpice = (i: string): void => {
    const index = spices.indexOf(i);
    if (index > -1) {
      setSpices(spices.filter((spice) => spice !== i));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log(patientName, patientAge, diagnosis, gender, spices);
  };
  return (
    <form
      className="flex flex-col w-full px-36 pb-6 [&_label]:mt-6 [&>label]:flex [&>label]:flex-col [&_input]:mt-1 [&_input]:p-2 [&_input]:border [&_input]:border-gray-600  [&_input]:rounded [&_input]:outline-sky-600 "
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

      <div className="mt-2 [&>*]:mr-10 [&_input]:ml-1">
        <span>Gender:</span>
        <label className="">
          <span className="text-center">Male</span>
          <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>

        <label>
          <span>Female</span>
          <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
      </div>

      <label>
        <span>Diagnosis:</span>

        <textarea
          className="border border-gray-400 h-48 mt-1 p-4 rounded-lg shadow-lg outline-sky-600"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        ></textarea>
      </label>

      <label>
        <span>Medicinal spice</span>
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
            Add spice
          </button>
        </div>
      </label>

      <div className="mt-2 flex flex-wrap items-center h-10">
        <span className="mr-4">current spices:</span>
        {spices.map((i) => (
          <div
            className=" flex bg-gray-300 py-1  pl-2  pr-1 rounded mr-1 "
            key={i}
          >
            <span className="mr-2 ">{i}</span>

            <button
              onClick={(e) => {
                e.preventDefault();
                removeSpice(i);
              }}
              className="self-start text-sm  cursor-pointer  rounded-full hover:bg-gray-400 transition duration-75"
            >
              <RxCross2 />
            </button>
          </div>
        ))}
      </div>

      <button className="mt-8 w-40 self-center bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition duration-200">
        Add Patient
      </button>
    </form>
  );
};

export default AddPatient;
