/**
 * Closet Companion Design System - Typography
 * DO NOT use fontSize, fontWeight, or lineHeight directly in components
 * Use predefined text styles only
 */

import colors from './colors';

// Font Family Definitions
const fontFamily = {
  title: 'Bodoni', // Custom title font (bold, modern)
  body: 'Montserrat', // Custom body font (clean, readable)
  mono: 'Courier New', // Monospaced font for code or tags
  //default: 'System',  // Uses platform default (SF Pro Display on iOS, Roboto on Android)
  //mono: 'Courier New'
};

// Size Scale (in pixels)
const sizes = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32
};

// Weight Scale
const weights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700'
};

// Line Height Ratios
const lineHeights = {
  tight: 1.1,
  normal: 1.5,
  relaxed: 1.75
};

// Predefined Text Styles
const styles = {
  // Headings
  heading1: {
    fontFamily: fontFamily.title,
    fontSize: sizes['4xl'],  // 32px
    fontWeight: weights.bold,
    lineHeight: sizes['4xl'] * lineHeights.tight,
    color: colors.textPrimary
  },

  heading2: {
    fontFamily: fontFamily.body,
    fontSize: sizes['3xl'],  // 24px
    fontWeight: weights.bold,
    lineHeight: sizes['3xl'] * lineHeights.tight,
    color: colors.textPrimary
  },

  heading3: {
    fontFamily: fontFamily.body,
    fontSize: sizes['2xl'],  // 20px
    fontWeight: weights.semibold,
    lineHeight: sizes['2xl'] * lineHeights.normal,
    color: colors.textPrimary
  },

  // Body Text
  body: {
    fontFamily: fontFamily.body,
    fontSize: sizes.base,    // 14px
    fontWeight: weights.normal,
    lineHeight: sizes.base * lineHeights.relaxed,
    color: colors.textPrimary
  },

  bodySmall: {
    fontFamily: fontFamily.body,
    fontSize: sizes.sm,      // 12px
    fontWeight: weights.normal,
    lineHeight: sizes.sm * lineHeights.relaxed,
    color: colors.textSecondary
  },

  bodyLarge: {
    fontFamily: fontFamily.body,
    fontSize: sizes.lg,      // 16px
    fontWeight: weights.normal,
    lineHeight: sizes.lg * lineHeights.relaxed,
    color: colors.textPrimary
  },

  // Labels & Captions
  label: {
    fontFamily: fontFamily.body,
    fontSize: sizes.sm,      // 12px
    fontWeight: weights.semibold,
    lineHeight: sizes.sm * lineHeights.normal,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  caption: {
    fontFamily: fontFamily.mono,
    fontSize: sizes.xs,      // 10px
    fontWeight: weights.normal,
    lineHeight: sizes.xs * lineHeights.normal,
    color: colors.textMuted
  },

  // Button Text
  button: {
    fontFamily: fontFamily.body,
    fontSize: sizes.base,    // 14px
    fontWeight: weights.semibold,
    lineHeight: sizes.base * lineHeights.normal,
    color: colors.textPrimary
  },

  // Tab Labels
  tabLabel: {
    fontFamily: fontFamily.body,
    fontSize: sizes.xs,      // 10px
    fontWeight: weights.semibold,
    lineHeight: sizes.xs * lineHeights.normal,
    color: colors.textSecondary
  }
};

export default styles;
export { fontFamily, sizes, weights, lineHeights };
