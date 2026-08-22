import { mockProjekte } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const projektApi = {
  getAll: async (page = 1, size = 20, search = '', kundeId = null) => {
    await delay(300);
    let filtered = [...mockProjekte];
    if (kundeId) filtered = filtered.filter(p => p.kundeId === kundeId);
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || p.kundeName.toLowerCase().includes(s));
    }
    const start = (page - 1) * size;
    const items = filtered.slice(start, start + size);
    return { data: { items, totalCount: filtered.length, toplamSayfa: Math.ceil(filtered.length / size), toplamKayit: filtered.length, sayfa: page } };
  },

  getByKunde: async (kundeId) => {
    await delay(200);
    const items = mockProjekte.filter(p => p.kundeId === kundeId);
    return { data: { items, toplamSayfa: 1, toplamKayit: items.length } };
  },

  getById: async (id) => {
    await delay(200);
    const projekt = mockProjekte.find(p => p.id === id) || mockProjekte[0];
    return { data: projekt };
  },

  create: async (data) => {
    await delay(300);
    return { data: { id: 'prj-' + Date.now(), ...data } };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { id, ...data } };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Projekt geloescht' } };
  },

  assignBenutzer: async (projektId, benutzerId) => {
    await delay(200);
    return { data: { nachricht: 'Benutzer zugewiesen' } };
  },

  removeBenutzer: async (projektId, benutzerId) => {
    await delay(200);
    return { data: { nachricht: 'Benutzer entfernt' } };
  },

  assignAnsprechpartner: async (projektId, ansprechpartnerId) => {
    await delay(200);
    return { data: { nachricht: 'Ansprechpartner zugewiesen' } };
  },

  removeAnsprechpartner: async (projektId, ansprechpartnerId) => {
    await delay(200);
    return { data: { nachricht: 'Ansprechpartner entfernt' } };
  },
};
