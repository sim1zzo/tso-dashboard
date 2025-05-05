import React, { useState, useEffect, useRef } from 'react';
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
  MapPin,
  Info,
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

// Adding all missing styled components
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0 0 0 10px;
  font-size: 24px;
  color: #333;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: #333;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  min-width: 150px;
  padding: 15px;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor || '#f5f5f5'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.color || '#333'};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px 20px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.active ? '#3385ad' : '#f5f5f5')};
  color: ${(props) => (props.active ? 'white' : '#666')};
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#2a6d8e' : '#e0e0e0')};
  }
`;

const AnomalyList = styled.div`
  padding: 0 20px 20px;
  max-height: 500px;
  overflow-y: auto;
`;

const AnomalyItem = styled.div`
  border-left: 4px solid
    ${(props) => {
      switch (props.severity) {
        case 'high':
          return '#f44336';
        case 'medium':
          return '#ffc107';
        case 'low':
          return '#4caf50';
        default:
          return '#757575';
      }
    }};
  background-color: white;
  border-radius: 4px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const AnomalyInfo = styled.div`
  padding: 15px;
`;

const AnomalyTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const AnomalyDescription = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const AnomalyMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const AnomalyMetaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #777;
`;

const AnomalyActions = styled.div`
  display: flex;
  padding: 0 15px 15px;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.color || '#3385ad'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#2a6d8e'};
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin: 20px 0;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
`;

// Location coordinates for mock data (real Italian geographic coordinates)
const locationCoordinates = {
  'Sottostazione Milano Ovest': [45.4642, 9.19],
  'Nodo Roma Nord': [41.9028, 12.4964],
  'Linea Firenze-Bologna': [43.7946, 11.2515],
  'Trasformatore AT/MT Napoli': [40.8518, 14.2681],
  'Interconnessione Italia-Francia': [45.7692, 6.9801],
  'Centrale Eolica Foggia': [41.4621, 15.5464],
  'Stazione Torino Est': [45.0703, 7.6869],
  'Centrale Solare Bari': [41.1172, 16.8719],
  'Impianto Venezia': [45.4371, 12.3326],
  'Sottostazione Palermo': [38.1121, 13.3366],
  'Interconnessione Sicilia': [37.5079, 15.083],
  'Genova Centrale': [44.4056, 8.9463],
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
  const [map, setMap] = useState(null);
  const [markersGroup, setMarkersGroup] = useState(null);
  const [markers, setMarkers] = useState({});
  const [mapInitialized, setMapInitialized] = useState(false);
  const mapContainerRef = useRef(null);

  // Add global animation styles
  useEffect(() => {
    // Create and add global style for animations
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .spin {
        animation: spin 1s linear infinite;
      }
    `;
    document.head.appendChild(styleElement);

    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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

  // Initialize Leaflet map
  useEffect(() => {
    // To prevent multiple initializations, check if already initialized
    if (mapInitialized) return;

    if (!window.L) {
      // Load Leaflet CSS if not already loaded
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href =
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.css';
        document.head.appendChild(linkElement);
      }

      // Load Leaflet script if not already loaded
      if (!document.querySelector('script[src*="leaflet.js"]')) {
        const scriptElement = document.createElement('script');
        scriptElement.src =
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/leaflet.js';
        scriptElement.onload = initializeMap;
        document.body.appendChild(scriptElement);
      } else {
        // Script exists but we need to wait for it to load
        setTimeout(initializeMap, 100);
      }
    } else {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapInitialized, map]);

  // Update map markers when filtered anomalies change
  useEffect(() => {
    if (mapInitialized && markersGroup && filteredAnomalies.length > 0) {
      updateMapMarkers();
    }
  }, [filteredAnomalies, mapInitialized, markersGroup]);

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

    const locations = Object.keys(locationCoordinates);
    const severities = ['low', 'medium', 'high'];

    const anomalies = [];
    for (let i = 0; i < 12; i++) {
      const anomalyType =
        anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const severity =
        severities[Math.floor(Math.random() * severities.length)];
      const timestamp = new Date(
        Date.now() - Math.random() * 36 * 60 * 60 * 1000
      ); // Random time in the last 36 hours

      anomalies.push({
        id: i + 1,
        type: anomalyType.type,
        title: anomalyType.title,
        description: anomalyType.description,
        location: location,
        coordinates: locationCoordinates[location],
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
        time: time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        value: Math.max(0, Math.min(120, value)), // Clamp between 0 and 120
        threshold: 95,
      });
    }

    return data;
  };

  // Initialize Leaflet map
  const initializeMap = () => {
    // Wait for the element to exist in the DOM and ensure it's not already initialized
    if (!mapContainerRef.current || mapInitialized) return;

    try {
      // Check if the map container already has a Leaflet instance
      const containerElement = mapContainerRef.current;
      if (containerElement._leaflet_id) {
        console.log('Map already initialized, skipping initialization');
        return;
      }

      // Create a new map instance
      const newMap = window.L.map(mapContainerRef.current).setView(
        [42.5, 12.5],
        6
      );

      // Add the map layer (OpenStreetMap)
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap);

      // Create a group for markers
      const newMarkersGroup = window.L.layerGroup().addTo(newMap);

      setMap(newMap);
      setMarkersGroup(newMarkersGroup);
      setMapInitialized(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  // Update markers on the map
  const updateMapMarkers = () => {
    if (!window.L || !map || !markersGroup) return;

    // Clear existing markers
    markersGroup.clearLayers();
    let newMarkers = {};

    // Add markers for filtered anomalies
    filteredAnomalies.forEach((anomaly) => {
      if (!anomaly.coordinates) return;

      // Create custom icon based on severity
      const color = getSeverityColor(anomaly.severity);

      const customIcon = window.L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="
          background-color: ${color};
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 0 2px ${color};
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      // Create marker
      const marker = window.L.marker(anomaly.coordinates, {
        icon: customIcon,
      }).addTo(markersGroup);

      // Add popup
      marker.bindPopup(`
        <div style="width: 200px; padding: 8px;">
          <h3 style="margin: 0 0 8px; font-size: 14px; font-weight: bold; color: ${color};">
            ${anomaly.title}
          </h3>
          <p style="margin: 0 0 8px; font-size: 12px;">${
            anomaly.description
          }</p>
          <div style="font-size: 11px; color: #666;">
            <div>${anomaly.location}</div>
            <div>Rilevato: ${formatTimestamp(anomaly.timestamp)}</div>
          </div>
        </div>
      `);

      // Handle click
      marker.on('click', () => {
        setSelectedAnomaly(anomaly);
      });

      // Store marker for reference
      newMarkers[anomaly.id] = marker;
    });

    setMarkers(newMarkers);
  };

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

    // If map and markers are initialized, open the popup for this anomaly
    if (mapInitialized && markers[anomaly.id]) {
      markers[anomaly.id].openPopup();

      // Center map on the selected anomaly
      if (map && anomaly.coordinates) {
        map.setView(anomaly.coordinates, 8);
      }
    }
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

  // Get severity name
  const getSeverityName = (severity) => {
    switch (severity) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Bassa';
      default:
        return '';
    }
  };

  return (
    <Container>
      {/* Header */}
      <Header>
        <AlertTriangle size={28} color='#d32f2f' />
        <Title>Rilevamento Anomalie basato su AI</Title>
      </Header>

      {/* Anomalies Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            <IconWrapper>
              <Bell />
            </IconWrapper>
            Panoramica Anomalie
          </CardTitle>
          <RefreshButton onClick={refreshAnomalies} disabled={loading}>
            <RefreshCw
              size={18}
              style={{ marginRight: '5px' }}
              className={loading ? 'spin' : ''}
            />
            {loading ? 'Aggiornamento...' : 'Aggiorna'}
          </RefreshButton>
        </CardHeader>

        {/* Statistics Container */}
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

        {/* Filters */}
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

        {/* Anomaly List */}
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

      {/* Anomaly Details Card */}
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

          <div style={{ padding: '0 20px 20px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                margin: '16px 0',
              }}
            >
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '4px',
                    }}
                  >
                    Localizzazione
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <MapPin
                      size={16}
                      style={{ marginRight: '6px', color: '#3385ad' }}
                    />
                    {selectedAnomaly.location}
                  </span>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '4px',
                    }}
                  >
                    Severità
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: getSeverityColor(selectedAnomaly.severity),
                    }}
                  >
                    <AlertTriangle size={16} style={{ marginRight: '6px' }} />
                    {getSeverityName(selectedAnomaly.severity)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '4px',
                    }}
                  >
                    Rilevata
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    <Clock
                      size={16}
                      style={{ marginRight: '6px', color: '#3385ad' }}
                    />
                    {selectedAnomaly.timestamp.toLocaleString()}
                  </span>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '4px',
                    }}
                  >
                    Stato
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: selectedAnomaly.acknowledged
                        ? '#4caf50'
                        : '#ff9800',
                    }}
                  >
                    {selectedAnomaly.acknowledged ? (
                      <>
                        <Check size={16} style={{ marginRight: '6px' }} />
                        Riconosciuta
                      </>
                    ) : (
                      <>
                        <Flag size={16} style={{ marginRight: '6px' }} />
                        Da riconoscere
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                marginBottom: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '8px',
                }}
              >
                Descrizione
              </span>
              <p
                style={{
                  margin: '0',
                  fontSize: '16px',
                  lineHeight: '1.5',
                }}
              >
                {selectedAnomaly.description}
              </p>
            </div>

            {/* Chart Wrapper */}
            <ChartWrapper>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#eeeeee' />
                  <XAxis
                    dataKey='time'
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis
                    domain={[0, 120]}
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#e0e0e0' }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Line
                    type='monotone'
                    dataKey='value'
                    stroke='#3385ad'
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 8,
                      fill: '#3385ad',
                      stroke: 'white',
                      strokeWidth: 2,
                    }}
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

            {/* Action buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            >
              <ActionButton
                onClick={() => {
                  // Scroll to map section and center on the anomaly
                  if (mapInitialized && markers[selectedAnomaly.id]) {
                    const mapElement = document.getElementById('anomaly-map');
                    if (mapElement) {
                      mapElement.scrollIntoView({ behavior: 'smooth' });

                      // Center map on selected anomaly
                      if (map && selectedAnomaly.coordinates) {
                        setTimeout(() => {
                          map.setView(selectedAnomaly.coordinates, 8);
                          // Open popup for the marker
                          markers[selectedAnomaly.id].openPopup();
                        }, 500);
                      }
                    }
                  }
                }}
              >
                <MapPin size={16} style={{ marginRight: '8px' }} />
                Visualizza sulla mappa
              </ActionButton>

              <div style={{ display: 'flex', gap: '10px' }}>
                {!selectedAnomaly.acknowledged && (
                  <ActionButton
                    onClick={() => handleAcknowledge(selectedAnomaly.id)}
                    color='#4caf50'
                    hoverColor='#388e3c'
                  >
                    <Check size={16} style={{ marginRight: '8px' }} />
                    Riconosci
                  </ActionButton>
                )}
                <ActionButton
                  onClick={() => handleDismiss(selectedAnomaly.id)}
                  color='#f44336'
                  hoverColor='#d32f2f'
                >
                  <X size={16} style={{ marginRight: '8px' }} />
                  Ignora
                </ActionButton>
              </div>
            </div>

            {/* AI Recommendations */}
            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 10px 0',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#0d47a1',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Info size={18} style={{ marginRight: '8px' }} />
                  Raccomandazioni AI
                </h4>

                <ul
                  style={{
                    margin: '0',
                    paddingLeft: '16px',
                    listStyleType: 'none',
                  }}
                >
                  {selectedAnomaly.type === 'voltage' && (
                    <>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Verificare gli impianti di regolazione della tensione
                        nella sottostazione
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Controllare le batterie di condensatori e reattori shunt
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Monitorare i trasformatori con variatori sotto carico
                      </li>
                    </>
                  )}
                  {selectedAnomaly.type === 'frequency' && (
                    <>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Verificare il sistema di regolazione primaria di
                        frequenza
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Controllare lo stato dei generatori connessi
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Verificare eventuali distacchi o perdite di carico nella
                        rete
                      </li>
                    </>
                  )}
                  {selectedAnomaly.type === 'load' && (
                    <>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Verificare la capacità di trasmissione delle linee
                        interessate
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Controllare la distribuzione del carico nella rete
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Valutare l'attivazione di risorse di riserva
                      </li>
                    </>
                  )}
                  {selectedAnomaly.type === 'generation' && (
                    <>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Monitorare le previsioni meteorologiche per le prossime
                        ore
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Verificare la disponibilità di riserva rotante
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Controllare i sistemi di previsione della generazione
                        rinnovabile
                      </li>
                    </>
                  )}
                  {selectedAnomaly.type === 'transformer' && (
                    <>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Verificare il sistema di raffreddamento del
                        trasformatore
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Controllare il carico e la distribuzione della potenza
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Considerare la ridistribuzione del carico su altre linee
                      </li>
                    </>
                  )}
                  {selectedAnomaly.type === 'line' && (
                    <>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Verificare i flussi di potenza sulla linea
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Controllare la disponibilità di percorsi alternativi
                      </li>
                      <li
                        style={{
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#0d47a1',
                            borderRadius: '50%',
                            marginRight: '10px',
                          }}
                        ></div>
                        Monitorare le condizioni ambientali lungo la linea
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Anomaly Map Card */}
      <Card id='anomaly-map-card'>
        <CardHeader>
          <CardTitle>
            <IconWrapper>
              <MapPin />
            </IconWrapper>
            Mappa Anomalie
          </CardTitle>
          {!mapInitialized && (
            <div
              style={{ display: 'flex', alignItems: 'center', color: '#777' }}
            >
              <Info size={16} style={{ marginRight: '5px' }} />
              Caricamento mappa...
            </div>
          )}
        </CardHeader>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '0 20px 20px',
          }}
        >
          {/* Map container */}
          <MapWrapper>
            <div
              ref={mapContainerRef}
              id='anomaly-map'
              style={{ width: '100%', height: '100%' }}
            />
          </MapWrapper>

          {/* Recent anomalies list */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <h4
              style={{
                margin: '0 0 12px 0',
                fontSize: '16px',
                fontWeight: '500',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Clock
                size={16}
                style={{ marginRight: '8px', color: '#3385ad' }}
              />
              Anomalie Recenti
            </h4>
            <div
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                borderRadius: '4px',
              }}
            >
              {filteredAnomalies.length === 0 ? (
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#fff',
                    color: '#777',
                    fontStyle: 'italic',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  Nessuna anomalia con il filtro selezionato
                </div>
              ) : (
                filteredAnomalies
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .slice(0, 5)
                  .map((anomaly) => (
                    <div
                      key={anomaly.id}
                      style={{
                        padding: '12px',
                        marginBottom: '8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        borderLeft: `4px solid ${getSeverityColor(
                          anomaly.severity
                        )}`,
                        backgroundColor:
                          selectedAnomaly && selectedAnomaly.id === anomaly.id
                            ? '#f0f7ff'
                            : '#fff',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        transition: 'all 0.2s ease',
                      }}
                      onClick={() => handleViewDetails(anomaly)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '4px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <AlertTriangle
                            size={14}
                            style={{
                              marginRight: '6px',
                              color: getSeverityColor(anomaly.severity),
                            }}
                          />
                          {anomaly.title}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#777',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Clock size={12} style={{ marginRight: '4px' }} />
                          {formatTimestamp(anomaly.timestamp)}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#666',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <MapPin
                          size={12}
                          style={{ marginRight: '4px', color: '#3385ad' }}
                        />
                        {anomaly.location}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Severity legend */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            padding: '15px',
            margin: '0 20px 16px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#f44336',
                marginRight: '8px',
                boxShadow: '0 0 0 2px rgba(244, 67, 54, 0.2)',
              }}
            />
            Alta Priorità ({stats.high})
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffc107',
                marginRight: '8px',
                boxShadow: '0 0 0 2px rgba(255, 193, 7, 0.2)',
              }}
            />
            Media Priorità ({stats.medium})
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#4caf50',
                marginRight: '8px',
                boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
              }}
            />
            Bassa Priorità ({stats.low})
          </div>
        </div>

        {/* Map info message */}
        <div
          style={{
            margin: '0 20px 20px',
            padding: '12px 16px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            color: '#0d47a1',
            boxShadow: '0 1px 3px rgba(13, 71, 161, 0.1)',
          }}
        >
          <Info size={18} style={{ marginRight: '12px', flexShrink: 0 }} />
          <div>
            Questa mappa mostra in tempo reale le anomalie rilevate nella rete
            elettrica italiana. Fare clic su un punto della mappa per
            visualizzare i dettagli dell'anomalia.
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default AIAnomalyDetection;
