import { useEffect, useMemo } from 'react'
import { Canvas, useThree, type CanvasProps, type ThreeEvent } from '@react-three/fiber'
import { shaderMaterial, useTrailTexture } from '@react-three/drei'
import * as THREE from 'three'

import './PixelTrail.css'

type EasingFn = (x: number) => number

interface GooeyFilterProps {
  id?: string
  strength?: number
}

interface SceneProps {
  gridSize: number
  trailSize: number
  maxAge: number
  interpolate: number
  easingFunction: EasingFn
  pixelColor: string
}

interface PixelTrailProps {
  gridSize?: number
  trailSize?: number
  maxAge?: number
  interpolate?: number
  easingFunction?: EasingFn
  canvasProps?: Partial<CanvasProps>
  glProps?: WebGLContextAttributes & { powerPreference?: string }
  gooeyFilter?: { id: string; strength: number }
  gooeyEnabled?: boolean
  gooStrength?: number
  color?: string
  className?: string
}

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }: GooeyFilterProps) => {
  return (
    <svg className="goo-filter-container" aria-hidden="true">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  /* glsl */ `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl */ `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;
      float trail = texture2D(mouseTrail, gridUvCenter).r;
      float visible = step(0.02, trail);
      float core = smoothstep(0.12, 0.26, trail);
      vec3 outerColor = mix(pixelColor, vec3(0.86, 0.92, 1.0), 0.42);
      vec3 finalColor = mix(outerColor, pixelColor, core);

      gl_FragColor = vec4(finalColor, visible);
    }
  `
)

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree((state) => state.size)
  const viewport = useThree((state) => state.viewport)

  const dotMaterial = useMemo(() => {
    const material = new DotMaterial()
    material.uniforms.pixelColor.value = new THREE.Color(pixelColor)
    return material
  }, [pixelColor])

  useEffect(() => {
    return () => {
      dotMaterial.dispose()
    }
  }, [dotMaterial])

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || ((x: number) => x)
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void]

  const scale = Math.max(viewport.width, viewport.height) / 2

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  )
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  gooeyEnabled,
  gooStrength = 10,
  color = '#ffffff',
  className = ''
}: PixelTrailProps) {
  const resolvedGooey = gooeyFilter
    ? gooeyFilter
    : gooeyEnabled
      ? { id: 'goo-filter', strength: gooStrength }
      : undefined

  return (
    <>
      {resolvedGooey && <GooeyFilter id={resolvedGooey.id} strength={resolvedGooey.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`pixel-canvas ${className}`.trim()}
        style={resolvedGooey ? { filter: `url(#${resolvedGooey.id})`, ...(canvasProps.style ?? {}) } : canvasProps.style}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  )
}
