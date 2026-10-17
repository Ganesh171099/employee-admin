import { Box, Typography } from '@mui/material';
import { tokens } from '../../theme';

const EmptyState = ({ title = 'Nothing here yet', description }) => (
  <Box
    sx={{
      py: 6,
      px: 3,
      textAlign: 'center',
      border: `1px dashed ${tokens.colors.borderStrong}`,
      borderRadius: 2,
      backgroundColor: tokens.colors.surface,
    }}
  >
    <Typography variant="h5" sx={{ mb: 1 }}>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    )}
  </Box>
);

export default EmptyState;
