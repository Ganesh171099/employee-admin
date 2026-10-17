import * as yup from 'yup';

export const awardTemplateSchema = yup.object({
  name: yup.string().trim().required('Template name is required'),
  category: yup.string().required('Category is required'),
  points: yup
    .number()
    .typeError('Points must be a number')
    .min(1, 'Must be at least 1')
    .required('Points are required'),
  description: yup.string().trim().required('Description is required'),
  status: yup.string().required('Status is required'),
});
