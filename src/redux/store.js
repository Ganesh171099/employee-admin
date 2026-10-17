import { configureStore } from '@reduxjs/toolkit';
import auditLogsReducer from './slices/auditLogsSlice';
import authReducer from './slices/authSlice';
import awardTemplatesReducer from './slices/awardTemplatesSlice';
import chatReducer from './slices/chatSlice';
import companiesReducer from './slices/companiesSlice';
import dashboardReducer from './slices/dashboardSlice';
import featureFlagsReducer from './slices/featureFlagsSlice';
import plansReducer from './slices/plansSlice';
import supportReducer from './slices/supportSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    dashboard: dashboardReducer,
    companies: companiesReducer,
    plans: plansReducer,
    featureFlags: featureFlagsReducer,
    awardTemplates: awardTemplatesReducer,
    auditLogs: auditLogsReducer,
    support: supportReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
