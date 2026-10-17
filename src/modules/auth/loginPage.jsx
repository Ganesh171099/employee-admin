import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AppLogo from '../../components/common/appLogo';
import { notifyError, notifySuccess } from '../../components/common/notify';
import AppTextField from '../../components/form/appTextField';
import { demoCredentials } from '../../mock/users';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectAuthStatus,
  selectIsAuthenticated,
} from '../../redux/selectors/authSelectors';
import { clearAuthError, login } from '../../redux/slices/authSlice';
import { tokens } from '../../theme';
import { loginSchema } from '../../validations/authSchema';

const MotionPaper = motion.create(Paper);

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />;
  }

  const validateField = async (name, value) => {
    try {
      await loginSchema.validateAt(name, { ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const fillDemo = () => {
    setForm({ ...demoCredentials });
    setErrors({});
    dispatch(clearAuthError());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginSchema.validate(form, { abortEarly: false });
      setErrors({});
      const result = await dispatch(login(form));
      if (login.fulfilled.match(result)) {
        notifySuccess('Welcome back');
        navigate('/dashboard');
      } else {
        notifyError(result.payload || 'Login failed');
      }
    } catch (err) {
      const next = {};
      err.inner?.forEach((item) => {
        if (item.path && !next[item.path]) next[item.path] = item.message;
      });
      setErrors(next);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
        background: `
          linear-gradient(135deg, ${tokens.colors.black} 0%, ${tokens.colors.charcoal} 48%, ${tokens.colors.graphite} 100%)
        `,
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 6,
          color: tokens.colors.white,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 35%),
              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05), transparent 40%)
            `,
          }}
        />
        <Box sx={{ position: 'relative' }}>
          <AppLogo invert />
        </Box>
        <Box sx={{ position: 'relative', maxWidth: 460 }}>
          <Typography variant="h2" sx={{ color: 'inherit', mb: 2 }}>
            Govern every company from one console.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.72)' }}>
            Super Admin tools for onboarding, plans, feature flags, awards, and platform-wide
            audit control — built for multi-tenant wellness operations.
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ position: 'relative', color: 'rgba(255,255,255,0.5)' }}>
          Employee Management & Wellness Platform
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2.5, md: 4 },
          background: `
            linear-gradient(180deg, ${tokens.colors.surfaceAlt} 0%, ${tokens.colors.surface} 100%)
          `,
        }}
      >
        <MotionPaper
          elevation={0}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          sx={{
            width: '100%',
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
            border: `1px solid ${tokens.colors.border}`,
            boxShadow: tokens.shadows.medium,
          }}
        >
          <Stack spacing={0.5} sx={{ mb: 3 }}>
            <Box sx={{ display: { md: 'none' }, mb: 1 }}>
              <AppLogo />
            </Box>
            <Typography variant="h3">Sign in</Typography>
            <Typography variant="body2" color="text.secondary">
              Use your Super Admin credentials to access the platform console.
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <AppTextField
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              autoComplete="username"
            />
            <AppTextField
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              autoComplete="current-password"
            />

            <Stack spacing={1.25} sx={{ mt: 1 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Signing in…' : 'Sign in'}
              </Button>
              <Button type="button" variant="outlined" onClick={fillDemo}>
                Fill demo credentials
              </Button>
            </Stack>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2.5 }}>
            Demo fill only — you still submit manually.
          </Typography>
        </MotionPaper>
      </Box>
    </Box>
  );
};

export default LoginPage;
