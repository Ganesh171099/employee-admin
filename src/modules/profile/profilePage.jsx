import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import ModuleGate from '../../components/common/moduleGate';
import { notifySuccess } from '../../components/common/notify';
import PageHeader from '../../components/common/pageHeader';
import AppTextField from '../../components/form/appTextField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAuthUser } from '../../redux/selectors/authSelectors';
import { updateProfile } from '../../redux/slices/authSlice';
import { tokens } from '../../theme';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    title: user?.title || '',
    timezone: user?.timezone || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    dispatch(updateProfile(form));
    notifySuccess('Profile updated');
  };

  return (
    <ModuleGate moduleId="profile">
      <PageHeader
        title="Profile"
        subtitle="Your Super Admin identity on the platform console."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
          gap: 2,
        }}
      >
        <Paper elevation={0} sx={{ p: 3, border: `1px solid ${tokens.colors.border}` }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {user?.email}
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>Role:</strong> Super Admin
            </Typography>
            <Typography variant="body2">
              <strong>Title:</strong> {user?.title}
            </Typography>
            <Typography variant="body2">
              <strong>Last login:</strong>{' '}
              {user?.lastLoginAt
                ? dayjs(user.lastLoginAt).format('DD MMM YYYY, HH:mm')
                : '—'}
            </Typography>
          </Stack>
        </Paper>

        <Paper
          component="form"
          onSubmit={handleSave}
          elevation={0}
          sx={{ p: 3, border: `1px solid ${tokens.colors.border}` }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Edit details
          </Typography>
          <AppTextField name="name" label="Name" value={form.name} onChange={handleChange} />
          <AppTextField name="title" label="Title" value={form.title} onChange={handleChange} />
          <AppTextField name="phone" label="Phone" value={form.phone} onChange={handleChange} />
          <AppTextField
            name="timezone"
            label="Timezone"
            value={form.timezone}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Save profile
          </Button>
        </Paper>
      </Box>
    </ModuleGate>
  );
};

export default ProfilePage;
