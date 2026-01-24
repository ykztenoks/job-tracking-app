import { useContext, useEffect, useState } from "react"
import { JobApplicationContext } from "../context/JobApplicationContext"
import { useParams } from "react-router-dom"

export default function JobApplication() {
  const { fetchSingleJob, updateJobApplication, deleteJobApplication } =
    useContext(JobApplicationContext)
  const { id } = useParams()
  const [job, setJob] = useState(undefined)
  const [isEditting, setIsEditting] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    status: "",
    applyDate: "",
  })

  useEffect(() => {
    fetchSingleJob(id, setJob, setNewJob)
  }, [id])

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex items-center justify-center">
      {job ? (
        isEditting ? (
          <div>
            <form
              onSubmit={(e) =>
                updateJobApplication(newJob, e, id, setIsEditting, setJob)
              }
              className="flex flex-col items-center border-amber-300 border m-4 p-4 w-[70vw]"
            >
              <label htmlFor="title">Position Title</label>
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={handleChange}
              />

              <label htmlFor="">Description</label>
              <input
                type="text"
                name="description"
                value={newJob.description}
                onChange={handleChange}
              />

              <label htmlFor="applyDate">Date applied</label>
              <input
                type="date"
                name="applyDate"
                value={newJob.applyDate}
                onChange={handleChange}
              />
              <label htmlFor="status">Status</label>
              <select
                name="status"
                onChange={handleChange}
                value={newJob.status}
              >
                <option value="" hidden className="bg-slate-800">
                  Select the status
                </option>
                <option value="Applied" className="bg-slate-800">
                  Applied
                </option>
                <option value="Interviewing" className="bg-slate-800">
                  Interviewing
                </option>
                <option value="Accepted" className="bg-slate-800">
                  Accepted
                </option>
                <option value="Rejected" className="bg-slate-800">
                  Rejected
                </option>
              </select>
              <div>
                <button
                  className="bg-slate-700 p-4 rounded m-2"
                  onClick={() => setIsEditting(!isEditting)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-slate-700 p-4 rounded m-2">
                  Update Application
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center border-amber-300 border m-4 p-4 w-[70vw]">
            <h2>{job.title}</h2>

            <p>{job.description}</p>
            <span>applied on: {job.applyDate}</span>
            <span>status: {job.status} </span>

            <div>
              <button
                className="bg-slate-700 p-4 rounded m-2"
                onClick={() => setIsEditting(!isEditting)}
              >
                Edit
              </button>
              <button
                onClick={() => deleteJobApplication(id)}
                className="bg-slate-700 p-4 rounded m-2"
              >
                Delete
              </button>
            </div>
          </div>
        )
      ) : (
        <p>loading</p>
      )}
    </div>
  )
}
