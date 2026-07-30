import api from '../lib/api';

export const MemberService = {
  getMembers: async () => {
    const res = await api.get('/members');
    return res.data.data.members;
  },
  addMember: async (data: { name: string; email: string; phone?: string; role?: string }) => {
    const res = await api.post('/members', data);
    return res.data;
  },
};
