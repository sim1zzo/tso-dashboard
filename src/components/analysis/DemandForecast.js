import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  TrendingUp,
  Wind,
  Calendar,
  RefreshCw,
  AlertTriangle,
  Download,
  Clock,
  BarChart2,
  Thermometer,
  CloudRain,
  Sun,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
} from 'recharts';

// Funzione per generare dati di previsione
const fetchData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const demand = Math.floor(Math.random() * 8000) + 22000;
    const actual = i < 8 ? Math.floor(Math.random() * 8000) + 22000 : null;

    return {
      time: new Date(now.getTime() + i * 3600000).toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      prevista: demand,
      effettiva: actual,
      rinnovabile: Math.floor(demand * (Math.random() * 0.3 + 0.2)), // 20-50% rinnovabile
      temperature: Math.floor(Math.random() * 10) + 20, // 20-30°C
    };
  });
};

// Componente per il tooltip personalizzato
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='tooltip-time'>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString('it-IT')} MW
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Componente principale
const DemandForecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [activeTab, setActiveTab] = useState('grafico');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWeatherData, setShowWeatherData] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [isAnimating, setIsAnimating] = useState(false);
  const [errorProbability, setErrorProbability] = useState(5); // Percentuale di errore nella previsione
  const [anomalyDetection, setAnomalyDetection] = useState(true);

  // Calcola la previsione di picco e la media
  const peakDemand =
    forecastData.length > 0
      ? Math.max(...forecastData.map((d) => d.prevista))
      : 0;
  const averageDemand =
    forecastData.length > 0
      ? Math.round(
          forecastData.reduce((acc, curr) => acc + curr.prevista, 0) /
            forecastData.length
        )
      : 0;
  const renewablePercentage =
    forecastData.length > 0
      ? Math.round(
          (forecastData.reduce((acc, curr) => acc + curr.rinnovabile, 0) /
            forecastData.reduce((acc, curr) => acc + curr.prevista, 0)) *
            100
        )
      : 0;

  // Genera anomalia per dimostrazione (solo per l'UI)
  const anomalyHour = 14; // Anomalia alle 14:00
  if (forecastData.length > anomalyHour && anomalyDetection) {
    const anomalyFactor = 1.3; // 30% sopra il valore previsto
    forecastData[anomalyHour] = {
      ...forecastData[anomalyHour],
      prevista: Math.round(forecastData[anomalyHour].prevista * anomalyFactor),
    };
  }

  useEffect(() => {
    setForecastData(fetchData());
  }, []);

  const runForecast = async () => {
    setIsLoading(true);
    setIsAnimating(true);

    // Simuliamo un'operazione asincrona
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setForecastData(fetchData());
    setShowResults(true);
    setIsLoading(false);

    // Fine animazione dopo un po'
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Stili
  const containerStyle = {
    padding: '24px',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    maxWidth: '1280px',
    margin: '0 auto',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  };

  const headerStyle = {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    color: '#334155',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid #f1f5f9',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#0284c7',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  };

  const tabButtonStyle = {
    padding: '10px 16px',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
    transition: 'all 0.2s ease',
  };

  const tabButtonActiveStyle = {
    ...tabButtonStyle,
    backgroundColor: '#0ea5e9',
    color: 'white',
  };

  const flexRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '20px',
  };

  const switchContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '16px',
    gap: '8px',
    fontSize: '14px',
    color: '#64748b',
  };

  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '36px',
    height: '20px',
  };

  const switchInputStyle = {
    opacity: 0,
    width: 0,
    height: 0,
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#cbd5e1',
    transition: '.4s',
    borderRadius: '34px',
  };

  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '16px',
    width: '16px',
    left: '2px',
    bottom: '2px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%',
    transform: showWeatherData ? 'translateX(16px)' : 'translateX(0)',
  };

  // Componente InfoCard per mostrare le metriche principali
  const InfoCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = '#0ea5e9',
  }) => (
    <div
      style={{
        ...cardStyle,
        flex: '1',
        minWidth: '220px',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
      }}
    >
      <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <div
          style={{
            backgroundColor: `${color}15`,
            color: color,
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
        {trend && (
          <span
            style={{
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: '8px',
              color: trendValue > 0 ? '#10b981' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {trendValue > 0 ? '↑' : '↓'} {Math.abs(trendValue)}%
          </span>
        )}
      </div>
    </div>
  );

  // Formatta ora corrente in formato IT
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Componente Alert per notifiche
  const AlertNotification = ({ message, type = 'warning' }) => {
    const colors = {
      warning: '#f59e0b',
      info: '#0ea5e9',
      danger: '#ef4444',
    };

    const icons = {
      warning: AlertTriangle,
      info: Zap,
      danger: AlertTriangle,
    };

    const Icon = icons[type];

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: `${colors[type]}10`,
          borderLeft: `4px solid ${colors[type]}`,
          borderRadius: '6px',
          marginBottom: '16px',
          animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
        }}
      >
        <Icon size={18} color={colors[type]} style={{ marginRight: '10px' }} />
        <span style={{ color: '#334155', fontSize: '14px', fontWeight: '500' }}>
          {message}
        </span>
      </div>
    );
  };

  const renderForecastChart = () => {
    // Trovare l'ultimo valore effettivo non nullo
    const lastActualIndex = forecastData.reduce(
      (acc, item, index) => (item.effettiva !== null ? index : acc),
      -1
    );

    return (
      <div style={cardStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
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
            Previsione vs Domanda Effettiva
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setChartType('line')}
              style={
                chartType === 'line' ? tabButtonActiveStyle : tabButtonStyle
              }
            >
              <BarChart2 size={16} style={{ marginRight: '6px' }} /> Linee
            </button>
            <button
              onClick={() => setChartType('area')}
              style={
                chartType === 'area' ? tabButtonActiveStyle : tabButtonStyle
              }
            >
              <Activity size={16} style={{ marginRight: '6px' }} /> Area
            </button>
          </div>
        </div>

        <ResponsiveContainer width='100%' height={400}>
          {chartType === 'line' ? (
            <LineChart
              data={forecastData}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
              <XAxis
                dataKey='time'
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                domain={[
                  Math.min(...forecastData.map((d) => d.prevista)) * 0.9,
                  Math.max(...forecastData.map((d) => d.prevista)) * 1.1,
                ]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign='top'
                height={36}
                wrapperStyle={{ paddingTop: '10px' }}
              />

              {/* Linea di previsione */}
              <Line
                type='monotone'
                dataKey='prevista'
                stroke='#0ea5e9'
                strokeWidth={2}
                dot={false}
                name='Domanda Prevista (MW)'
                activeDot={{
                  r: 6,
                  stroke: '#0ea5e9',
                  strokeWidth: 1,
                  fill: '#fff',
                }}
              />

              {/* Linea di valori effettivi */}
              <Line
                type='monotone'
                dataKey='effettiva'
                stroke='#10b981'
                strokeWidth={2}
                dot={{ r: 4, fill: '#10b981' }}
                name='Domanda Effettiva (MW)'
                activeDot={{
                  r: 6,
                  stroke: '#10b981',
                  strokeWidth: 1,
                  fill: '#fff',
                }}
              />

              {/* Mostra dati meteo se attivati */}
              {showWeatherData && (
                <Line
                  type='monotone'
                  dataKey='rinnovabile'
                  stroke='#f59e0b'
                  strokeWidth={2}
                  dot={false}
                  name='Produzione Rinnovabile (MW)'
                  activeDot={{
                    r: 6,
                    stroke: '#f59e0b',
                    strokeWidth: 1,
                    fill: '#fff',
                  }}
                />
              )}

              {/* Linea di riferimento per l'ultimo valore effettivo */}
              {lastActualIndex >= 0 && (
                <ReferenceLine
                  x={forecastData[lastActualIndex].time}
                  stroke='#64748b'
                  strokeDasharray='3 3'
                  label={{
                    value: 'Ora Attuale',
                    position: 'insideTopRight',
                    fill: '#64748b',
                    fontSize: 12,
                  }}
                />
              )}

              {/* Linea di riferimento per l'anomalia */}
              {anomalyDetection && (
                <ReferenceLine
                  x={forecastData[anomalyHour].time}
                  stroke='#ef4444'
                  strokeDasharray='3 3'
                  label={{
                    value: 'Anomalia',
                    position: 'insideTopRight',
                    fill: '#ef4444',
                    fontSize: 12,
                  }}
                />
              )}
            </LineChart>
          ) : (
            <AreaChart
              data={forecastData}
              margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
              <XAxis
                dataKey='time'
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                domain={[
                  Math.min(...forecastData.map((d) => d.prevista)) * 0.9,
                  Math.max(...forecastData.map((d) => d.prevista)) * 1.1,
                ]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign='top'
                height={36}
                wrapperStyle={{ paddingTop: '10px' }}
              />

              {/* Area di previsione */}
              <Area
                type='monotone'
                dataKey='prevista'
                stackId='1'
                stroke='#0ea5e9'
                fill='#0ea5e920'
                name='Domanda Prevista (MW)'
              />

              {/* Area di valori effettivi */}
              <Area
                type='monotone'
                dataKey='effettiva'
                stackId='2'
                stroke='#10b981'
                fill='#10b98120'
                name='Domanda Effettiva (MW)'
              />

              {/* Mostra dati rinnovabili se attivati */}
              {showWeatherData && (
                <Area
                  type='monotone'
                  dataKey='rinnovabile'
                  stackId='3'
                  stroke='#f59e0b'
                  fill='#f59e0b20'
                  name='Produzione Rinnovabile (MW)'
                />
              )}

              {/* Linee di riferimento */}
              {lastActualIndex >= 0 && (
                <ReferenceLine
                  x={forecastData[lastActualIndex].time}
                  stroke='#64748b'
                  strokeDasharray='3 3'
                  label={{
                    value: 'Ora Attuale',
                    position: 'insideTopRight',
                    fill: '#64748b',
                    fontSize: 12,
                  }}
                />
              )}

              {anomalyDetection && (
                <ReferenceLine
                  x={forecastData[anomalyHour].time}
                  stroke='#ef4444'
                  strokeDasharray='3 3'
                  label={{
                    value: 'Anomalia',
                    position: 'insideTopRight',
                    fill: '#ef4444',
                    fontSize: 12,
                  }}
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#64748b',
          }}
        >
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>
              Margine di Errore:
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type='range'
                min='1'
                max='10'
                value={errorProbability}
                onChange={(e) => setErrorProbability(parseInt(e.target.value))}
                style={{ width: '120px', marginRight: '8px' }}
              />
              <span>{errorProbability}%</span>
            </div>
          </div>

          <div>
            <div style={switchContainerStyle}>
              <span>Visualizza Dati Meteo</span>
              <label style={switchStyle}>
                <input
                  type='checkbox'
                  checked={showWeatherData}
                  onChange={() => setShowWeatherData(!showWeatherData)}
                  style={switchInputStyle}
                />
                <span style={sliderStyle}>
                  <span style={sliderBeforeStyle}></span>
                </span>
              </label>
            </div>
          </div>

          <div>
            <div style={switchContainerStyle}>
              <span>Rilevamento Anomalie</span>
              <label style={switchStyle}>
                <input
                  type='checkbox'
                  checked={anomalyDetection}
                  onChange={() => setAnomalyDetection(!anomalyDetection)}
                  style={switchInputStyle}
                />
                <span style={sliderStyle}>
                  <span
                    style={{
                      ...sliderBeforeStyle,
                      transform: anomalyDetection
                        ? 'translateX(16px)'
                        : 'translateX(0)',
                    }}
                  ></span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderForecastTable = () => {
    return (
      <div style={cardStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
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
            Dati di Previsione
          </h3>

          <button
            style={{
              ...buttonStyle,
              backgroundColor: 'transparent',
              color: '#64748b',
              border: '1px solid #cbd5e1',
              padding: '8px 16px',
            }}
          >
            <Download size={16} style={{ marginRight: '8px' }} />
            Esporta CSV
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#64748b',
                  }}
                >
                  Ora
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#64748b',
                  }}
                >
                  Prevista (MW)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#64748b',
                  }}
                >
                  Effettiva (MW)
                </th>
                {showWeatherData && (
                  <>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        borderBottom: '1px solid #e2e8f0',
                        color: '#64748b',
                      }}
                    >
                      Rinnovabile (MW)
                    </th>
                    <th
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        borderBottom: '1px solid #e2e8f0',
                        color: '#64748b',
                      }}
                    >
                      Temperatura (°C)
                    </th>
                  </>
                )}
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderBottom: '1px solid #e2e8f0',
                    color: '#64748b',
                  }}
                >
                  Scostamento (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((data, index) => {
                // Calcola lo scostamento percentuale solo per i valori effettivi disponibili
                const deviation = data.effettiva
                  ? (
                      ((data.effettiva - data.prevista) / data.prevista) *
                      100
                    ).toFixed(1)
                  : '-';

                // Evidenzia l'anomalia se presente
                const isAnomaly = anomalyDetection && index === anomalyHour;

                return (
                  <tr
                    key={index}
                    style={{
                      borderBottom: '1px solid #e2e8f0',
                      backgroundColor: isAnomaly
                        ? '#fee2e240'
                        : index % 2 === 0
                        ? 'white'
                        : '#f8fafc',
                    }}
                  >
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {data.time}
                        {isAnomaly && (
                          <AlertTriangle
                            size={14}
                            color='#ef4444'
                            style={{ marginLeft: '8px' }}
                          />
                        )}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        fontWeight: '500',
                        color: '#0ea5e9',
                      }}
                    >
                      {data.prevista.toLocaleString('it-IT')}
                    </td>
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        fontWeight: data.effettiva ? '500' : '400',
                        color: data.effettiva ? '#10b981' : '#94a3b8',
                      }}
                    >
                      {data.effettiva
                        ? data.effettiva.toLocaleString('it-IT')
                        : '-'}
                    </td>
                    {showWeatherData && (
                      <>
                        <td
                          style={{
                            padding: '12px',
                            textAlign: 'right',
                            fontWeight: '500',
                            color: '#f59e0b',
                          }}
                        >
                          {data.rinnovabile.toLocaleString('it-IT')}
                        </td>
                        <td
                          style={{
                            padding: '12px',
                            textAlign: 'right',
                            color: '#64748b',
                          }}
                        >
                          {data.temperature}°C
                        </td>
                      </>
                    )}
                    <td
                      style={{
                        padding: '12px',
                        textAlign: 'right',
                        color:
                          deviation > 0
                            ? '#10b981'
                            : deviation < 0
                            ? '#ef4444'
                            : '#64748b',
                      }}
                    >
                      {deviation !== '-' ? deviation + '%' : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Componente per visualizzare le condizioni ambientali nella previsione
  const renderWeatherInsights = () => {
    if (!showWeatherData) return null;

    return (
      <div style={cardStyle}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#334155',
            marginTop: 0,
            marginBottom: '16px',
          }}
        >
          Condizioni Ambientali
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#0ea5e915',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: '#0ea5e9',
              }}
            >
              <Thermometer size={20} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '4px',
                }}
              >
                Temperatura Media
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#334155',
                }}
              >
                24°C
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#f59e0b15',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: '#f59e0b',
              }}
            >
              <Sun size={20} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '4px',
                }}
              >
                Indice Solare
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#334155',
                }}
              >
                6.8 kWh/m²
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#10b98115',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: '#10b981',
              }}
            >
              <Wind size={20} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '4px',
                }}
              >
                Velocità Vento
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#334155',
                }}
              >
                12 km/h
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: '#818cf815',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: '#818cf8',
              }}
            >
              <CloudRain size={20} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '4px',
                }}
              >
                Precipitazioni
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#334155',
                }}
              >
                0%
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '16px',
            fontSize: '14px',
            color: '#64748b',
            padding: '12px',
            backgroundColor: '#f1f5f930',
            borderRadius: '8px',
            borderLeft: '4px solid #0ea5e9',
          }}
        >
          Le condizioni meteorologiche influenzano significativamente il consumo
          energetico. Temperature elevate aumentano l'uso dei sistemi di
          raffreddamento, mentre l'indice solare impatta la produzione di
          energia rinnovabile.
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Activity style={{ marginRight: '12px', color: '#0ea5e9' }} size={32} />
        Dashboard di Previsione Domanda Energetica
      </h2>

      <div
        style={{
          ...cardStyle,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          padding: '16px 24px',
          backgroundColor: '#f8fafc',
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
          onClick={runForecast}
          style={isLoading ? buttonStyle : buttonHoverStyle}
          disabled={isLoading}
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
              Previsione in corso...
            </>
          ) : (
            <>
              <RefreshCw size={16} style={{ marginRight: '8px' }} />
              Aggiorna Previsione
            </>
          )}
        </button>
      </div>

      {showResults && (
        <>
          {anomalyDetection && (
            <AlertNotification
              message='Rilevata anomalia nel consumo previsto alle 14:00. Potrebbero verificarsi picchi di domanda superiori alla media.'
              type='warning'
            />
          )}

          <div style={flexRowStyle}>
            <InfoCard
              title='Domanda Attuale'
              value={`${
                forecastData[0]?.effettiva?.toLocaleString('it-IT') || '0'
              } MW`}
              icon={Zap}
              trend={true}
              trendValue={2.3}
              color='#0ea5e9'
            />
            <InfoCard
              title='Picco Previsto'
              value={`${peakDemand.toLocaleString('it-IT')} MW`}
              icon={TrendingUp}
              trend={true}
              trendValue={4.7}
              color='#f59e0b'
            />
            <InfoCard
              title='Media Giornaliera'
              value={`${averageDemand.toLocaleString('it-IT')} MW`}
              icon={Activity}
              trend={false}
              color='#10b981'
            />
            <InfoCard
              title='Produzione Rinnovabile'
              value={`${renewablePercentage}%`}
              icon={Wind}
              trend={true}
              trendValue={7.2}
              color='#818cf8'
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                padding: '4px',
                width: 'fit-content',
                marginBottom: '16px',
                border: '1px solid #e2e8f0',
              }}
            >
              <button
                onClick={() => setActiveTab('grafico')}
                style={
                  activeTab === 'grafico'
                    ? tabButtonActiveStyle
                    : tabButtonStyle
                }
              >
                <BarChart2 size={16} style={{ marginRight: '6px' }} /> Grafico
              </button>
              <button
                onClick={() => setActiveTab('tabella')}
                style={
                  activeTab === 'tabella'
                    ? tabButtonActiveStyle
                    : tabButtonStyle
                }
              >
                <Activity size={16} style={{ marginRight: '6px' }} /> Tabella
              </button>
            </div>
          </div>

          {activeTab === 'grafico'
            ? renderForecastChart()
            : renderForecastTable()}

          {/* Componente per le condizioni ambientali */}
          {renderWeatherInsights()}
        </>
      )}

      <div style={{ ...cardStyle, marginTop: '24px' }}>
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
          <Zap size={18} style={{ marginRight: '8px', color: '#0ea5e9' }} />
          Informazioni sul Sistema
        </h3>
        <ul
          style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            color: '#475569',
          }}
        >
          <li
            style={{
              marginBottom: '12px',
              paddingLeft: '24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#0ea5e9',
              }}
            ></div>
            Il modello di previsione utilizza dati storici, previsioni
            meteorologiche e informazioni su eventi speciali per fornire una
            stima accurata della domanda.
          </li>
          <li
            style={{
              marginBottom: '12px',
              paddingLeft: '24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#0ea5e9',
              }}
            ></div>
            Il sistema è conforme agli standard ENTSO-E per la previsione della
            domanda e garantisce un'accuratezza media del 95-98%.
          </li>
          <li
            style={{
              marginBottom: '12px',
              paddingLeft: '24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#0ea5e9',
              }}
            ></div>
            I dati vengono aggiornati in tempo reale grazie all'integrazione con
            i sistemi di misurazione della rete e le centrali di generazione.
          </li>
          <li
            style={{
              paddingLeft: '24px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: '6px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#0ea5e9',
              }}
            ></div>
            Il sistema di rilevamento anomalie identifica automaticamente
            pattern insoliti nel consumo energetico, aiutando a prevenire
            sovraccarichi della rete.
          </li>
        </ul>
      </div>

      {/* Nuova sezione per previsioni intelligenti */}
      <div style={{ ...cardStyle, marginTop: '24px', paddingBottom: '0' }}>
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
          <TrendingUp
            size={18}
            style={{ marginRight: '8px', color: '#0ea5e9' }}
          />
          Previsioni Intelligenti
        </h3>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '24px',
          }}
        >
          <div
            style={{
              flex: '1',
              minWidth: '240px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#334155',
                marginTop: 0,
                marginBottom: '12px',
              }}
            >
              Previsione a Breve Termine
            </h4>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
              Nelle prossime 4 ore si prevede un aumento della domanda del 7% a
              causa dell'incremento delle temperature. Si consiglia di
              ottimizzare il dispiegamento delle risorse.
            </p>
          </div>

          <div
            style={{
              flex: '1',
              minWidth: '240px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#334155',
                marginTop: 0,
                marginBottom: '12px',
              }}
            >
              Previsione Settimanale
            </h4>
            <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>
              Per i prossimi 7 giorni si prevede una domanda media di 32.500 MW
              con picchi fino a 36.000 MW durante le ore di punta. La
              disponibilità di energia rinnovabile è stimata al 42%.
            </p>
          </div>
        </div>
      </div>

      {/* Footer con i pulsanti di azione rapida */}
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          © 2025 Sense Reply
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
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
            <Download size={14} /> Esporta
          </button>

          <button
            style={{
              padding: '8px 16px',
              backgroundColor: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <RefreshCw size={14} /> Aggiorna
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemandForecast;
