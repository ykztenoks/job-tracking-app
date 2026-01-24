import "./App.css"
import { Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import JobApplication from "./pages/JobApplication"
import Navbar from "./components/Navbar"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
function App() {
  const [toggleForm, setToggleForm] = useState(false)
  return (
    <div className="bg-slate-800 text-white min-h-screen">
      <Navbar setToggleForm={setToggleForm} />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage toggleForm={toggleForm} setToggleForm={setToggleForm} />
          }
        />
        <Route path="/job-application/:id" element={<JobApplication />} />
      </Routes>
    </div>
  )
}

export default App
