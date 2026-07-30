import api from '../lib/api';

function buildQuery(params?: Record<string, any>): string {
  if (!params) return '';
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return qs ? `?${qs}` : '';
}

export const AdminService = {
  getUsers: async (params?: { page?: number; limit?: number; search?: string }) => {
    const res = await api.get(`/admin/users${buildQuery(params)}`);
    return res.data;
  },
  getMesses: async (params?: { page?: number; limit?: number; search?: string }) => {
    const res = await api.get(`/admin/messes${buildQuery(params)}`);
    return res.data;
  },
  deleteUser: async (userId: string) => {
    const res = await api.delete(`/admin/users/${userId}`);
    return res.data;
  },
  getStats: async () => {
    const res = await api.get('/admin/stats');
    return res.data;
  },
  promoteToAdmin: async (userId: string) => {
    const res = await api.patch(`/admin/users/${userId}/promote`);
    return res.data;
  },
};
