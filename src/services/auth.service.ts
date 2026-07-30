import api from '../lib/api';

export const AuthService = {
  login: async (data: any) => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },
  register: async (data: any) => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },
  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },
};
