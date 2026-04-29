/**
 * Closet Companion Design System - Shadows
 * Elevation-based shadow system for depth
 */

export default {
  // No shadow
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },

  // Small shadow (subtle elevation)
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1
  },

  // Medium shadow (standard cards, buttons)
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3
  },

  // Large shadow (modals, popovers)
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8
  },

  // Extra large shadow (fullscreen modals)
  xlarge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 12
  },

  // Aliases for backward compatibility
  low: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1
  },

  high: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8
  }
};
