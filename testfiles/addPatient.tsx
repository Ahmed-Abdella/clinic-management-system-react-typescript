// import { useState } from "react"

// import { useFirestore } from "../hooks/useFirestore"

// import { Timestamp } from "firebase/firestore"

// import { useNavigate } from "react-router-dom"

// import { useAuthContext } from "../hooks/useAuthContext"

// import PatientHistoryForm from "../components/PatientHistoryForm"

// const AddPatient: React.FC = () => {
//   interface PatientHistory {
//     diagnosis?: string
//     notes?: string
//     spices?: string[]
//     createdAt: Timestamp
//   }

//   interface PatientData {
//     createdAt: Timestamp
//     doctorUid: string | undefined
//     patientName: string
//     patientAge: number | string
//     gender: string
//     patientHistory: PatientHistory[]
//   }

//   const [patientName, setPatientName] = useState<string>("")
//   const [patientAge, setPatientAge] = useState<number | string>("")
//   const [gender, setGender] = useState<string>("")
//   const [patientHistory, setPatientHistory] = useState<PatientHistory[]>([])

//   const { addDocument, response } = useFirestore<PatientData>("patients")

//   const { user } = useAuthContext()

//   const navigate = useNavigate()

//   const setHistory = (patientHistory: PatientHistory[]) => {
//     setPatientHistory(patientHistory)
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const createdAt = Timestamp.fromDate(new Date())
//     const doctorUid = user?.uid

//     await addDocument({
//       createdAt,
//       doctorUid,
//       patientName,
//       patientAge,
//       gender,
//       patientHistory,
//     })

//     if (!response.error) {
//       navigate("/")
//     }
//   }
//   return (
//     <form
//       className="flex flex-col w-full px-36 pb-6 [&_label]:mt-6 [&>label]:flex [&>label]:flex-col [&_input]:bg-gray-50  [&_input]:mt-1 [&_input]:p-2  [&_input]:border-b  [&_input]:border-sky-600      [&_input]:outline-none "
//       onSubmit={handleSubmit}
//     >
//       <label>
//         <span>Patient name:</span>

//         <input
//           required
//           type="text"
//           value={patientName}
//           onChange={(e) => setPatientName(e.target.value)}
//         ></input>
//       </label>

//       <label>
//         <span>Age:</span>

//         <input
//           required
//           type="number"
//           value={patientAge}
//           onChange={(e) => setPatientAge(e.target.value)}
//         ></input>
//       </label>

//       <div className="mt-2 [&>*]:mr-10 [&_input]:ml-1">
//         <span>Gender:</span>
//         <label className="">
//           <span className="text-center">Male</span>
//           <input
//             type="radio"
//             value="Male"
//             checked={gender === "Male"}
//             onChange={(e) => setGender(e.target.value)}
//           />
//         </label>

//         <label>
//           <span>Female</span>
//           <input
//             type="radio"
//             value="Female"
//             checked={gender === "Female"}
//             onChange={(e) => setGender(e.target.value)}
//           />
//         </label>
//       </div>

//       <PatientHistoryForm setHistory={(history) => setHistory(history)} />

//       {response.isPending && (
//         <p className="text-xl my-4 text-sky-500">Adding The Patient</p>
//       )}
//       <button className="mt-8 w-40 self-center bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition duration-200">
//         Add Patient
//       </button>
//     </form>
//   )
// }

// export default AddPatient
