import React, { useState, useEffect } from 'react';
import {
  Sun,
  Wind,
  TrendingUp,
  Zap,
  BarChart2,
  Cloud,
  Droplet,
  RefreshCw,
  Battery,
  ThermometerSun,
  Calendar,
  Award,
  Layers,
  Sliders,
  Clock,
  PieChart,
  Download,
  Check,
} from 'lucide-react';
import {
  BarChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const RenewableIntegration = () => {
  // Stati per memorizzare i dati e le impostazioni dell'interfaccia
  const [forecastData, setForecastData] = useState([]);
  const [renewablePercentage, setRenewablePercentage] = useState(0);
  const [carbonSavings, setCarbonSavings] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [forecastHorizon, setForecastHorizon] = useState('24h');
  const [chartType, setChartType] = useState('stacked');
  const [optimizationMode, setOptimizationMode] = useState('balance');
  const [isAnimating, setIsAnimating] = useState(false);
  const [renewableBreakdown, setRenewableBreakdown] = useState([]);
  const [weatherImpact, setWeatherImpact] = useState({
    temperature: Math.floor(Math.random() * 10) + 20,
    cloudCover: Math.floor(Math.random() * 50),
    windSpeed: Math.floor(Math.random() * 15) + 5,
  });
  const [realTimeData, setRealTimeData] = useState({
    timestamp: new Date().toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    solar: Math.floor(Math.random() * 150) + 50,
    wind: Math.floor(Math.random() * 100) + 50,
    hydro: Math.floor(Math.random() * 80) + 30,
    demand: Math.floor(Math.random() * 100) + 200,
  });

  // Colori per i grafici
  const COLORS = {
    solar: '#ffb74d',
    wind: '#42a5f5',
    hydro: '#4dd0e1',
    demand: '#ef5350',
    green: '#4caf50',
    yellow: '#ffb74d',
    blue: '#42a5f5',
  };

  // Funzione per generare i dati di previsione
  const generateForecast = async () => {
    setIsLoading(true);
    setIsAnimating(true);

    // Simulazione di un'operazione asincrona
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Genera i dati di previsione in base all'orizzonte temporale
    let labels, dataPoints;
    if (forecastHorizon === '24h') {
      labels = Array.from(
        { length: 24 },
        (_, i) => `${i.toString().padStart(2, '0')}:00`
      );
      dataPoints = 24;
    } else if (forecastHorizon === '7d') {
      labels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
      dataPoints = 7;
    } else if (forecastHorizon === '30d') {
      labels = Array.from({ length: 30 }, (_, i) => `G${i + 1}`);
      dataPoints = 30;
    }

    // Genera dati per diverse fonti di energia in base al periodo
    const getRandomDataForPeriod = (min, max, zero = false) => {
      return Array.from({ length: dataPoints }, (_, i) => {
        if (zero && (i < 6 || i > 18) && forecastHorizon === '24h') {
          return 0;
        }
        return Math.floor(Math.random() * (max - min)) + min;
      });
    };

    // Scalabilità per periodi diversi
    const scaleFactor =
      forecastHorizon === '24h' ? 1 : forecastHorizon === '7d' ? 24 : 24 * 7;

    // Genera dati con più variabilità e pattern realistici
    const solarData = getRandomDataForPeriod(
      100 * scaleFactor,
      400 * scaleFactor,
      true
    );
    const windData = getRandomDataForPeriod(
      80 * scaleFactor,
      300 * scaleFactor
    );
    const hydroData = getRandomDataForPeriod(
      50 * scaleFactor,
      200 * scaleFactor
    );
    const demandData = getRandomDataForPeriod(
      300 * scaleFactor,
      600 * scaleFactor
    );

    // Converti in formato adatto per Recharts
    const chartData = labels.map((label, index) => ({
      name: label,
      solare: solarData[index],
      eolico: windData[index],
      idro: hydroData[index],
      domanda: demandData[index],
    }));

    setForecastData(chartData);

    // Genera breakdown delle rinnovabili per grafico a torta
    const totalSolar = solarData.reduce((a, b) => a + b, 0);
    const totalWind = windData.reduce((a, b) => a + b, 0);
    const totalHydro = hydroData.reduce((a, b) => a + b, 0);
    const totalRenewable = totalSolar + totalWind + totalHydro;

    const pieData = [
      {
        name: 'Solare',
        value: parseFloat(((totalSolar / totalRenewable) * 100).toFixed(1)),
      },
      {
        name: 'Eolico',
        value: parseFloat(((totalWind / totalRenewable) * 100).toFixed(1)),
      },
      {
        name: 'Idroelettrico',
        value: parseFloat(((totalHydro / totalRenewable) * 100).toFixed(1)),
      },
    ];

    setRenewableBreakdown(pieData);

    // Calcola la percentuale di rinnovabili
    const totalDemand = demandData.reduce((a, b) => a + b, 0);
    const percentage = (totalRenewable / totalDemand) * 100;
    setRenewablePercentage(percentage.toFixed(1));

    // Calcola il risparmio di CO2 (esempio semplificato)
    const carbonSaved = totalRenewable * 0.5; // 0.5 kg CO2 risparmiati per kWh di rinnovabile
    setCarbonSavings(Math.floor(carbonSaved).toLocaleString('it-IT'));

    // Aggiorna i dati meteo e tempo reale per simulare l'aggiornamento
    setWeatherImpact({
      temperature: Math.floor(Math.random() * 10) + 20,
      cloudCover: Math.floor(Math.random() * 50),
      windSpeed: Math.floor(Math.random() * 15) + 5,
    });

    setRealTimeData({
      timestamp: new Date().toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      solar: Math.floor(Math.random() * 150) + 50,
      wind: Math.floor(Math.random() * 100) + 50,
      hydro: Math.floor(Math.random() * 80) + 30,
      demand: Math.floor(Math.random() * 100) + 200,
    });

    setIsLoading(false);

    // Disattiva l'animazione dopo un po'
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Genera i dati iniziali all'avvio
  useEffect(() => {
    generateForecast();
  }, []);

  // AGGIUNTO: Effetto che rigenera i dati quando cambia l'orizzonte temporale
  useEffect(() => {
    generateForecast();
  }, [forecastHorizon]);

  // Ottieni l'ora corrente formattata
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Funzione per calcolare il colore in base alla percentuale
  const getPercentageColor = (percentage) => {
    if (percentage >= 75) return '#10b981'; // verde
    if (percentage >= 50) return '#0ea5e9'; // blu
    if (percentage >= 25) return '#f59e0b'; // giallo
    return '#ef4444'; // rosso
  };

  // Per determinare il consiglio strategico in base al mix
  const getStrategicAdvice = () => {
    if (!renewableBreakdown || renewableBreakdown.length === 0) return '';

    const solarPercent = renewableBreakdown[0].value;
    const windPercent = renewableBreakdown[1].value;
    const hydroPercent = renewableBreakdown[2].value;

    if (solarPercent > 50) {
      return "Si consiglia di aumentare la capacità di accumulo per gestire l'eccesso di produzione solare nelle ore diurne.";
    } else if (windPercent > 50) {
      return 'Si consiglia di migliorare le previsioni meteo per ottimizzare la gestione della produzione eolica variabile.';
    } else if (hydroPercent > 50) {
      return 'Si consiglia di coordinare meglio la produzione idroelettrica con le altre fonti rinnovabili per una copertura più uniforme.';
    } else {
      return "Il mix energetico è ben bilanciato. Si consiglia di continuare a migliorare l'integrazione tra le diverse fonti rinnovabili.";
    }
  };

  // Componente per la card informativa con icona
  const InfoCard = ({
    title,
    value,
    icon: Icon,
    secondaryValue,
    secondaryLabel,
    color = '#0ea5e9',
  }) => (
    <div
      className='info-card'
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        border: '1px solid #f1f5f9',
        flex: '1',
        minWidth: '220px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <div
          style={{
            backgroundColor: `${color}15`,
            color,
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} />
        </div>
      </div>
      <div style={{ marginBottom: '6px', color: '#64748b', fontSize: '14px' }}>
        {title}
      </div>
      <div
        style={{
          fontWeight: '700',
          fontSize: '24px',
          color: '#334155',
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        {value}
        {secondaryValue && (
          <span
            style={{
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '8px',
              color: '#64748b',
            }}
          >
            {secondaryValue}
          </span>
        )}
      </div>
      {secondaryLabel && (
        <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
          {secondaryLabel}
        </div>
      )}
    </div>
  );

  // Componente per la card delle strategie di ottimizzazione
  const StrategyCard = ({ color, icon: Icon, title, description }) => (
    <div
      style={{
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '4px',
          height: '100%',
          backgroundColor: color,
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: `${color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            color,
          }}
        >
          <Icon size={20} />
        </div>
        <div style={{ fontWeight: '600', color: '#334155' }}>{title}</div>
      </div>
      <p style={{ fontSize: '14px', color: '#475569', margin: '0' }}>
        {description}
      </p>
    </div>
  );

  // Registra cambiamenti all'orizzonte di previsione
  const handleForecastHorizonChange = (horizon) => {
    if (horizon !== forecastHorizon) {
      setForecastHorizon(horizon);
      // Non serve chiamare generateForecast() qui perché lo farà l'useEffect
    }
  };

  return (
    <div
      className='dashboard-container'
      style={{
        padding: '24px',
        backgroundColor: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        maxWidth: '1280px',
        margin: '0 auto',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          color: '#334155',
        }}
      >
        <Zap style={{ marginRight: '12px', color: '#0ea5e9' }} size={32} />
        Ottimizzazione dell'Integrazione delle Rinnovabili
      </h2>

      {/* Barra di aggiornamento */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px 24px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Clock size={20} color='#64748b' />
          <span style={{ fontSize: '14px', color: '#64748b' }}>
            Ultimo aggiornamento: {formattedTime}
          </span>
        </div>

        <button
          onClick={generateForecast}
          disabled={isLoading}
          style={{
            padding: '12px 20px',
            backgroundColor: isLoading ? '#0ea5e9' : '#0284c7',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isLoading ? 'default' : 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          }}
        >
          {isLoading ? (
            <>
              <div
                className='loading'
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  marginRight: '8px',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
              Aggiornamento in corso...
            </>
          ) : (
            <>
              <RefreshCw size={16} style={{ marginRight: '8px' }} />
              Aggiorna Previsione
            </>
          )}
        </button>
      </div>

      {/* Cards informative */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <InfoCard
          title='Percentuale Rinnovabili'
          value={`${renewablePercentage}%`}
          icon={Wind}
          secondaryValue='del fabbisogno'
          color={getPercentageColor(parseFloat(renewablePercentage))}
        />
        <InfoCard
          title='Risparmio CO2'
          value={`${carbonSavings} kg`}
          icon={Cloud}
          secondaryLabel='rispetto a fonti tradizionali'
          color='#10b981'
        />
        <InfoCard
          title='Produzione Attuale'
          value={`${(
            realTimeData.solar +
            realTimeData.wind +
            realTimeData.hydro
          ).toLocaleString('it-IT')} MW`}
          icon={Zap}
          secondaryLabel={`Aggiornato alle ${realTimeData.timestamp}`}
          color='#0ea5e9'
        />
        <InfoCard
          title='Temperatura'
          value={`${weatherImpact.temperature}°C`}
          icon={ThermometerSun}
          secondaryValue={`Vento: ${weatherImpact.windSpeed} km/h`}
          color='#f59e0b'
        />
      </div>

      {/* Sezione grafici */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
          border: '1px solid #f1f5f9',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            gap: '12px',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#334155',
              margin: 0,
            }}
          >
            <BarChart2
              size={18}
              style={{ verticalAlign: 'middle', marginRight: '8px' }}
            />
            Previsione Produzione Rinnovabile e Domanda
          </h3>

          {/* Opzioni del grafico */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '4px',
              }}
            >
              <button
                onClick={() => handleForecastHorizonChange('24h')}
                style={{
                  padding: '10px 16px',
                  backgroundColor:
                    forecastHorizon === '24h' ? '#0ea5e9' : '#f1f5f9',
                  color: forecastHorizon === '24h' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '8px',
                }}
              >
                <Clock size={16} style={{ marginRight: '6px' }} /> 24h
              </button>
              <button
                onClick={() => handleForecastHorizonChange('7d')}
                style={{
                  padding: '10px 16px',
                  backgroundColor:
                    forecastHorizon === '7d' ? '#0ea5e9' : '#f1f5f9',
                  color: forecastHorizon === '7d' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '8px',
                }}
              >
                <Calendar size={16} style={{ marginRight: '6px' }} /> 7 giorni
              </button>
              <button
                onClick={() => handleForecastHorizonChange('30d')}
                style={{
                  padding: '10px 16px',
                  backgroundColor:
                    forecastHorizon === '30d' ? '#0ea5e9' : '#f1f5f9',
                  color: forecastHorizon === '30d' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Calendar size={16} style={{ marginRight: '6px' }} /> 30 giorni
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '4px',
              }}
            >
              <button
                onClick={() => setChartType('stacked')}
                style={{
                  padding: '10px 16px',
                  backgroundColor:
                    chartType === 'stacked' ? '#0ea5e9' : '#f1f5f9',
                  color: chartType === 'stacked' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '8px',
                }}
              >
                <Layers size={16} style={{ marginRight: '6px' }} /> Stacked
              </button>
              <button
                onClick={() => setChartType('bar')}
                style={{
                  padding: '10px 16px',
                  backgroundColor: chartType === 'bar' ? '#0ea5e9' : '#f1f5f9',
                  color: chartType === 'bar' ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <BarChart2 size={16} style={{ marginRight: '6px' }} /> Barre
              </button>
            </div>
          </div>
        </div>

        {/* Area grafici */}
        {forecastData.length > 0 && (
          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer width='100%' height='100%'>
              {chartType === 'stacked' ? (
                <BarChart
                  data={forecastData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' />
                  <XAxis dataKey='name' stroke='#64748b' />
                  <YAxis stroke='#64748b' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey='solare'
                    name='Solare'
                    stackId='a'
                    fill={COLORS.solar}
                  />
                  <Bar
                    dataKey='eolico'
                    name='Eolico'
                    stackId='a'
                    fill={COLORS.wind}
                  />
                  <Bar
                    dataKey='idro'
                    name='Idroelettrico'
                    stackId='a'
                    fill={COLORS.hydro}
                  />
                  <Line
                    dataKey='domanda'
                    name='Domanda'
                    type='monotone'
                    stroke={COLORS.demand}
                    strokeWidth={2}
                  />
                </BarChart>
              ) : (
                <LineChart
                  data={forecastData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' />
                  <XAxis dataKey='name' stroke='#64748b' />
                  <YAxis stroke='#64748b' />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Line
                    dataKey='solare'
                    name='Solare'
                    type='monotone'
                    stroke={COLORS.solar}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    dataKey='eolico'
                    name='Eolico'
                    type='monotone'
                    stroke={COLORS.wind}
                    strokeWidth={2}
                  />
                  <Line
                    dataKey='idro'
                    name='Idroelettrico'
                    type='monotone'
                    stroke={COLORS.hydro}
                    strokeWidth={2}
                  />
                  <Line
                    dataKey='domanda'
                    name='Domanda'
                    type='monotone'
                    stroke={COLORS.demand}
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        )}

        {/* Opzioni avanzate */}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            padding: '12px 16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#64748b',
              fontSize: '14px',
              gap: '8px',
            }}
          >
            <Sliders size={16} />
            <span>Modalità di ottimizzazione:</span>
            <select
              value={optimizationMode}
              onChange={(e) => setOptimizationMode(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                color: '#334155',
                fontSize: '14px',
              }}
            >
              <option value='balance'>Bilanciato</option>
              <option value='cost'>Economico</option>
              <option value='green'>Ambientale</option>
              <option value='stability'>Stabilità</option>
            </select>
          </div>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#64748b',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Download size={14} /> Esporta Dati
          </button>
        </div>
      </div>

      {/* Layout a griglia per grafici e statistiche */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '24px',
        }}
      >
        {/* Distribuzione fonti rinnovabili */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#334155',
              marginTop: 0,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <PieChart size={18} style={{ marginRight: '8px' }} />
            Distribuzione Fonti Rinnovabili
          </h3>

          {renewableBreakdown.length > 0 && (
            <div style={{ height: '280px', width: '100%' }}>
              <ResponsiveContainer width='100%' height='100%'>
                <RechartsPieChart>
                  <Pie
                    data={renewableBreakdown}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    fill='#8884d8'
                    paddingAngle={5}
                    dataKey='value'
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    <Cell key='cell-0' fill={COLORS.solar} />
                    <Cell key='cell-1' fill={COLORS.wind} />
                    <Cell key='cell-2' fill={COLORS.hydro} />
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Percentuale']}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: COLORS.solar,
                  borderRadius: '4px',
                  marginRight: '8px',
                }}
              ></div>
              <span style={{ fontSize: '14px', color: '#475569' }}>Solare</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: COLORS.wind,
                  borderRadius: '4px',
                  marginRight: '8px',
                }}
              ></div>
              <span style={{ fontSize: '14px', color: '#475569' }}>Eolico</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: COLORS.hydro,
                  borderRadius: '4px',
                  marginRight: '8px',
                }}
              ></div>
              <span style={{ fontSize: '14px', color: '#475569' }}>
                Idroelettrico
              </span>
            </div>
          </div>
        </div>

        {/* Strategie di ottimizzazione */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#334155',
              marginTop: 0,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TrendingUp size={18} style={{ marginRight: '8px' }} />
            Strategie di Ottimizzazione
          </h3>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <StrategyCard
              color='#10b981'
              icon={Battery}
              title='Gestione Accumulo'
              description='Ottimizza la capacità di accumulo in base alle previsioni di produzione rinnovabile.'
            />
            <StrategyCard
              color='#0ea5e9'
              icon={TrendingUp}
              title='Previsione Domanda'
              description="Migliora l'accuratezza delle previsioni di domanda per ridurre gli sbilanci."
            />
            <StrategyCard
              color='#f59e0b'
              icon={Wind}
              title='Predittività Meteorologica'
              description='Incorpora previsioni meteo avanzate per anticipare variazioni nella produzione.'
            />
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                color: '#334155',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              <Award
                size={16}
                style={{ marginRight: '8px', color: '#0ea5e9' }}
              />
              Consiglio Strategico
            </div>
            <p style={{ margin: 0, color: '#475569', fontSize: '14px' }}>
              {getStrategicAdvice()}
            </p>
          </div>
        </div>
      </div>

      {/* Banner di stato */}
      <div
        style={{
          backgroundColor: '#f0f9ff',
          borderRadius: '12px',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #e0f2fe',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#0ea5e9',
              color: 'white',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <Check size={20} />
          </div>
          <div>
            <div
              style={{
                fontWeight: '600',
                color: '#0369a1',
                marginBottom: '2px',
              }}
            >
              Sistema Operativo
            </div>
            <div style={{ fontSize: '14px', color: '#0c4a6e' }}>
              Tutte le fonti rinnovabili sono integrate e funzionanti
            </div>
          </div>
        </div>

        <button
          style={{
            padding: '10px 16px',
            backgroundColor: 'white',
            color: '#0369a1',
            border: '1px solid #0ea5e9',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Sliders size={16} style={{ marginRight: '8px' }} />
          Impostazioni Avanzate
        </button>
      </div>

      {/* Note e credits */}
      <div
        style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px',
          padding: '16px',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <p>
          Dashboard dimostrativa per l'ottimizzazione delle fonti rinnovabili.
        </p>
        <p style={{ margin: '4px 0' }}>
          I dati visualizzati sono simulati a scopo illustrativo.
        </p>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .loading {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default RenewableIntegration;
