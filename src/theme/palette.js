import { tokens } from './tokens';

export const palette = {
  mode: 'light',
  primary: {
    main: tokens.colors.black,
    light: tokens.colors.charcoal,
    dark: tokens.colors.nearBlack,
    contrastText: tokens.colors.white,
  },
  secondary: {
    main: tokens.colors.graphite,
    light: tokens.colors.slate,
    dark: tokens.colors.nearBlack,
    contrastText: tokens.colors.white,
  },
  background: {
    default: tokens.colors.surfaceAlt,
    paper: tokens.colors.surface,
  },
  text: {
    primary: tokens.colors.black,
    secondary: tokens.colors.muted,
    disabled: tokens.colors.softGray,
  },
  divider: tokens.colors.border,
  success: {
    main: tokens.colors.black,
    contrastText: tokens.colors.white,
  },
  warning: {
    main: tokens.colors.graphite,
    contrastText: tokens.colors.white,
  },
  error: {
    main: tokens.colors.nearBlack,
    contrastText: tokens.colors.white,
  },
  info: {
    main: tokens.colors.slate,
    contrastText: tokens.colors.white,
  },
  grey: {
    50: tokens.colors.surfaceAlt,
    100: tokens.colors.surfaceMuted,
    200: tokens.colors.border,
    300: tokens.colors.borderStrong,
    400: tokens.colors.softGray,
    500: tokens.colors.muted,
    600: tokens.colors.slate,
    700: tokens.colors.graphite,
    800: tokens.colors.charcoal,
    900: tokens.colors.black,
  },
};
