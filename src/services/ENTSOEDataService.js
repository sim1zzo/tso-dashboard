export class ENTSOEDataService {
  async fetchCongestionData() {
    // Simulazione del recupero dei dati ENTSO-E
    return {
      timestamp: new Date().toISOString(),
      congestionPoints: [
        { id: 'MI_NORD', load: 92 }, // Punto di congestione nella zona nord di Milano
        { id: 'RM_SUD', load: 88 }, // Punto di congestione nella zona sud di Roma
        { id: 'NA_EST', load: 85 }, // Punto di congestione nella zona est di Napoli
        { id: 'TO_OVEST', load: 90 }, // Punto di congestione nella zona ovest di Torino
        { id: 'FI_NORD', load: 80 }, // Punto di congestione nella zona nord di Firenze
        { id: 'VE_CENTRO', load: 83 }, // Punto di congestione nella zona centrale di Venezia
      ],
    };
  }

  async fetchHistoricalDemand() {
    // Simulazione del recupero dei dati storici della domanda
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 giorni fa
    
    const data = [];
    for (let d = new Date(startDate); d <= endDate; d.setHours(d.getHours() + 1)) {
      data.push({
        time: d.toISOString(),
        demand: Math.floor(Math.random() * (1000 - 500 + 1)) + 500 // Domanda casuale tra 500 e 1000 MW
      });
    }
    
    return data;
  }
}
