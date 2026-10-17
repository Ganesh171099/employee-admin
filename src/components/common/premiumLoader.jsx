import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { tokens } from '../../theme';
import AppLogo from './appLogo';

const MotionBox = motion.create(Box);

const PremiumLoader = ({ label = 'Loading platform console' }) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `
        radial-gradient(circle at 20% 20%, rgba(0,0,0,0.04), transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(0,0,0,0.05), transparent 45%),
        linear-gradient(180deg, ${tokens.colors.surface} 0%, ${tokens.colors.surfaceAlt} 100%)
      `,
      px: 2,
    }}
  >
    <Stack spacing={3} alignItems="center">
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <AppLogo />
      </MotionBox>

      <Stack spacing={1.5} alignItems="center" sx={{ width: 220 }}>
        <Box
          sx={{
            width: '100%',
            height: 3,
            borderRadius: 999,
            backgroundColor: tokens.colors.border,
            overflow: 'hidden',
          }}
        >
          <MotionBox
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
              width: '45%',
              height: '100%',
              backgroundColor: tokens.colors.black,
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </Stack>
  </Box>
);

export default PremiumLoader;
