import { mockAnsprechpartner } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const ansprechpartnerApi = {
  getByKunde: async (kundeId) => {
    await delay(200);
    const items = mockAnsprechpartner.filter(a => a.kundeId === kundeId);
    return { data: items };
  },

  create: async (data) => {
    await delay(300);
    return { data: { id: 'asp-' + Date.now(), ...data } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { id, ...data } };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Ansprechpartner geloescht' } };
  },
};
