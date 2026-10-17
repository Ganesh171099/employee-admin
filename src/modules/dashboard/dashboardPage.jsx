import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import ModuleGate from '../../components/common/moduleGate';
import PageHeader from '../../components/common/pageHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchDashboard } from '../../redux/slices/dashboardSlice';
import { tokens } from '../../theme';

const MotionPaper = motion.create(Paper);

const StatCard = ({ label, value, delay = 0 }) => (
  <MotionPaper
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    elevation={0}
    sx={{
      p: 2.5,
      border: `1px solid ${tokens.colors.border}`,
      background: `
        linear-gradient(160deg, ${tokens.colors.surface} 0%, ${tokens.colors.surfaceAlt} 100%)
      `,
      minHeight: 120,
    }}
  >
    <Typography variant="overline" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h2" sx={{ mt: 1 }}>
      {value}
    </Typography>
  </MotionPaper>
);

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { stats, recentActivity, companyGrowth, status } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  return (
    <ModuleGate moduleId="dashboard">
      <PageHeader
        title="Platform Dashboard"
        subtitle="Multi-company health, subscriptions, and operational signals."
      />

      {status === 'loading' && !stats && <LinearProgress sx={{ mb: 2 }} />}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
          mb: 2.5,
        }}
      >
        <StatCard label="Companies" value={stats?.totalCompanies ?? '—'} delay={0.02} />
        <StatCard label="Active" value={stats?.activeCompanies ?? '—'} delay={0.06} />
        <StatCard label="Employees" value={stats?.totalEmployees ?? '—'} delay={0.1} />
        <StatCard label="Open tickets" value={stats?.openSupportTickets ?? '—'} delay={0.14} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
          gap: 2,
        }}
      >
        <MotionPaper
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          elevation={0}
          sx={{ p: 2.5, border: `1px solid ${tokens.colors.border}` }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Company growth
          </Typography>
          <Stack spacing={1.75}>
            {(companyGrowth || []).map((row) => {
              const max = Math.max(...(companyGrowth || []).map((g) => g.count), 1);
              return (
                <Box key={row.month}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {row.month}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.count} companies
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(row.count / max) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: tokens.colors.surfaceMuted,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: tokens.colors.black,
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        </MotionPaper>

        <MotionPaper
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          elevation={0}
          sx={{ p: 2.5, border: `1px solid ${tokens.colors.border}` }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Recent activity
          </Typography>
          <Stack spacing={1.5}>
            {(recentActivity || []).map((item) => (
              <Box
                key={item.id}
                sx={{
                  p: 1.5,
                  borderRadius: 1.5,
                  border: `1px solid ${tokens.colors.border}`,
                  backgroundColor: tokens.colors.surfaceAlt,
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.meta}
                </Typography>
              </Box>
            ))}
          </Stack>
        </MotionPaper>
      </Box>
    </ModuleGate>
  );
};

export default DashboardPage;
