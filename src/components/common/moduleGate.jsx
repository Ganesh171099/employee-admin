import { Box, Typography } from '@mui/material';
import { canAccessPage } from '../../config/pageVisibility';
import { useAppSelector } from '../../redux/hooks';
import { selectAuthUser } from '../../redux/selectors/authSelectors';

const ModuleGate = ({ moduleId, children }) => {
  const user = useAppSelector(selectAuthUser);
  const allowed = canAccessPage(moduleId, user);

  if (!allowed) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Module unavailable
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This module is disabled or not available for your role.
        </Typography>
      </Box>
    );
  }

  return children;
};

export default ModuleGate;
