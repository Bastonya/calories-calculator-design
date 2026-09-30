/**
 * Kalo design tokens. Single source of truth for the app and the gallery.
 *
 * Values are extracted from 01-branding/stylescape.html. Consumed by the
 * React Native + Expo app (import tokens from './tokens') and inlined
 * verbatim into 02-design-system/gallery.html, which turns every entry
 * into a CSS custom property at runtime.
 *
 * Units: spacing, radius, font size, line height and stroke widths are
 * device-independent pixels. Durations are milliseconds.
 */
const tokens = {
  color: {
    light: {
      coral: '#FF5A36',
      yellow: '#FFC93C',
      green: '#2ECC71',
      ink: '#161615',
      muted: '#66655F',
      border: '#E8E6DD',
      bg: '#FAFAF7',
      card: '#FFFFFF',
      coralSoft: '#FFE9E3',
      yellowSoft: '#FFF4CF',
      greenSoft: '#DFF7E8',
      onCoral: '#FFFFFF',
      onYellow: '#161615',
      onGreen: '#FFFFFF',
      yellowText: '#9A6E00',
      skeleton: '#EFEEE8',
      overlay: 'rgba(22,22,21,0.45)',
    },
    dark: {
      coral: '#FF5A36',
      yellow: '#FFC93C',
      green: '#2ECC71',
      ink: '#F3F2ED',
      muted: '#B5B3A9',
      border: '#2E2E29',
      bg: '#121210',
      card: '#1C1C19',
      coralSoft: '#3A2119',
      yellowSoft: '#3A3115',
      greenSoft: '#153524',
      onCoral: '#FFFFFF',
      onYellow: '#161615',
      onGreen: '#FFFFFF',
      yellowText: '#FFC93C',
      skeleton: '#262622',
      overlay: 'rgba(0,0,0,0.6)',
    },
  },

  spacing: { s0: 0, s1: 4, s2: 8, s3: 12, s4: 16, s5: 20, s6: 24, s7: 32, s8: 40 },

  radius: { sm: 12, md: 20, lg: 28, pill: 999 },

  typography: {
    family: {
      display: 'Space Grotesk',
      body: 'Inter',
      fallback: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    },
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    size: {
      displayLg: 34, display: 28,
      headlineLg: 22, headline: 18,
      body: 15, bodySm: 14,
      caption: 12, captionSm: 11,
    },
    lineHeight: {
      displayLg: 36, display: 31,
      headlineLg: 26, headline: 23,
      body: 22, bodySm: 20,
      caption: 16, captionSm: 14,
    },
    letterSpacing: { display: -0.5, headline: -0.2, body: 0, caption: 0.2 },
    /* Named text styles the components use. family, size and lineHeight keys refer to the maps above. */
    styles: {
      displayLg: { family: 'display', weight: 700, size: 'displayLg', tracking: 'display' },
      display:   { family: 'display', weight: 700, size: 'display',   tracking: 'display' },
      headlineLg:{ family: 'display', weight: 600, size: 'headlineLg',tracking: 'headline' },
      headline:  { family: 'display', weight: 500, size: 'headline',  tracking: 'headline' },
      body:      { family: 'body',    weight: 400, size: 'body',      tracking: 'body' },
      bodyStrong:{ family: 'body',    weight: 600, size: 'body',      tracking: 'body' },
      label:     { family: 'body',    weight: 500, size: 'bodySm',    tracking: 'body' },
      caption:   { family: 'body',    weight: 400, size: 'caption',   tracking: 'caption' },
      overline:  { family: 'display', weight: 600, size: 'captionSm', tracking: 'caption' },
    },
  },

  shadow: {
    light: {
      card: { color: '#161615', opacity: 0.08, offsetY: 8, blur: 24, elevation: 4 },
      sheet:{ color: '#161615', opacity: 0.16, offsetY: -8, blur: 32, elevation: 12 },
    },
    dark: {
      card: { color: '#000000', opacity: 0.40, offsetY: 8, blur: 24, elevation: 4 },
      sheet:{ color: '#000000', opacity: 0.60, offsetY: -8, blur: 32, elevation: 12 },
    },
  },

  motion: {
    duration: { press: 120, sheet: 250, spring: 300, countUp: 400, ring: 500, spin: 1000 },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    pressScale: 0.98,
    bounceScale: 1.12,
  },

  size: {
    tapMin: 44,
    control: 48,
    controlSm: 36,
    ringSm: 64, ringMd: 128, ringLg: 180,
    ringStroke: 11,
    tabBar: 64,
    sheetHandle: { width: 40, height: 4 },
    hairline: 1,
  },

  opacity: { disabled: 0.4, pressedOverlay: 0.08 },
};

if (typeof module !== 'undefined' && module.exports) { module.exports = tokens; }
