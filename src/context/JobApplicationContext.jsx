import axios from "axios"
import { createContext, useEffect, useState } from "react"

const JobApplicationContext = createContext()

export default function JobApplication({ children }) {
  const [jobs, setJobs] = useState([])

  const fetchJobApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5005/jobApplications")

      setJobs(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSingleJob = async (id, setJob) => {
    try {
      const response = await axios.get(
        `http://localhost:5005/jobApplications/${id}`,
      )
      setJob(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createJobApplication = async (newJob, e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:5005/jobApplications",
        newJob,
      )

      if (response.status === 200 || response.status === 201) {
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
  useEffect(() => {
    fetchJobApplications()
  }, [])

  return (
    <JobApplicationContext.Provider
      value={{ jobs, setJobs, fetchSingleJob, createJobApplication }}
    >
      {children}
    </JobApplicationContext.Provider>
  )
}

export { JobApplicationContext }
