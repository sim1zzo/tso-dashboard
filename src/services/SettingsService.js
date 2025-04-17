export class SettingsService {
  async getProfileSettings() {
    // In un'applicazione reale, qui faresti una chiamata API
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Simone Izzo', email: 'si.izzo@reply.it', role: 'admin' };
    
    // Assicuriamoci che il ruolo sia corretto in base al nome
    user.role = user.name === 'Simone Izzo' ? 'admin' : 'Standard';
    
    return user;
  }

  async saveProfileSettings(settings) {
    // In un'applicazione reale, qui faresti una chiamata API
    // Assicuriamoci che il ruolo sia corretto in base al nome
    settings.role = settings.name === 'Simone Izzo' ? 'admin' : 'Standard';
    
    localStorage.setItem('user', JSON.stringify(settings));
    return { success: true };
  }
}