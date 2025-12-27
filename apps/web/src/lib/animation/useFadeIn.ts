'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface UseFadeInOptions {
  /** Duration of the animation in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Starting opacity (0-1) */
  fromOpacity?: number;
  /** Ending opacity (0-1) */
  toOpacity?: number;
  /** Starting y position offset in pixels */
  fromY?: number;
  /** Easing function */
  ease?: string;
}

/**
 * Custom hook for fade-in animation on mount
 *
 * @example
 * ```tsx
 * 'use client'
 * import { useFadeIn } from '@/lib/animation/useFadeIn'
 *
 * export function MyComponent() {
 *   const ref = useFadeIn({ duration: 0.6, fromY: 20 })
 *   return <div ref={ref}>Content</div>
 * }
 * ```
 */
export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  options: UseFadeInOptions = {}
) {
  const elementRef = useRef<T>(null);

  const {
    duration = 0.5,
    delay = 0,
    fromOpacity = 0,
    toOpacity = 1,
    fromY = 0,
    ease = 'power2.out',
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: fromOpacity,
      y: fromY,
    });

    // Animate to final state
    gsap.to(element, {
      opacity: toOpacity,
      y: 0,
      duration,
      delay,
      ease,
    });
  }, [duration, delay, fromOpacity, toOpacity, fromY, ease]);

  return elementRef;
}
