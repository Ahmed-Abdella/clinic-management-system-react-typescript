import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex items-center justify-between left-0 py-6 px-28">
      <div className="text-2xl font-bold">LOGO</div>
      <div className="">
        <ul className=" flex items-center justify-center   [&>*]:[&>*]:px-4 [&>*]:[&>*]:py-2 [&>*]:[&>*]:rounded-lg    ">
          <li className="">
            <Link
              className="mr-2 font-semibold text-sky-600 hover:underline  transition duration-100"
              to="/login"
            >
              Login
            </Link>
          </li>

          <li className="">
            <Link
              className="text-white font-semibold bg-sky-600 hover:bg-sky-700 transition duration-100 "
              to="/signup"
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
