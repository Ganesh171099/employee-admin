import {
  DashboardOutlined,
  BusinessOutlined,
  RocketLaunchOutlined,
  CardMembershipOutlined,
  ToggleOnOutlined,
  EmojiEventsOutlined,
  HistoryOutlined,
  SupportAgentOutlined,
  ChatOutlined,
  PersonOutline,
} from '@mui/icons-material';

/**
 * Module release control — flip `enabled` to hide modules from nav/routes.
 */
export const modulesConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: DashboardOutlined,
    enabled: true,
    order: 1,
  },
  {
    id: 'companies',
    label: 'Companies',
    path: '/companies',
    icon: BusinessOutlined,
    enabled: true,
    order: 2,
  },
  {
    id: 'companyOnboarding',
    label: 'Onboarding',
    path: '/onboarding',
    icon: RocketLaunchOutlined,
    enabled: true,
    order: 3,
  },
  {
    id: 'plans',
    label: 'Plans',
    path: '/plans',
    icon: CardMembershipOutlined,
    enabled: true,
    order: 4,
  },
  {
    id: 'featureFlags',
    label: 'Feature Flags',
    path: '/feature-flags',
    icon: ToggleOnOutlined,
    enabled: true,
    order: 5,
  },
  {
    id: 'awardTemplates',
    label: 'Award Templates',
    path: '/award-templates',
    icon: EmojiEventsOutlined,
    enabled: true,
    order: 6,
  },
  {
    id: 'auditLogs',
    label: 'Audit Logs',
    path: '/audit-logs',
    icon: HistoryOutlined,
    enabled: true,
    order: 7,
  },
  {
    id: 'support',
    label: 'Support',
    path: '/support',
    icon: SupportAgentOutlined,
    enabled: true,
    order: 8,
  },
  {
    id: 'chat',
    label: 'Support Chat',
    path: '/chat',
    icon: ChatOutlined,
    enabled: true,
    order: 9,
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: PersonOutline,
    enabled: true,
    order: 10,
    hideFromNav: true,
  },
];

export const getEnabledModules = () =>
  modulesConfig
    .filter((module) => module.enabled)
    .sort((a, b) => a.order - b.order);

export const getNavModules = () =>
  getEnabledModules().filter((module) => !module.hideFromNav);

export const isModuleEnabled = (moduleId) =>
  modulesConfig.some((module) => module.id === moduleId && module.enabled);
