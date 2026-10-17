import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const PageHeader = ({ title, subtitle, actions }) => (
  <MotionBox
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.28 }}
    sx={{ mb: 3 }}
  >
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      spacing={2}
    >
      <Box>
        <Typography variant="h3" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && (
        <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
          {actions}
        </Stack>
      )}
    </Stack>
  </MotionBox>
);

export default PageHeader;
