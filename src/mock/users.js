import { ROLES } from '../config/roles';

export const demoCredentials = {
  email: 'superadmin@demo.com',
  password: 'Demo@123',
};

export const mockSuperAdmin = {
  id: 'sa-001',
  name: 'Mark',
  email: demoCredentials.email,
  role: ROLES.SUPER_ADMIN,
  title: 'Platform Super Admin',
  avatarInitials: 'M',
  phone: '+91 98765 43210',
  timezone: 'America/Los_Angeles',
  lastLoginAt: '2026-10-17T08:12:00.000Z',
};
