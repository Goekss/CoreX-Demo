import { mockBerichte } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const berichtApi = {
  getAll: async (page = 1, size = 20) => {
    await delay(300);
    const start = (page - 1) * size;
    const items = mockBerichte.slice(start, start + size);
    return { data: { items, totalCount: mockBerichte.length, toplamSayfa: Math.ceil(mockBerichte.length / size), toplamKayit: mockBerichte.length, sayfa: page } };
  },

  upload: async (entityType, entityId, file, titel, version) => {
    await delay(500);
    return { data: { id: 'ber-' + Date.now(), titel: titel || file.name, entityType, entityId, version: version || '1.0' } };
  },

  download: async (id) => {
    await delay(300);
    // Return a mock blob
    const blob = new Blob(['Demo-Datei Inhalt'], { type: 'application/pdf' });
    return { data: blob };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Bericht geloescht' } };
  },
};
