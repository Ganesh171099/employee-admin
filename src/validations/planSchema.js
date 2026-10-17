import * as yup from 'yup';

export const planSchema = yup.object({
  name: yup.string().trim().required('Plan name is required'),
  priceMonthly: yup
    .number()
    .typeError('Monthly price must be a number')
    .min(0, 'Must be 0 or greater')
    .required('Monthly price is required'),
  priceYearly: yup
    .number()
    .typeError('Yearly price must be a number')
    .min(0, 'Must be 0 or greater')
    .required('Yearly price is required'),
  maxEmployees: yup
    .number()
    .nullable()
    .transform((value, original) => (original === '' || original === null ? null : value))
    .typeError('Max employees must be a number')
    .min(1, 'Must be at least 1'),
  description: yup.string().trim().required('Description is required'),
  features: yup.array().of(yup.string()).min(1, 'Select at least one feature'),
  status: yup.string().required('Status is required'),
});
