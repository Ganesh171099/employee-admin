import * as yup from 'yup';

export const companySchema = yup.object({
  name: yup.string().trim().required('Company name is required').min(2, 'Too short'),
  domain: yup
    .string()
    .trim()
    .required('Domain is required')
    .matches(/^[a-z0-9.-]+\.[a-z]{2,}$/i, 'Enter a valid domain'),
  industry: yup.string().required('Industry is required'),
  planId: yup.string().required('Plan is required'),
  status: yup.string().required('Status is required'),
  country: yup.string().trim().required('Country is required'),
  contactEmail: yup
    .string()
    .trim()
    .required('Contact email is required')
    .email('Enter a valid email'),
  employees: yup
    .number()
    .typeError('Employees must be a number')
    .min(1, 'Must be at least 1')
    .required('Employee count is required'),
});
