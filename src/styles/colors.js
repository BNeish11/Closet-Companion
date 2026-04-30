/**
 * Closet Companion Design System - Color Tokens
 * Modern dark mobile UI with deep blue base and vibrant accents
 * DO NOT use hex colors directly in components; use semantic names only
 */

export default {
  // Background Colors (NEW: Deep Blue System)
  backgroundTop: '#0F172A',    // Deep navy (gradient top)
  backgroundBottom: '#1E293B', // Blue-gray (gradient bottom)
  primary: '#0F172A',          // Dark navy (primary background)
  primaryLight: '#1E293B',     // Light blue-gray

  // Surface Colors (Cards, Panels)
  surface: '#1E3A5F',          // True dark blue (card base)
  surfaceOverlay: 'rgba(255,255,255,0.03)', // Subtle overlay
  surfaceLight: '#253859',     // Slightly elevated
  surfaceDark: '#162238',      // Darker for hover

  // Accent Colors (Vibrant, Energetic)
  accentPrimary: '#FF9D7B',    // Salmon (button top)
  accentPrimaryDark: '#FF8660', // Deeper salmon (button bottom)
  accentSecondary: '#38BDF8',  // Bright blue (chips, highlights)
  accentTertiary: '#22C55E',   // Green (active states)

  // Text Colors
  textPrimary: '#F1F5F9',      // Light text on dark
  textSecondary: '#CBD5E1',    // Secondary text (lighter gray)
  textMuted: '#94A3B8',        // Muted text (dimmer)
  textOnAccent: '#0F172A',     // Dark text on light accents

  // State Colors
  success: '#22C55E',          // Green (active, positive)
  warning: '#FF9D7B',          // Salmon (warning)
  error: '#F87171',            // Red (errors)
  info: '#38BDF8',             // Blue (information)

  // Toggle States
  toggleInactive: '#475569',   // Muted gray-blue
  toggleActive: '#22C55E',     // Vibrant green

  // Icon Colors
  iconDefault: '#E2E8F0',      // Light gray
  iconMuted: '#94A3B8',        // Muted

  // Utility Colors
  divider: 'rgba(255,255,255,0.08)', // Subtle divider
  border: 'rgba(255,255,255,0.06)',  // Subtle border
  overlay: 'rgba(15, 23, 42, 0.5)',  // Dark modal overlay
  transparent: 'transparent'
};
