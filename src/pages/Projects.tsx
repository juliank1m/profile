import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon, GitHubIcon } from '../components/Icons'
import { Badge } from '../components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import './Projects.css'

type ProjectItem = {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  liveDemo?: string
  previewSrc?: string
  previewBlocked?: boolean
  featureHighlights?: string[]
}

type ProjectRow = {
  id: string
  projects: ProjectItem[]
}

const projectRows: ProjectRow[] = [
  {
    id: 'row-pyclimb',
    projects: [
      {
        id: 'pyclimb',
        title: 'PyClimb',
        description:
          'A learning-first, end-to-end web application built intentionally step-by-step to understand real production-style architecture with clarity, correctness, and backend fundamentals.',
        tags: ['Django', 'PostgreSQL', 'Docker', 'Judge System', 'Learning Platform'],
        github: 'https://github.com/juliank1m/pyclimb',
        liveDemo: 'https://pyclimb.juliankim.dev/',
        previewSrc: 'https://pyclimb.juliankim.dev/',
        featureHighlights: [
          'Problem management: rich problem/test case models, difficulty/tag filters, solved/unsolved filters, admin inline editing, and function-call judge config.',
          'Submission system: verdict pipeline (AC/WA/RE/TLE/CE), per-test feedback, signed-in history, stdin/stdout + function-call modes, and judge timing.',
          'Lessons and courses: markdown lessons, rich editor (EasyMDE), draft/publish flow, problem linking, and staff teaching dashboard.',
          'User system: registration with email verification, login/logout, password reset, profiles, and weighted leaderboard.',
          'UI and product: homepage stats/prompts, problem filters, submission feedback views, learning routes, and legal pages.',
          'Infrastructure: PostgreSQL-backed Django app, slug URLs, submission/auth rate limiting, and media storage support.',
        ],
      },
    ],
  },
  {
    id: 'row-course-tools',
    projects: [
      {
        id: 'course-tools',
        title: 'Course Tools',
        description: 'A suite of calculators and utilities for linear algebra, calculus, chemistry, vectors, and CS workflows.',
        tags: ['React', 'TypeScript', 'Math Utilities'],
        github: 'https://github.com/juliank1m/course-tools',
        liveDemo: '/projects/course-tools-project',
        previewSrc: 'https://coursetools.juliankim.dev',
      },
    ],
  },
  {
    id: 'row-gyl',
    projects: [
      {
        id: 'gyl-website',
        title: 'GYL Website Prototype',
        description: 'A modern website prototype built around visual storytelling and interaction-first sections.',
        tags: ['JavaScript', 'Frontend'],
        github: 'https://github.com/juliank1m/gyl-website-prototype',
        liveDemo: '/projects/gyl-prototype-project',
        previewSrc: 'https://gyl-website-prototype.vercel.app',
      },
    ],
  },
  {
    id: 'row-monogame',
    projects: [
      {
        id: 'willowbrook-game',
        title: 'Willowbrook',
        description: 'A MonoGame DesktopGL project developed with C# and gameplay-first iteration loops.',
        tags: ['C#', 'MonoGame', 'Game Dev'],
        github: 'https://github.com/juliank1m/willowbrook-game',
      },
      {
        id: 'meow-meow-misses-home',
        title: 'Meow Meow Misses Home',
        description: 'A second MonoGame title focused on game feel, mechanics tuning, and level pacing.',
        tags: ['C#', 'MonoGame', 'Game Dev'],
        github: 'https://github.com/juliank1m/Meow-Meow-Misses-Home',
      },
    ],
  },
]

export default function Projects() {
  return (
    <section className="projects-page">
      <header className="projects-head">
        <p>Selected Work</p>
        <h1>Projects built for clarity, utility, and measurable user value.</h1>
      </header>

      <div className="projects-grid">
        {projectRows.map((row, index) => {
          const isDuoRow = row.projects.length === 2

          return (
            <motion.div
              key={row.id}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -180 : 180,
                y: 24,
                rotate: 0,
                scale: 0.96,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 14,
                mass: 0.8,
                delay: index * 0.04,
              }}
              className={`project-motion ${isDuoRow ? 'project-motion-duo' : ''}`}
            >
              <div className={`project-row ${isDuoRow ? 'project-row-duo' : ''}`}>
                {row.projects.map((project) => {
                  const isExternalLiveDemo =
                    project.liveDemo?.startsWith('http://') || project.liveDemo?.startsWith('https://')

                  return (
                    <Card key={project.id} className={`project-card project-card-${project.id}`}>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="project-tags">
                          {project.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>

                        {project.featureHighlights ? (
                          <ul className="project-feature-list">
                            {project.featureHighlights.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        ) : null}

                        {project.liveDemo ? (
                          <div className="project-preview">
                            <p>Live preview</p>
                            {project.previewBlocked ? (
                              <div className="project-preview-fallback">
                                This demo blocks iframe embedding. Open it in a new tab.
                              </div>
                            ) : project.previewSrc ? (
                              <iframe
                                src={project.previewSrc}
                                title={`${project.title} live preview`}
                                className="project-preview-frame"
                                loading="lazy"
                              />
                            ) : null}
                            <div className="project-preview-actions">
                              {isExternalLiveDemo ? (
                                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-preview-link">
                                  <ExternalLinkIcon /> Open demo
                                </a>
                              ) : (
                                <Link to={project.liveDemo} className="project-preview-link">
                                  <ExternalLinkIcon /> Open demo
                                </Link>
                              )}
                            </div>
                          </div>
                        ) : null}
                      </CardContent>

                      <CardFooter className="project-actions">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="ui-button ui-button-outline ui-button-sm">
                          <GitHubIcon /> Code
                        </a>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
