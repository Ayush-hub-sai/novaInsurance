/* Insurance Types Constants */
export const INSURANCE_TYPES = {
  HEALTH: 'health',
  AUTO: 'auto',
  LIFE: 'life',
  HOME: 'home',
  TRAVEL: 'travel',
  BUSINESS: 'business'
} as const;

/* Theme Names */
export const THEME_NAMES = ['light', 'dark', 'red'] as const;
export const STORAGE_KEYS = {
  THEME: 'nova-theme'
} as const;

/* Contact Form Subjects */
export const CONTACT_SUBJECTS = {
  GENERAL: 'general',
  QUOTE: 'quote',
  CLAIM: 'claim',
  SUPPORT: 'support'
} as const;

/* Geolocation Config */
export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 9000,
  maximumAge: 60000
} as const;

/* Snackbar Config */
export const SNACKBAR_CONFIG = {
  DURATION: 5000,
  POSITION: 'bottom' as const
} as const;
