import { Link, Navigate, useParams } from 'react-router-dom'
import { ExternalLinkIcon, GitHubIcon } from '../components/Icons'
import { Badge } from '../components/ui/badge'
import { getProjectById } from '../data/projects'
import './ProjectDetail.css'

export default function ProjectDetail() {
  const { projectId } = useParams()
  const project = projectId ? getProjectById(projectId) : undefined

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <section className={`project-detail-page project-detail-theme-${project.theme}`}>
      <header className="project-detail-head">
        <Link to="/projects" className="project-detail-back">
          ← Back to Projects
        </Link>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>

      <div className="project-detail-meta">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="project-detail-actions">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="ui-button ui-button-outline ui-button-sm">
          <GitHubIcon /> View code
        </a>
        {project.liveDemo ? (
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="ui-button ui-button-default ui-button-sm">
            <ExternalLinkIcon /> Open live demo
          </a>
        ) : null}
      </div>

      {project.featureHighlights?.length ? (
        <article className="project-detail-block">
          <h2>Highlights</h2>
          <ul>
            {project.featureHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      ) : null}

      <article className="project-detail-block">
        <h2>Live Preview</h2>
        {project.liveDemo && project.previewSrc && !project.previewBlocked ? (
          <iframe src={project.previewSrc} title={`${project.title} live preview`} className="project-detail-preview" loading="lazy" />
        ) : (
          <div className="project-detail-preview-fallback">
            {project.liveDemo
              ? 'This project does not allow embedded preview right now. Open the live demo in a new tab.'
              : 'No live preview is available for this project yet.'}
          </div>
        )}
      </article>
    </section>
  )
}
