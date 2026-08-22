import { mockZahlungen } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const zahlungApi = {
  getAll: async (page = 1, size = 20) => {
    await delay(300);
    const start = (page - 1) * size;
    const items = mockZahlungen.slice(start, start + size);
    return { data: { items, totalCount: mockZahlungen.length, toplamSayfa: Math.ceil(mockZahlungen.length / size), toplamKayit: mockZahlungen.length, sayfa: page } };
  },

  getById: async (id) => {
    await delay(200);
    const zahlung = mockZahlungen.find(z => z.id === id) || mockZahlungen[0];
    return { data: zahlung };
  },

  create: async (data) => {
    await delay(300);
    return { data: { id: 'zhl-' + Date.now(), ...data } };
  },

  updateStatus: async (id, status) => {
    await delay(200);
    return { data: { id, status } };
  },
};
