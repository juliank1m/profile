import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Layout.css'

export default function Layout() {
  const location = useLocation()
  const shapeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useEffect(() => {
    // Generate bounded, organic movement configs for each shape
    // Shapes will move in small, non-linear orbits around their initial positions
    // More random, fluid movement with varied wave patterns
    const shapeConfigs = Array.from({ length: 3 }, () => {
      // Random wave type for each axis (sine, cosine, or combination)
      const waveTypeX = Math.floor(Math.random() * 3) // 0, 1, or 2
      const waveTypeY = Math.floor(Math.random() * 3)
      
      return {
        ampX: 80 + Math.random() * 100, // Larger horizontal amplitude
        ampY: 80 + Math.random() * 100, // Larger vertical amplitude
        freqX: 0.3 + Math.random() * 1.5, // More varied frequencies
        freqY: 0.3 + Math.random() * 1.5,
        freqX2: 0.2 + Math.random() * 0.8, // Secondary frequency for more complex waves
        freqY2: 0.2 + Math.random() * 0.8,
        phaseX: Math.random() * Math.PI * 2, // Random phases for variety
        phaseY: Math.random() * Math.PI * 2,
        phaseX2: Math.random() * Math.PI * 2,
        phaseY2: Math.random() * Math.PI * 2,
        waveTypeX, // Which wave function to use
        waveTypeY,
        rotationSpeed: 0.02 + Math.random() * 0.08,
        rotationDirection: Math.random() > 0.5 ? 1 : -1,
      }
    })

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const shapes = document.querySelectorAll<HTMLElement>('.animated-shape')

      // Use a normalized "time" based on scroll so movement is smooth and bounded
      // Smaller multiplier = slower movement while keeping the same range
      const t = scrollY * 0.003

      shapes.forEach((shape, index) => {
        const config = shapeConfigs[index % shapeConfigs.length]

        // More fluid, random movement using different wave patterns
        // Calculate offsets relative to initial position (when t=0, offsets should be 0)
        let horizontalOffset = 0
        let verticalOffset = 0
        
        // Calculate initial offsets (when t=0) to subtract, ensuring smooth start
        let initialOffsetX = 0
        let initialOffsetY = 0
        
        // Horizontal movement - use different wave types for variety
        if (config.waveTypeX === 0) {
          // Simple sine
          initialOffsetX = config.ampX * Math.sin(config.phaseX)
          horizontalOffset = config.ampX * Math.sin(t * config.freqX + config.phaseX) - initialOffsetX
        } else if (config.waveTypeX === 1) {
          // Cosine
          initialOffsetX = config.ampX * Math.cos(config.phaseX)
          horizontalOffset = config.ampX * Math.cos(t * config.freqX + config.phaseX) - initialOffsetX
        } else {
          // Combined waves for more complex, fluid motion
          initialOffsetX = config.ampX * (
            Math.sin(config.phaseX) * 0.6 +
            Math.cos(config.phaseX2) * 0.4
          )
          horizontalOffset = config.ampX * (
            Math.sin(t * config.freqX + config.phaseX) * 0.6 +
            Math.cos(t * config.freqX2 + config.phaseX2) * 0.4
          ) - initialOffsetX
        }
        
        // Vertical movement - use different wave types for variety
        if (config.waveTypeY === 0) {
          // Simple cosine
          initialOffsetY = config.ampY * Math.cos(config.phaseY)
          verticalOffset = config.ampY * Math.cos(t * config.freqY + config.phaseY) - initialOffsetY
        } else if (config.waveTypeY === 1) {
          // Sine
          initialOffsetY = config.ampY * Math.sin(config.phaseY)
          verticalOffset = config.ampY * Math.sin(t * config.freqY + config.phaseY) - initialOffsetY
        } else {
          // Combined waves for more complex, fluid motion
          initialOffsetY = config.ampY * (
            Math.cos(config.phaseY) * 0.6 +
            Math.sin(config.phaseY2) * 0.4
          )
          verticalOffset = config.ampY * (
            Math.cos(t * config.freqY + config.phaseY) * 0.6 +
            Math.sin(t * config.freqY2 + config.phaseY2) * 0.4
          ) - initialOffsetY
        }

        // Rotation with fixed speed and direction
        const rotation =
          (t * 180 * config.rotationSpeed * config.rotationDirection) % 360

        // Use CSS custom properties to avoid conflicts with CSS animations
        shape.style.setProperty('--scroll-offset-y', `${verticalOffset}px`)
        shape.style.setProperty('--scroll-offset-x', `${horizontalOffset}px`)
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

    // Listen to scroll on window
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onScroll, { passive: true })
    
    // Initialize scroll position to ensure smooth start (after positions are set)
    const initTimeoutId = setTimeout(() => {
      handleScroll()
    }, 10)
    
    return () => {
      clearTimeout(initTimeoutId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onScroll)
    }
  }, [location.pathname]) // Re-run when route changes

  return (
    <div className="layout">
      {/* Animated background shapes - randomly positioned */}
      <div ref={shapeRefs[0]} className="animated-shape shape-1"></div>
      <div ref={shapeRefs[1]} className="animated-shape shape-2"></div>
      <div ref={shapeRefs[2]} className="animated-shape shape-3"></div>

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
