export class AuthService {
  constructor() {
    this.tokenKey = 'auth_token';
    this.expirationKey = 'auth_expiration';
    this.userRoleKey = 'auth_user_role';
    this.usernameKey = 'auth_username';
  }

  async login(username, password, twoFactorCode) {
    try {
      // Simula una chiamata API per l'autenticazione
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Controllo per l'utente admin specifico
          if (username === 'si.izzo@reply.it' && password === 'password') {
            resolve({
              success: true,
              token: 'fake_jwt_token',
              userRole: 'Administrator',
            });
          }
          // Controllo per altri utenti con dominio @reply.it
          else if (username.endsWith('@reply.it') && password === 'password') {
            resolve({
              success: true,
              token: 'fake_jwt_token',
              userRole: 'User',
            });
          } else {
            resolve({ success: false, error: 'Invalid credentials' });
          }
        }, 1000);
      });

      if (response.success) {
        const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minuti da ora
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.expirationKey, expirationTime.toString());
        localStorage.setItem(this.userRoleKey, response.userRole);
        localStorage.setItem(this.usernameKey, username);

        return {
          success: true,
          user: {
            username,
            roles: [response.userRole],
          },
        };
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
    localStorage.removeItem(this.userRoleKey);
    localStorage.removeItem(this.usernameKey);
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
      const username = localStorage.getItem(this.usernameKey);
      const userRole = localStorage.getItem(this.userRoleKey);

      return {
        username: username,
        roles: [userRole],
      };
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
