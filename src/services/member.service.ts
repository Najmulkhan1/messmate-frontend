import api from '../lib/api';

export const MemberService = {
  getMembers: async () => {
    const res = await api.get('/members');
    return res.data.data.members;
  },
};
