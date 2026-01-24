import { Link } from "react-router-dom"

export default function Navbar({ setToggleForm }) {
  return (
    <div className="flex justify-evenly h-[7vh] items-center shadow-sm shadow-amber-400">
      <h2>JobApplicationTracker 🛤️</h2>
      <Link to="/" className="hover-amber">
        <h2>Applications</h2>
      </Link>
      <h2
        className="hover-amber"
        onClick={() => setToggleForm((current) => (current ? false : true))}
      >
        Create Application
      </h2>
    </div>
  )
}
