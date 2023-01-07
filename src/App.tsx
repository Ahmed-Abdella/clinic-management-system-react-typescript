import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";

import "./App.css";
import AddPatient from "./pages/AddPatient";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <div className="font-sans bg-sky-50 min-h-screen ">
      <BrowserRouter>
        <NavBar />

        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
