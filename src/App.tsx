import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";

import "./App.css";
import AddPatient from "./pages/AddPatient";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import AllPatients from "./pages/AllPatients";

function App() {
  return (
    <div className="font-sans bg-sky-50 min-h-screen ">
      <BrowserRouter>
        <NavBar />

        <div className="ml-60">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/all-patients" element={<AllPatients />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
