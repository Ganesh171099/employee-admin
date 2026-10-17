import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';

const AppRadio = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  helperText,
  row = true,
  disabled = false,
}) => (
  <FormControl error={Boolean(error)} disabled={disabled} component="fieldset">
    {label && <FormLabel component="legend">{label}</FormLabel>}
    <RadioGroup
      name={name}
      value={value ?? ''}
      onChange={onChange}
      onBlur={onBlur}
      row={row}
    >
      <Stack direction={row ? 'row' : 'column'} spacing={0.5} flexWrap="wrap" useFlexGap>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio size="small" />}
            label={option.label}
          />
        ))}
      </Stack>
    </RadioGroup>
    <FormHelperText>{error || helperText || ' '}</FormHelperText>
  </FormControl>
);

export default AppRadio;
