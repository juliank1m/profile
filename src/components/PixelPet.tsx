import { useEffect, useRef, useState } from 'react'
import './PixelPet.css'

const PET_LINES = [
  'hi there!',
  'click me!',
  '> npm run dev',
  'beep boop',
  'pixel power',
  'hire julian :)',
  '...',
  'currently in waterloo',
  'react + vite + ❤',
]

type Props = {
  /** Horizontal inset (px) the pet keeps from the edges of its parent. */
  padding?: number
}

/**
 * Tiny pixel slime that wanders along the bottom of its positioned
 * parent. Drop it inside an element with `position: relative` (the
 * `.pet-strip` between the topbar and the ticker) — the pet sits on
 * the ground band rendered alongside it.
 */
export default function PixelPet({ padding = 30 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [bounds, setBounds] = useState({ min: padding, max: padding + 200 })
  const [x, setX] = useState(padding + 20)
  const [dir, setDir] = useState<1 | -1>(1)
  const [jumping, setJumping] = useState(false)
  const [speech, setSpeech] = useState<string | null>(null)
  const speechTimer = useRef<number | null>(null)

  useEffect(() => {
    const measure = () => {
      const parent = ref.current?.offsetParent as HTMLElement | null
      if (!parent) return
      const w = parent.clientWidth
      setBounds({ min: padding, max: Math.max(padding + 60, w - padding - 36) })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [padding])

  useEffect(() => {
    let cancelled = false
    let to: number

    const step = () => {
      if (cancelled) return
      setX((prev) => {
        const stride = 50 + Math.random() * 40
        let next = prev + dir * stride
        let nextDir: 1 | -1 = dir
        if (next > bounds.max) {
          next = bounds.max
          nextDir = -1
        }
        if (next < bounds.min) {
          next = bounds.min
          nextDir = 1
        }
        if (nextDir !== dir) setDir(nextDir)
        return next
      })
      to = window.setTimeout(step, 1500 + Math.random() * 1500)
    }

    to = window.setTimeout(step, 1200)
    return () => {
      cancelled = true
      clearTimeout(to)
    }
  }, [dir, bounds.min, bounds.max])

  const handleClick = () => {
    setJumping(true)
    window.setTimeout(() => setJumping(false), 480)
    const line = PET_LINES[Math.floor(Math.random() * PET_LINES.length)]
    setSpeech(line)
    if (speechTimer.current) clearTimeout(speechTimer.current)
    speechTimer.current = window.setTimeout(() => setSpeech(null), 1800)
  }

  return (
    <div
      ref={ref}
      className={`pixel-pet ${dir > 0 ? 'face-right' : 'face-left'} ${jumping ? 'jump' : ''}`}
      style={{ left: x + 'px' }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick()
      }}
      aria-label="Pixel mascot — click for greetings"
    >
      <svg viewBox="0 0 12 10" shapeRendering="crispEdges" aria-hidden="true">
        <rect x="3" y="2" width="6" height="1" fill="#8adfce" />
        <rect x="2" y="3" width="8" height="1" fill="#8adfce" />
        <rect x="1" y="4" width="10" height="3" fill="#8adfce" />
        <rect x="1" y="7" width="10" height="1" fill="#56b39a" />
        <rect x="3" y="4" width="1" height="1" fill="#1a1830" />
        <rect x="8" y="4" width="1" height="1" fill="#1a1830" />
        <rect x="5" y="6" width="2" height="1" fill="#56b39a" />
      </svg>
      {speech ? <div className="pet-speech show">{speech}</div> : null}
    </div>
  )
}
