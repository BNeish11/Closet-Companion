/**
 * Closet Companion Design System - Spacing & Layout
 * Base unit: 8px
 * DO NOT use hardcoded padding/margin values in components
 * Use these tokens only
 */

// Base Spacing Scale (8px unit)
const baseScale = {
  0: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 56,
  '5xl': 64
};

// Padding Presets
const padding = {
  compact: baseScale.xs,     // 4px (tight spacing)
  small: baseScale.sm,       // 8px
  medium: baseScale.md,      // 16px
  large: baseScale.lg,       // 24px
  xlarge: baseScale.xl       // 32px
};

// Margin Presets (same as padding)
const margin = {
  compact: baseScale.xs,
  small: baseScale.sm,
  medium: baseScale.md,
  large: baseScale.lg,
  xlarge: baseScale.xl
};

// Border Radius Presets
const radius = {
  none: 0,
  xs: 4,        // Subtle rounding
  sm: 8,        // Cards, buttons
  base: 12,     // Default (medium rounding)
  lg: 16,       // Large components
  xl: 20,       // Extra large components
  full: 9999    // Fully rounded (pills, circles)
};

// Container Padding (screen/edge padding)
const container = {
  default: baseScale.md,    // 16px padding on left/right
  compact: baseScale.sm,    // 8px padding
  spacious: baseScale.lg    // 24px padding
};

// Gap (spacing between flex items)
const gap = {
  xs: baseScale.xs,
  sm: baseScale.sm,
  md: baseScale.md,
  lg: baseScale.lg,
  xl: baseScale.xl
};

export default {
  ...baseScale,
  padding,
  margin,
  radius,
  container,
  gap
};
