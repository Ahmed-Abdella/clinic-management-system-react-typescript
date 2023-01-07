import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <ul className="fixed top-0 left-0 bottom-0 text-gray-600 min-h-screen flex flex-col gap-10 bg-white rounded-r-xl py-10 [&>*]:[&>*]:flex [&>*]:[&>*]:px-4 [&>*]:[&>*]:py-1 [&>*]:[&>*]:border-r-4 [&>*]:[&>*]:border-transparent   [&>*]:[&>*]:rounded-r-sm w-48  ">
      <li>
        <NavLink className="" to={"/"}>
          dashboard
        </NavLink>
      </li>
      <li>
        <NavLink className="" to={"/add-patient"}>
          add patient
        </NavLink>
      </li>
      <li>
        <NavLink className="" to={"/schedule"}>
          schedule
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
