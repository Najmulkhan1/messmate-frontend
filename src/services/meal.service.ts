import api from '../lib/api';

export const MealService = {
  getMeals: async (page: number = 1, limit: number = 10) => {
    const res = await api.get(`/meals?page=${page}&limit=${limit}`);
    return res.data.data;
  },
  toggleMeal: async (mealId: string) => {
    const res = await api.patch(`/meals/${mealId}/toggle`);
    return res.data;
  },
};
