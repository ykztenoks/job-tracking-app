import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../api"
const JobApplicationContext = createContext()

export default function JobApplication({ children }) {
  const [jobs, setJobs] = useState([])
  const navigate = useNavigate()

  const fetchJobApplications = async () => {
    try {
      const response = await api.get("/jobApplications")

      setJobs(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSingleJob = async (id, setJob, setNewJob) => {
    try {
      const response = await api.get(`/jobApplications/${id}`)
      setJob(response.data)
      setNewJob(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createJobApplication = async (newJob, e, setToggleForm) => {
    e.preventDefault()
    try {
      const response = await api.post("/jobApplications", newJob)

      if (response.status === 200 || response.status === 201) {
        fetchJobApplications()
        toast.success("Job application created!")
        setToggleForm(false)
        // optimistic UI approach
        // setJobs([...jobs, newJob])
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const updateJobApplication = async (
    updatedJob,
    e,
    id,
    setIsEditting,
    setJob,
  ) => {
    e.preventDefault()
    try {
      const response = await api.put(`/jobApplications/${id}`, updatedJob)

      if (response.status === 200) {
        setIsEditting(false)
        toast.success("Job application updated!")

        setJob((prev) => ({ ...prev, ...updatedJob }))
        fetchJobApplications()
      }
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const deleteJobApplication = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete?")

      if (confirmed) {
        const response = await api.delete(`/jobApplications/${id}`)
        response.status === 200 && fetchJobApplications()
        toast.success("Job application deleted 🤔")

        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchJobApplications()
  }, [])

  return (
    <JobApplicationContext.Provider
      value={{
        jobs,
        setJobs,
        fetchSingleJob,
        createJobApplication,
        updateJobApplication,
        deleteJobApplication,
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  )
}

export { JobApplicationContext }
