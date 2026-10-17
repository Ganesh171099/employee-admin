import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import AppTextField from '../../../components/form/appTextField';
import { tokens } from '../../../theme';
import MessageBubble from './messageBubble';

/** Child: active thread conversation panel */
const ThreadPanel = ({ thread, onSend, senderName }) => {
  const [draft, setDraft] = useState('');

  if (!thread) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">Select a thread to begin.</Typography>
      </Box>
    );
  }

  const handleSend = () => {
    const body = draft.trim();
    if (!body) return;
    onSend(body);
    setDraft('');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: `1px solid ${tokens.colors.border}`,
        }}
      >
        <Typography variant="h5">{thread.subject}</Typography>
        <Typography variant="caption" color="text.secondary">
          {thread.companyName} · {thread.status}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5 }}>
        {thread.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{ p: 2, borderTop: `1px solid ${tokens.colors.border}` }}
      >
        <Box sx={{ flex: 1 }}>
          <AppTextField
            name="draft"
            label="Reply"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Reply as ${senderName}`}
          />
        </Box>
        <Button variant="contained" onClick={handleSend} sx={{ alignSelf: { sm: 'flex-start' }, mt: { sm: 0.5 } }}>
          Send
        </Button>
      </Stack>
    </Box>
  );
};

export default ThreadPanel;
