import { isModuleEnabled } from './modulesConfig';
import { isSuperAdmin } from './roles';

/**
 * Page-level visibility rules for Super Admin portal.
 * Keys map to route/module ids.
 */
export const pageVisibility = {
  dashboard: { roles: ['super_admin'], requireAuth: true },
  companies: { roles: ['super_admin'], requireAuth: true },
  companyOnboarding: { roles: ['super_admin'], requireAuth: true },
  plans: { roles: ['super_admin'], requireAuth: true },
  featureFlags: { roles: ['super_admin'], requireAuth: true },
  awardTemplates: { roles: ['super_admin'], requireAuth: true },
  auditLogs: { roles: ['super_admin'], requireAuth: true },
  support: { roles: ['super_admin'], requireAuth: true },
  chat: { roles: ['super_admin'], requireAuth: true },
  profile: { roles: ['super_admin'], requireAuth: true },
};

export const canAccessPage = (pageId, user) => {
  if (!isModuleEnabled(pageId)) return false;

  const rule = pageVisibility[pageId];
  if (!rule) return false;

  if (rule.requireAuth && !user) return false;

  if (rule.roles?.length) {
    return rule.roles.includes(user?.role) || isSuperAdmin(user);
  }

  return true;
};
