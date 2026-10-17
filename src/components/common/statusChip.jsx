import { Chip } from '@mui/material';
import { tokens } from '../../theme';

const toneMap = {
  active: { bg: tokens.colors.black, color: tokens.colors.white, border: tokens.colors.black },
  open: { bg: tokens.colors.black, color: tokens.colors.white, border: tokens.colors.black },
  suspended: { bg: tokens.colors.surfaceMuted, color: tokens.colors.black, border: tokens.colors.borderStrong },
  inactive: { bg: tokens.colors.surface, color: tokens.colors.muted, border: tokens.colors.borderStrong },
  draft: { bg: tokens.colors.surface, color: tokens.colors.slate, border: tokens.colors.borderStrong },
  closed: { bg: tokens.colors.surfaceMuted, color: tokens.colors.slate, border: tokens.colors.border },
  in_progress: { bg: tokens.colors.charcoal, color: tokens.colors.white, border: tokens.colors.charcoal },
  pending: { bg: tokens.colors.graphite, color: tokens.colors.white, border: tokens.colors.graphite },
  high: { bg: tokens.colors.black, color: tokens.colors.white, border: tokens.colors.black },
  medium: { bg: tokens.colors.graphite, color: tokens.colors.white, border: tokens.colors.graphite },
  low: { bg: tokens.colors.surface, color: tokens.colors.muted, border: tokens.colors.borderStrong },
};

const StatusChip = ({ status = 'active', label }) => {
  const tone = toneMap[status] || toneMap.active;
  const display = label || String(status).replace('_', ' ');

  return (
    <Chip
      size="small"
      label={display}
      sx={{
        textTransform: 'capitalize',
        backgroundColor: tone.bg,
        color: tone.color,
        border: `1px solid ${tone.border}`,
        fontWeight: 600,
      }}
    />
  );
};

export default StatusChip;
