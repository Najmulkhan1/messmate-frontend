import api from '../lib/api';

export const DashboardService = {
  getSummary: async () => {
    const res = await api.get('/dashboard/summary');
    return res.data.data;
  },
};
