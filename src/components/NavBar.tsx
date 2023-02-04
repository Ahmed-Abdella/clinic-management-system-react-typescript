import { Form, NavLink } from "react-router-dom"

import { RxDashboard } from "react-icons/rx"

import { AiOutlineUserAdd } from "react-icons/ai"

import { MdSchedule } from "react-icons/Md"

import { BsPeople } from "react-icons/Bs"

import { useLogout } from "../hooks/useLogout"

import { BiLogOutCircle } from "react-icons/Bi"

const NavBar: React.FC = () => {
  const { logout } = useLogout()
  return (
    <div className="flex flex-col w-48  fixed top-0 left-0 bottom-0 min-h-screen border-r lg:translate-x-[-20rem] transition duration-500  [&_svg]:text-sky-600 ">
      <div className="w-full flex flex-col items-center px-2 mt-10">
        <div className="inline-block  h-16 w-16 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt={"profile picture"}
          />
        </div>

        <p className="w-36 text-sm  text-center">
          <span className="font-semibold">Dr.</span>
          {`Sara Ahmed Mohamed`}
        </p>
      </div>

      <ul className=" text-gray-600 text-base   flex flex-col gap-2   py-10 [&>*]:[&>*]:flex [&>*]:[&>*]:items-center [&>*]:[&>*]:[&>*]:mr-4 [&>*]:[&>*]:px-4 [&>*]:[&>*]:py-1 [&>*]:[&>*]:border-r-4 [&>*]:[&>*]:border-transparent   [&>*]:[&>*]:rounded-r-sm w-full   ">
        <li>
          <NavLink className="" to={"/"}>
            <RxDashboard />
            <p>Dashboard</p>
          </NavLink>
        </li>

        <li>
          <NavLink className="" to={"/schedule"}>
            <MdSchedule />
            <p>Schedule</p>
          </NavLink>
        </li>

        <li>
          <NavLink className="" to={"/all-patients"}>
            <BsPeople />

            <p> All Patients</p>
          </NavLink>
        </li>

        <li>
          <NavLink className="" to={"/add-patient"}>
            <AiOutlineUserAdd />

            <p> Add Patient</p>
          </NavLink>
        </li>
      </ul>

      <button
        className="text-sm flex jusitify-center items-center self-left  text-gray-700 hover:text-black transition duration-100  self-center [&>*]:mr-1  mt-auto mb-10 "
        onClick={logout}
      >
        <BiLogOutCircle />
        <span className="font-semibold">logout</span>
      </button>
    </div>
  )
}

export default NavBar
