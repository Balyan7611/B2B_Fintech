// ── Credential Generation ──────────────────────────────
export const generateAdminId = (mobile) => {
  const suffix = mobile?.slice(-4) || Math.floor(1000 + Math.random() * 9000);
  const prefix = 'BSS';
  return `${prefix}${suffix}`;
};

export const generatePassword = (fullName) => {
  const namePart = (fullName || 'User').replace(/\s/g, '').slice(0, 3).toUpperCase();
  const digits = Math.floor(1000 + Math.random() * 9000);
  const special = ['@', '#', '$'][Math.floor(Math.random() * 3)];
  return `${namePart}${special}${digits}`;
};

// ── localStorage Helpers ───────────────────────────────
const USERS_KEY = 'bss_registered_users';
const SESSION_KEY = 'bss_current_session';

export const saveUser = (userData) => {
  const existing = getAllUsers();
  // Avoid duplicate by mobile
  const filtered = existing.filter((u) => u.mobile !== userData.mobile);
  filtered.push({ ...userData, registeredAt: new Date().toISOString() });
  localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
};

export const getAllUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const findUserByCredentials = (adminId, password) => {
  // Hardcoded default user
  if (adminId.toLowerCase().trim() === 'admin@gmail.com' && password === 'surender@001') {
    return { adminId: 'admin@gmail.com', fullName: 'Super Admin', mobile: '9999999999' };
  }

  const users = getAllUsers();
  return users.find(
    (u) =>
      u.adminId.toLowerCase() === adminId.toLowerCase().trim() &&
      u.password === password.trim()
  ) || null;
};

export const saveSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ adminId: user.adminId, name: user.fullName, loggedInAt: new Date().toISOString() }));
};

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};