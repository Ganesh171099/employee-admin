export const mockFeatureFlags = [
  {
    id: 'ff-wellness-challenges',
    key: 'wellness_challenges',
    name: 'Wellness Challenges',
    description: 'Enable company wellness challenge campaigns.',
    defaultEnabled: true,
    companyOverrides: {
      'co-001': true,
      'co-003': false,
    },
  },
  {
    id: 'ff-peer-awards',
    key: 'peer_awards',
    name: 'Peer Awards',
    description: 'Allow employees to nominate peers for awards.',
    defaultEnabled: true,
    companyOverrides: {
      'co-005': false,
    },
  },
  {
    id: 'ff-manager-insights',
    key: 'manager_insights',
    name: 'Manager Insights',
    description: 'Show wellness insights dashboards for managers.',
    defaultEnabled: false,
    companyOverrides: {
      'co-001': true,
      'co-004': true,
    },
  },
  {
    id: 'ff-sso',
    key: 'sso_login',
    name: 'SSO Login',
    description: 'Enterprise single sign-on authentication.',
    defaultEnabled: false,
    companyOverrides: {
      'co-001': true,
      'co-004': true,
    },
  },
  {
    id: 'ff-mobile-checkins',
    key: 'mobile_checkins',
    name: 'Mobile Check-ins',
    description: 'Daily wellness check-ins via mobile app.',
    defaultEnabled: true,
    companyOverrides: {},
  },
];
