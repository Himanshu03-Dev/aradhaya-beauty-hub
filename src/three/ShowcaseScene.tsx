import { Float } from '@react-three/drei'
import type { DeviceTier } from '../hooks/useDeviceTier'
import {
  GoldRing,
  Particles,
  PetalField,
  PointerParallax,
  Sculpture,
  StudioEnvironment,
  palette,
} from './primitives'

/**
 * "Beauty In Motion" — a polished gold sculpture inside concentric rings.
 * Deliberately geometric so it reads as a brand object, not a stock 3D prop.
 */
export function ShowcaseScene({ tier }: { tier: DeviceTier }) {
  const simple = tier !== 'high'

  return (
    <>
      <ambientLight intensity={0.28} />
      <spotLight position={[6, 7, 5]} angle={0.5} penumbra={1} intensity={2.4} color={palette.champagne} />
      <pointLight position={[-5, -3, -2]} intensity={1.6} color={palette.rouge} />
      <StudioEnvironment resolution={simple ? 128 : 256} />

      <PointerParallax intensity={0.32}>
        <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.65}>
          <Sculpture simple={simple} />
        </Float>

        <GoldRing radius={2.1} tube={0.016} rotation={[1.35, 0, 0]} speed={0.2} opacity={0.9} />
        <GoldRing radius={2.75} tube={0.01} rotation={[1.1, 0.6, 0.2]} speed={-0.14} opacity={0.65} />

        <PetalField count={simple ? 9 : 18} radius={3.4} color={palette.rouge} />
        <Particles count={simple ? 130 : 320} spread={11} size={0.04} />
      </PointerParallax>
    </>
  )
}
