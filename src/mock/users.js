import { ROLES } from '../config/roles';

export const demoCredentials = {
  email: 'superadmin@demo.com',
  password: 'Demo@123',
};

export const mockSuperAdmin = {
  id: 'sa-001',
  name: 'Avery Morgan',
  email: demoCredentials.email,
  role: ROLES.SUPER_ADMIN,
  title: 'Platform Super Admin',
  avatarInitials: 'AM',
  phone: '+1 (415) 555-0142',
  timezone: 'America/Los_Angeles',
  lastLoginAt: '2026-10-17T08:12:00.000Z',
};
