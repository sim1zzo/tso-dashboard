import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Activity,
  Zap,
  Clock,
  AlertTriangle,
  Network,
  Globe,
  BarChart3,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const TransmissionPage = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [activeTypes, setActiveTypes] = useState([
    '400 kV',
    '220 kV',
    '150 kV',
    '132 kV',
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  };

  const headerStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    color: '#2c3e50',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e9ecef',
  };

  const cardWithBorderStyle = {
    ...cardStyle,
    borderTop: '4px solid #007bff',
  };

  // Dati reali degli scambi commerciali esteri (basati su Terna)
  const foreignExchangeData = [
    {
      country: 'Francia',
      scheduled: 3323,
      physical: 3298,
      capacity: 3600,
      direction: 'import',
      efficiency: 99.2,
      color: '#ff9800',
    },
    {
      country: 'Svizzera',
      scheduled: 3109,
      physical: 3085,
      capacity: 3200,
      direction: 'import',
      efficiency: 99.3,
      color: '#e91e63',
    },
    {
      country: 'Austria',
      scheduled: 355,
      physical: 348,
      capacity: 380,
      direction: 'import',
      efficiency: 98.0,
      color: '#00bcd4',
    },
    {
      country: 'Slovenia',
      scheduled: 438,
      physical: 432,
      capacity: 500,
      direction: 'import',
      efficiency: 98.6,
      color: '#8bc34a',
    },
    {
      country: 'Grecia',
      scheduled: 500,
      physical: 485,
      capacity: 500,
      direction: 'import',
      efficiency: 97.0,
      color: '#f44336',
    },
    {
      country: 'Corsica',
      scheduled: 114,
      physical: 112,
      capacity: 150,
      direction: 'export',
      efficiency: 98.2,
      color: '#3f51b5',
    },
    {
      country: 'Malta',
      scheduled: 86,
      physical: 84,
      capacity: 100,
      direction: 'export',
      efficiency: 97.7,
      color: '#9e9e9e',
    },
  ];

  // Dati della rete di trasmissione aggiornati
  const gridData = [
    {
      year: 2020,
      '400 kV': 22110,
      '220 kV': 20166,
      '150 kV': 8945,
      '132 kV': 2985,
    },
    {
      year: 2021,
      '400 kV': 22210,
      '220 kV': 20266,
      '150 kV': 8995,
      '132 kV': 3015,
    },
    {
      year: 2022,
      '400 kV': 22310,
      '220 kV': 20366,
      '150 kV': 9045,
      '132 kV': 3045,
    },
    {
      year: 2023,
      '400 kV': 22410,
      '220 kV': 20466,
      '150 kV': 9095,
      '132 kV': 3075,
    },
    {
      year: 2024,
      '400 kV': 22510,
      '220 kV': 20566,
      '150 kV': 9145,
      '132 kV': 3105,
    },
  ];

  // Dati di disponibilità della rete con valori reali
  const availabilityData = [
    {
      label: 'DISPONIBILITÀ NAZIONALE',
      value: 99.7,
      period: currentDateTime.toLocaleDateString('it-IT', {
        month: 'long',
        year: 'numeric',
      }),
      status: 'excellent',
    },
    {
      label: 'DISPONIBILITÀ PENINSULARE',
      value: 99.6,
      period: currentDateTime.toLocaleDateString('it-IT', {
        month: 'long',
        year: 'numeric',
      }),
      status: 'excellent',
    },
    {
      label: 'SICILIA',
      value: 99.9,
      period: currentDateTime.toLocaleDateString('it-IT', {
        month: 'long',
        year: 'numeric',
      }),
      status: 'excellent',
    },
    {
      label: 'SARDEGNA',
      value: 99.4,
      period: currentDateTime.toLocaleDateString('it-IT', {
        month: 'long',
        year: 'numeric',
      }),
      status: 'excellent',
    },
  ];

  // Dati Net Transfer Capacity (NTC)
  const ntcData = [
    { country: 'Francia', ntc: 3600, atc: 277, utilizzo: 92.3 },
    { country: 'Svizzera', ntc: 3200, atc: 91, utilizzo: 97.2 },
    { country: 'Austria', ntc: 380, atc: 25, utilizzo: 93.4 },
    { country: 'Slovenia', ntc: 500, atc: 62, utilizzo: 87.6 },
    { country: 'Grecia', ntc: 500, atc: 0, utilizzo: 100.0 },
  ];

  // Colori per i diversi livelli di tensione
  const VOLTAGE_COLORS = {
    '400 kV': '#e74c3c',
    '220 kV': '#3498db',
    '150 kV': '#2ecc71',
    '132 kV': '#f39c12',
  };

  const handleLegendClick = (entry) => {
    setActiveTypes((prev) =>
      prev.includes(entry.dataKey)
        ? prev.filter((e) => e !== entry.dataKey)
        : [...prev, entry.dataKey]
    );
  };

  const processedGridData = useMemo(() => {
    return gridData.map((yearData) => {
      const result = { year: yearData.year };
      Object.keys(VOLTAGE_COLORS).forEach((key) => {
        if (activeTypes.includes(key)) {
          result[key] = yearData[key];
        }
      });
      return result;
    });
  }, [gridData, activeTypes]);

  const totalLength = useMemo(() => {
    const latestYear = gridData[gridData.length - 1];
    return Object.keys(VOLTAGE_COLORS).reduce(
      (sum, key) => sum + latestYear[key],
      0
    );
  }, [gridData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle size={20} color='#28a745' />;
      case 'good':
        return <CheckCircle size={20} color='#ffc107' />;
      case 'warning':
        return <AlertCircle size={20} color='#fd7e14' />;
      default:
        return <AlertTriangle size={20} color='#dc3545' />;
    }
  };

  const getStatusColor = (value) => {
    if (value >= 99.5) return '#28a745';
    if (value >= 99.0) return '#ffc107';
    if (value >= 98.0) return '#fd7e14';
    return '#dc3545';
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Network style={{ marginRight: '15px' }} size={32} />
        Trasmissione - Sistema Elettrico Nazionale
      </h2>

      {/* Disponibilità della Rete */}
      <div style={cardWithBorderStyle}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Shield size={24} style={{ marginRight: '12px', color: '#28a745' }} />
          Disponibilità della Rete di Trasmissione
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {availabilityData.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                border: '2px solid #e9ecef',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = 'translateY(-2px)')
              }
              onMouseLeave={(e) =>
                (e.target.style.transform = 'translateY(0px)')
              }
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                {getStatusIcon(item.status)}
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#495057',
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: getStatusColor(item.value),
                  marginBottom: '8px',
                }}
              >
                {item.value}%
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>
                {item.period}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scambi Commerciali Esteri */}
      <div style={cardWithBorderStyle}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Globe size={24} style={{ marginRight: '12px', color: '#007bff' }} />
          Scambi Commerciali Esteri - Programmati vs Fisici
        </h3>

        <div style={{ marginBottom: '20px' }}>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart
              data={foreignExchangeData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#e9ecef' />
              <XAxis
                dataKey='country'
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
                label={{ value: 'MW', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  const label =
                    props.dataKey === 'scheduled' ? 'Programmato' : 'Fisico';
                  return [`${value} MW`, label];
                }}
                labelFormatter={(label) => `Paese: ${label}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Bar
                dataKey='scheduled'
                fill='#3498db'
                name='Programmato'
                radius={[2, 2, 0, 0]}
              />
              <Bar
                dataKey='physical'
                fill='#2ecc71'
                name='Fisico'
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabella dettagliata scambi */}
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Paese
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Programmato (MW)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Fisico (MW)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Capacità (MW)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Efficienza (%)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Direzione
                </th>
              </tr>
            </thead>
            <tbody>
              {foreignExchangeData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #dee2e6',
                      fontWeight: '600',
                      color: item.color,
                    }}
                  >
                    {item.country}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                    }}
                  >
                    {item.scheduled.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                    }}
                  >
                    {item.physical.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                    }}
                  >
                    {item.capacity.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                      color:
                        item.efficiency >= 99
                          ? '#28a745'
                          : item.efficiency >= 98
                          ? '#ffc107'
                          : '#dc3545',
                      fontWeight: '600',
                    }}
                  >
                    {item.efficiency.toFixed(1)}%
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor:
                          item.direction === 'import' ? '#d4edda' : '#f8d7da',
                        color:
                          item.direction === 'import' ? '#155724' : '#721c24',
                      }}
                    >
                      {item.direction === 'import' ? 'IMPORT' : 'EXPORT'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Net Transfer Capacity */}
      <div style={cardWithBorderStyle}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BarChart3
            size={24}
            style={{ marginRight: '12px', color: '#6f42c1' }}
          />
          Net Transfer Capacity (NTC) e Available Transfer Capacity (ATC)
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          {ntcData.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid #dee2e6',
              }}
            >
              <h4
                style={{
                  margin: '0 0 12px 0',
                  color: '#495057',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                {item.country}
              </h4>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                  NTC:{' '}
                </span>
                <span style={{ fontWeight: 'bold', color: '#495057' }}>
                  {item.ntc} MW
                </span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                  ATC:{' '}
                </span>
                <span style={{ fontWeight: 'bold', color: '#495057' }}>
                  {item.atc} MW
                </span>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', color: '#6c757d' }}>
                  Utilizzo:{' '}
                </span>
                <span
                  style={{
                    fontWeight: 'bold',
                    color:
                      item.utilizzo >= 95
                        ? '#dc3545'
                        : item.utilizzo >= 90
                        ? '#ffc107'
                        : '#28a745',
                  }}
                >
                  {item.utilizzo.toFixed(1)}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${item.utilizzo}%`,
                    height: '100%',
                    backgroundColor:
                      item.utilizzo >= 95
                        ? '#dc3545'
                        : item.utilizzo >= 90
                        ? '#ffc107'
                        : '#28a745',
                    transition: 'width 0.3s ease',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evoluzione della Rete di Trasmissione */}
      <div style={cardWithBorderStyle}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TrendingUp
            size={24}
            style={{ marginRight: '12px', color: '#28a745' }}
          />
          Evoluzione della Rete di Trasmissione Nazionale
        </h3>
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart
            data={processedGridData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              {Object.entries(VOLTAGE_COLORS).map(([key, color]) => (
                <linearGradient
                  key={key}
                  id={`color${key.replace(' ', '')}`}
                  x1='0'
                  y1='0'
                  x2='0'
                  y2='1'
                >
                  <stop offset='5%' stopColor={color} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray='3 3' stroke='#e9ecef' />
            <XAxis
              dataKey='year'
              tick={{ fontSize: 12, fill: '#495057' }}
              axisLine={{ stroke: '#dee2e6' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#495057' }}
              axisLine={{ stroke: '#dee2e6' }}
              label={{
                value: 'Lunghezza (km)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              formatter={(value, name) => [
                `${value.toLocaleString()} km`,
                `Linee ${name}`,
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend onClick={handleLegendClick} />
            {Object.entries(VOLTAGE_COLORS).map(([key, color]) => (
              <Area
                key={key}
                type='monotone'
                dataKey={key}
                stackId='1'
                stroke={color}
                fill={`url(#color${key.replace(' ', '')})`}
                name={key}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <span
            style={{ fontSize: '16px', fontWeight: 'bold', color: '#495057' }}
          >
            Lunghezza totale rete nel 2024:{' '}
          </span>
          <span
            style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}
          >
            {totalLength.toLocaleString()} km
          </span>
        </div>
      </div>

      {/* Statistiche di Riepilogo */}
      <div style={cardWithBorderStyle}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Activity
            size={24}
            style={{ marginRight: '12px', color: '#17a2b8' }}
          />
          Statistiche di Sistema - {currentDateTime.toLocaleDateString('it-IT')}
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#e8f4fd',
              borderRadius: '12px',
              border: '2px solid #007bff',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#007bff',
                marginBottom: '8px',
              }}
            >
              {foreignExchangeData
                .reduce(
                  (sum, item) =>
                    sum + (item.direction === 'import' ? item.physical : 0),
                  0
                )
                .toLocaleString()}{' '}
              MW
            </div>
            <div
              style={{ fontSize: '14px', color: '#495057', fontWeight: '600' }}
            >
              Import Totale
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              border: '2px solid #6c757d',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#6c757d',
                marginBottom: '8px',
              }}
            >
              {foreignExchangeData
                .reduce(
                  (sum, item) =>
                    sum + (item.direction === 'export' ? item.physical : 0),
                  0
                )
                .toLocaleString()}{' '}
              MW
            </div>
            <div
              style={{ fontSize: '14px', color: '#495057', fontWeight: '600' }}
            >
              Export Totale
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#d4edda',
              borderRadius: '12px',
              border: '2px solid #28a745',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#28a745',
                marginBottom: '8px',
              }}
            >
              {(
                foreignExchangeData.reduce(
                  (sum, item) => sum + item.efficiency,
                  0
                ) / foreignExchangeData.length
              ).toFixed(1)}
              %
            </div>
            <div
              style={{ fontSize: '14px', color: '#495057', fontWeight: '600' }}
            >
              Efficienza Media
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              backgroundColor: '#fff3cd',
              borderRadius: '12px',
              border: '2px solid #ffc107',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#856404',
                marginBottom: '8px',
              }}
            >
              {foreignExchangeData.length}
            </div>
            <div
              style={{ fontSize: '14px', color: '#495057', fontWeight: '600' }}
            >
              Interconnessioni Attive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmissionPage;
