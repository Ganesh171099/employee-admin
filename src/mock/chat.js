export const mockChatThreads = [
  {
    id: 'thread-001',
    companyName: 'Northstar Health',
    subject: 'Award template rollout',
    status: 'open',
    unread: 2,
    messages: [
      {
        id: 'msg-001',
        sender: 'ops@northstar.health',
        role: 'company_admin',
        body: 'Can we enable the Culture Builder template for our managers?',
        createdAt: '2026-10-17T07:10:00.000Z',
      },
      {
        id: 'msg-002',
        sender: 'Avery Morgan',
        role: 'super_admin',
        body: 'Yes — I can publish it to your tenant today. Any custom points?',
        createdAt: '2026-10-17T07:22:00.000Z',
      },
      {
        id: 'msg-003',
        sender: 'ops@northstar.health',
        role: 'company_admin',
        body: '120 points is perfect. Thanks!',
        createdAt: '2026-10-17T07:30:00.000Z',
      },
    ],
  },
  {
    id: 'thread-002',
    companyName: 'Cascade Retail Group',
    subject: 'Account reactivation request',
    status: 'pending',
    unread: 1,
    messages: [
      {
        id: 'msg-010',
        sender: 'hr@cascaderetail.com',
        role: 'company_admin',
        body: 'We resolved billing. Please lift the suspension.',
        createdAt: '2026-10-17T08:05:00.000Z',
      },
    ],
  },
  {
    id: 'thread-003',
    companyName: 'Brightline Logistics',
    subject: 'Feature flag clarification',
    status: 'open',
    unread: 0,
    messages: [
      {
        id: 'msg-020',
        sender: 'admin@brightline.io',
        role: 'company_admin',
        body: 'Is Manager Insights included in Growth?',
        createdAt: '2026-10-16T15:00:00.000Z',
      },
      {
        id: 'msg-021',
        sender: 'Avery Morgan',
        role: 'super_admin',
        body: 'Not by default — I can enable it as an override for your company.',
        createdAt: '2026-10-16T15:18:00.000Z',
      },
    ],
  },
];
