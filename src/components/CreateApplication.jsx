import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { JobApplicationContext } from "../context/JobApplicationContext"

const fetchCompanies = async (setCompanies) => {
  try {
    const response = await axios.get("http://localhost:5005/companies")
    setCompanies(response.data)
  } catch (error) {
    console.log(error)
  }
}
export default function CreateApplication({ setToggleForm }) {
  const [companies, setCompanies] = useState(undefined)
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    status: "",
    companyId: "",
    applyDate: "",
  })
  const { createJobApplication } = useContext(JobApplicationContext)

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    fetchCompanies(setCompanies)
  }, [])

  return companies ? (
    <form
      onSubmit={(e) => createJobApplication(newJob, e, setToggleForm)}
      className="flex flex-col gap-2 border border-amber-400 rounded-sm p-6 m-4  shadow-sm shadow-amber-300 w-[30vw]"
    >
      <label htmlFor="title">Position Title</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        className="input"
      />
      <label htmlFor="">Description</label>

      <input
        type="text"
        name="description"
        onChange={handleChange}
        className="input"
      />
      <label htmlFor="">Status</label>
      <select name="status" onChange={handleChange} className="p-1">
        <option value="" hidden className="bg-slate-800">
          Select the status
        </option>
        <option value="Applied" className="bg-slate-800 ">
          Applied
        </option>
        <option value="Interviewing" className="bg-slate-800 ">
          Interviewing
        </option>
        <option value="Accepted" className="bg-slate-800 ">
          Accepted
        </option>
        <option value="Rejected" className="bg-slate-800 ">
          Rejected
        </option>
      </select>
      <label htmlFor="companyId">Company</label>
      <select name="companyId" onChange={handleChange} className="p-1">
        <option value="" hidden>
          Select the company
        </option>
        {companies.map((company) => (
          <option value={company.id} className="bg-slate-800">
            {company.companyName}
          </option>
        ))}
      </select>
      <label htmlFor="applyDate">Date applied</label>
      <input
        type="date"
        name="applyDate"
        onChange={handleChange}
        className="bg-slate-800 input"
      />
      <button
        type="submit"
        className="border rounded-sm p-2 shadow-sm shadow-amber-400 hover:bg-amber-200 transition-all 1s"
      >
        Create!
      </button>
    </form>
  ) : (
    <p>loading</p>
  )
}
