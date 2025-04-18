import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  BarChart2,
  Bell,
  Clock,
  Filter,
  Eye,
  RefreshCw,
  Flag,
  Check,
  X,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

// Styled components for the anomaly detection UI
const Container = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-left: 10px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  margin-right: 8px;
  display: inline-flex;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 8px 15px;
  background-color: ${(props) => (props.active ? '#3385ad' : '#f1f1f1')};
  color: ${(props) => (props.active ? 'white' : '#333')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#286d8e' : '#e0e0e0')};
  }
`;

const RefreshButton = styled.button`
  padding: 8px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #388e3c;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background-color: ${(props) => props.bgColor || '#f9f9f9'};
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.color || '#333'};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #777;
`;

const AnomalyList = styled.div`
  margin-top: 20px;
`;

const AnomalyItem = styled.div`
  padding: 15px;
  background-color: ${(props) =>
    props.severity === 'high'
      ? '#ffebee'
      : props.severity === 'medium'
      ? '#fff8e1'
      : '#e8f5e9'};
  border-left: 4px solid
    ${(props) =>
      props.severity === 'high'
        ? '#f44336'
        : props.severity === 'medium'
        ? '#ffc107'
        : '#4caf50'};
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnomalyInfo = styled.div`
  flex: 1;
`;

const AnomalyTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`;

const AnomalyDescription = styled.div`
  font-size: 14px;
  color: #555;
`;

const AnomalyMeta = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
  font-size: 12px;
  color: #777;
`;

const AnomalyMetaItem = styled.div`
  display: flex;
  align-items: center;
`;

const AnomalyActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => props.color || '#3385ad'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#286d8e'};
  }
`;

const ChartWrapper = styled.div`
  height: 300px;
  margin-top: 20px;
`;

// Mock data for anomalies
const generateMockAnomalies = () => {
  const anomalyTypes = [
    {
      type: 'voltage',
      title: 'Anomalia di Tensione',
      description: 'Variazione di tensione superiore al 5% rilevata',
    },
    {
      type: 'frequency',
      title: 'Deviazione di Frequenza',
      description: 'Oscillazione di frequenza oltre i limiti normali',
    },
    {
      type: 'load',
      title: 'Picco di Carico',
      description: 'Aumento improvviso del carico oltre la capacità prevista',
    },
    {
      type: 'generation',
      title: 'Oscillazione di Generazione',
      description: 'Variazione rapida nella generazione rinnovabile',
    },
    {
      type: 'transformer',
      title: 'Sovraccarico Trasformatore',
      description: 'Temperatura del trasformatore sopra la norma',
    },
    {
      type: 'line',
      title: 'Congestione Linea',
      description: 'Linea di trasmissione operante vicino al limite',
    },
  ];

  const locations = [
    'Sottostazione Milano Ovest',
    'Nodo Roma Nord',
    'Linea Firenze-Bologna',
    'Trasformatore AT/MT Napoli',
    'Interconnessione Italia-Francia',
    'Centrale Eolica Foggia',
  ];

  const severities = ['low', 'medium', 'high'];

  const anomalies = [];
  for (let i = 0; i < 8; i++) {
    const anomalyType =
      anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const timestamp = new Date(
      Date.now() - Math.random() * 36 * 60 * 60 * 1000
    ); // Random time in the last 36 hours

    anomalies.push({
      id: i + 1,
      type: anomalyType.type,
      title: anomalyType.title,
      description: anomalyType.description,
      location: location,
      severity: severity,
      timestamp: timestamp,
      value: Math.round((Math.random() * 50 + 50) * 100) / 100, // Random value between 50 and 100
      threshold: 95,
      acknowledged: Math.random() > 0.7,
    });
  }

  return anomalies.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return (
      severityOrder[a.severity] - severityOrder[b.severity] ||
      b.timestamp - a.timestamp
    );
  });
};

// Generate time series data for charts
const generateTimeSeriesData = (anomalyType, anomalyTime) => {
  const now = new Date();
  const data = [];

  // Generate data for the past 24 hours
  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();

    let value;
    // Base value depends on time of day (simulating daily patterns)
    if (hour >= 8 && hour <= 20) {
      value = 80 + Math.random() * 10; // Higher during the day
    } else {
      value = 70 + Math.random() * 10; // Lower at night
    }

    // If this time is close to the anomaly time, create a spike or dip
    if (
      anomalyTime &&
      Math.abs(time.getTime() - anomalyTime.getTime()) < 2 * 60 * 60 * 1000
    ) {
      const hoursFromAnomaly =
        Math.abs(time.getTime() - anomalyTime.getTime()) / (60 * 60 * 1000);
      const anomalyEffect = (2 - hoursFromAnomaly) * 20; // Stronger effect closer to anomaly time

      if (
        anomalyType === 'voltage' ||
        anomalyType === 'frequency' ||
        anomalyType === 'load'
      ) {
        value += anomalyEffect; // Spike
      } else {
        value -= anomalyEffect; // Dip
      }
    }

    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value: Math.max(0, Math.min(120, value)), // Clamp between 0 and 120
      threshold: 95,
    });
  }

  return data;
};

/**
 * AIAnomalyDetection component provides advanced anomaly detection for grid operations
 * using machine learning algorithms to identify potential issues before they become critical
 */
const AIAnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [filteredAnomalies, setFilteredAnomalies] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
    acknowledged: 0,
  });
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [chartData, setChartData] = useState([]);

  // Initialize with mock data
  useEffect(() => {
    refreshAnomalies();
  }, []);

  // Update filtered anomalies when filter or anomalies change
  useEffect(() => {
    filterAnomalies(activeFilter);
  }, [anomalies, activeFilter]);

  // Generate chart data when selected anomaly changes
  useEffect(() => {
    if (selectedAnomaly) {
      setChartData(
        generateTimeSeriesData(selectedAnomaly.type, selectedAnomaly.timestamp)
      );
    }
  }, [selectedAnomaly]);

  const refreshAnomalies = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newAnomalies = generateMockAnomalies();
      setAnomalies(newAnomalies);

      // Update statistics
      const newStats = {
        total: newAnomalies.length,
        high: newAnomalies.filter((a) => a.severity === 'high').length,
        medium: newAnomalies.filter((a) => a.severity === 'medium').length,
        low: newAnomalies.filter((a) => a.severity === 'low').length,
        acknowledged: newAnomalies.filter((a) => a.acknowledged).length,
      };

      setStats(newStats);
      setLoading(false);
    }, 1000);
  };

  const filterAnomalies = (filter) => {
    let filtered;

    switch (filter) {
      case 'high':
        filtered = anomalies.filter((a) => a.severity === 'high');
        break;
      case 'medium':
        filtered = anomalies.filter((a) => a.severity === 'medium');
        break;
      case 'low':
        filtered = anomalies.filter((a) => a.severity === 'low');
        break;
      case 'unacknowledged':
        filtered = anomalies.filter((a) => !a.acknowledged);
        break;
      default:
        filtered = [...anomalies];
    }

    setFilteredAnomalies(filtered);
  };

  const handleAcknowledge = (id) => {
    setAnomalies((prev) =>
      prev.map((anomaly) =>
        anomaly.id === id ? { ...anomaly, acknowledged: true } : anomaly
      )
    );
  };

  const handleDismiss = (id) => {
    setAnomalies((prev) => prev.filter((anomaly) => anomaly.id !== id));
    if (selectedAnomaly && selectedAnomaly.id === id) {
      setSelectedAnomaly(null);
    }
  };

  const handleViewDetails = (anomaly) => {
    setSelectedAnomaly(anomaly);
  };

  // Get severity color for various UI elements
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  // Render severity icon with appropriate color
  const renderSeverityIcon = (severity) => {
    return (
      <IconWrapper>
        <AlertTriangle color={getSeverityColor(severity)} />
      </IconWrapper>
    );
  };

  // Render timestamp in a human-readable format
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = (now.getTime() - timestamp.getTime()) / 1000; // Difference in seconds

    if (diff < 60) {
      return 'Adesso';
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} min fa`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} ore fa`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  return (
    <Container>
      <Header>
        <AlertTriangle size={28} color='#d32f2f' />
        <Title>Rilevamento Anomalie basato su AI</Title>
      </Header>

      <Card>
        <CardHeader>
          <CardTitle>
            <IconWrapper>
              <Bell />
            </IconWrapper>
            Panoramica Anomalie
          </CardTitle>
          <RefreshButton onClick={refreshAnomalies} disabled={loading}>
            <RefreshCw size={18} style={{ marginRight: '5px' }} />
            {loading ? 'Aggiornamento...' : 'Aggiorna'}
          </RefreshButton>
        </CardHeader>

        <StatsContainer>
          <StatCard bgColor='#f3f7fe'>
            <StatValue color='#3385ad'>{stats.total}</StatValue>
            <StatLabel>Anomalie Totali</StatLabel>
          </StatCard>
          <StatCard bgColor='#fff8f7'>
            <StatValue color='#f44336'>{stats.high}</StatValue>
            <StatLabel>Alta Priorità</StatLabel>
          </StatCard>
          <StatCard bgColor='#fff8e1'>
            <StatValue color='#ffc107'>{stats.medium}</StatValue>
            <StatLabel>Media Priorità</StatLabel>
          </StatCard>
          <StatCard bgColor='#e8f5e9'>
            <StatValue color='#4caf50'>{stats.low}</StatValue>
            <StatLabel>Bassa Priorità</StatLabel>
          </StatCard>
          <StatCard bgColor='#f5f5f5'>
            <StatValue color='#757575'>{stats.acknowledged}</StatValue>
            <StatLabel>Riconosciute</StatLabel>
          </StatCard>
        </StatsContainer>

        <FilterContainer>
          <FilterButton
            active={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            <Filter size={16} style={{ marginRight: '5px' }} />
            Tutte
          </FilterButton>
          <FilterButton
            active={activeFilter === 'high'}
            onClick={() => setActiveFilter('high')}
          >
            <AlertTriangle
              size={16}
              style={{ marginRight: '5px' }}
              color={activeFilter === 'high' ? 'white' : '#f44336'}
            />
            Alta Priorità
          </FilterButton>
          <FilterButton
            active={activeFilter === 'medium'}
            onClick={() => setActiveFilter('medium')}
          >
            <AlertTriangle
              size={16}
              style={{ marginRight: '5px' }}
              color={activeFilter === 'medium' ? 'white' : '#ffc107'}
            />
            Media Priorità
          </FilterButton>
          <FilterButton
            active={activeFilter === 'low'}
            onClick={() => setActiveFilter('low')}
          >
            <AlertTriangle
              size={16}
              style={{ marginRight: '5px' }}
              color={activeFilter === 'low' ? 'white' : '#4caf50'}
            />
            Bassa Priorità
          </FilterButton>
          <FilterButton
            active={activeFilter === 'unacknowledged'}
            onClick={() => setActiveFilter('unacknowledged')}
          >
            <Flag size={16} style={{ marginRight: '5px' }} />
            Da Riconoscere
          </FilterButton>
        </FilterContainer>

        <AnomalyList>
          {filteredAnomalies.length === 0 ? (
            <div
              style={{ textAlign: 'center', padding: '20px', color: '#757575' }}
            >
              Nessuna anomalia trovata con i filtri correnti
            </div>
          ) : (
            filteredAnomalies.map((anomaly) => (
              <AnomalyItem key={anomaly.id} severity={anomaly.severity}>
                <AnomalyInfo>
                  <AnomalyTitle>
                    {renderSeverityIcon(anomaly.severity)}
                    {anomaly.title} - {anomaly.location}
                    {anomaly.acknowledged && (
                      <span
                        style={{
                          marginLeft: '10px',
                          fontSize: '12px',
                          color: '#757575',
                        }}
                      >
                        (Riconosciuta)
                      </span>
                    )}
                  </AnomalyTitle>
                  <AnomalyDescription>{anomaly.description}</AnomalyDescription>
                  <AnomalyMeta>
                    <AnomalyMetaItem>
                      <Clock size={12} style={{ marginRight: '5px' }} />
                      {formatTimestamp(anomaly.timestamp)}
                    </AnomalyMetaItem>
                    <AnomalyMetaItem>
                      <BarChart2 size={12} style={{ marginRight: '5px' }} />
                      Valore: {anomaly.value} (Soglia: {anomaly.threshold})
                    </AnomalyMetaItem>
                  </AnomalyMeta>
                </AnomalyInfo>
                <AnomalyActions>
                  <ActionButton onClick={() => handleViewDetails(anomaly)}>
                    <Eye size={16} style={{ marginRight: '5px' }} />
                    Dettagli
                  </ActionButton>
                  {!anomaly.acknowledged && (
                    <ActionButton
                      onClick={() => handleAcknowledge(anomaly.id)}
                      color='#4caf50'
                      hoverColor='#388e3c'
                    >
                      <Check size={16} style={{ marginRight: '5px' }} />
                      Riconosci
                    </ActionButton>
                  )}
                  <ActionButton
                    onClick={() => handleDismiss(anomaly.id)}
                    color='#f44336'
                    hoverColor='#d32f2f'
                  >
                    <X size={16} style={{ marginRight: '5px' }} />
                    Ignora
                  </ActionButton>
                </AnomalyActions>
              </AnomalyItem>
            ))
          )}
        </AnomalyList>
      </Card>

      {selectedAnomaly && (
        <Card>
          <CardHeader>
            <CardTitle>
              <IconWrapper>
                <BarChart2 />
              </IconWrapper>
              Dettagli Anomalia: {selectedAnomaly.title}
            </CardTitle>
          </CardHeader>

          <div>
            <div style={{ margin: '10px 0' }}>
              <strong>Localizzazione:</strong> {selectedAnomaly.location}
            </div>
            <div style={{ margin: '10px 0' }}>
              <strong>Severità:</strong>{' '}
              <span
                style={{ color: getSeverityColor(selectedAnomaly.severity) }}
              >
                {selectedAnomaly.severity === 'high'
                  ? 'Alta'
                  : selectedAnomaly.severity === 'medium'
                  ? 'Media'
                  : 'Bassa'}
              </span>
            </div>
            <div style={{ margin: '10px 0' }}>
              <strong>Rilevata:</strong>{' '}
              {selectedAnomaly.timestamp.toLocaleString()}
            </div>
            <div style={{ margin: '10px 0' }}>
              <strong>Stato:</strong>{' '}
              {selectedAnomaly.acknowledged ? 'Riconosciuta' : 'Da riconoscere'}
            </div>
            <div style={{ margin: '10px 0' }}>
              <strong>Descrizione:</strong> {selectedAnomaly.description}
            </div>

            <ChartWrapper>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='time' />
                  <YAxis domain={[0, 120]} />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke='#3385ad'
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type='monotone'
                    dataKey='threshold'
                    stroke='#ff9800'
                    strokeWidth={2}
                    strokeDasharray='5 5'
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <div style={{ marginTop: '20px' }}>
              <strong>Raccomandazioni AI:</strong>
              <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                {selectedAnomaly.type === 'voltage' && (
                  <>
                    <li>
                      Verificare gli impianti di regolazione della tensione
                      nella sottostazione
                    </li>
                    <li>
                      Controllare le batterie di condensatori e reattori shunt
                    </li>
                    <li>
                      Monitorare i trasformatori con variatori sotto carico
                    </li>
                  </>
                )}
                {selectedAnomaly.type === 'frequency' && (
                  <>
                    <li>
                      Verificare le riserve di regolazione primaria disponibili
                    </li>
                    <li>Controllare i sistemi di regolazione secondaria</li>
                    <li>
                      Considerare l'attivazione di contratti di interrompibilità
                    </li>
                  </>
                )}
                {selectedAnomaly.type === 'load' && (
                  <>
                    <li>
                      Verificare la previsione di carico nelle prossime ore
                    </li>
                    <li>
                      Controllare la disponibilità di risorse per il
                      bilanciamento
                    </li>
                    <li>
                      Preparare sistemi di alleggerimento carico se i valori
                      continuano a salire
                    </li>
                  </>
                )}
                {selectedAnomaly.type === 'generation' && (
                  <>
                    <li>Verificare le previsioni meteo per le prossime ore</li>
                    <li>Attivare riserve termoelettriche a rapida risposta</li>
                    <li>Monitorare le interconnessioni transfrontaliere</li>
                  </>
                )}
                {selectedAnomaly.type === 'transformer' && (
                  <>
                    <li>
                      Verificare i sistemi di raffreddamento del trasformatore
                    </li>
                    <li>
                      Controllare i carichi dell'area servita dal trasformatore
                    </li>
                    <li>Predisporre trasformatori di riserva se disponibili</li>
                  </>
                )}
                {selectedAnomaly.type === 'line' && (
                  <>
                    <li>
                      Verificare possibili ridispacciamenti per ridurre il
                      flusso sulla linea
                    </li>
                    <li>Controllare le condizioni meteorologiche locali</li>
                    <li>
                      Monitorare le temperature dei conduttori in tempo reale
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default AIAnomalyDetection;
