import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PremiumLoader from './components/common/premiumLoader';
import ProtectedRoute from './components/common/protectedRoute';
import { setSnackbarRef } from './components/common/notify';
import AppLayout from './components/layout/appLayout';
import { isModuleEnabled } from './config/modulesConfig';
import LoginPage from './modules/auth/loginPage';
import AuditLogsPage from './modules/auditLogs/auditLogsPage';
import AwardTemplatesPage from './modules/awardTemplates/awardTemplatesPage';
import ChatPage from './modules/chat/chatPage';
import CompaniesPage from './modules/companies/companiesPage';
import OnboardingWizard from './modules/companyOnboarding/onboardingWizard';
import DashboardPage from './modules/dashboard/dashboardPage';
import FeatureFlagsPage from './modules/featureFlags/featureFlagsPage';
import PlansPage from './modules/plans/plansPage';
import ProfilePage from './modules/profile/profilePage';
import SupportPage from './modules/support/supportPage';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import {
  selectAuthBootstrapped,
  selectIsAuthenticated,
} from './redux/selectors/authSelectors';
import { bootstrapAuth } from './redux/slices/authSlice';
import theme from './theme';

const SnackbarBridge = () => {
  const snackbar = useSnackbar();
  useEffect(() => {
    setSnackbarRef(snackbar);
  }, [snackbar]);
  return null;
};

const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const bootstrapped = useAppSelector(selectAuthBootstrapped);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(bootstrapAuth());
  }, [dispatch]);

  if (!bootstrapped) {
    return <PremiumLoader label="Preparing Super Admin console" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        {isModuleEnabled('dashboard') && (
          <Route path="/dashboard" element={<DashboardPage />} />
        )}
        {isModuleEnabled('companies') && (
          <Route path="/companies" element={<CompaniesPage />} />
        )}
        {isModuleEnabled('companyOnboarding') && (
          <Route path="/onboarding" element={<OnboardingWizard />} />
        )}
        {isModuleEnabled('plans') && (
          <Route path="/plans" element={<PlansPage />} />
        )}
        {isModuleEnabled('featureFlags') && (
          <Route path="/feature-flags" element={<FeatureFlagsPage />} />
        )}
        {isModuleEnabled('awardTemplates') && (
          <Route path="/award-templates" element={<AwardTemplatesPage />} />
        )}
        {isModuleEnabled('auditLogs') && (
          <Route path="/audit-logs" element={<AuditLogsPage />} />
        )}
        {isModuleEnabled('support') && (
          <Route path="/support" element={<SupportPage />} />
        )}
        {isModuleEnabled('chat') && (
          <Route path="/chat" element={<ChatPage />} />
        )}
        {isModuleEnabled('profile') && (
          <Route path="/profile" element={<ProfilePage />} />
        )}
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
        }
      />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3200}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <SnackbarBridge />
      <AppRoutes />
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
