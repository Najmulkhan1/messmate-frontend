import api from '../lib/api';

export const MessService = {
  getAvailable: async (filters?: {
    division?: string;
    district?: string;
    subDistrict?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.division) params.set('division', filters.division);
    if (filters?.district) params.set('district', filters.district);
    if (filters?.subDistrict) params.set('subDistrict', filters.subDistrict);
    if (filters?.search) params.set('search', filters.search);
    const qs = params.toString();
    const res = await api.get(`/mess/available${qs ? `?${qs}` : ''}`);
    return res.data.data?.messes || res.data.messes || [];
  },
  create: async (data: {
    name: string;
    description?: string;
    division?: string;
    district?: string;
    subDistrict?: string;
  }) => {
    const res = await api.post('/mess', data);
    return res.data;
  },
  sendJoinRequest: async (messId: string) => {
    const res = await api.post('/join-requests', { messId });
    return res.data;
  },
  getPendingRequests: async () => {
    const res = await api.get('/join-requests/pending');
    return res.data.data?.requests || res.data.requests || [];
  },
  acceptRequest: async (requestId: string) => {
    const res = await api.patch(`/join-requests/${requestId}/accept`);
    return res.data;
  },
  rejectRequest: async (requestId: string) => {
    const res = await api.patch(`/join-requests/${requestId}/reject`);
    return res.data;
  },
};
