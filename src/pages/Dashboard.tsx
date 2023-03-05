import { useAuthContext } from "../hooks/useAuthContext"

const Dashboard: React.FC = () => {
  const { user } = useAuthContext()
  console.log(user)

  return (
    <div>
      <p className="p-4 text-xl text-center text-orange-600 bg-orange-100 rounded">
        &#9888; Dashboard and Schedule pages will be available soon
      </p>
      <p className="mt-10 p-4 text-xl text-center text-blue-600 bg-blue-100 rounded">
        Go to Add Patient page && All Patients Pages
      </p>
    </div>
  )
}

export default Dashboard
