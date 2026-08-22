import { mockAbonnements, mockPlaene } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const abonnementApi = {
  getAll: async (page = 1, size = 20) => {
    await delay(300);
    const start = (page - 1) * size;
    const items = mockAbonnements.slice(start, start + size);
    return { data: { items, totalCount: mockAbonnements.length, toplamSayfa: Math.ceil(mockAbonnements.length / size), toplamKayit: mockAbonnements.length, sayfa: page } };
  },

  getById: async (id) => {
    await delay(200);
    const abo = mockAbonnements.find(a => a.id === id) || mockAbonnements[0];
    return { data: abo };
  },

  create: async (data) => {
    await delay(300);
    return { data: { id: 'abo-' + Date.now(), ...data } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { id, ...data } };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Abonnement geloescht' } };
  },

  getPlaene: async () => {
    await delay(200);
    return { data: mockPlaene };
  },
};
