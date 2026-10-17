import { Box, Stack, Typography } from '@mui/material';
import { tokens } from '../../theme';

const AppLogo = ({ compact = false, invert = false }) => {
  const fg = invert ? tokens.colors.white : tokens.colors.black;
  const bg = invert ? tokens.colors.black : tokens.colors.white;

  return (
    <Stack direction="row" spacing={1.25} alignItems="center">
      <Box
        sx={{
          width: compact ? 34 : 40,
          height: compact ? 34 : 40,
          borderRadius: 1.25,
          background: `linear-gradient(145deg, ${tokens.colors.black} 0%, ${tokens.colors.graphite} 100%)`,
          color: tokens.colors.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: compact ? 13 : 15,
          letterSpacing: '-0.04em',
          boxShadow: tokens.shadows.soft,
          border: `1px solid ${invert ? tokens.colors.graphite : tokens.colors.black}`,
        }}
      >
        SA
      </Box>
      {!compact && (
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: fg,
              lineHeight: 1.1,
              fontSize: '1.05rem',
              letterSpacing: '-0.03em',
            }}
          >
            Super Admin
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: invert ? 'rgba(255,255,255,0.7)' : tokens.colors.muted }}
          >
            Platform Console
          </Typography>
        </Box>
      )}
      {compact && (
        <Box
          sx={{
            width: 0,
            height: 0,
            overflow: 'hidden',
            backgroundColor: bg,
          }}
        />
      )}
    </Stack>
  );
};

export default AppLogo;
