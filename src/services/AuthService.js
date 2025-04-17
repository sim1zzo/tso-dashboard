export class AuthService {
  constructor() {
    this.tokenKey = 'auth_token';
    this.expirationKey = 'auth_expiration';
  }

  async login(username, password, twoFactorCode) {
    try {
      // Simula una chiamata API per l'autenticazione
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (username === 'si.izzo@reply.it' && password === 'password') {
            resolve({ success: true, token: 'fake_jwt_token' });
          } else {
            resolve({ success: false, error: 'Invalid credentials' });
          }
        }, 1000);
      });

      if (response.success) {
        const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minuti da ora
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.expirationKey, expirationTime.toString());
        return { success: true, user: { username, roles: ['Administrator'] } };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      return { success: false, error: 'Errore di autenticazione' };
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
  }

  isAuthenticated() {
    const token = localStorage.getItem(this.tokenKey);
    const expiration = localStorage.getItem(this.expirationKey);

    if (!token || !expiration) {
      return false;
    }

    if (new Date().getTime() > parseInt(expiration)) {
      this.logout(); // Rimuove il token scaduto
      return false;
    }

    return true;
  }

  getCurrentUser() {
    if (this.isAuthenticated()) {
      // In un'implementazione reale, decodificheresti il token JWT qui
      return { username: 'admin', roles: ['Administrator'] };
    }
    return null;
  }

  isAuthorized(requiredRole) {
    const user = this.getCurrentUser();
    return (
      user &&
      (user.roles.includes(requiredRole) ||
        user.roles.includes('Administrator'))
    );
  }
}
