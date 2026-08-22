import { mockChatRaeume, mockChatNachrichten } from '../mock/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const chatApi = {
  getRaeume: async () => {
    await delay(300);
    return { data: mockChatRaeume };
  },

  getNachrichten: async (raumId, page = 1, size = 50) => {
    await delay(200);
    const msgs = mockChatNachrichten.filter(m => m.raumId === raumId);
    return { data: { items: msgs, toplamSayfa: 1, toplamKayit: msgs.length } };
  },

  getOrCreateDirektChat: async (zielBenutzerId) => {
    await delay(200);
    return { data: { id: 'room-003', name: 'Direktchat', typ: 'Direkt' } };
  },

  updateNachricht: async (nachrichtId, inhalt) => {
    await delay(200);
    return { data: { id: nachrichtId, inhalt } };
  },

  deleteNachricht: async (nachrichtId) => {
    await delay(200);
    return { data: { nachricht: 'Nachricht geloescht' } };
  },

  addReaktion: async (nachrichtId, emoji) => {
    await delay(100);
    return { data: { nachrichtId, emoji } };
  },
};
