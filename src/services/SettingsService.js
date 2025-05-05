import { AuthService } from './AuthService'; // Aggiungi questa importazione

export class SettingsService {
  constructor(authService) {
    this.authService = authService || new AuthService();
  }

  async getProfileSettings() {
    // Ottiene le informazioni dell'utente dall'AuthService
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      return null;
    }

    // In un'applicazione reale, qui faresti una chiamata API per ottenere ulteriori dettagli
    // Utilizziamo le informazioni memorizzate o dati di default
    const storedSettings =
      JSON.parse(localStorage.getItem('user_settings')) || {};

    // Estrai il nome dal formato email (prendiamo la parte prima del @)
    const nameParts = currentUser.username.split('@')[0].split('.');
    const name = nameParts
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    // Mappa il ruolo dell'AuthService al formato utilizzato in SettingsService
    const roleMapping = {
      Administrator: 'admin',
      User: 'Standard',
    };

    return {
      name: storedSettings.name || name,
      email: currentUser.username,
      role: roleMapping[currentUser.roles[0]] || 'Standard',
    };
  }

  async saveProfileSettings(settings) {
    // In un'applicazione reale, qui faresti una chiamata API
    // Non permettiamo la modifica del ruolo tramite questo metodo
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      return { success: false, error: 'Utente non autenticato' };
    }

    // Manteniamo il ruolo originale dall'AuthService
    const roleMapping = {
      Administrator: 'admin',
      User: 'Standard',
    };

    // Impostiamo il ruolo corretto basato sull'AuthService, non sul nome
    settings.role = roleMapping[currentUser.roles[0]] || 'Standard';

    // Salviamo le impostazioni ma manteniamo l'email originale
    settings.email = currentUser.username;

    localStorage.setItem('user_settings', JSON.stringify(settings));
    return { success: true };
  }
}
