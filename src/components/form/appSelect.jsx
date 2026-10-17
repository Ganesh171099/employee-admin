import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

/**
 * mode: 'single' | 'multi'
 */
const AppSelect = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  mode = 'single',
  error,
  helperText,
  disabled = false,
  required = false,
  placeholder = 'Select',
}) => {
  const isMulti = mode === 'multi';
  const selectValue = isMulti
    ? Array.isArray(value)
      ? value
      : []
    : value ?? '';

  return (
    <FormControl fullWidth size="small" error={Boolean(error)} disabled={disabled} required={required}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        multiple={isMulti}
        value={selectValue}
        onChange={onChange}
        onBlur={onBlur}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          if (isMulti) {
            if (!selected?.length) return placeholder;
            return selected
              .map((val) => options.find((o) => o.value === val)?.label || val)
              .join(', ');
          }
          if (!selected) return placeholder;
          return options.find((o) => o.value === selected)?.label || selected;
        }}
        displayEmpty
      >
        {!isMulti && (
          <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {isMulti && <Checkbox checked={selectValue.indexOf(option.value) > -1} size="small" />}
            {isMulti ? <ListItemText primary={option.label} /> : option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error || helperText || ' '}</FormHelperText>
    </FormControl>
  );
};

export default AppSelect;
