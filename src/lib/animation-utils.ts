export const easings = {
  // Standard Material easing curve
  easeOut: [0.4, 0, 0.2, 1],
  // For springy animations
  spring: [0.34, 1.56, 0.64, 1],
  // For smooth transitions
  smooth: [0.4, 0.0, 0.2, 1.0]
} as const;

export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6
} as const;
