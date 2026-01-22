import { useContext } from "react"
import { JobApplicationContext } from "../context/JobApplicationContext"
import { Link } from "react-router-dom"
export default function JobApplicationList() {
  const { jobs } = useContext(JobApplicationContext)

  return jobs.length ? (
    jobs.map((job) => (
      <div className="flex flex-col items-center border-amber-300 border w-[30vw] p-4 rounded-sm">
        <Link to={`/job-application/${job.id}`}>
          <h2>{job.title}</h2>
        </Link>
        <p>{job.description}</p>
        <span>applied on: {job.applyDate}</span>
      </div>
    ))
  ) : (
    <p>loading...</p>
  )
}
