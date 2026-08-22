import { mockBenutzer } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const benutzerApi = {
  getAll: async (page = 1, size = 20, search = '') => {
    await delay(300);
    let filtered = [...mockBenutzer];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(b => b.vorname.toLowerCase().includes(s) || b.nachname.toLowerCase().includes(s) || b.email.toLowerCase().includes(s));
    }
    const start = (page - 1) * size;
    const items = filtered.slice(start, start + size);
    return { data: { items, totalCount: filtered.length, toplamSayfa: Math.ceil(filtered.length / size), toplamKayit: filtered.length, sayfa: page } };
  },

  getById: async (id) => {
    await delay(200);
    const user = mockBenutzer.find(b => b.id === id) || mockBenutzer[0];
    return { data: user };
  },

  create: async (data) => {
    await delay(300);
    return { data: { id: 'usr-' + Date.now(), ...data } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { id, ...data } };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Benutzer geloescht' } };
  },

  assignRole: async (id, rolle) => {
    await delay(200);
    return { data: { id, rolle } };
  },
};
