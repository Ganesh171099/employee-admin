import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import ModuleGate from '../../components/common/moduleGate';
import { notifyError, notifySuccess } from '../../components/common/notify';
import PageHeader from '../../components/common/pageHeader';
import StatusChip from '../../components/common/statusChip';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchSupportTickets,
  updateSupportTicket,
} from '../../redux/slices/supportSlice';
import { tokens } from '../../theme';

const SupportPage = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.support);

  useEffect(() => {
    dispatch(fetchSupportTickets());
  }, [dispatch]);

  const changeStatus = async (ticket, nextStatus) => {
    try {
      await dispatch(
        updateSupportTicket({ id: ticket.id, data: { status: nextStatus } }),
      ).unwrap();
      notifySuccess(`Ticket ${ticket.id} → ${nextStatus}`);
    } catch {
      notifyError('Unable to update ticket');
    }
  };

  return (
    <ModuleGate moduleId="support">
      <PageHeader
        title="Support"
        subtitle="Platform support queue across all tenant companies."
      />

      {status === 'loading' && <LinearProgress sx={{ mb: 2 }} />}

      <Paper elevation={0} sx={{ border: `1px solid ${tokens.colors.border}`, overflow: 'hidden' }}>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ticket</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((ticket) => (
                <TableRow key={ticket.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {ticket.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ticket.subject}
                    </Typography>
                  </TableCell>
                  <TableCell>{ticket.companyName}</TableCell>
                  <TableCell>
                    <StatusChip status={ticket.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusChip status={ticket.status} />
                  </TableCell>
                  <TableCell>
                    {dayjs(ticket.updatedAt).format('DD MMM, HH:mm')}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <TextField
                        select
                        size="small"
                        value={ticket.status}
                        onChange={(e) => changeStatus(ticket, e.target.value)}
                        sx={{ minWidth: 140 }}
                      >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="in_progress">In progress</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                      </TextField>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => changeStatus(ticket, 'closed')}
                      >
                        Close
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </ModuleGate>
  );
};

export default SupportPage;
