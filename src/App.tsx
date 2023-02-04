import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"

import NavBar from "./components/NavBar"

import "./App.css"
import AddPatient from "./pages/AddPatient"
import Dashboard from "./pages/Dashboard"
import Schedule from "./pages/Schedule"
import AllPatients from "./pages/AllPatients"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Patient from "./pages/Patient"

import Header from "./components/Header"
import { useAuthContext } from "./hooks/useAuthContext"

function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className="font-sans   min-h-screen ">
      {authIsReady && (
        <BrowserRouter>
          {user && <NavBar />}

          <div className={`${user ? "px-16 ml-48 lg:ml-2" : "ml-2"} `}>
            <Header />
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Login />} />
              <Route
                path="/add-patient"
                element={user ? <AddPatient /> : <Login />}
              />
              <Route
                path="/schedule"
                element={user ? <Schedule /> : <Login />}
              />
              <Route
                path="/all-patients"
                element={user ? <AllPatients /> : <Login />}
              />

              <Route
                path="/patient/:id"
                element={user ? <Patient /> : <Login />}
              />

              <Route
                path="/signup"
                element={!user ? <Signup /> : <Dashboard />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Dashboard />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
