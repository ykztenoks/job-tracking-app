import JobApplicationList from "../components/JobApplicationList"
import CreateApplication from "../components/CreateApplication"
export default function Homepage({ toggleForm, setToggleForm }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      {toggleForm && <CreateApplication setToggleForm={setToggleForm} />}

      <h1 className="text-2xl m-4">Job application list:</h1>
      <JobApplicationList />
    </div>
  )
}
