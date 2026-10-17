import { tokens } from './tokens';

export const typography = {
  fontFamily: tokens.typography.fontFamily,
  h1: {
    fontWeight: 700,
    fontSize: '2.25rem',
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
  },
  h2: {
    fontWeight: 700,
    fontSize: '1.75rem',
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.375rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.25,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.125rem',
    letterSpacing: '-0.015em',
    lineHeight: 1.3,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '-0.01em',
  },
  h6: {
    fontWeight: 600,
    fontSize: '0.925rem',
    letterSpacing: '-0.01em',
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '0.95rem',
    color: tokens.colors.slate,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.85rem',
    color: tokens.colors.muted,
  },
  body1: {
    fontWeight: 400,
    fontSize: '0.95rem',
    lineHeight: 1.55,
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '-0.01em',
  },
  caption: {
    fontWeight: 500,
    fontSize: '0.75rem',
    letterSpacing: '0.01em',
  },
  overline: {
    fontWeight: 600,
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
};
