import { mockKunden } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const kundeApi = {
  getAll: async (page = 1, size = 20, search = '') => {
    await delay(300);
    let filtered = [...mockKunden];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(k =>
        k.unternehmen.toLowerCase().includes(s) ||
        k.nachname.toLowerCase().includes(s) ||
        k.email.toLowerCase().includes(s)
      );
    }
    const start = (page - 1) * size;
    const items = filtered.slice(start, start + size);
    return { data: { items, totalCount: filtered.length, toplamSayfa: Math.ceil(filtered.length / size), toplamKayit: filtered.length, sayfa: page } };
  },

  getById: async (id) => {
    await delay(200);
    const kunde = mockKunden.find(k => k.id === id) || mockKunden[0];
    return { data: kunde };
  },

  create: async (data) => {
    await delay(300);
    const newKunde = { id: 'knd-' + Date.now(), ...data, erstelltAm: new Date().toISOString().split('T')[0] };
    mockKunden.push(newKunde);
    return { data: newKunde };
  },

  update: async (id, data) => {
    await delay(300);
    const idx = mockKunden.findIndex(k => k.id === id);
    if (idx >= 0) mockKunden[idx] = { ...mockKunden[idx], ...data };
    return { data: mockKunden[idx] || data };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Kunde geloescht' } };
  },

  uploadLogo: async (id, file) => {
    await delay(500);
    return { data: { logoUrl: '/mock-logo.png' } };
  },
};
