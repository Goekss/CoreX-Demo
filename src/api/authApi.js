import { mockUser } from '../mock/mockData';

// Fake JWT token generator (not real, just for demo)
function generateFakeJwt() {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: mockUser.id,
    email: mockUser.email,
    vorname: mockUser.vorname,
    nachname: mockUser.nachname,
    rolle: mockUser.rolle,
    MandantId: mockUser.mandantId,
    exp: Math.floor(Date.now() / 1000) + 3600,
  }));
  const sig = btoa('demo-signature');
  return header + '.' + payload + '.' + sig;
}

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const authApi = {
  login: async (email, passwort) => {
    await delay(500);
    return { data: { nachricht: 'Verifizierungscode gesendet', email } };
  },

  verifyCode: async (email, code) => {
    await delay(400);
    const token = generateFakeJwt();
    return {
      data: {
        accessToken: token,
        token: token,
        ...mockUser,
        email: email || mockUser.email,
      }
    };
  },

  refresh: async () => {
    await delay(200);
    const token = generateFakeJwt();
    return { data: { accessToken: token, token } };
  },

  me: async () => {
    await delay(200);
    return { data: { ...mockUser } };
  },

  logout: async () => {
    await delay(100);
    return { data: { nachricht: 'Erfolgreich abgemeldet' } };
  },

  getLockedUsers: async () => {
    await delay(200);
    return { data: [] };
  },

  unlockUser: async (email) => {
    await delay(200);
    return { data: { nachricht: 'Benutzer entsperrt' } };
  },

  lockUser: async (email) => {
    await delay(200);
    return { data: { nachricht: 'Benutzer gesperrt', email } };
  },
};
