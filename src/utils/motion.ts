/** Shared motion props — skip hidden initial state on touch devices (iOS IntersectionObserver quirks). */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function inViewProps(
  hidden: Record<string, number> = { opacity: 0, y: 20 },
  visible: Record<string, number> = { opacity: 1, y: 0 },
) {
  if (isTouchDevice()) {
    return {
      initial: false as const,
      whileInView: visible,
      viewport: { once: true, amount: 0.05 },
    };
  }
  return {
    initial: hidden,
    whileInView: visible,
    viewport: { once: true, amount: 0.15 },
  };
}
