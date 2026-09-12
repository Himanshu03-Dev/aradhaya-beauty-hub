import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './useMediaQuery'

export type DeviceTier = 'high' | 'low' | 'off'

/**
 * Decides how much WebGL the device should be asked to do.
 *  high — full scene, transmission material, full particle count
 *  low  — simplified materials, fewer particles, capped pixel ratio
 *  off  — no canvas at all (reduced motion, no WebGL, or very weak hardware)
 */
let webglSupport: boolean | null = null

/** Probed once per page, and the probe context is released immediately. */
function supportsWebGL(): boolean {
  if (webglSupport !== null) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    webglSupport = Boolean(context)
    context?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglSupport = false
  }
  return webglSupport
}

export function useDeviceTier(): DeviceTier {
  const reduced = usePrefersReducedMotion()
  const [tier, setTier] = useState<DeviceTier>('off')

  useEffect(() => {
    if (reduced) {
      setTier('off')
      return
    }

    if (!supportsWebGL()) {
      setTier('off')
      return
    }

    const cores = navigator.hardwareConcurrency ?? 4
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const narrow = window.innerWidth < 1024
    const weak = cores <= 4 || window.devicePixelRatio > 2.5

    setTier(coarse || narrow || weak ? 'low' : 'high')
  }, [reduced])

  return tier
}
