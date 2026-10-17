import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { tokens } from '../../theme';
import Header from './header';
import Sidebar from './sidebar';

const AppLayout = () => (
  <Box
    sx={{
      display: 'flex',
      minHeight: '100vh',
      background: `
        radial-gradient(circle at top right, rgba(0,0,0,0.035), transparent 28%),
        ${tokens.colors.surfaceAlt}
      `,
    }}
  >
    <Sidebar />
    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          px: { xs: 2, md: 3.5 },
          py: { xs: 2.5, md: 3.5 },
          maxWidth: 1400,
          width: '100%',
          mx: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  </Box>
);

export default AppLayout;
