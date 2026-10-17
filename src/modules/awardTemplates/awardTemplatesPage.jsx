import {
  Box,
  Button,
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
import AppSelect from '../../components/form/appSelect';
import AppTextField from '../../components/form/appTextField';
import { awardCategories } from '../../mock/awardTemplates';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  createAwardTemplate,
  fetchAwardTemplates,
  updateAwardTemplate,
} from '../../redux/slices/awardTemplatesSlice';
import { tokens } from '../../theme';
import { awardTemplateSchema } from '../../validations/awardSchema';

const emptyForm = {
  name: '',
  category: '',
  points: '',
  description: '',
  status: 'active',
};

const AwardTemplatesPage = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.awardTemplates);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchAwardTemplates());
  }, [dispatch]);

  const openDialog = (template = null) => {
    setEditing(template);
    setForm(template || emptyForm);
    setErrors({});
    setOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = async (name, value) => {
    try {
      await awardTemplateSchema.validateAt(name, { ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleBlur = (event) => {
    validateField(event.target.name, event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...form, points: Number(form.points) };
    try {
      await awardTemplateSchema.validate(payload, { abortEarly: false });
      setErrors({});
      setSaving(true);
      if (editing) {
        await dispatch(updateAwardTemplate({ id: editing.id, data: payload })).unwrap();
        notifySuccess('Template updated');
      } else {
        await dispatch(createAwardTemplate(payload)).unwrap();
        notifySuccess('Template created');
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
        notifyError('Unable to save template');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModuleGate moduleId="awardTemplates">
      <PageHeader
        title="Award Templates"
        subtitle="Global wellness and recognition templates available to companies."
        actions={
          <Button startIcon={<Add />} variant="contained" onClick={() => openDialog()}>
            New template
          </Button>
        }
      />

      {status === 'loading' && <LinearProgress sx={{ mb: 2 }} />}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
        }}
      >
        {items.map((template) => (
          <Paper
            key={template.id}
            elevation={0}
            sx={{ p: 2.5, border: `1px solid ${tokens.colors.border}` }}
          >
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="h5">{template.name}</Typography>
              <StatusChip status={template.status} />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {template.description}
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Category: {template.category}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Points: {template.points}
              </Typography>
            </Stack>
            <Button variant="outlined" onClick={() => openDialog(template)}>
              Edit
            </Button>
          </Paper>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit template' : 'Create template'}</DialogTitle>
        <DialogContent>
          <Stack component="form" id="award-form" onSubmit={handleSubmit} spacing={0.5} sx={{ pt: 1 }}>
            <AppTextField name="name" label="Name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} />
            <AppSelect name="category" label="Category" value={form.category} onChange={handleChange} onBlur={handleBlur} options={awardCategories} error={errors.category} />
            <AppTextField name="points" label="Points" type="number" value={form.points} onChange={handleChange} onBlur={handleBlur} error={errors.points} />
            <AppTextField name="description" label="Description" multiline value={form.description} onChange={handleChange} onBlur={handleBlur} error={errors.description} />
            <AppSelect
              name="status"
              label="Status"
              value={form.status}
              onChange={handleChange}
              onBlur={handleBlur}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'draft', label: 'Draft' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              error={errors.status}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" form="award-form" variant="contained" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </ModuleGate>
  );
};

export default AwardTemplatesPage;
