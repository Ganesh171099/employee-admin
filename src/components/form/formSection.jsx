import { Box, Stack, Typography } from '@mui/material';
import { tokens } from '../../theme';

const FormSection = ({ title, description, children }) => (
  <Box
    sx={{
      p: { xs: 2, md: 2.5 },
      border: `1px solid ${tokens.colors.border}`,
      borderRadius: 2,
      backgroundColor: tokens.colors.surface,
      mb: 2,
    }}
  >
    {(title || description) && (
      <Box sx={{ mb: 2 }}>
        {title && (
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    )}
    <Stack spacing={0.5}>{children}</Stack>
  </Box>
);

export default FormSection;
