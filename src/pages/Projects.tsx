import { Link } from 'react-router-dom'
import { GitHubIcon, ExternalLinkIcon, RocketIcon } from '../components/Icons'
import './Projects.css'

// You can add your projects here
const projects = [
  {
    id: 'willowbrook-game',
    title: 'Willowbrook Game',
    description: 'A game project built with C#.',
    tags: ['C#', 'Unity', 'Game Dev'],
    github: 'https://github.com/juliank1m/willowbrook-game',
    liveDemo: undefined as string | undefined,
  },
  {
    id: 'gyl-website',
    title: 'GYL Website Prototype',
    description: 'A website prototype built with JavaScript.',
    tags: ['JavaScript', 'Web'],
    github: 'https://github.com/juliank1m/gyl-website-prototype',
    liveDemo: undefined as string | undefined,
  },
  // Add more projects here...
]

export default function Projects() {
  return (
    <div className="projects-page">
      <header className="projects-header">
        <h1 className="page-title">
          <span className="title-icon"><RocketIcon /></span> Projects
        </h1>
        <p className="page-subtitle">
          A collection of projects I've worked on. Click on any project to learn more.
        </p>
      </header>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="project-links">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <GitHubIcon /> Code
                </a>
              )}
              {project.liveDemo && (
                <Link to={project.liveDemo} className="project-link project-link-demo">
                  <ExternalLinkIcon /> Live Demo
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="no-projects">
          <p>Projects coming soon!</p>
        </div>
      )}
    </div>
  )
}
