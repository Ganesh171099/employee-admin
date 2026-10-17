import {
  Box,
  FormControlLabel,
  LinearProgress,
  Paper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import ModuleGate from '../../components/common/moduleGate';
import { notifyError, notifySuccess } from '../../components/common/notify';
import PageHeader from '../../components/common/pageHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCompanies } from '../../redux/slices/companiesSlice';
import {
  fetchFeatureFlags,
  updateFeatureFlag,
} from '../../redux/slices/featureFlagsSlice';
import { tokens } from '../../theme';

const FeatureFlagsPage = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.featureFlags);
  const companies = useAppSelector((state) => state.companies.items);

  useEffect(() => {
    dispatch(fetchFeatureFlags());
    dispatch(fetchCompanies());
  }, [dispatch]);

  const toggleDefault = async (flag) => {
    try {
      await dispatch(
        updateFeatureFlag({
          id: flag.id,
          data: { defaultEnabled: !flag.defaultEnabled },
        }),
      ).unwrap();
      notifySuccess(`${flag.name} default ${!flag.defaultEnabled ? 'enabled' : 'disabled'}`);
    } catch {
      notifyError('Unable to update feature flag');
    }
  };

  const toggleCompany = async (flag, companyId) => {
    const current = Boolean(
      flag.companyOverrides?.[companyId] ?? flag.defaultEnabled,
    );
    const nextOverrides = {
      ...flag.companyOverrides,
      [companyId]: !current,
    };
    try {
      await dispatch(
        updateFeatureFlag({
          id: flag.id,
          data: { companyOverrides: nextOverrides },
        }),
      ).unwrap();
      notifySuccess(`Override updated for ${flag.name}`);
    } catch {
      notifyError('Unable to update company override');
    }
  };

  return (
    <ModuleGate moduleId="featureFlags">
      <PageHeader
        title="Feature Flags"
        subtitle="Enable or disable platform capabilities globally and per company."
      />

      {status === 'loading' && <LinearProgress sx={{ mb: 2 }} />}

      <Stack spacing={2}>
        {items.map((flag) => (
          <Paper
            key={flag.id}
            elevation={0}
            sx={{ p: 2.5, border: `1px solid ${tokens.colors.border}` }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ sm: 'center' }}
              spacing={1.5}
              sx={{ mb: 2 }}
            >
              <Box>
                <Typography variant="h5">{flag.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {flag.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Key: {flag.key}
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={flag.defaultEnabled}
                    onChange={() => toggleDefault(flag)}
                  />
                }
                label="Default enabled"
              />
            </Stack>

            <Typography variant="overline" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
              Company overrides
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  lg: '1fr 1fr 1fr',
                },
                gap: 1,
              }}
            >
              {companies.map((company) => {
                const enabled = Boolean(
                  flag.companyOverrides?.[company.id] ?? flag.defaultEnabled,
                );
                return (
                  <Box
                    key={`${flag.id}-${company.id}`}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: 1.5,
                      border: `1px solid ${tokens.colors.border}`,
                      backgroundColor: tokens.colors.surfaceAlt,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {company.name}
                    </Typography>
                    <Switch
                      size="small"
                      checked={enabled}
                      onChange={() => toggleCompany(flag, company.id)}
                    />
                  </Box>
                );
              })}
            </Box>
          </Paper>
        ))}
      </Stack>
    </ModuleGate>
  );
};

export default FeatureFlagsPage;
