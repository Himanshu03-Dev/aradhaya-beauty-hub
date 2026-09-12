import { useSyncExternalStore } from 'react'

/**
 * Tiny external store for the one-time intro loader. The hero reveal keys off
 * this so its headline animates in exactly as the loader curtain lifts. Any
 * component can read completion without prop-drilling or a context provider.
 *
 * Defaults to "complete" on the server and flips to incomplete only once the
 * loader mounts on the client and decides to actually play, so a reduced-motion
 * or repeat visit never leaves the hero waiting.
 */
let done = false
const subscribers = new Set<() => void>()

export function beginIntro() {
  if (!done) return
  done = false
  subscribers.forEach((fn) => fn())
}

export function completeIntro() {
  if (done) return
  done = true
  subscribers.forEach((fn) => fn())
}

export function useIntroComplete(): boolean {
  return useSyncExternalStore(
    (cb) => {
      subscribers.add(cb)
      return () => subscribers.delete(cb)
    },
    () => done,
    () => true,
  )
}
