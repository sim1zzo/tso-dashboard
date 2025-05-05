import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  AlertTriangle,
  Zap,
  Euro,
  TrendingDown,
  RefreshCw,
  Eye,
  BarChart2,
  PieChart as PieChartIcon,
  Clock,
  Check,
  Map,
  Filter,
  Download,
  Activity,
  Layers,
  TrendingUp,
  ArrowRight,
  Wind,
} from 'lucide-react';

const CongestionManagement = () => {
  const [congestions, setCongestions] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [filterValue, setFilterValue] = useState('all');
  const [showMap, setShowMap] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timelineData, setTimelineData] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [optimizationTarget, setOptimizationTarget] = useState('economic');

  // Genera dati storici per la timeline
  useEffect(() => {
    const now = new Date();
    const timelinePoints = Array.from({ length: 24 }, (_, i) => {
      const date = new Date(now);
      date.setHours(date.getHours() - 23 + i);
      return {
        time: date.toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        congestione: Math.floor(Math.random() * 50) + 50,
        costo: Math.floor(Math.random() * 3000) + 1000,
      };
    });
    setTimelineData(timelinePoints);
  }, []);

  const analyzeCongestions = () => {
    setIsLoading(true);
    setIsAnimating(true);

    setTimeout(() => {
      setCongestions([
        {
          id: 1,
          location: 'Linea Milano-Torino',
          severity: 'Alta',
          expectedDuration: '2 ore',
          load: 120,
          capacity: 100,
          timestamp: '14:30',
          affectedAreas: 'Area Nord-Ovest',
          impact: 'Sovraccarico 20%',
          energyType: 'Rinnovabile',
        },
        {
          id: 2,
          location: 'Nodo Roma',
          severity: 'Media',
          expectedDuration: '1 ora',
          load: 105,
          capacity: 100,
          timestamp: '15:15',
          affectedAreas: 'Area Centro',
          impact: 'Sovraccarico 5%',
          energyType: 'Mista',
        },
        {
          id: 3,
          location: 'Linea Napoli-Bari',
          severity: 'Bassa',
          expectedDuration: '30 minuti',
          load: 95,
          capacity: 100,
          timestamp: '16:00',
          affectedAreas: 'Area Sud',
          impact: 'Possibile sovraccarico',
          energyType: 'Termoelettrica',
        },
        {
          id: 4,
          location: 'Nodo Bologna',
          severity: 'Media',
          expectedDuration: '45 minuti',
          load: 102,
          capacity: 100,
          timestamp: '14:45',
          affectedAreas: 'Area Nord-Est',
          impact: 'Sovraccarico 2%',
          energyType: 'Rinnovabile',
        },
      ]);

      setStrategies([
        {
          id: 1,
          action: 'Ridispacciamento centrale termica Piacenza',
          cost: 5000,
          impact: 'Riduzione congestione del 70%',
          efficiency: 70,
          co2Impact: -1200,
          timeToImplement: '15 min',
          renewableImpact: 'Neutrale',
        },
        {
          id: 2,
          action: 'Attivazione riserva idroelettrica Valtellina',
          cost: 3000,
          impact: 'Riduzione congestione del 50%',
          efficiency: 50,
          co2Impact: -800,
          timeToImplement: '30 min',
          renewableImpact: 'Positivo',
        },
        {
          id: 3,
          action: 'Modulazione parco eolico Puglia',
          cost: 2000,
          impact: 'Riduzione congestione del 30%',
          efficiency: 30,
          co2Impact: -500,
          timeToImplement: '10 min',
          renewableImpact: 'Positivo',
        },
        {
          id: 4,
          action: 'Riduzione carico industriale zona Lombardia',
          cost: 6000,
          impact: 'Riduzione congestione del 80%',
          efficiency: 80,
          co2Impact: -1500,
          timeToImplement: '20 min',
          renewableImpact: 'Neutrale',
        },
      ]);

      setIsLoading(false);

      // Ferma l'animazione dopo un po'
      setTimeout(() => setIsAnimating(false), 1000);
    }, 1500);
  };

  // Filtra le strategie in base al target di ottimizzazione
  const getFilteredStrategies = () => {
    if (optimizationTarget === 'economic') {
      return [...strategies].sort((a, b) => a.cost - b.cost);
    } else if (optimizationTarget === 'efficiency') {
      return [...strategies].sort((a, b) => b.efficiency - a.efficiency);
    } else if (optimizationTarget === 'environmental') {
      return [...strategies].sort((a, b) => a.co2Impact - b.co2Impact);
    } else if (optimizationTarget === 'time') {
      return [...strategies].sort((a, b) => {
        const aTime = parseInt(a.timeToImplement.split(' ')[0]);
        const bTime = parseInt(b.timeToImplement.split(' ')[0]);
        return aTime - bTime;
      });
    }
    return strategies;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Alta':
        return '#ef4444';
      case 'Media':
        return '#f59e0b';
      case 'Bassa':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getImpactColor = (impact) => {
    if (impact.includes('70%') || impact.includes('80%')) return '#10b981';
    if (impact.includes('50%') || impact.includes('60%')) return '#0ea5e9';
    return '#f59e0b';
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
    marginTop: '16px',
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

  const congestionCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const strategyCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const tooltipStyle = {
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
  };

  // Componente per tooltip personalizzato
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={tooltipStyle}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '2px 0', color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString('it-IT')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Componente per la mappa stilizzata delle congestioni
  const renderGridMap = () => {
    return (
      <div
        style={{
          ...cardStyle,
          padding: '16px',
          marginTop: '24px',
          animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
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
            <Map
              size={18}
              style={{ verticalAlign: 'middle', marginRight: '8px' }}
            />
            Mappa delle Congestioni
          </h3>
          <button
            onClick={() => setShowMap(!showMap)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              backgroundColor: '#f1f5f9',
              border: 'none',
              borderRadius: '6px',
              color: '#64748b',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <Eye size={16} style={{ marginRight: '6px' }} />
            {showMap ? 'Nascondi' : 'Mostra'} Mappa
          </button>
        </div>

        {showMap && (
          <div
            style={{
              height: '400px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Rete stilizzata */}
            <div style={{ padding: '16px' }}>
              {/* Nodi principali */}
              <div
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '25%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#0ea5e9',
                  boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.2)',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '30%',
                  left: '60%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#0ea5e9',
                  boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.2)',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '60%',
                  left: '40%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#0ea5e9',
                  boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.2)',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '70%',
                  left: '70%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#0ea5e9',
                  boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.2)',
                }}
              ></div>

              {/* Linee di connessione */}
              <div
                style={{
                  position: 'absolute',
                  top: '26%',
                  left: '26.5%',
                  width: '33.5%',
                  height: '4px',
                  backgroundColor: '#ef4444',
                  transform: 'rotate(7deg)',
                  transformOrigin: '0 0',
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '31%',
                  left: '40%',
                  width: '20%',
                  height: '4px',
                  backgroundColor: '#f59e0b',
                  transform: 'rotate(45deg)',
                  transformOrigin: '0 0',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '60%',
                  left: '41%',
                  width: '29%',
                  height: '4px',
                  backgroundColor: '#10b981',
                  transform: 'rotate(11deg)',
                  transformOrigin: '0 0',
                }}
              ></div>

              {/* Etichette */}
              <div
                style={{
                  position: 'absolute',
                  top: '21%',
                  left: '20%',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#334155',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Milano
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '26%',
                  left: '60%',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#334155',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Bologna
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '56%',
                  left: '36%',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#334155',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Roma
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '72%',
                  left: '66%',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#334155',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Napoli
              </div>

              {/* Indicatori di congestione */}
              <div
                style={{
                  position: 'absolute',
                  top: '18%',
                  left: '42%',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: '#ef4444',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                Congestione Alta
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '47%',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: '#f59e0b',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                Congestione Media
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '67%',
                  left: '56%',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'white',
                  backgroundColor: '#10b981',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                Congestione Bassa
              </div>
            </div>

            {/* Legenda */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                Legenda:
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#ef4444',
                    marginRight: '8px',
                    borderRadius: '2px',
                  }}
                ></div>
                <span>Congestione Alta</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#f59e0b',
                    marginRight: '8px',
                    borderRadius: '2px',
                  }}
                ></div>
                <span>Congestione Media</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#10b981',
                    marginRight: '8px',
                    borderRadius: '2px',
                  }}
                ></div>
                <span>Congestione Bassa</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Timeline di congestione
  const renderTimeline = () => {
    return (
      <div
        style={{
          ...cardStyle,
          padding: '16px',
          marginTop: '24px',
          animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
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
            <Clock
              size={18}
              style={{ verticalAlign: 'middle', marginRight: '8px' }}
            />
            Andamento Temporale delle Congestioni
          </h3>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              backgroundColor: '#f1f5f9',
              border: 'none',
              borderRadius: '6px',
              color: '#64748b',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <Eye size={16} style={{ marginRight: '6px' }} />
            {showTimeline ? 'Nascondi' : 'Mostra'} Timeline
          </button>
        </div>

        {showTimeline && (
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={timelineData}
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
                  yAxisId='left'
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickLine={{ stroke: '#cbd5e1' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  label={{
                    value: 'Livello Congestione (%)',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#64748b',
                    fontSize: 12,
                  }}
                />
                <YAxis
                  yAxisId='right'
                  orientation='right'
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  tickLine={{ stroke: '#cbd5e1' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  label={{
                    value: 'Costo (€)',
                    angle: -90,
                    position: 'insideRight',
                    fill: '#64748b',
                    fontSize: 12,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='congestione'
                  stroke='#ef4444'
                  name='Livello Congestione (%)'
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: '#ef4444',
                    stroke: 'white',
                    strokeWidth: 2,
                  }}
                />
                <Line
                  yAxisId='right'
                  type='monotone'
                  dataKey='costo'
                  stroke='#0ea5e9'
                  name='Costo (€)'
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: '#0ea5e9',
                    stroke: 'white',
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  };

  const renderCongestions = () => (
    <div
      style={{
        ...cardStyle,
        animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
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
          <AlertTriangle
            size={18}
            style={{ verticalAlign: 'middle', marginRight: '8px' }}
          />
          Congestioni Rilevate
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '6px 12px',
            backgroundColor: '#f8fafc',
            borderRadius: '6px',
            color: '#64748b',
            fontSize: '14px',
          }}
        >
          <Filter size={14} style={{ marginRight: '6px' }} />
          Filtro:
          <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            style={{
              marginLeft: '8px',
              padding: '4px 8px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              backgroundColor: 'white',
              color: '#334155',
              fontSize: '14px',
            }}
          >
            <option value='all'>Tutte</option>
            <option value='high'>Alta Severità</option>
            <option value='medium'>Media Severità</option>
            <option value='low'>Bassa Severità</option>
          </select>
        </div>
      </div>

      {congestions
        .filter(
          (cong) =>
            filterValue === 'all' ||
            (filterValue === 'high' && cong.severity === 'Alta') ||
            (filterValue === 'medium' && cong.severity === 'Media') ||
            (filterValue === 'low' && cong.severity === 'Bassa')
        )
        .map((cong, index) => (
          <div
            key={index}
            style={{
              ...congestionCardStyle,
              borderLeft: `4px solid ${getSeverityColor(cong.severity)}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#334155',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Map
                    size={16}
                    style={{ marginRight: '8px', color: '#64748b' }}
                  />
                  {cong.location}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '4px',
                  }}
                >
                  <Clock size={14} style={{ marginRight: '6px' }} />
                  Durata prevista: {cong.expectedDuration}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Activity size={14} style={{ marginRight: '6px' }} />
                  {cong.impact}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    color: 'white',
                    backgroundColor: getSeverityColor(cong.severity),
                    fontWeight: '500',
                    fontSize: '14px',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    marginBottom: '8px',
                    display: 'inline-block',
                  }}
                >
                  Severità: {cong.severity}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                  }}
                >
                  Registrata alle {cong.timestamp}
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: '4px',
                  }}
                >
                  {cong.energyType === 'Rinnovabile' && (
                    <Wind
                      size={14}
                      style={{ marginRight: '4px', color: '#10b981' }}
                    />
                  )}
                  {cong.energyType}
                </div>
              </div>
            </div>

            {/* Barra di carico */}
            <div
              style={{
                marginTop: '12px',
                backgroundColor: '#f1f5f9',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(cong.load / cong.capacity) * 100}%`,
                  backgroundColor: getSeverityColor(cong.severity),
                  height: '100%',
                }}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );

  const renderStrategies = () => {
    const filteredStrategies = getFilteredStrategies();

    return (
      <div
        style={{
          ...cardStyle,
          animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
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
            <Check
              size={18}
              style={{ verticalAlign: 'middle', marginRight: '8px' }}
            />
            Strategie di Mitigazione Suggerite
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              color: '#64748b',
              fontSize: '14px',
            }}
          >
            <TrendingUp size={14} style={{ marginRight: '6px' }} />
            Ottimizza per:
            <select
              value={optimizationTarget}
              onChange={(e) => setOptimizationTarget(e.target.value)}
              style={{
                marginLeft: '8px',
                padding: '4px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#334155',
                fontSize: '14px',
              }}
            >
              <option value='economic'>Costo</option>
              <option value='efficiency'>Efficienza</option>
              <option value='environmental'>Impatto Ambientale</option>
              <option value='time'>Tempo di Implementazione</option>
            </select>
          </div>
        </div>

        {filteredStrategies.map((strategy, index) => (
          <div
            key={index}
            style={{
              ...strategyCardStyle,
              borderLeft: `4px solid ${getImpactColor(strategy.impact)}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#334155',
                    marginBottom: '8px',
                  }}
                >
                  {strategy.action}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    fontSize: '14px',
                    marginTop: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#64748b',
                    }}
                  >
                    <Euro
                      size={16}
                      style={{ marginRight: '6px', color: '#0ea5e9' }}
                    />
                    Costo: €{strategy.cost.toLocaleString('it-IT')}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#64748b',
                    }}
                  >
                    <TrendingDown
                      size={16}
                      style={{ marginRight: '6px', color: '#10b981' }}
                    />
                    {strategy.impact}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#64748b',
                    }}
                  >
                    <Clock
                      size={16}
                      style={{ marginRight: '6px', color: '#f59e0b' }}
                    />
                    Tempo: {strategy.timeToImplement}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#64748b',
                    }}
                  >
                    <Wind
                      size={16}
                      style={{
                        marginRight: '6px',
                        color:
                          strategy.renewableImpact === 'Positivo'
                            ? '#10b981'
                            : '#64748b',
                      }}
                    />
                    Impatto rinnovabili: {strategy.renewableImpact}
                  </div>
                </div>
              </div>

              <div
                style={{
                  textAlign: 'right',
                  minWidth: '100px',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '4px solid #0ea5e9',
                    backgroundColor: 'white',
                    color: '#0ea5e9',
                    fontSize: '20px',
                    fontWeight: '700',
                  }}
                >
                  {strategy.efficiency}%
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#64748b',
                    marginTop: '4px',
                  }}
                >
                  Efficienza
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div
              style={{
                marginTop: '12px',
                backgroundColor: '#f1f5f9',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${strategy.efficiency}%`,
                  backgroundColor: getImpactColor(strategy.impact),
                  height: '100%',
                }}
              ></div>
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            color: '#64748b',
          }}
        >
          <div
            style={{ fontWeight: '600', color: '#334155', marginBottom: '4px' }}
          >
            Nota sulla classificazione:
          </div>
          Le strategie mostrate sono classificate in base al criterio "
          {optimizationTarget === 'economic'
            ? 'costo economico'
            : optimizationTarget === 'efficiency'
            ? 'efficienza di mitigazione'
            : optimizationTarget === 'environmental'
            ? 'impatto ambientale'
            : 'tempo di implementazione'}
          ".
        </div>
      </div>
    );
  };

  const renderEfficiencyChart = () => (
    <div
      style={{
        ...cardStyle,
        animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
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
          <Layers
            size={18}
            style={{ verticalAlign: 'middle', marginRight: '8px' }}
          />
          Comparazione delle Strategie
        </h3>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setChartType('bar')}
            style={chartType === 'bar' ? tabButtonActiveStyle : tabButtonStyle}
          >
            <BarChart2 size={16} style={{ marginRight: '6px' }} /> Barre
          </button>
          <button
            onClick={() => setChartType('pie')}
            style={chartType === 'pie' ? tabButtonActiveStyle : tabButtonStyle}
          >
            <PieChartIcon size={16} style={{ marginRight: '6px' }} /> Torta
          </button>
        </div>
      </div>

      <div style={{ height: '350px' }}>
        <ResponsiveContainer width='100%' height='100%'>
          {chartType === 'bar' ? (
            <BarChart
              data={strategies}
              margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' />
              <XAxis
                dataKey='action'
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
                angle={-45}
                textAnchor='end'
                height={100}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar
                dataKey='efficiency'
                name='Efficienza (%)'
                fill='#0ea5e9'
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
              <Bar
                dataKey='cost'
                name='Costo (€)'
                fill='#10b981'
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
              <Bar
                dataKey='co2Impact'
                name='Impatto CO2 (kg)'
                fill='#f59e0b'
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={strategies}
                nameKey='action'
                dataKey='efficiency'
                cx='50%'
                cy='50%'
                outerRadius={100}
                fill='#8884d8'
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: '#64748b', strokeWidth: 1 }}
              >
                {strategies.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'][index % 4]
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value, entry, index) => {
                  return (
                    <span style={{ color: '#334155', fontSize: '14px' }}>
                      {value}
                    </span>
                  );
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Formatta ora corrente in formato IT
  const now = new Date();
  const formattedTime = now.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Zap style={{ marginRight: '12px', color: '#0ea5e9' }} size={32} />
        Gestione Intelligente delle Congestioni
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
          onClick={analyzeCongestions}
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
              Analisi in corso...
            </>
          ) : (
            <>
              <RefreshCw size={16} style={{ marginRight: '8px' }} />
              Analizza Congestioni
            </>
          )}
        </button>
      </div>

      {congestions.length > 0 && (
        <>
          {/* Dashboard riassuntivo */}
          <div
            style={{
              ...cardStyle,
              padding: '24px',
              marginBottom: '24px',
              backgroundImage: 'linear-gradient(to right, #f0f9ff, #e0f2fe)',
              animation: isAnimating ? 'fadeIn 0.5s ease-out' : 'none',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#334155',
                marginTop: 0,
                marginBottom: '16px',
              }}
            >
              Dashboard di Analisi
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '16px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: '#0ea5e920',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                  }}
                >
                  <AlertTriangle size={24} color='#0ea5e9' />
                </div>
                <div>
                  <div
                    style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    Congestioni Attive
                  </div>
                  <div
                    style={{
                      color: '#0f172a',
                      fontSize: '24px',
                      fontWeight: '700',
                    }}
                  >
                    {congestions.length}
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: '#10b98120',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                  }}
                >
                  <Check size={24} color='#10b981' />
                </div>
                <div>
                  <div
                    style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    Soluzioni Disponibili
                  </div>
                  <div
                    style={{
                      color: '#0f172a',
                      fontSize: '24px',
                      fontWeight: '700',
                    }}
                  >
                    {strategies.length}
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: '#f59e0b20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                  }}
                >
                  <Euro size={24} color='#f59e0b' />
                </div>
                <div>
                  <div
                    style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    Costo Stimato
                  </div>
                  <div
                    style={{
                      color: '#0f172a',
                      fontSize: '24px',
                      fontWeight: '700',
                    }}
                  >
                    €
                    {strategies
                      .reduce((sum, s) => sum + s.cost, 0)
                      .toLocaleString('it-IT')}
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'white',
                  padding: '16px',
                  borderRadius: '8px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: '#8b5cf620',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px',
                  }}
                >
                  <TrendingUp size={24} color='#8b5cf6' />
                </div>
                <div>
                  <div
                    style={{
                      color: '#64748b',
                      fontSize: '14px',
                      marginBottom: '4px',
                    }}
                  >
                    Efficienza Media
                  </div>
                  <div
                    style={{
                      color: '#0f172a',
                      fontSize: '24px',
                      fontWeight: '700',
                    }}
                  >
                    {Math.round(
                      strategies.reduce((sum, s) => sum + s.efficiency, 0) /
                        strategies.length
                    )}
                    %
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                color: '#334155',
                fontSize: '14px',
              }}
            >
              <div
                style={{
                  fontWeight: '600',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Activity
                  size={16}
                  style={{ marginRight: '8px', color: '#0ea5e9' }}
                />
                Raccomandazione del Sistema:
              </div>
              <p style={{ margin: '0 0 8px 0' }}>
                In base all'analisi delle congestioni attuali, si consiglia di
                implementare la strategia "
                {strategies.length > 0 ? getFilteredStrategies()[0].action : ''}
                " come soluzione ottimale, che offre il miglior compromesso tra
                costo, tempo di implementazione e riduzione della congestione.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#0ea5e9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >
                  Implementa Strategia{' '}
                  <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            <div>
              {renderCongestions()}
              {renderStrategies()}
            </div>
            <div>
              {renderEfficiencyChart()}
              {renderGridMap()}
              {renderTimeline()}
            </div>
          </div>
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
            Il sistema utilizza algoritmi predittivi basati su machine learning
            per anticipare congestioni di rete.
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
            Le strategie di ridispacciamento suggerite sono ottimizzate per
            mitigare le congestioni con il minimo impatto economico.
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
            Viene fornita una valutazione dell'impatto economico e
            dell'efficienza per ciascuna strategia proposta.
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
            I dati in tempo reale provenienti da PMU (Phasor Measurement Units)
            sono integrati nell'analisi.
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
            Il sistema considera anche le previsioni meteo per ottimizzare
            l'utilizzo delle risorse rinnovabili nella gestione delle
            congestioni.
          </li>
        </ul>
      </div>

      {/* Footer */}
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

export default CongestionManagement;
