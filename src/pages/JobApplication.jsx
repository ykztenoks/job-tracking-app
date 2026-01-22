import { useContext, useEffect, useState } from "react"
import { JobApplicationContext } from "../context/JobApplicationContext"
import { useParams } from "react-router-dom"

export default function JobApplication() {
  const { fetchSingleJob } = useContext(JobApplicationContext)
  const { id } = useParams()
  const [job, setJob] = useState(undefined)

  useEffect(() => {
    fetchSingleJob(id, setJob)
  }, [id])

  return (
    <div className="flex items-center justify-center">
      {job ? (
        <div className="flex flex-col items-center border-amber-300 border m-4 p-4 w-[70vw]">
          <h2>{job.title}</h2>

          <p>{job.description}</p>
          <span>applied on: {job.applyDate}</span>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  )
}
