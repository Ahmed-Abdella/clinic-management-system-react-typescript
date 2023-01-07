import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <ul>
      <li>
        <NavLink to={"/"}>dashboard</NavLink>
      </li>
      <li>
        <NavLink to={"/add-patient"}>add patient</NavLink>
      </li>
      <li>
        <NavLink to={"/schedule"}>schedule</NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
