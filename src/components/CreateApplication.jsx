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
export default function CreateApplication() {
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
      onSubmit={(e) => createJobApplication(newJob, e)}
      className="flex flex-col gap-2 border rounded-sm p-6 m-4  shadow-sm shadow-amber-300"
    >
      <label htmlFor="title">Position Title</label>
      <input type="text" name="title" onChange={handleChange} />

      <label htmlFor="">Description</label>
      <input type="text" name="description" onChange={handleChange} />

      <label htmlFor="">Status</label>
      <select name="status" onChange={handleChange}>
        <option value="" hidden>
          Select the status
        </option>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>

      <label htmlFor="companyId">Company</label>
      <select name="companyId" onChange={handleChange}>
        <option value="" hidden>
          Select the company
        </option>
        {companies.map((company) => (
          <option value={company.id}>{company.companyName}</option>
        ))}
      </select>
      <label htmlFor="applyDate">Date applied</label>
      <input type="date" name="applyDate" onChange={handleChange} />
      <button
        type="submit"
        className="border rounded-sm p-2 shadow-sm shadow-amber-300 hover:bg-amber-200 transition-all 1s"
      >
        Create!
      </button>
    </form>
  ) : (
    <p>loading</p>
  )
}
