export const mockDashboardStats = {
  totalCompanies: 6,
  activeCompanies: 4,
  suspendedCompanies: 1,
  inactiveCompanies: 1,
  totalEmployees: 3023,
  openSupportTickets: 3,
  activePlans: 3,
  featureFlags: 5,
  onboardingThisMonth: 2,
  auditEventsToday: 4,
};

export const mockRecentActivity = [
  {
    id: 'ra-1',
    title: 'Cascade Retail Group suspended',
    meta: 'Billing failure · 16 Oct',
  },
  {
    id: 'ra-2',
    title: 'Growth plan updated',
    meta: 'Max employees → 500 · 16 Oct',
  },
  {
    id: 'ra-3',
    title: 'Manager Insights enabled',
    meta: 'Helix Finance · 15 Oct',
  },
  {
    id: 'ra-4',
    title: 'Summit Manufacturing onboarded',
    meta: 'Default policies applied · 14 Oct',
  },
];

export const mockCompanyGrowth = [
  { month: 'May', count: 2 },
  { month: 'Jun', count: 3 },
  { month: 'Jul', count: 3 },
  { month: 'Aug', count: 4 },
  { month: 'Sep', count: 5 },
  { month: 'Oct', count: 6 },
];
