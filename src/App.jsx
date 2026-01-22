import "./App.css"
import { Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import JobApplication from "./pages/JobApplication"
import Navbar from "./components/Navbar"
import { useState } from "react"

function App() {
  const [toggleForm, setToggleForm] = useState(false)
  return (
    <div>
      <Navbar setToggleForm={setToggleForm} />
      <Routes>
        <Route path="/" element={<Homepage toggleForm={toggleForm} />} />
        <Route path="/job-application/:id" element={<JobApplication />} />
      </Routes>
    </div>
  )
}

export default App
