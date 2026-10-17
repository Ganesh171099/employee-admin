import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import EmptyState from '../../components/common/emptyState';
import ModuleGate from '../../components/common/moduleGate';
import PageHeader from '../../components/common/pageHeader';
import AppTextField from '../../components/form/appTextField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAuditLogs, setAuditSearch } from '../../redux/slices/auditLogsSlice';
import { tokens } from '../../theme';

const AuditLogsPage = () => {
  const dispatch = useAppDispatch();
  const { items, status, search } = useAppSelector((state) => state.auditLogs);

  useEffect(() => {
    dispatch(fetchAuditLogs());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (log) =>
        log.action.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q) ||
        log.target.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q),
    );
  }, [items, search]);

  return (
    <ModuleGate moduleId="auditLogs">
      <PageHeader
        title="Audit Logs"
        subtitle="Immutable trail of platform administration actions."
      />

      <Paper elevation={0} sx={{ p: 2, mb: 2, border: `1px solid ${tokens.colors.border}` }}>
        <AppTextField
          name="search"
          label="Search logs"
          value={search}
          onChange={(e) => dispatch(setAuditSearch(e.target.value))}
          placeholder="Action, actor, target…"
        />
      </Paper>

      {status === 'loading' && <LinearProgress sx={{ mb: 2 }} />}

      <Paper elevation={0} sx={{ border: `1px solid ${tokens.colors.border}`, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <EmptyState title="No audit events" description="Try a different search." />
          </Box>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>When</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Actor</TableCell>
                  <TableCell>Target</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>
                      <Typography variant="body2">
                        {dayjs(log.createdAt).format('DD MMM YYYY, HH:mm')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.ip}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {log.action}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{log.actor}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.actorEmail}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{log.target}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {log.targetType}
                      </Typography>
                    </TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </ModuleGate>
  );
};

export default AuditLogsPage;
