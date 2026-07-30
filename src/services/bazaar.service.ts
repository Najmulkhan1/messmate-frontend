import api from '../lib/api';

export const BazaarService = {
  getBazaars: async (page: number = 1, limit: number = 10) => {
    const res = await api.get(`/bazaars?page=${page}&limit=${limit}`);
    return res.data.data;
  },
  addBazaar: async (data: any) => {
    const res = await api.post('/bazaars', data);
    return res.data;
  },
};
