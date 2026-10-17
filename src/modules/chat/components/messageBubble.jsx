import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { tokens } from '../../../theme';

/** Grandchild: single chat message bubble */
const MessageBubble = ({ message }) => {
  const isAdmin = message.role === 'super_admin';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isAdmin ? 'flex-end' : 'flex-start',
        mb: 1.25,
      }}
    >
      <Box
        sx={{
          maxWidth: '78%',
          px: 1.75,
          py: 1.25,
          borderRadius: 2,
          backgroundColor: isAdmin ? tokens.colors.black : tokens.colors.surfaceAlt,
          color: isAdmin ? tokens.colors.white : tokens.colors.black,
          border: `1px solid ${isAdmin ? tokens.colors.black : tokens.colors.border}`,
        }}
      >
        <Typography variant="caption" sx={{ opacity: 0.75, display: 'block', mb: 0.35 }}>
          {message.sender} · {dayjs(message.createdAt).format('HH:mm')}
        </Typography>
        <Typography variant="body2">{message.body}</Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;
