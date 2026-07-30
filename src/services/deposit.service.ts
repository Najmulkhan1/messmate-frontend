import api from '../lib/api';

export const DepositService = {
  getDeposits: async () => {
    const res = await api.get('/deposits');
    return res.data.data;
  },
  addDeposit: async (data: any) => {
    const res = await api.post('/deposits', data);
    return res.data;
  },
};
