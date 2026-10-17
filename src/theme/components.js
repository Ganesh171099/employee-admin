import { tokens } from './tokens';

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      html: {
        height: '100%',
      },
      body: {
        margin: 0,
        minHeight: '100%',
        backgroundColor: tokens.colors.surfaceAlt,
        color: tokens.colors.black,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '#root': {
        minHeight: '100%',
      },
      '::-webkit-scrollbar': {
        width: 8,
        height: 8,
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: tokens.colors.borderStrong,
        borderRadius: 999,
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: tokens.radii.sm,
        minHeight: 40,
        paddingInline: 18,
        fontWeight: 600,
        transition: `all ${tokens.motion.fast}s ease`,
      },
      containedPrimary: {
        backgroundColor: tokens.colors.black,
        color: tokens.colors.white,
        '&:hover': {
          backgroundColor: tokens.colors.charcoal,
        },
      },
      outlined: {
        borderColor: tokens.colors.borderStrong,
        color: tokens.colors.black,
        '&:hover': {
          borderColor: tokens.colors.black,
          backgroundColor: tokens.colors.surfaceMuted,
        },
      },
      text: {
        color: tokens.colors.black,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
      fullWidth: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radii.sm,
        backgroundColor: tokens.colors.surface,
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.colors.slate,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: tokens.colors.black,
          borderWidth: 1.5,
        },
      },
      notchedOutline: {
        borderColor: tokens.colors.borderStrong,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: tokens.radii.md,
      },
      outlined: {
        borderColor: tokens.colors.border,
      },
      elevation1: {
        boxShadow: tokens.shadows.soft,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radii.md,
        border: `1px solid ${tokens.colors.border}`,
        boxShadow: 'none',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: tokens.radii.xs,
        fontWeight: 600,
      },
      outlined: {
        borderColor: tokens.colors.borderStrong,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: tokens.colors.surfaceMuted,
        '& .MuiTableCell-head': {
          fontWeight: 600,
          color: tokens.colors.slate,
          borderBottom: `1px solid ${tokens.colors.border}`,
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid ${tokens.colors.border}`,
        padding: '14px 16px',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRight: `1px solid ${tokens.colors.border}`,
        backgroundColor: tokens.colors.surface,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: tokens.colors.surface,
        color: tokens.colors.black,
        boxShadow: 'none',
        borderBottom: `1px solid ${tokens.colors.border}`,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        minHeight: 44,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: tokens.radii.lg,
        border: `1px solid ${tokens.colors.border}`,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: tokens.colors.black,
        fontSize: '0.75rem',
        borderRadius: tokens.radii.xs,
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      switchBase: {
        '&.Mui-checked': {
          color: tokens.colors.black,
        },
        '&.Mui-checked + .MuiSwitch-track': {
          backgroundColor: tokens.colors.black,
        },
      },
      track: {
        backgroundColor: tokens.colors.borderStrong,
      },
    },
  },
};
