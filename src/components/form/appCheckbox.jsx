import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';

/**
 * Single checkbox when `options` is omitted.
 * Multi checkbox group when `options` is provided (value = array of selected).
 */
const AppCheckbox = ({
  name,
  label,
  value,
  checked,
  onChange,
  onBlur,
  options,
  error,
  helperText,
  disabled = false,
}) => {
  if (Array.isArray(options)) {
    const selected = Array.isArray(value) ? value : [];

    const handleToggle = (optionValue) => (event) => {
      const next = event.target.checked
        ? [...selected, optionValue]
        : selected.filter((item) => item !== optionValue);

      onChange?.({
        target: { name, value: next },
      });
    };

    return (
      <FormControl error={Boolean(error)} disabled={disabled} component="fieldset">
        {label && <FormLabel component="legend">{label}</FormLabel>}
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  size="small"
                  checked={selected.includes(option.value)}
                  onChange={handleToggle(option.value)}
                  onBlur={onBlur}
                  name={name}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        <FormHelperText>{error || helperText || ' '}</FormHelperText>
      </FormControl>
    );
  }

  return (
    <FormControl error={Boolean(error)} disabled={disabled}>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            name={name}
            checked={Boolean(checked ?? value)}
            onChange={onChange}
            onBlur={onBlur}
          />
        }
        label={label}
      />
      <FormHelperText>{error || helperText || ' '}</FormHelperText>
    </FormControl>
  );
};

export default AppCheckbox;
