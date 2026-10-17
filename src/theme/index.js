import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { palette } from './palette';
import { tokens } from './tokens';
import { typography } from './typography';

export { tokens };

const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: tokens.radii.md,
  },
  spacing: 8,
  components,
});

export default theme;
