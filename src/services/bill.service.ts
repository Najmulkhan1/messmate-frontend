import api from '../lib/api';

export const BillService = {
  getBills: async () => {
    const res = await api.get('/bills');
    return res.data.data;
  },
};
