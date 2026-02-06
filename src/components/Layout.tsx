import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import PixelTrail from './PixelTrail'
import './Layout.css'

const labels = ['Available for 2026 internships', 'Full-stack delivery', 'Waterloo SE']
const TRAIL_GRID_SIZE = 160

export default function Layout() {
  const location = useLocation()
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null)
  const isProjectsRoute = location.pathname.startsWith('/projects')

  useEffect(() => {
    setEventSource(document.body)
  }, [])

  useEffect(() => {
    document.body.classList.add('cursor-hidden')

    return () => {
      document.body.classList.remove('cursor-hidden')
    }
  }, [])

  return (
    <div className="site-shell">
      <div className="site-noise" aria-hidden="true" />
      <div className="site-pattern" aria-hidden="true" />
      <div className="site-glow site-glow-a" aria-hidden="true" />
      <div className="site-glow site-glow-b" aria-hidden="true" />
      <div className="site-trail-layer" aria-hidden="true">
        <PixelTrail
          gridSize={TRAIL_GRID_SIZE}
          trailSize={0.055}
          maxAge={180}
          interpolate={1.2}
          color="#c4dcff"
          canvasProps={{
            eventSource: eventSource ?? undefined,
            eventPrefix: 'client',
            style: { pointerEvents: 'none' },
            dpr: [1, 1.5]
          }}
        />
      </div>

      <header className="topbar">
        <NavLink to="/homepage" className="brand">
          <span className="brand-mark">JK</span>
          <span className="brand-copy">
            <strong>Julian Kim</strong>
            <span>Software Engineer</span>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="Main">
          <NavLink to="/homepage" className={({ isActive }) => (isActive ? 'site-link active' : 'site-link')}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'site-link active' : 'site-link')}>
            Projects
          </NavLink>
        </nav>
      </header>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...labels, ...labels].map((label, index) => (
            <span key={`${label}-${index}`}>{label}</span>
          ))}
        </div>
      </div>

      <main className={`site-main${isProjectsRoute ? ' site-main-wide' : ''}`}>
        <div key={location.pathname} className="route-frame">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
