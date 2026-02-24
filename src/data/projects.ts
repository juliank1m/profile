export type Project = {
  id: string
  title: string
  summary: string
  description: string
  tags: string[]
  github: string
  liveDemo?: string
  previewSrc?: string
  previewBlocked?: boolean
  featureHighlights?: string[]
  theme: 'mint' | 'rose' | 'indigo' | 'lime' | 'amber'
}

export const projects: Project[] = [
  {
    id: 'pyclimb-project',
    title: 'PyClimb',
    summary: 'Learning-first coding platform with judge workflow, lessons, and leaderboard.',
    description:
      'A learning-first, end-to-end web application built intentionally step-by-step to understand real production-style architecture with clarity, correctness, and backend fundamentals.',
    tags: ['Django', 'PostgreSQL', 'Docker', 'Judge System', 'Learning Platform'],
    github: 'https://github.com/juliank1m/pyclimb',
    liveDemo: 'https://pyclimb.juliankim.dev/',
    previewSrc: 'https://pyclimb.juliankim.dev/',
    featureHighlights: [
      'Problem management with rich models, filters, solved/unsolved views, and admin tooling.',
      'Submission verdict pipeline (AC/WA/RE/TLE/CE) with detailed per-test feedback.',
      'Lessons/courses flow with markdown editor, draft/publish states, and linking to problems.',
      'Auth and profile system with email verification, reset, and weighted leaderboard.',
      'Infrastructure with PostgreSQL, slug URLs, request limits, and media storage support.',
    ],
    theme: 'mint',
  },
  {
    id: 'course-tools-project',
    title: 'Course Tools',
    summary: 'Calculators and utilities for linear algebra, calculus, chemistry, vectors, and CS.',
    description: 'A suite of calculators and utilities for linear algebra, calculus, chemistry, vectors, and CS workflows.',
    tags: ['React', 'TypeScript', 'Math Utilities'],
    github: 'https://github.com/juliank1m/course-tools',
    liveDemo: 'https://coursetools.juliankim.dev',
    previewSrc: 'https://coursetools.juliankim.dev',
    theme: 'indigo',
  },
  {
    id: 'gyl-prototype-project',
    title: 'GYL Website Prototype',
    summary: 'Frontend prototype centered on visual storytelling and interaction-first sections.',
    description: 'A modern website prototype built around visual storytelling and interaction-first sections.',
    tags: ['JavaScript', 'Frontend'],
    github: 'https://github.com/juliank1m/gyl-website-prototype',
    liveDemo: 'https://gyl-website-prototype.vercel.app',
    previewSrc: 'https://gyl-website-prototype.vercel.app',
    theme: 'rose',
  },
  {
    id: 'willowbrook-project',
    title: 'Willowbrook',
    summary: 'MonoGame DesktopGL title focused on gameplay-first loops and mechanics iteration.',
    description: 'A MonoGame DesktopGL project developed with C# and gameplay-first iteration loops.',
    tags: ['C#', 'MonoGame', 'Game Dev'],
    github: 'https://github.com/juliank1m/willowbrook-game',
    theme: 'lime',
  },
  {
    id: 'meow-meow-misses-home-project',
    title: 'Meow Meow Misses Home',
    summary: 'MonoGame project tuned for game feel, pacing, and progression clarity.',
    description: 'A second MonoGame title focused on game feel, mechanics tuning, and level pacing.',
    tags: ['C#', 'MonoGame', 'Game Dev'],
    github: 'https://github.com/juliank1m/Meow-Meow-Misses-Home',
    theme: 'amber',
  },
]

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId)
}
