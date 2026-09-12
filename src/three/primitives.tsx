import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Lightformer, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export const palette = {
  gold: '#C29B54',
  goldLight: '#E3C88E',
  rouge: '#A8194E',
  wine: '#5A0F2B',
  champagne: '#E9DABE',
  ivory: '#FBF7F1',
}

/** Soft radial sprite so particles render as dots rather than squares. */
function useDotTexture() {
  const texture = useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.35, 'rgba(255,255,255,0.65)')
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, size, size)
    }
    const canvasTexture = new THREE.CanvasTexture(canvas)
    canvasTexture.colorSpace = THREE.SRGBColorSpace
    return canvasTexture
  }, [])

  useEffect(() => () => texture.dispose(), [texture])
  return texture
}

/**
 * In-scene lighting environment. Built from lightformers rather than a remote
 * HDRI so the site stays fully self-contained and offline-capable.
 */
export function StudioEnvironment({ resolution = 256 }: { resolution?: number }) {
  return (
    <Environment resolution={resolution} frames={1}>
      <color attach="background" args={['#150a10']} />
      <Lightformer intensity={4.2} color={palette.champagne} position={[0, 4, -6]} scale={[10, 6, 1]} />
      <Lightformer intensity={2.6} color={palette.goldLight} position={[-5, 1, 2]} scale={[4, 8, 1]} />
      <Lightformer intensity={2.2} color={palette.rouge} position={[5, -1, 2]} scale={[4, 8, 1]} />
      <Lightformer intensity={1.4} form="ring" color={palette.ivory} position={[0, -4, 3]} scale={5} />
    </Environment>
  )
}

type RingProps = {
  radius?: number
  tube?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  speed?: number
  color?: string
  opacity?: number
}

/** Slowly turning polished gold torus. */
export function GoldRing({
  radius = 1.6,
  tube = 0.028,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  speed = 0.16,
  color = palette.gold,
  opacity = 1,
}: RingProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * speed
    ref.current.rotation.x += delta * speed * 0.35
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[radius, tube, 24, 140]} />
      <meshStandardMaterial
        color={color}
        metalness={1}
        roughness={0.18}
        envMapIntensity={1.5}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  )
}

function petalGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(0.42, 0.24, 0.5, 0.86, 0, 1.25)
  shape.bezierCurveTo(-0.5, 0.86, -0.42, 0.24, 0, 0)
  return new THREE.ShapeGeometry(shape, 24)
}

type PetalFieldProps = { count?: number; radius?: number; color?: string }

/** A drift of translucent petals orbiting the centre of the scene. */
export function PetalField({ count = 14, radius = 3.1, color = palette.rouge }: PetalFieldProps) {
  const group = useRef<THREE.Group>(null)
  const geometry = useMemo(() => petalGeometry(), [])
  useEffect(() => () => geometry.dispose(), [geometry])

  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2
        const spread = 0.55 + Math.random() * 0.6
        return {
          position: [
            Math.cos(angle) * radius * spread,
            (Math.random() - 0.5) * 3.4,
            Math.sin(angle) * radius * spread * 0.7 - 0.6,
          ] as [number, number, number],
          rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
            number,
            number,
            number,
          ],
          scale: 0.22 + Math.random() * 0.34,
          drift: 0.12 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
        }
      }),
    [count, radius],
  )

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.05
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      const petal = petals[i]
      if (!petal) return
      child.position.y = petal.position[1] + Math.sin(t * petal.drift + petal.phase) * 0.5
      child.rotation.z += delta * petal.drift * 0.5
    })
  })

  return (
    <group ref={group}>
      {petals.map((petal, i) => (
        <mesh
          key={i}
          geometry={geometry}
          position={petal.position}
          rotation={petal.rotation}
          scale={petal.scale}
        >
          <meshStandardMaterial
            color={color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
            roughness={0.35}
            metalness={0.15}
            emissive={palette.wine}
            emissiveIntensity={0.18}
          />
        </mesh>
      ))}
    </group>
  )
}

type ParticlesProps = { count?: number; spread?: number; size?: number; color?: string }

/** Fine suspended dust, gold-lit. */
export function Particles({ count = 260, spread = 9, size = 0.045, color = palette.goldLight }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null)
  const texture = useDotTexture()

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * spread
      array[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.8
      array[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6 - 1
    }
    return array
  }, [count, spread])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.028
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.14
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function vesselProfile() {
  const points: THREE.Vector2[] = []
  const profile: Array<[number, number]> = [
    [0.001, -1.05],
    [0.5, -1.05],
    [0.62, -0.9],
    [0.66, -0.35],
    [0.6, 0.1],
    [0.4, 0.42],
    [0.19, 0.56],
    [0.17, 0.86],
    [0.3, 0.9],
    [0.3, 1.06],
    [0.001, 1.06],
  ]
  profile.forEach(([x, y]) => points.push(new THREE.Vector2(x, y)))
  return points
}

type VesselProps = { simple?: boolean; scale?: number; position?: [number, number, number] }

/**
 * Abstract glass vessel — a nod to a perfume flacon without being literal.
 * Falls back to a cheaper physical material on low-tier devices.
 */
export function GlassVessel({ simple = false, scale = 1, position = [0, 0, 0] }: VesselProps) {
  const ref = useRef<THREE.Group>(null)
  const points = useMemo(() => vesselProfile(), [])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.12
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.06
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow={false}>
        <latheGeometry args={[points, 72]} />
        {simple ? (
          <meshPhysicalMaterial
            color={palette.champagne}
            transparent
            opacity={0.42}
            roughness={0.1}
            metalness={0.1}
            transmission={0}
            envMapIntensity={1.4}
            clearcoat={1}
          />
        ) : (
          <MeshTransmissionMaterial
            samples={6}
            resolution={256}
            thickness={0.6}
            roughness={0.06}
            ior={1.5}
            chromaticAberration={0.12}
            distortion={0.15}
            distortionScale={0.3}
            temporalDistortion={0.05}
            color={palette.ivory}
            attenuationColor={palette.champagne}
            attenuationDistance={2.4}
          />
        )}
      </mesh>

      {/* Gold collar */}
      <mesh position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.2, 48]} />
        <meshStandardMaterial color={palette.gold} metalness={1} roughness={0.22} envMapIntensity={1.6} />
      </mesh>
    </group>
  )
}

type SculptureProps = { simple?: boolean }

/** The centrepiece of the "Beauty In Motion" scene. */
export function Sculpture({ simple = false }: SculptureProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.22
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.22
  })

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.05, 0.24, simple ? 128 : 260, simple ? 20 : 42, 2, 3]} />
      <meshStandardMaterial
        color={palette.gold}
        metalness={1}
        roughness={simple ? 0.3 : 0.16}
        envMapIntensity={1.7}
      />
    </mesh>
  )
}

/** Lerps a group toward the pointer for gentle parallax. */
export function PointerParallax({
  children,
  intensity = 0.22,
}: {
  children: ReactNode
  intensity?: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    const damp = 1 - Math.pow(0.001, delta)
    ref.current.rotation.y += (state.pointer.x * intensity - ref.current.rotation.y) * damp
    ref.current.rotation.x += (-state.pointer.y * intensity * 0.6 - ref.current.rotation.x) * damp
  })

  return <group ref={ref}>{children}</group>
}
