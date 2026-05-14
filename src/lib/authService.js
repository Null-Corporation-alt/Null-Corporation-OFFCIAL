
function generateUsername(email) {
  const base = email.split('@')[0];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${base}_${num}`;
}

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&';
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const STORAGE_KEY = 'null_corp_users';
const SESSION_KEY = 'null_corp_session';

export const authService = {
  getUsers: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  saveUser: (user) => {
    const users = authService.getUsers();
    users[user.email] = user;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  register: (email) => {
    const users = authService.getUsers();
    if (users[email]) {
      throw new Error('El usuario ya existe');
    }

    const password = generatePassword();
    const newUser = {
      email,
      password,
      username: generateUsername(email),
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${email}`,
      createdAt: new Date().toISOString(),
    };

    authService.saveUser(newUser);
    return { email, password, username: newUser.username };
  },

  login: (email, password) => {
    const users = authService.getUsers();
    const user = users[email];

    if (!user || user.password !== password) {
      throw new Error('Credenciales inválidas');
    }

    if (user.banned) {
      throw new Error('Tu cuenta ha sido suspendida por un administrador.');
    }

    const session = { ...user };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession: () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  updateProfile: (email, data) => {
    const users = authService.getUsers();
    const user = users[email];
    if (!user) throw new Error('Usuario no encontrado');

    const updatedUser = { ...user, ...data };
    authService.saveUser(updatedUser);
    
    // Update active session if it's the same user
    const currentSession = authService.getSession();
    if (currentSession && currentSession.email === email) {
      const newSession = { ...updatedUser };
      delete newSession.password;
      localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    }

    return updatedUser;
  },

  getUsersList: () => {
    const users = authService.getUsers();
    // Return array without passwords
    return Object.values(users).map(({ password, ...rest }) => rest);
  },

  banUser: (email) => {
    const users = authService.getUsers();
    if (!users[email]) throw new Error('Usuario no encontrado');
    users[email].banned = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    // If the banned user is currently logged in, invalidate their session
    const session = authService.getSession();
    if (session && session.email === email) {
      authService.logout();
    }
  },

  unbanUser: (email) => {
    const users = authService.getUsers();
    if (!users[email]) throw new Error('Usuario no encontrado');
    users[email].banned = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  generateResetToken: (email) => {
    const users = authService.getUsers();
    if (!users[email]) {
      throw new Error('No existe una cuenta asociada a este correo.');
    }
    // Generate a random token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    users[email].resetToken = token;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return token;
  },

  resetPassword: (token, newPassword) => {
    const users = authService.getUsers();
    let foundEmail = null;
    
    // Find user with this token
    for (const email in users) {
      if (users[email].resetToken === token) {
        foundEmail = email;
        break;
      }
    }

    if (!foundEmail) {
      throw new Error('El enlace de recuperación es inválido o ha expirado.');
    }

    users[foundEmail].password = newPassword;
    delete users[foundEmail].resetToken;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
};
