import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import type { DeviceTier } from '../hooks/useDeviceTier'

const Canvas = lazy(async () => ({ default: (await import('@react-three/fiber')).Canvas }))

type StageProps = {
  tier: DeviceTier
  children: ReactNode
  className?: string
  camera?: { position: [number, number, number]; fov: number }
  /** Let the canvas receive pointer events (needed for pointer parallax). */
  interactive?: boolean
  /** Rendered instead of the canvas when WebGL is unavailable or unwanted. */
  fallback?: ReactNode
}

/**
 * Lazily mounts a WebGL canvas, and only once it is actually near the
 * viewport. Frameloop pauses when the section scrolls away, so an idle 3D
 * section costs nothing.
 */
export function Stage({ tier, children, className, camera, interactive = false, fallback = null }: StageProps) {
  const holder = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (tier === 'off') return
    const node = holder.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true)
        setActive(entry.isIntersecting)
      },
      { rootMargin: '250px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [tier])

  if (tier === 'off') {
    return <div className={className}>{fallback}</div>
  }

  return (
    <div ref={holder} className={className}>
      {mounted && (
        <Suspense fallback={fallback}>
          <Canvas
            frameloop={active ? 'always' : 'demand'}
            dpr={tier === 'high' ? [1, 1.75] : [1, 1.4]}
            gl={{ antialias: tier === 'high', alpha: true, powerPreference: 'high-performance' }}
            camera={camera ?? { position: [0, 0, 6], fov: 35 }}
            style={{ pointerEvents: interactive ? 'auto' : 'none' }}
          >
            {children}
          </Canvas>
        </Suspense>
      )}
    </div>
  )
}
