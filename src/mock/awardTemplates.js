export const mockAwardTemplates = [
  {
    id: 'at-001',
    name: 'Wellness Streak',
    category: 'Wellness',
    points: 50,
    description: 'Awarded for completing a 7-day wellness streak.',
    status: 'active',
    icon: 'streak',
  },
  {
    id: 'at-002',
    name: 'Peer Champion',
    category: 'Recognition',
    points: 100,
    description: 'Recognizes outstanding peer support and collaboration.',
    status: 'active',
    icon: 'champion',
  },
  {
    id: 'at-003',
    name: 'Mindful Leader',
    category: 'Leadership',
    points: 150,
    description: 'For managers who promote healthy team habits.',
    status: 'active',
    icon: 'leader',
  },
  {
    id: 'at-004',
    name: 'Step Challenge Winner',
    category: 'Wellness',
    points: 200,
    description: 'Top performer in a company-wide step challenge.',
    status: 'draft',
    icon: 'steps',
  },
  {
    id: 'at-005',
    name: 'Culture Builder',
    category: 'Culture',
    points: 120,
    description: 'Celebrates employees who strengthen workplace culture.',
    status: 'active',
    icon: 'culture',
  },
];

export const awardCategories = [
  { value: 'Wellness', label: 'Wellness' },
  { value: 'Recognition', label: 'Recognition' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Culture', label: 'Culture' },
];
