import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from '../components/Icons'
import { Badge } from '../components/ui/badge'
import { projects } from '../data/projects'
import './Projects.css'

export default function Projects() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="projects-page">
      <header className="projects-head">
        <p>Selected Work</p>
        <h1>Simple cards. Click any project for full details and live preview.</h1>
      </header>

      <div className="projects-grid projects-grid-simple">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={`project-link-card project-theme-${project.theme}`}
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.34, ease: 'easeOut', delay: index * 0.04 }}
          >
            <Link to={`/projects/${project.id}`} className="project-card-link" aria-label={`Open ${project.title} project details`}>
              <div className="project-card-top">
                <h2>{project.title}</h2>
                <span>
                  Open <ExternalLinkIcon />
                </span>
              </div>

              <p className="project-card-summary">{project.summary}</p>

              <div className="project-tags project-tags-simple">
                {project.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
