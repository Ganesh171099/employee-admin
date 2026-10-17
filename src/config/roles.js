export const ROLES = {
  SUPER_ADMIN: 'super_admin',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
};

export const hasRole = (user, role) => {
  if (!user?.role) return false;
  return user.role === role;
};

export const isSuperAdmin = (user) => hasRole(user, ROLES.SUPER_ADMIN);
