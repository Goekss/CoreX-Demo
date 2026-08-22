import { mockTickets, mockTicketNachrichten } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const ticketApi = {
  getAll: async (page = 1, size = 20, search = '', status = '') => {
    await delay(300);
    let filtered = [...mockTickets];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(t => t.titel.toLowerCase().includes(s) || t.kundeName.toLowerCase().includes(s));
    }
    if (status) filtered = filtered.filter(t => t.status === status);
    const start = (page - 1) * size;
    const items = filtered.slice(start, start + size);
    return { data: { items, totalCount: filtered.length, toplamSayfa: Math.ceil(filtered.length / size), toplamKayit: filtered.length, sayfa: page } };
  },

  getById: async (id) => {
    await delay(200);
    const ticket = mockTickets.find(t => t.id === id) || mockTickets[0];
    return { data: ticket };
  },

  create: async (data) => {
    await delay(300);
    const newTicket = { id: 'tkt-' + Date.now(), ...data, erstelltAm: new Date().toISOString(), status: 'Offen' };
    return { data: newTicket };
  },

  update: async (id, data) => {
    await delay(300);
    return { data: { id, ...data } };
  },

  delete: async (id) => {
    await delay(200);
    return { data: { nachricht: 'Ticket geloescht' } };
  },

  updateStatus: async (id, status) => {
    await delay(200);
    return { data: { id, status } };
  },

  getNachrichten: async (ticketId) => {
    await delay(200);
    const msgs = mockTicketNachrichten.filter(m => m.ticketId === ticketId);
    return { data: msgs };
  },

  addNachricht: async (data) => {
    await delay(300);
    const newMsg = { id: 'tn-' + Date.now(), ...data, erstelltAm: new Date().toISOString(), absenderName: 'Max Mustermann' };
    return { data: newMsg };
  },
};
