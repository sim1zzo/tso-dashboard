export class DemandForecastService {
  async generateForecast(historicalData) {
    // Simulazione di una previsione basata sui dati storici
    return historicalData.map(data => ({
      ...data,
      demand: data.demand * (1 + (Math.random() - 0.5) * 0.1) // +/- 5% di variazione
    }));
  }
}