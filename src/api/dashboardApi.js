import { mockDashboard } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const dashboardApi = {
  getStats: async () => {
    await delay(400);
    return { data: mockDashboard };
  },
};
