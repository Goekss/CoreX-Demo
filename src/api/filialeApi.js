import { mockFilialen } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const filialeApi = {
  getAll: async (page = 1, pageSize = 10) => {
    await delay(300);
    const start = (page - 1) * pageSize;
    const items = mockFilialen.slice(start, start + pageSize);
    return { data: { items, totalCount: mockFilialen.length, toplamSayfa: Math.ceil(mockFilialen.length / pageSize), toplamKayit: mockFilialen.length } };
  },

  getByKunde: async (kundeId) => {
    await delay(200);
    const items = mockFilialen.filter(f => f.kundeId === kundeId);
    return { data: items };
  },

  getById: async (id) => {
    await delay(200);
    const filiale = mockFilialen.find(f => f.id === id) || mockFilialen[0];
    return { data: filiale };
  },

  create: async (data) => {
    await delay(300);
    return { data: { id: 'fil-' + Date.now(), ...data } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { id, ...data } };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Filiale geloescht' } };
  },
};
