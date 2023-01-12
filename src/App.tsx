import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";

import "./App.css";
import AddPatient from "./pages/AddPatient";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import AllPatients from "./pages/AllPatients";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  return (
    <div className="font-sans bg-sky-50 min-h-screen ">
      <BrowserRouter>
        <NavBar />

        <div className=" ml-48 lg:ml-4">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/all-patients" element={<AllPatients />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
