import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ModuleGate from '../../components/common/moduleGate';
import { notifyError, notifySuccess } from '../../components/common/notify';
import PageHeader from '../../components/common/pageHeader';
import StatusChip from '../../components/common/statusChip';
import AppCheckbox from '../../components/form/appCheckbox';
import AppSelect from '../../components/form/appSelect';
import AppTextField from '../../components/form/appTextField';
import { planFeatureCatalog } from '../../mock/plans';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { createPlan, fetchPlans, updatePlan } from '../../redux/slices/plansSlice';
import { tokens } from '../../theme';
import { planSchema } from '../../validations/planSchema';

const emptyPlan = {
  name: '',
  priceMonthly: '',
  priceYearly: '',
  maxEmployees: '',
  description: '',
  features: [],
  status: 'active',
};

const PlansPage = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.plans);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPlan);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const openDialog = (plan = null) => {
    setEditing(plan);
    setForm(
      plan
        ? {
            ...plan,
            maxEmployees: plan.maxEmployees ?? '',
          }
        : emptyPlan,
    );
    setErrors({});
    setOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = async (name, value) => {
    try {
      await planSchema.validateAt(name, { ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      priceMonthly: Number(form.priceMonthly),
      priceYearly: Number(form.priceYearly),
      maxEmployees:
        form.maxEmployees === '' || form.maxEmployees === null
          ? null
          : Number(form.maxEmployees),
    };
    try {
      await planSchema.validate(payload, { abortEarly: false });
      setErrors({});
      setSaving(true);
      if (editing) {
        await dispatch(updatePlan({ id: editing.id, data: payload })).unwrap();
        notifySuccess('Plan updated');
      } else {
        await dispatch(createPlan(payload)).unwrap();
        notifySuccess('Plan created');
      }
      setOpen(false);
    } catch (err) {
      if (err.inner) {
        const next = {};
        err.inner.forEach((item) => {
          if (item.path && !next[item.path]) next[item.path] = item.message;
        });
        setErrors(next);
      } else {
        notifyError('Unable to save plan');
      }
    } finally {
      setSaving(false);
    }
  };

  const featureLabel = (id) =>
    planFeatureCatalog.find((f) => f.id === id)?.label || id;

  return (
    <ModuleGate moduleId="plans">
      <PageHeader
        title="Subscription Plans"
        subtitle="Define pricing tiers and feature access for tenant companies."
        actions={
          <Button startIcon={<Add />} variant="contained" onClick={() => openDialog()}>
            New plan
          </Button>
        }
      />

      {status === 'loading' && <LinearProgress sx={{ mb: 2 }} />}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' },
          gap: 2,
        }}
      >
        {items.map((plan) => (
          <Paper
            key={plan.id}
            elevation={0}
            sx={{
              p: 2.5,
              border: `1px solid ${tokens.colors.border}`,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 280,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
              <Typography variant="h4">{plan.name}</Typography>
              <StatusChip status={plan.status} />
            </Stack>
            <Typography variant="h3" sx={{ mb: 0.5 }}>
              ${plan.priceMonthly}
              <Typography component="span" variant="body2" color="text.secondary">
                /mo
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {plan.description}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Max employees: {plan.maxEmployees ?? 'Unlimited'}
            </Typography>
            <Stack direction="row" flexWrap="wrap" useFlexGap spacing={0.75} sx={{ mb: 2, flex: 1 }}>
              {plan.features.map((feature) => (
                <Chip key={feature} size="small" label={featureLabel(feature)} variant="outlined" />
              ))}
            </Stack>
            <Button variant="outlined" onClick={() => openDialog(plan)}>
              Edit plan
            </Button>
          </Paper>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit plan' : 'Create plan'}</DialogTitle>
        <DialogContent>
          <Stack component="form" id="plan-form" onSubmit={handleSubmit} spacing={0.5} sx={{ pt: 1 }}>
            <AppTextField name="name" label="Name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} />
            <AppTextField name="priceMonthly" label="Monthly price" type="number" value={form.priceMonthly} onChange={handleChange} onBlur={handleBlur} error={errors.priceMonthly} />
            <AppTextField name="priceYearly" label="Yearly price" type="number" value={form.priceYearly} onChange={handleChange} onBlur={handleBlur} error={errors.priceYearly} />
            <AppTextField name="maxEmployees" label="Max employees (blank = unlimited)" type="number" value={form.maxEmployees} onChange={handleChange} onBlur={handleBlur} error={errors.maxEmployees} />
            <AppTextField name="description" label="Description" multiline value={form.description} onChange={handleChange} onBlur={handleBlur} error={errors.description} />
            <AppSelect
              name="status"
              label="Status"
              value={form.status}
              onChange={handleChange}
              onBlur={handleBlur}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              error={errors.status}
            />
            <AppCheckbox
              name="features"
              label="Feature access"
              options={planFeatureCatalog.map((f) => ({ value: f.id, label: f.label }))}
              value={form.features}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.features}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" form="plan-form" variant="contained" disabled={saving}>
            {saving ? 'Saving…' : 'Save plan'}
          </Button>
        </DialogActions>
      </Dialog>
    </ModuleGate>
  );
};

export default PlansPage;
