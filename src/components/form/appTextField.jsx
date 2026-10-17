import { TextField } from '@mui/material';

const AppTextField = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = 'text',
  multiline = false,
  rows = 3,
  placeholder,
  disabled = false,
  required = false,
  InputProps,
  ...rest
}) => (
  <TextField
    name={name}
    label={label}
    value={value ?? ''}
    onChange={onChange}
    onBlur={onBlur}
    error={Boolean(error)}
    helperText={error || helperText || ' '}
    type={type}
    multiline={multiline}
    rows={multiline ? rows : undefined}
    placeholder={placeholder}
    disabled={disabled}
    required={required}
    InputProps={InputProps}
    {...rest}
  />
);

export default AppTextField;
