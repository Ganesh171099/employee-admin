import { Box, LinearProgress, Paper } from '@mui/material';
import { useEffect } from 'react';
import ModuleGate from '../../components/common/moduleGate';
import { notifyError } from '../../components/common/notify';
import PageHeader from '../../components/common/pageHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAuthUser } from '../../redux/selectors/authSelectors';
import {
  fetchChatThreads,
  sendChatMessage,
  setActiveThread,
} from '../../redux/slices/chatSlice';
import { tokens } from '../../theme';
import ThreadList from './components/threadList';
import ThreadPanel from './components/threadPanel';

/** Parent: support chat shell */
const ChatPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const { threads, activeThreadId, status } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchChatThreads());
  }, [dispatch]);

  const activeThread = threads.find((thread) => thread.id === activeThreadId);

  const handleSend = async (body) => {
    if (!activeThreadId) return;
    try {
      await dispatch(
        sendChatMessage({
          threadId: activeThreadId,
          body,
          sender: user?.name || 'Super Admin',
        }),
      ).unwrap();
    } catch {
      notifyError('Failed to send message');
    }
  };

  return (
    <ModuleGate moduleId="chat">
      <PageHeader
        title="Support Chat"
        subtitle="Live conversations with company admins across the platform."
      />

      {status === 'loading' && <LinearProgress sx={{ mb: 2 }} />}

      <Paper
        elevation={0}
        sx={{
          border: `1px solid ${tokens.colors.border}`,
          height: { xs: 'auto', md: 560 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '300px 1fr' },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            borderRight: { md: `1px solid ${tokens.colors.border}` },
            borderBottom: { xs: `1px solid ${tokens.colors.border}`, md: 'none' },
            maxHeight: { xs: 260, md: 'none' },
            overflow: 'hidden',
          }}
        >
          <ThreadList
            threads={threads}
            activeThreadId={activeThreadId}
            onSelect={(id) => dispatch(setActiveThread(id))}
          />
        </Box>
        <ThreadPanel
          thread={activeThread}
          onSend={handleSend}
          senderName={user?.name || 'Super Admin'}
        />
      </Paper>
    </ModuleGate>
  );
};

export default ChatPage;
