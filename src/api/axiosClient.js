// =============================================
// MOCK axiosClient - No real HTTP calls (Demo Mode)
// =============================================

let _accessToken = null;

const initializeToken = () => {
  const storedToken = localStorage.getItem('accessToken');
  if (storedToken) {
    _accessToken = storedToken;
  }
};

initializeToken();

export const setAccessToken = (token) => {
  _accessToken = token ?? null;
  if (token) {
    localStorage.setItem('accessToken', token);
    window.dispatchEvent(new CustomEvent('accessTokenSet'));
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const getAccessToken = () => {
  if (!_accessToken) {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      _accessToken = storedToken;
    }
  }
  return _accessToken;
};

export const getMandantIdFromToken = () => 'mand-001';

export const getOrRefreshToken = () => Promise.resolve(_accessToken || 'demo-token');

export const API_ORIGIN = '';

export function getAvatarUrl(bild) {
  if (!bild) return null;
  return bild;
}

// Dummy axiosClient - not used in demo mode
const axiosClient = {
  get: () => Promise.resolve({ data: {} }),
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  patch: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} }),
};

axiosClient.interceptors = { request: { use: () => {} }, response: { use: () => {} } };

export default axiosClient;
