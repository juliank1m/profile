import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Layout.css'

export default function Layout() {
  const location = useLocation()
  const layoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const shapes = document.querySelectorAll<HTMLElement>('.animated-shape')
      
      shapes.forEach((shape, index) => {
        const speed = (index % 3 + 1) * 0.3 // Different speeds for each shape (0.3, 0.6, 0.9)
        const offset = scrollY * speed
        const rotation = scrollY * 0.08 * (index % 2 === 0 ? 1 : -1)
        
        // Use CSS custom properties to avoid conflicts with CSS animations
        shape.style.setProperty('--scroll-offset', `${offset}px`)
        shape.style.setProperty('--scroll-rotation', `${rotation}deg`)
      })
    }

    // Use requestAnimationFrame for smoother performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Initial call to set positions
    handleScroll()
    
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="layout" ref={layoutRef}>
      {/* Decorative blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      {/* Animated background shapes */}
      <div className="animated-shape shape-1"></div>
      <div className="animated-shape shape-2"></div>
      <div className="animated-shape shape-3"></div>
      <div className="animated-shape shape-4"></div>
      <div className="animated-shape shape-5"></div>
      <div className="animated-shape shape-6"></div>

      <nav className="navbar">
        <NavLink to="/homepage" className="nav-logo">JK</NavLink>
        <div className="nav-links">
          <NavLink to="/homepage" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Projects
          </NavLink>
        </div>
      </nav>

      <main className="main-content">
        <div key={location.pathname} className="page-transition-wrapper">
          <div className="page-transition">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
