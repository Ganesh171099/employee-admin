import * as yup from 'yup';

export const onboardingCompanySchema = yup.object({
  name: yup.string().trim().required('Company name is required'),
  domain: yup
    .string()
    .trim()
    .required('Domain is required')
    .matches(/^[a-z0-9.-]+\.[a-z]{2,}$/i, 'Enter a valid domain'),
  industry: yup.string().required('Industry is required'),
  country: yup.string().trim().required('Country is required'),
  planId: yup.string().required('Select a plan'),
});

export const onboardingAdminSchema = yup.object({
  adminName: yup.string().trim().required('Admin name is required'),
  adminEmail: yup
    .string()
    .trim()
    .required('Admin email is required')
    .email('Enter a valid email'),
  adminPhone: yup.string().trim().required('Phone is required'),
});

export const onboardingPoliciesSchema = yup.object({
  defaultLeavePolicy: yup.boolean(),
  defaultWellnessPolicy: yup.boolean(),
  defaultAwardPolicy: yup.boolean(),
  inviteEmails: yup
    .string()
    .trim()
    .test(
      'emails',
      'Use comma-separated valid emails',
      (value) => {
        if (!value) return true;
        const parts = value.split(',').map((p) => p.trim()).filter(Boolean);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return parts.every((email) => emailRegex.test(email));
      },
    ),
});

export const onboardingFullSchema = onboardingCompanySchema
  .concat(onboardingAdminSchema)
  .concat(onboardingPoliciesSchema);
