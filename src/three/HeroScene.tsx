import { Float } from '@react-three/drei'
import type { DeviceTier } from '../hooks/useDeviceTier'
import {
  GlassVessel,
  GoldRing,
  Particles,
  PetalField,
  PointerParallax,
  StudioEnvironment,
  palette,
} from './primitives'

/**
 * Hero composition — a glass vessel held inside two gold rings, wrapped in
 * drifting petals and dust. Sits behind and around the bridal photograph
 * rather than competing with it.
 */
export function HeroScene({ tier }: { tier: DeviceTier }) {
  const simple = tier !== 'high'

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.5} color={palette.champagne} />
      <directionalLight position={[-5, -2, -3]} intensity={0.7} color={palette.rouge} />
      <StudioEnvironment resolution={simple ? 128 : 256} />

      <PointerParallax intensity={0.2}>
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
          <GlassVessel simple={simple} scale={1.02} position={[0, -0.1, 0]} />
        </Float>

        <GoldRing radius={1.85} tube={0.022} rotation={[1.15, 0.35, 0]} speed={0.14} />
        <GoldRing radius={2.45} tube={0.014} rotation={[1.5, -0.4, 0.3]} speed={-0.1} opacity={0.75} />

        <PetalField count={simple ? 8 : 15} radius={3} />
        <Particles count={simple ? 110 : 260} spread={9} size={0.05} />
      </PointerParallax>
    </>
  )
}
