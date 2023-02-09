// import { useParams } from "react-router-dom"
// import { useState } from "react"

// import { useDocument } from "../hooks/useDocument"

// import { Timestamp } from "firebase/firestore"
// import PatientHistoryForm from "../components/PatientHistoryForm"

// interface PatientHistory {
//   diagnosis?: string
//   notes?: string
//   spices?: string[]
//   createdAt: Timestamp
// }

// interface PatientData {
//   createdAt: Timestamp
//   doctorUid: string | undefined
//   patientName: string
//   patientAge: number | string
//   gender: string
//   patientHistory: PatientHistory[]
// }
// export default function Patient() {
//   const [isHistoryFormOpen, setIsHistoryFormOpen] = useState<boolean>(false)
//   const [patientHistory, setPatientHistory] = useState<PatientHistory[]>([])

//   const { id } = useParams()
//   const {
//     document: patient,
//     error,
//     isPending,
//   } = useDocument<PatientData>("patients", id!)
//   console.log(patient)

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//   }

//   return (
//     <>
//       {patient && (
//         <div className="flex flex-col ">
//           <div className="flex items-center gap-2">
//             <div>{patient?.patientName}</div>

//             <div>{patient?.patientAge}</div>

//             <div>{patient?.gender}</div>
//           </div>

//           <div>{String(patient?.createdAt.toDate().toDateString())}</div>

//           <div>
//             {patient.patientHistory.map((history, i) => {
//               return (
//                 <div key={i}>
//                   <div>{String(history.createdAt.toDate().toDateString())}</div>
//                   <div>{history.diagnosis}</div>
//                   <div>
//                     {history.spices?.map((spice) => {
//                       return <div key={spice}>{spice}</div>
//                     })}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       )}
//       <button onClick={() => setIsHistoryFormOpen(true)}>Update Patient</button>

//       {isHistoryFormOpen && (
//         <div className="bg-gray-200 bg-opacity-80 fixed inset-0 flex justify-center items-center">
//           <form
//             className="flex flex-col w-full px-36 pb-6 [&_label]:mt-6 [&>label]:flex [&>label]:flex-col [&_input]:bg-gray-50  [&_input]:mt-1 [&_input]:p-2  [&_input]:border-b  [&_input]:border-sky-600      [&_input]:outline-none "
//             onSubmit={handleSubmit}
//           >
//             <PatientHistoryForm
//               setHistory={(patientHistory) => setPatientHistory(patientHistory)}
//             />
//           </form>
//         </div>
//       )}

//       {isPending && <p className="text-2xl text-sky-600">Loading....</p>}
//       {error && (
//         <p className="text-red-600 bg-red-100 px-3 py-2 rounded">{error}</p>
//       )}
//     </>
//   )
// }
