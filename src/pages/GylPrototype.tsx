import { Link } from 'react-router-dom'
import './GylPrototype.css'

export default function GylPrototype() {
  return (
    <div className="embed-page">
      <div className="embed-header">
        <Link to="/projects" className="back-link">
          ← Back to Projects
        </Link>
        <h1 className="embed-title">GYL Website Prototype</h1>
        <a 
          href="https://gyl-website-prototype.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="open-external"
        >
          Open in new tab ↗
        </a>
      </div>
      <iframe
        src="https://gyl-website-prototype.vercel.app"
        title="GYL Website Prototype"
        className="embed-iframe"
      />
    </div>
  )
}

