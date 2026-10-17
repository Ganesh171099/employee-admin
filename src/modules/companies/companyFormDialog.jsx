import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AppSelect from '../../components/form/appSelect';
import AppTextField from '../../components/form/appTextField';
import {
  companyStatusOptions,
  industryOptions,
} from '../../mock/companies';
import { companySchema } from '../../validations/companySchema';

const emptyForm = {
  name: '',
  domain: '',
  industry: '',
  planId: '',
  status: 'active',
  country: '',
  contactEmail: '',
  employees: 1,
};

const CompanyFormDialog = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  planOptions = [],
  loading = false,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(initialValues ? { ...emptyForm, ...initialValues } : emptyForm);
      setErrors({});
    }
  }, [open, initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'employees' ? value : value,
    }));
  };

  const validateField = async (name, value) => {
    try {
      await companySchema.validateAt(name, {
        ...form,
        [name]: name === 'employees' ? Number(value) : value,
      });
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
      employees: Number(form.employees),
    };
    try {
      await companySchema.validate(payload, { abortEarly: false });
      setErrors({});
      onSubmit(payload);
    } catch (err) {
      const next = {};
      err.inner?.forEach((item) => {
        if (item.path && !next[item.path]) next[item.path] = item.message;
      });
      setErrors(next);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialValues ? 'Edit company' : 'Add company'}</DialogTitle>
      <DialogContent>
        <Stack component="form" id="company-form" onSubmit={handleSubmit} spacing={0.5} sx={{ pt: 1 }}>
          <AppTextField
            name="name"
            label="Company name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
          />
          <AppTextField
            name="domain"
            label="Domain"
            value={form.domain}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.domain}
          />
          <AppSelect
            name="industry"
            label="Industry"
            value={form.industry}
            onChange={handleChange}
            onBlur={handleBlur}
            options={industryOptions}
            error={errors.industry}
          />
          <AppSelect
            name="planId"
            label="Plan"
            value={form.planId}
            onChange={handleChange}
            onBlur={handleBlur}
            options={planOptions}
            error={errors.planId}
          />
          <AppSelect
            name="status"
            label="Status"
            value={form.status}
            onChange={handleChange}
            onBlur={handleBlur}
            options={companyStatusOptions}
            error={errors.status}
          />
          <AppTextField
            name="country"
            label="Country"
            value={form.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.country}
          />
          <AppTextField
            name="contactEmail"
            label="Contact email"
            value={form.contactEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.contactEmail}
          />
          <AppTextField
            name="employees"
            label="Employees"
            type="number"
            value={form.employees}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.employees}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" form="company-form" variant="contained" disabled={loading}>
          {loading ? 'Saving…' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyFormDialog;
