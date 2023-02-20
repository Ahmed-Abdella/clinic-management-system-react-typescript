import { useAuthContext } from "../hooks/useAuthContext"

const Dashboard: React.FC = () => {
  const { user } = useAuthContext()
  console.log(user)

  return <div>Dashboard</div>
}

export default Dashboard
