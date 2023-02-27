import { PatientData } from "../pages/Patient"

export default function PatientHistory({ patient }: { patient: PatientData }) {
  return (
    <div className="">
      {patient.patientHistory
        .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
        .map((history, i) => {
          return (
            <div
              key={i}
              className="mt-10 [&_h4]:text-sky-600 [&_h4]:text-lg [&_h4]:lg:text-base  [&_h4]:font-semibold"
            >
              <div className="mt-4 mb-2">
                <span className="text-gray-400 mr-4">Patient History on:</span>
                <span className="text-lg font-semibold">
                  {String(history.createdAt.toDate().toDateString())}
                </span>
              </div>
              <div className="mt-4 bg-white p-4 shadow rounded-xl">
                <div className="mt-2">
                  <h4 className=" ">Diagnosis</h4>

                  <p>{history.diagnosis}</p>
                </div>
                <div className="mt-6">
                  <h4 className=" ">Notes</h4>

                  <p>{history.notes}</p>
                </div>

                <div className="mt-6">
                  <h4 className=" ">Medicines:</h4>

                  <ul>
                    {history.spices?.map((spice: string) => {
                      return (
                        <li key={spice}>
                          <span className="ml-1 text-sky-600 text-lg font-semibold">
                            -
                          </span>{" "}
                          {spice}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
