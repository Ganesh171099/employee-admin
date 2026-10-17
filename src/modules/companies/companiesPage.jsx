import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add,
  Block,
  CheckCircleOutline,
  EditOutlined,
  PauseCircleOutline,
} from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';
import ConfirmDialog from '../../components/common/confirmDialog';
import EmptyState from '../../components/common/emptyState';
import ModuleGate from '../../components/common/moduleGate';
import { notifyError, notifySuccess } from '../../components/common/notify';
import PageHeader from '../../components/common/pageHeader';
import StatusChip from '../../components/common/statusChip';
import AppSelect from '../../components/form/appSelect';
import AppTextField from '../../components/form/appTextField';
import {
  companyStatusOptions,
  industryOptions,
} from '../../mock/companies';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectCompaniesStatus,
  selectCompanyFilters,
  selectFilteredCompanies,
} from '../../redux/selectors/companiesSelectors';
import {
  createCompany,
  fetchCompanies,
  setCompanyFilters,
  setCompanyStatus,
  updateCompany,
} from '../../redux/slices/companiesSlice';
import { fetchPlans } from '../../redux/slices/plansSlice';
import { tokens } from '../../theme';
import CompanyFormDialog from './companyFormDialog';

const CompaniesPage = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(selectFilteredCompanies);
  const filters = useAppSelector(selectCompanyFilters);
  const status = useAppSelector(selectCompaniesStatus);
  const plans = useAppSelector((state) => state.plans.items);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchPlans());
  }, [dispatch]);

  const planOptions = useMemo(
    () => plans.map((plan) => ({ value: plan.id, label: plan.name })),
    [plans],
  );

  const planName = (planId) =>
    plans.find((plan) => plan.id === planId)?.name || planId;

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (company) => {
    setEditing(company);
    setDialogOpen(true);
  };

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (editing) {
        await dispatch(updateCompany({ id: editing.id, data: payload })).unwrap();
        notifySuccess('Company updated');
      } else {
        await dispatch(createCompany(payload)).unwrap();
        notifySuccess('Company created');
      }
      setDialogOpen(false);
    } catch {
      notifyError('Unable to save company');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async () => {
    if (!confirm) return;
    try {
      await dispatch(
        setCompanyStatus({ id: confirm.company.id, status: confirm.status }),
      ).unwrap();
      notifySuccess(`Company marked ${confirm.status}`);
      setConfirm(null);
    } catch {
      notifyError('Unable to update status');
    }
  };

  return (
    <ModuleGate moduleId="companies">
      <PageHeader
        title="Companies"
        subtitle="Search, filter, and manage tenant lifecycle across the platform."
        actions={
          <Button startIcon={<Add />} variant="contained" onClick={openCreate}>
            Add company
          </Button>
        }
      />

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          border: `1px solid ${tokens.colors.border}`,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={1.5}
          alignItems={{ md: 'flex-start' }}
        >
          <Box sx={{ flex: 1.4 }}>
            <AppTextField
              name="search"
              label="Search companies"
              value={filters.search}
              onChange={(e) =>
                dispatch(setCompanyFilters({ search: e.target.value }))
              }
              placeholder="Name, domain, or email"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <AppSelect
              name="status"
              label="Status"
              value={filters.status}
              onChange={(e) =>
                dispatch(setCompanyFilters({ status: e.target.value || 'all' }))
              }
              options={[{ value: 'all', label: 'All statuses' }, ...companyStatusOptions]}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <AppSelect
              name="industry"
              label="Industry"
              value={filters.industry}
              onChange={(e) =>
                dispatch(setCompanyFilters({ industry: e.target.value || 'all' }))
              }
              options={[{ value: 'all', label: 'All industries' }, ...industryOptions]}
            />
          </Box>
        </Stack>
      </Paper>

      {status === 'loading' && <LinearProgress sx={{ mb: 2 }} />}

      <Paper elevation={0} sx={{ border: `1px solid ${tokens.colors.border}`, overflow: 'hidden' }}>
        {companies.length === 0 ? (
          <Box sx={{ p: 2 }}>
            <EmptyState
              title="No companies match"
              description="Adjust filters or onboard a new company."
            />
          </Box>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Employees</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {company.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {company.domain} · {company.contactEmail}
                      </Typography>
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{planName(company.planId)}</TableCell>
                    <TableCell>{company.employees}</TableCell>
                    <TableCell>
                      <StatusChip status={company.status} />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => openEdit(company)}>
                          <EditOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Activate">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setConfirm({ company, status: 'active', label: 'activate' })
                          }
                        >
                          <CheckCircleOutline fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Suspend">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setConfirm({ company, status: 'suspended', label: 'suspend' })
                          }
                        >
                          <PauseCircleOutline fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Deactivate">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setConfirm({ company, status: 'inactive', label: 'deactivate' })
                          }
                        >
                          <Block fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>

      <CompanyFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSave}
        initialValues={editing}
        planOptions={planOptions}
        loading={saving}
      />

      <ConfirmDialog
        open={Boolean(confirm)}
        title={`${confirm?.label?.charAt(0).toUpperCase()}${confirm?.label?.slice(1)} company?`}
        description={`This will mark ${confirm?.company?.name} as ${confirm?.status}.`}
        confirmLabel="Confirm"
        onClose={() => setConfirm(null)}
        onConfirm={handleStatusChange}
      />
    </ModuleGate>
  );
};

export default CompaniesPage;
