import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

const ModernEnergyDemandChart = () => {
  const [activeLines, setActiveLines] = useState({
    real: true,
    scheduled: true,
    forecasted: true,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dati realistici per la domanda energetica peninsulare italiana
  const data = [
    { time: '00:00', real: 28.5, scheduled: 28.2, forecasted: 28.8 },
    { time: '01:00', real: 26.8, scheduled: 26.5, forecasted: 27.0 },
    { time: '02:00', real: 25.2, scheduled: 25.0, forecasted: 25.5 },
    { time: '03:00', real: 24.1, scheduled: 24.2, forecasted: 24.3 },
    { time: '04:00', real: 23.8, scheduled: 24.0, forecasted: 24.1 },
    { time: '05:00', real: 24.5, scheduled: 24.8, forecasted: 24.9 },
    { time: '06:00', real: 27.2, scheduled: 27.5, forecasted: 27.8 },
    { time: '07:00', real: 31.8, scheduled: 32.0, forecasted: 32.2 },
    { time: '08:00', real: 35.4, scheduled: 35.2, forecasted: 35.6 },
    { time: '09:00', real: 36.5, scheduled: 36.3, forecasted: 36.7 }, // ORA CORRENTE
    { time: '10:00', real: 38.2, scheduled: 38.0, forecasted: 38.4 },
    { time: '11:00', real: 39.8, scheduled: 39.5, forecasted: 40.0 },
    { time: '12:00', real: 41.2, scheduled: 41.0, forecasted: 41.4 },
    { time: '13:00', real: 41.8, scheduled: 41.5, forecasted: 42.0 },
    { time: '14:00', real: 41.5, scheduled: 41.2, forecasted: 41.7 },
    { time: '15:00', real: 40.9, scheduled: 40.6, forecasted: 41.1 },
    { time: '16:00', real: 40.2, scheduled: 39.9, forecasted: 40.4 },
    { time: '17:00', real: 39.8, scheduled: 39.5, forecasted: 40.0 },
    { time: '18:00', real: 40.5, scheduled: 40.2, forecasted: 40.7 },
    { time: '19:00', real: 41.8, scheduled: 41.5, forecasted: 42.0 },
    { time: '20:00', real: 42.1, scheduled: 41.8, forecasted: 42.3 },
    { time: '21:00', real: 40.8, scheduled: 40.5, forecasted: 41.0 },
    { time: '22:00', real: 37.2, scheduled: 36.9, forecasted: 37.4 },
    { time: '23:00', real: 33.1, scheduled: 32.8, forecasted: 33.3 },
  ];

  const currentHour = 9; // Simula le 09:04 come nell'immagine
  const currentDataPoint = data[currentHour];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '6px',
            fontSize: '13px',
          }}
        >
          <div
            style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}
          >
            {label}
          </div>
          {payload.map((entry, index) => (
            <div
              key={index}
              style={{
                color: entry.color,
                marginBottom: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                minWidth: '140px',
              }}
            >
              <span>{entry.name}:</span>
              <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>
                {entry.value.toFixed(1)} GW
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleLegendClick = (dataKey) => {
    setActiveLines((prev) => {
      const newState = { ...prev, [dataKey]: !prev[dataKey] };
      if (Object.values(newState).filter(Boolean).length === 0) {
        return prev;
      }
      return newState;
    });
  };

  // Calcoli per le statistiche
  const realValues = data.map((d) => d.real);
  const scheduledValues = data.map((d) => d.scheduled);
  const piccoGiornaliero = Math.max(...realValues);
  const minimoGiornaliero = Math.min(...realValues);
  const mediaGiornaliera =
    realValues.reduce((sum, val) => sum + val, 0) / realValues.length;
  const accuratezzaMedia =
    100 -
    (realValues.reduce(
      (sum, val, i) => sum + Math.abs(val - scheduledValues[i]),
      0
    ) /
      realValues.length /
      mediaGiornaliera) *
      100;

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Linea blu superiore che attraversa tutta la card */}
      <div
        style={{
          height: '4px',
          backgroundColor: '#007bff',
          width: '100%',
        }}
      ></div>

      {/* Header che replica esattamente lo stile esistente */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderBottom: '1px solid #e9ecef',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#ffc107',
                  marginRight: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                }}
              >
                ⚡
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#212529',
                }}
              >
                DOMANDA ELETTRICA IN TEMPO REALE
              </h3>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: '#6c757d',
                marginBottom: '16px',
              }}
            >
              Sistema Elettrico Peninsulare Italiano
            </p>

            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                maxWidth: '200px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    marginRight: '8px',
                    fontSize: '16px',
                  }}
                >
                  📅
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#495057',
                    fontWeight: '500',
                  }}
                >
                  16/06/2025
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <span
                  style={{
                    marginRight: '8px',
                    fontSize: '16px',
                  }}
                >
                  🕘
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: '#495057',
                    fontWeight: '500',
                  }}
                >
                  09:04
                </span>
              </div>

              <div
                style={{
                  borderTop: '1px solid #e9ecef',
                  paddingTop: '12px',
                }}
              >
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6c757d',
                    marginBottom: '4px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  DOMANDA ATTUALE
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#212529',
                    lineHeight: '1',
                  }}
                >
                  36.5{' '}
                  <span style={{ fontSize: '16px', color: '#6c757d' }}>GW</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  color: '#495057',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                <span
                  style={{
                    marginRight: '6px',
                    fontSize: '16px',
                  }}
                >
                  📈
                </span>
                SCOSTAMENTO
              </div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#28a745',
                  textAlign: 'center',
                }}
              >
                +0.3 GW
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#6c757d',
                  textAlign: 'center',
                  marginTop: '2px',
                }}
              >
                vs programmato
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  color: '#495057',
                  marginBottom: '6px',
                  fontWeight: '500',
                }}
              >
                <span
                  style={{
                    marginRight: '6px',
                    fontSize: '16px',
                  }}
                >
                  🎯
                </span>
                PRECISIONE
              </div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#007bff',
                  textAlign: 'center',
                }}
              >
                99.2%
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#6c757d',
                  textAlign: 'center',
                  marginTop: '2px',
                }}
              >
                accuratezza
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controlli delle linee come nell'originale */}
      <div
        style={{
          padding: '12px 20px',
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #e9ecef',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleLegendClick('real')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              border: '1px solid #ccc',
              backgroundColor: activeLines.real ? 'white' : '#f8f9fa',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              opacity: activeLines.real ? 1 : 0.6,
            }}
          >
            <span
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: activeLines.real ? '#ff6b6b' : '#999',
                marginRight: '6px',
                borderRadius: '2px',
              }}
            ></span>
            Domanda Reale
          </button>

          <button
            onClick={() => handleLegendClick('scheduled')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              border: '1px solid #ccc',
              backgroundColor: activeLines.scheduled ? 'white' : '#f8f9fa',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              opacity: activeLines.scheduled ? 1 : 0.6,
            }}
          >
            <span
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: activeLines.scheduled ? '#4ecdc4' : '#999',
                marginRight: '6px',
                borderRadius: '2px',
              }}
            ></span>
            Domanda Programmata
          </button>

          <button
            onClick={() => handleLegendClick('forecasted')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              border: '1px solid #ccc',
              backgroundColor: activeLines.forecasted ? 'white' : '#f8f9fa',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              opacity: activeLines.forecasted ? 1 : 0.6,
            }}
          >
            <span
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: activeLines.forecasted ? '#45b7d1' : '#999',
                marginRight: '6px',
                borderRadius: '2px',
                border: activeLines.forecasted
                  ? '1px dashed #45b7d1'
                  : '1px dashed #999',
              }}
            ></span>
            Previsione Aggiornata
          </button>
        </div>
      </div>

      {/* Grafico principale */}
      <div style={{ padding: '20px' }}>
        <ResponsiveContainer width='100%' height={350}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#e9ecef'
              strokeWidth={1}
            />

            <XAxis
              dataKey='time'
              axisLine={{ stroke: '#dee2e6' }}
              tickLine={{ stroke: '#dee2e6' }}
              tick={{
                fontSize: 11,
                fill: '#6c757d',
              }}
              interval={1}
            />

            <YAxis
              axisLine={{ stroke: '#dee2e6' }}
              tickLine={{ stroke: '#dee2e6' }}
              tick={{
                fontSize: 11,
                fill: '#6c757d',
              }}
              domain={[0, 45]}
              type='number'
              label={{
                value: 'Potenza (GW)',
                angle: -90,
                position: 'insideLeft',
                style: {
                  textAnchor: 'middle',
                  fontSize: '12px',
                  fill: '#495057',
                },
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Linea di riferimento per l'ora corrente */}
            <ReferenceLine
              x='09:00'
              stroke='#dc3545'
              strokeWidth={2}
              strokeDasharray='4 4'
              label={{
                value: 'ORA CORRENTE',
                position: 'top',
                style: {
                  fontSize: '10px',
                  fontWeight: 'bold',
                  fill: '#dc3545',
                },
              }}
            />

            {/* Linee dei dati */}
            <Line
              type='monotone'
              dataKey='real'
              stroke='#ff6b6b'
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 4,
                stroke: '#ff6b6b',
                strokeWidth: 2,
                fill: 'white',
              }}
              strokeOpacity={activeLines.real ? 1 : 0.3}
            />

            <Line
              type='monotone'
              dataKey='scheduled'
              stroke='#4ecdc4'
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                stroke: '#4ecdc4',
                strokeWidth: 2,
                fill: 'white',
              }}
              strokeOpacity={activeLines.scheduled ? 1 : 0.3}
            />

            <Line
              type='monotone'
              dataKey='forecasted'
              stroke='#45b7d1'
              strokeWidth={2}
              strokeDasharray='5 5'
              dot={false}
              activeDot={{
                r: 4,
                stroke: '#45b7d1',
                strokeWidth: 2,
                fill: 'white',
              }}
              strokeOpacity={activeLines.forecasted ? 1 : 0.3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer con statistiche che replica lo stile esistente */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          fontSize: '13px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}
            >
              {piccoGiornaliero.toFixed(1)} GW
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              PICCO GIORNALIERO
            </div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}
            >
              {minimoGiornaliero.toFixed(1)} GW
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              MINIMO GIORNALIERO
            </div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}
            >
              {mediaGiornaliera.toFixed(1)} GW
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              MEDIA GIORNALIERA
            </div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#28a745', fontSize: '16px' }}
            >
              {accuratezzaMedia.toFixed(1)}%
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              ACCURATEZZA MEDIA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEnergyDemandChart;
