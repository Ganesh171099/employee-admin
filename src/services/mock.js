import { mockAuditLogs } from '../mock/auditLogs';
import { mockAwardTemplates } from '../mock/awardTemplates';
import { mockChatThreads } from '../mock/chat';
import { mockCompanies } from '../mock/companies';
import {
  mockCompanyGrowth,
  mockDashboardStats,
  mockRecentActivity,
} from '../mock/dashboard';
import { mockFeatureFlags } from '../mock/featureFlags';
import { mockPlans } from '../mock/plans';
import { mockSupportTickets } from '../mock/support';
import { demoCredentials, mockSuperAdmin } from '../mock/users';

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

const clone = (value) => JSON.parse(JSON.stringify(value));

let companies = clone(mockCompanies);
let plans = clone(mockPlans);
let featureFlags = clone(mockFeatureFlags);
let awardTemplates = clone(mockAwardTemplates);
let auditLogs = clone(mockAuditLogs);
let supportTickets = clone(mockSupportTickets);
let chatThreads = clone(mockChatThreads);

export const mockApi = {
  async login({ email, password }) {
    await delay();
    if (
      email?.toLowerCase() === demoCredentials.email &&
      password === demoCredentials.password
    ) {
      return {
        token: 'mock-super-admin-token',
        user: clone(mockSuperAdmin),
      };
    }
    const error = new Error('Invalid email or password');
    error.code = 'AUTH_INVALID';
    throw error;
  },

  async getSession() {
    await delay(200);
    const token = localStorage.getItem('admin_access_token');
    const rawUser = localStorage.getItem('admin_user');
    if (!token || !rawUser) return null;
    return { token, user: JSON.parse(rawUser) };
  },

  async getDashboard() {
    await delay();
    return {
      stats: {
        ...mockDashboardStats,
        totalCompanies: companies.length,
        activeCompanies: companies.filter((c) => c.status === 'active').length,
        suspendedCompanies: companies.filter((c) => c.status === 'suspended').length,
        inactiveCompanies: companies.filter((c) => c.status === 'inactive').length,
        totalEmployees: companies.reduce((sum, c) => sum + (c.employees || 0), 0),
      },
      recentActivity: clone(mockRecentActivity),
      companyGrowth: clone(mockCompanyGrowth),
    };
  },

  async getCompanies() {
    await delay();
    return clone(companies);
  },

  async createCompany(payload) {
    await delay();
    const company = {
      id: `co-${Date.now()}`,
      admins: 1,
      createdAt: new Date().toISOString(),
      ...payload,
    };
    companies = [company, ...companies];
    return clone(company);
  },

  async updateCompany(id, payload) {
    await delay();
    companies = companies.map((c) => (c.id === id ? { ...c, ...payload } : c));
    return clone(companies.find((c) => c.id === id));
  },

  async setCompanyStatus(id, status) {
    return this.updateCompany(id, { status });
  },

  async getPlans() {
    await delay();
    return clone(plans);
  },

  async updatePlan(id, payload) {
    await delay();
    plans = plans.map((p) => (p.id === id ? { ...p, ...payload } : p));
    return clone(plans.find((p) => p.id === id));
  },

  async createPlan(payload) {
    await delay();
    const plan = { id: `plan-${Date.now()}`, ...payload };
    plans = [plan, ...plans];
    return clone(plan);
  },

  async getFeatureFlags() {
    await delay();
    return clone(featureFlags);
  },

  async updateFeatureFlag(id, payload) {
    await delay();
    featureFlags = featureFlags.map((f) => (f.id === id ? { ...f, ...payload } : f));
    return clone(featureFlags.find((f) => f.id === id));
  },

  async getAwardTemplates() {
    await delay();
    return clone(awardTemplates);
  },

  async createAwardTemplate(payload) {
    await delay();
    const template = { id: `at-${Date.now()}`, icon: 'custom', ...payload };
    awardTemplates = [template, ...awardTemplates];
    return clone(template);
  },

  async updateAwardTemplate(id, payload) {
    await delay();
    awardTemplates = awardTemplates.map((t) =>
      t.id === id ? { ...t, ...payload } : t,
    );
    return clone(awardTemplates.find((t) => t.id === id));
  },

  async getAuditLogs() {
    await delay();
    return clone(auditLogs);
  },

  async getSupportTickets() {
    await delay();
    return clone(supportTickets);
  },

  async updateSupportTicket(id, payload) {
    await delay();
    supportTickets = supportTickets.map((t) =>
      t.id === id ? { ...t, ...payload, updatedAt: new Date().toISOString() } : t,
    );
    return clone(supportTickets.find((t) => t.id === id));
  },

  async getChatThreads() {
    await delay();
    return clone(chatThreads);
  },

  async sendChatMessage(threadId, body, sender) {
    await delay(250);
    const message = {
      id: `msg-${Date.now()}`,
      sender,
      role: 'super_admin',
      body,
      createdAt: new Date().toISOString(),
    };
    chatThreads = chatThreads.map((thread) =>
      thread.id === threadId
        ? {
            ...thread,
            unread: 0,
            messages: [...thread.messages, message],
          }
        : thread,
    );
    return clone(message);
  },

  async onboardCompany(payload) {
    await delay(700);
    const company = {
      id: `co-${Date.now()}`,
      name: payload.name,
      domain: payload.domain,
      industry: payload.industry,
      country: payload.country,
      planId: payload.planId,
      status: 'active',
      employees: 1,
      admins: 1,
      contactEmail: payload.adminEmail,
      createdAt: new Date().toISOString(),
    };
    companies = [company, ...companies];
    auditLogs = [
      {
        id: `al-${Date.now()}`,
        action: 'company.onboarded',
        actor: mockSuperAdmin.name,
        actorEmail: mockSuperAdmin.email,
        target: company.name,
        targetType: 'company',
        details: `Onboarded with admin ${payload.adminEmail}`,
        createdAt: new Date().toISOString(),
        ip: '127.0.0.1',
      },
      ...auditLogs,
    ];
    return {
      company: clone(company),
      inviteLink: `https://app.wellness.platform/invite/${company.id}`,
    };
  },
};
