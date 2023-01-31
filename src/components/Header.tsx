import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Header = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();
  return (
    <div className=" flex items-center left-0 py-6 ">
      <div className="text-2xl font-bold">LOGO</div>
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
  );
};

export default Header;
