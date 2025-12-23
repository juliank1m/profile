import { Link } from 'react-router-dom'
import './GylPrototype.css'

export default function CourseTools() {
  return (
    <div className="embed-page">
      <div className="embed-header">
        <Link to="/projects" className="back-link">
          ← Back to Projects
        </Link>
        <h1 className="embed-title">Course Tools</h1>
        <a 
          href="https://coursetools.juliankim.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="open-external"
        >
          Open in new tab ↗
        </a>
      </div>
      <iframe
        src="https://coursetools.juliankim.dev"
        title="Course Tools"
        className="embed-iframe"
      />
    </div>
  )
}

