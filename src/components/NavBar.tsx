import { useState } from "react"

import { Form, NavLink } from "react-router-dom"

import { RxDashboard } from "react-icons/Rx"

import { MdSchedule } from "react-icons/Md"
import {
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineArrowLeft,
} from "react-icons/Ai"

import { BsPeople } from "react-icons/Bs"

import { useLogout } from "../hooks/useLogout"

import { BiLogOutCircle } from "react-icons/Bi"

import { SiAsciidoctor } from "react-icons/Si"

import { useAuthContext } from "../hooks/useAuthContext"

const NavBar: React.FC = () => {
  const [barIsOpen, setBarIsOpen] = useState<boolean>(false)
  const { logout } = useLogout()
  const { user } = useAuthContext()
  return (
    <>
      {!barIsOpen ? (
        <AiOutlineMenu
          onClick={() => setBarIsOpen(true)}
          className="hidden text-2xl cursor-pointer lg:block fixed top-8 left-4 z-40"
        />
      ) : (
        <AiOutlineArrowLeft
          onClick={() => setBarIsOpen(false)}
          className="hidden text-2xl lg:block cursor-pointer fixed top-8 left-4 z-40"
        />
      )}

      {barIsOpen && (
        <div
          onClick={() => setBarIsOpen(false)}
          className=" hidden lg:block fixed inset-0 bg-gray-600 bg-opacity-20 "
        ></div>
      )}

      <div
        className={`lg:z-30 flex flex-col w-48  fixed top-0 left-0 bottom-0 min-h-screen border-r lg:bg-sky-100 lg:translate-x-[-20rem] ${
          barIsOpen ? "lg:translate-x-0" : ""
        }  transition duration-500  [&_svg]:text-sky-600 `}
      >
        <div className="w-full flex flex-col items-center px-2 mt-10">
          <SiAsciidoctor className="text-3xl mb-2" />
        </div>

        <ul className=" text-gray-600 text-base   flex flex-col gap-2   py-10 [&>*]:[&>*]:flex [&>*]:[&>*]:items-center [&>*]:[&>*]:[&>*]:mr-4 [&>*]:[&>*]:px-4 [&>*]:[&>*]:py-1 [&>*]:[&>*]:border-r-4 [&>*]:[&>*]:border-transparent   [&>*]:[&>*]:rounded-r-sm w-full   ">
          <li onClick={() => setBarIsOpen(false)}>
            <NavLink className="" to={"/"}>
              <RxDashboard />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li onClick={() => setBarIsOpen(false)}>
            <NavLink className="" to={"/schedule"}>
              <MdSchedule />
              <p>Schedule</p>
            </NavLink>
          </li>

          <li onClick={() => setBarIsOpen(false)}>
            <NavLink className="" to={"/all-patients"}>
              <BsPeople />

              <p> All Patients</p>
            </NavLink>
          </li>

          <li onClick={() => setBarIsOpen(false)}>
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
    </>
  )
}

export default NavBar
