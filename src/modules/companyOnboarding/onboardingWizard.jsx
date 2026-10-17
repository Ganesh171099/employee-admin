import {
  Box,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import ModuleGate from '../../components/common/moduleGate';
import { notifyError, notifySuccess } from '../../components/common/notify';
import PageHeader from '../../components/common/pageHeader';
import AppCheckbox from '../../components/form/appCheckbox';
import AppSelect from '../../components/form/appSelect';
import AppTextField from '../../components/form/appTextField';
import FormSection from '../../components/form/formSection';
import { industryOptions } from '../../mock/companies';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { onboardCompany } from '../../redux/slices/companiesSlice';
import { fetchPlans } from '../../redux/slices/plansSlice';
import { tokens } from '../../theme';
import {
  onboardingAdminSchema,
  onboardingCompanySchema,
  onboardingFullSchema,
  onboardingPoliciesSchema,
} from '../../validations/onboardingSchema';

const MotionPaper = motion.create(Paper);

const steps = ['Company', 'Initial admin', 'Policies & invites', 'Review'];

const initialForm = {
  name: '',
  domain: '',
  industry: '',
  country: '',
  planId: '',
  adminName: '',
  adminEmail: '',
  adminPhone: '',
  defaultLeavePolicy: true,
  defaultWellnessPolicy: true,
  defaultAwardPolicy: true,
  inviteEmails: '',
};

const OnboardingWizard = () => {
  const dispatch = useAppDispatch();
  const plans = useAppSelector((state) => state.plans.items);
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const planOptions = useMemo(
    () => plans.map((plan) => ({ value: plan.id, label: plan.name })),
    [plans],
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const schemaForStep = [
    onboardingCompanySchema,
    onboardingAdminSchema,
    onboardingPoliciesSchema,
    onboardingFullSchema,
  ][activeStep];

  const validateField = async (name, value) => {
    try {
      await schemaForStep.validateAt(name, { ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleBlur = (event) => {
    const { name, value, type, checked } = event.target;
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const validateStep = async () => {
    try {
      await schemaForStep.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const next = {};
      err.inner?.forEach((item) => {
        if (item.path && !next[item.path]) next[item.path] = item.message;
      });
      setErrors(next);
      return false;
    }
  };

  const next = async () => {
    const ok = await validateStep();
    if (ok) setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const ok = await validateStep();
    if (!ok) return;
    setSubmitting(true);
    try {
      const result = await dispatch(onboardCompany(form)).unwrap();
      setInviteLink(result.inviteLink);
      notifySuccess('Company onboarded successfully');
      setActiveStep(0);
      setForm(initialForm);
    } catch {
      notifyError('Onboarding failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModuleGate moduleId="companyOnboarding">
      <PageHeader
        title="Company Onboarding"
        subtitle="Register a company, create the initial admin, apply default policies, and share invite links."
      />

      <MotionPaper
        elevation={0}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ p: { xs: 2, md: 3 }, border: `1px solid ${tokens.colors.border}`, mb: 2 }}
      >
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <FormSection title="Company details" description="Core tenant identity and subscription.">
            <AppTextField name="name" label="Company name" value={form.name} onChange={handleChange} onBlur={handleBlur} error={errors.name} />
            <AppTextField name="domain" label="Domain" value={form.domain} onChange={handleChange} onBlur={handleBlur} error={errors.domain} />
            <AppSelect name="industry" label="Industry" value={form.industry} onChange={handleChange} onBlur={handleBlur} options={industryOptions} error={errors.industry} />
            <AppTextField name="country" label="Country" value={form.country} onChange={handleChange} onBlur={handleBlur} error={errors.country} />
            <AppSelect name="planId" label="Plan" value={form.planId} onChange={handleChange} onBlur={handleBlur} options={planOptions} error={errors.planId} />
          </FormSection>
        )}

        {activeStep === 1 && (
          <FormSection title="Initial admin" description="This user becomes the company's first administrator.">
            <AppTextField name="adminName" label="Admin name" value={form.adminName} onChange={handleChange} onBlur={handleBlur} error={errors.adminName} />
            <AppTextField name="adminEmail" label="Admin email" value={form.adminEmail} onChange={handleChange} onBlur={handleBlur} error={errors.adminEmail} />
            <AppTextField name="adminPhone" label="Phone" value={form.adminPhone} onChange={handleChange} onBlur={handleBlur} error={errors.adminPhone} />
          </FormSection>
        )}

        {activeStep === 2 && (
          <FormSection title="Default policies & invites" description="Seed policies and optional invite emails.">
            <AppCheckbox name="defaultLeavePolicy" label="Apply default leave policy" checked={form.defaultLeavePolicy} onChange={handleChange} onBlur={handleBlur} />
            <AppCheckbox name="defaultWellnessPolicy" label="Apply default wellness policy" checked={form.defaultWellnessPolicy} onChange={handleChange} onBlur={handleBlur} />
            <AppCheckbox name="defaultAwardPolicy" label="Apply default award policy" checked={form.defaultAwardPolicy} onChange={handleChange} onBlur={handleBlur} />
            <AppTextField
              name="inviteEmails"
              label="Invite emails (comma-separated)"
              value={form.inviteEmails}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.inviteEmails}
              helperText="Optional additional invites"
            />
          </FormSection>
        )}

        {activeStep === 3 && (
          <FormSection title="Review" description="Confirm details before provisioning the tenant.">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 1.5,
              }}
            >
              {[
                ['Company', form.name],
                ['Domain', form.domain],
                ['Industry', form.industry],
                ['Country', form.country],
                ['Plan', planOptions.find((p) => p.value === form.planId)?.label || form.planId],
                ['Admin', form.adminName],
                ['Admin email', form.adminEmail],
                ['Phone', form.adminPhone],
              ].map(([label, value]) => (
                <Box
                  key={label}
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    border: `1px solid ${tokens.colors.border}`,
                    backgroundColor: tokens.colors.surfaceAlt,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {label}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {value || '—'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </FormSection>
        )}

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Button onClick={back} disabled={activeStep === 0 || submitting}>
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button variant="contained" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button variant="contained" onClick={submit} disabled={submitting}>
              {submitting ? 'Provisioning…' : 'Complete onboarding'}
            </Button>
          )}
        </Stack>
      </MotionPaper>

      {inviteLink && (
        <Paper elevation={0} sx={{ p: 2.5, border: `1px solid ${tokens.colors.border}` }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Invite link ready
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Share this link with the company admin to finish workspace setup.
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              p: 1.5,
              borderRadius: 1,
              backgroundColor: tokens.colors.surfaceMuted,
              wordBreak: 'break-all',
            }}
          >
            {inviteLink}
          </Typography>
        </Paper>
      )}
    </ModuleGate>
  );
};

export default OnboardingWizard;
