import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"

const Header = () => {
  const { user } = useAuthContext()

  const { logout } = useLogout()
  return (
    <div className=" blury flex items-center fixed  border-b  top-0 right-0 left-48 lg:left-0 py-2 pr-6 pl-6 lg:pl-16  ">
      <div className="inline-block  h-10 w-10 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={user?.photoURL!}
          alt={"profile picture"}
        />
      </div>
      <p className="w-36   text-center">
        <span className="font-semibold">Dr. </span>
        {`${user?.displayName}`}
      </p>
      <div className="ml-auto">
        <ul className=" flex items-center justify-center   [&>*]:[&>*]:px-2 [&>*]:[&>*]:py-2 [&>*]:[&>*]:rounded-lg    ">
          {!user && (
            <>
              <li className="">
                <Link
                  className=" font-semibold text-sky-600 hover:underline  transition duration-100"
                  to="/login"
                >
                  Login
                </Link>
              </li>

              <li className="">
                <Link
                  className=" font-semibold text-sky-600 hover:underline  transition duration-100 "
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          )}

          {user && (
            <li className="">
              <button
                className="font-semibold text-sky-600 hover:underline  transition duration-100 "
                onClick={logout}
              >
                logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
