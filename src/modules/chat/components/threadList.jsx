import { Badge, Box, List, ListItemButton, Stack, Typography } from '@mui/material';
import { tokens } from '../../../theme';

/** Child: thread list sidebar */
const ThreadList = ({ threads, activeThreadId, onSelect }) => (
  <Box sx={{ height: '100%', overflowY: 'auto' }}>
    <List disablePadding>
      {threads.map((thread) => {
        const active = thread.id === activeThreadId;
        return (
          <ListItemButton
            key={thread.id}
            selected={active}
            onClick={() => onSelect(thread.id)}
            sx={{
              alignItems: 'flex-start',
              py: 1.75,
              px: 2,
              borderBottom: `1px solid ${tokens.colors.border}`,
              '&.Mui-selected': {
                backgroundColor: tokens.colors.surfaceMuted,
              },
            }}
          >
            <Stack spacing={0.35} sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={700}>
                  {thread.companyName}
                </Typography>
                {thread.unread > 0 && (
                  <Badge
                    badgeContent={thread.unread}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: tokens.colors.black,
                        color: tokens.colors.white,
                      },
                    }}
                  />
                )}
              </Stack>
              <Typography variant="body2">{thread.subject}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {thread.messages[thread.messages.length - 1]?.body}
              </Typography>
            </Stack>
          </ListItemButton>
        );
      })}
    </List>
  </Box>
);

export default ThreadList;
