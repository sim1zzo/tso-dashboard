import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  MapPin,
  BarChart2,
  Clock,
  Zap,
  Thermometer,
  Wind,
  Battery,
  Wifi,
  Filter,
  CheckCircle,
  Grid,
  List
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = {
  high: '#FF3D00',
  medium: '#FFA000',
  low: '#d7df1c',
  inactive: '#9E9E9E',
};

const generateRandomAlarms = () => {
  const alarmTypes = [
    { category: 'Tensione', icon: 'Zap' },
    { category: 'Temperatura', icon: 'Thermometer' },
    { category: 'Frequenza', icon: 'BarChart2' },
    { category: 'Carico', icon: 'Battery' },
    { category: 'Sicurezza', icon: 'Wifi' },
    { category: 'Rinnovabili', icon: 'Wind' },
    { category: 'Riserva', icon: 'AlertCircle' },
    { category: 'Trasformatore', icon: 'Zap' },
    { category: 'Comunicazione', icon: 'Wifi' }
  ];

  const italianCities = [
    { name: 'Roma', coordinates: [41.9028, 12.4964] },
    { name: 'Milano', coordinates: [45.4642, 9.1900] },
    { name: 'Napoli', coordinates: [40.8518, 14.2681] },
    { name: 'Torino', coordinates: [45.0703, 7.6869] },
    { name: 'Palermo', coordinates: [38.1157, 13.3615] },
    { name: 'Genova', coordinates: [44.4056, 8.9463] },
    { name: 'Bologna', coordinates: [44.4949, 11.3426] },
    { name: 'Firenze', coordinates: [43.7696, 11.2558] },
    { name: 'Bari', coordinates: [41.1171, 16.8719] },
    { name: 'Catania', coordinates: [37.5079, 15.0830] },
    { name: 'Venezia', coordinates: [45.4408, 12.3155] },
    { name: 'Verona', coordinates: [45.4384, 10.9916] },
    { name: 'Messina', coordinates: [38.1938, 15.5540] },
    { name: 'Padova', coordinates: [45.4064, 11.8768] },
    { name: 'Trieste', coordinates: [45.6495, 13.7768] },
    { name: 'Taranto', coordinates: [40.4640, 17.2470] },
    { name: 'Brescia', coordinates: [45.5416, 10.2118] },
    { name: 'Prato', coordinates: [43.8777, 11.1021] },
    { name: 'Reggio Calabria', coordinates: [38.1089, 15.6440] },
    { name: 'Modena', coordinates: [44.6471, 10.9252] },
    { name: 'Parma', coordinates: [44.8015, 10.3279] },
    { name: 'Reggio Emilia', coordinates: [44.6989, 10.6313] },
    { name: 'Perugia', coordinates: [43.1107, 12.3908] },
    { name: 'Livorno', coordinates: [43.5485, 10.3106] },
    { name: 'Ravenna', coordinates: [44.4175, 12.2012] },
    { name: 'Cagliari', coordinates: [39.2238, 9.1217] },
    { name: 'Foggia', coordinates: [41.4621, 15.5444] },
    { name: 'Salerno', coordinates: [40.6824, 14.7681] },
    { name: 'Rimini', coordinates: [44.0678, 12.5695] },
    { name: 'Ferrara', coordinates: [44.8378, 11.6197] },
    { name: 'Sassari', coordinates: [40.7259, 8.5556] },
    { name: 'Latina', coordinates: [41.4675, 12.9039] },
    { name: 'Giugliano in Campania', coordinates: [40.9275, 14.1951] },
    { name: 'Monza', coordinates: [45.5845, 9.2744] },
    { name: 'Siracusa', coordinates: [37.0755, 15.2866] },
    { name: 'Bergamo', coordinates: [45.6983, 9.6773] },
    { name: 'Pescara', coordinates: [42.4618, 14.2159] },
    { name: 'Trento', coordinates: [46.0748, 11.1217] },
    { name: 'Forlì', coordinates: [44.2227, 12.0407] },
    { name: 'Vicenza', coordinates: [45.5455, 11.5354] },
    { name: 'Terni', coordinates: [42.5675, 12.6461] },
    { name: 'Bolzano', coordinates: [46.4983, 11.3548] },
    { name: 'Novara', coordinates: [45.4467, 8.6205] },
    { name: 'Piacenza', coordinates: [45.0526, 9.6930] },
    { name: 'Ancona', coordinates: [43.6158, 13.5189] },
    { name: 'Andria', coordinates: [41.2270, 16.2952] },
    { name: 'Udine', coordinates: [46.0711, 13.2346] },
    { name: 'Arezzo', coordinates: [43.4628, 11.8782] },
    { name: 'Cesena', coordinates: [44.1394, 12.2464] },
    { name: 'Lecce', coordinates: [40.3516, 18.1718] }
  ];

  const severities = ['high', 'medium', 'low', 'inactive'];
  const alarms = [];

  for (let i = 0; i < 80; i++) {
    const alarmType = alarmTypes[Math.floor(Math.random() * alarmTypes.length)];
    const city = italianCities[Math.floor(Math.random() * italianCities.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const isActive = severity !== 'inactive';
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);

    const isAcknowledged = isActive && Math.random() < 0.3;

    alarms.push({
      id: i + 1,
      title: `${isActive ? '' : 'Risolto: '}Allarme ${alarmType.category} a ${city.name}`,
      category: alarmType.category,
      severity: severity,
      location: city.name,
      coordinates: city.coordinates,
      description: `${alarmType.category} anomalo rilevato a ${city.name}`,
      timestamp: isActive ? currentDate.toISOString() : pastDate.toISOString(),
      resolvedTimestamp: isActive ? null : new Date(pastDate.getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      isAcknowledged: isAcknowledged
    });
  }

  return alarms;
};

const AlarmPanel = () => {
  const [alarms, setAlarms] = useState([]);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [mapCenter, setMapCenter] = useState([41.9028, 12.4964]); // Rome as default center
  const [currentPage, setCurrentPage] = useState(1);
  const [acknowledgedAlarms, setAcknowledgedAlarms] = useState(new Set());
  const [resolvedAlarms, setResolvedAlarms] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');
  const alarmsPerPage = 10;



  const renderAlarmTable = () => (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Titolo</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Categoria</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Severità</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Localizzazione</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Timestamp</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Stato</th>
            <th style={{ padding: '12px', textAlign: 'left' }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {currentAlarms.map((alarm) => (
            <tr key={alarm.id} style={{ borderBottom: '1px solid #dee2e6' }}>
              <td style={{ padding: '12px' }}>{alarm.title}</td>
              <td style={{ padding: '12px' }}>{alarm.category}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ 
                  color: COLORS[alarm.severity],
                  fontWeight: 'bold'
                }}>
                  {alarm.severity.charAt(0).toUpperCase() + alarm.severity.slice(1)}
                </span>
              </td>
              <td style={{ padding: '12px' }}>{alarm.location}</td>
              <td style={{ padding: '12px' }}>{new Date(alarm.timestamp).toLocaleString()}</td>
              <td style={{ padding: '12px' }}>
                {alarm.severity === 'inactive' ? 'Risolto' : (acknowledgedAlarms.has(alarm.id) ? 'Preso in carico' : 'Attivo')}
              </td>
              <td style={{ padding: '12px' }}>
                {alarm.severity !== 'inactive' && (
                  <>
                    <button
                      onClick={() => handleAlarmAction(alarm.id, 'acknowledge')}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: acknowledgedAlarms.has(alarm.id) ? '#4CAF50' : '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '5px'
                      }}
                      disabled={acknowledgedAlarms.has(alarm.id)}
                    >
                      {acknowledgedAlarms.has(alarm.id) ? 'Preso in Carico' : 'Prendi in Carico'}
                    </button>
                    <button
                      onClick={() => handleAlarmAction(alarm.id, 'resolve')}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#FF5722',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Risolvi
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


  useEffect(() => {
    const fetchAlarms = async () => {
      const mockAlarms = generateRandomAlarms();
      setAlarms(mockAlarms);

      const acknowledged = new Set(
        mockAlarms.filter((a) => a.isAcknowledged).map((a) => a.id)
      );
      setAcknowledgedAlarms(acknowledged);

      const resolved = new Set(
        mockAlarms.filter((a) => a.severity === 'inactive').map((a) => a.id)
      );
      setResolvedAlarms(resolved);
    };

    fetchAlarms();
    const interval = setInterval(fetchAlarms, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const filteredAlarms = useMemo(() => {
    return alarms.filter(
      (alarm) =>
        (filter === 'all' || alarm.severity === filter) &&
        (categoryFilter === 'all' || alarm.category === categoryFilter)
    );
  }, [alarms, filter, categoryFilter]);

  const indexOfLastAlarm = currentPage * alarmsPerPage;
  const indexOfFirstAlarm = indexOfLastAlarm - alarmsPerPage;
  const currentAlarms = filteredAlarms.slice(
    indexOfFirstAlarm,
    indexOfLastAlarm
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const statistics = useMemo(() => {
    return filteredAlarms.reduce(
      (acc, alarm) => {
        acc[alarm.severity]++;
        return acc;
      },
      { high: 0, medium: 0, low: 0, inactive: 0 }
    );
  }, [filteredAlarms]);

  const pieChartData = useMemo(() => {
    return Object.entries(statistics).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
    }));
  }, [statistics]);

  const handleAlarmAction = (alarmId, action) => {
    if (action === 'acknowledge') {
      setAcknowledgedAlarms((prev) => new Set(prev).add(alarmId));
    } else if (action === 'resolve') {
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) =>
          alarm.id === alarmId
            ? {
                ...alarm,
                severity: 'inactive',
                resolvedTimestamp: new Date().toISOString(),
              }
            : alarm
        )
      );
      setResolvedAlarms((prev) => new Set(prev).add(alarmId));
      setAcknowledgedAlarms((prev) => {
        const newSet = new Set(prev);
        newSet.delete(alarmId);
        return newSet;
      });
    }
  };

  const customIcon = (severity, isAcknowledged) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${
        COLORS[severity]
      }; width: 13.2px; height: 13.2px; border-radius: 50%; border: 2px solid ${
        isAcknowledged ? '#FFA000' : 'white'
      };"></div>`,
      iconSize: [17.6, 17.6],
      iconAnchor: [8.8, 8.8],
    });
  };

  const getAlarmIcon = (category) => {
    switch (category) {
      case 'Tensione':
        return <Zap />;
      case 'Temperatura':
        return <Thermometer />;
      case 'Frequenza':
        return <BarChart2 />;
      case 'Carico':
        return <Battery />;
      case 'Sicurezza':
        return <Wifi />;
      case 'Rinnovabili':
        return <Wind />;
      case 'Riserva':
        return <AlertCircle />;
      case 'Trasformatore':
        return <Zap />;
      case 'Comunicazione':
        return <Wifi />;
      default:
        return <AlertTriangle />;
    }
  };

  const Pagination = ({ alarmsPerPage, totalAlarms, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalAlarms / alarmsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            justifyContent: 'center',
          }}
        >
          {pageNumbers.map((number) => (
            <li key={number} style={{ margin: '0 5px' }}>
              <button
                onClick={() => paginate(number)}
                style={{
                  padding: '5px 10px',
                  border: 'none',
                  backgroundColor:
                    currentPage === number ? '#007bff' : '#f8f9fa',
                  color: currentPage === number ? 'white' : 'black',
                  cursor: 'pointer',
                }}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
  <div style={{ padding: '20px', backgroundColor: '#f5f7fa' }}>
    <h2 style={{
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <Bell style={{ marginRight: '10px' }} /> Pannello Allarmi Avanzato
    </h2>

    {/* Bottoni per cambiare la vista */}
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => setViewMode('grid')}
        style={{
          padding: '8px 16px',
          backgroundColor: viewMode === 'grid' ? '#007bff' : '#f8f9fa',
          color: viewMode === 'grid' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '10px'
        }}
      >
        <Grid size={18} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
        Vista Griglia
      </button>
      <button
        onClick={() => setViewMode('table')}
        style={{
          padding: '8px 16px',
          backgroundColor: viewMode === 'table' ? '#007bff' : '#f8f9fa',
          color: viewMode === 'table' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        <List size={18} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
        Vista Tabella
      </button>
    </div>

    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <div style={{
        flex: 1,
        marginRight: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>
          <BarChart2 style={{ marginRight: '10px' }} />
          Statistiche Allarmi
        </h3>
        <ResponsiveContainer width='100%' height={200}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx='50%'
              cy='50%'
              labelLine={false}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name.toLowerCase()]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '10px',
        }}>
          {Object.entries(statistics).map(([key, value]) => (
            <span key={key} style={{ color: COLORS[key] }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </span>
          ))}
        </div>
      </div>
      <div style={{
        flex: 2,
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{ marginBottom: '15px' }}>
          <MapPin style={{ marginRight: '10px' }} />
          Mappa Allarmi
        </h3>
        <MapContainer
          center={[41.9028, 12.4964]}
          zoom={5}
          style={{ height: '400px', width: '100%' }}
          maxBounds={[
            [35.5, 6.6],
            [47.1, 18.5],
          ]}
          minZoom={5}
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {filteredAlarms.map((alarm) => (
            <Marker
              key={alarm.id}
              position={alarm.coordinates}
              icon={customIcon(alarm.severity, acknowledgedAlarms.has(alarm.id))}
              opacity={filter === 'all' || filter === alarm.severity ? 1 : 0.3}
            >
              <Popup>
                <strong>{alarm.title}</strong>
                <br />
                {alarm.description}
                <br />
                {alarm.severity === 'inactive' && (
                  <span>
                    Risolto il: {new Date(alarm.resolvedTimestamp).toLocaleString()}
                  </span>
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>

    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <Filter style={{ marginRight: '10px', verticalAlign: 'middle' }} />
        <strong>Filtri:</strong>
        {['all', 'high', 'medium', 'low', 'inactive'].map((sev) => (
          <button
            key={sev}
            onClick={() => setFilter(sev)}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              backgroundColor: filter === sev ? COLORS[sev] || '#007bff' : '#f0f0f0',
              color: filter === sev ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {sev.charAt(0).toUpperCase() + sev.slice(1)}
          </button>
        ))}
      </div>
      <h3 style={{ marginBottom: '15px' }}>
        <Zap style={{ marginRight: '10px' }} />
        Allarmi
      </h3>
      {viewMode === 'grid' ? (
        // Vista a griglia
        currentAlarms.map((alarm) => (
          <div
            key={alarm.id}
            style={{
              backgroundColor: '#f8f9fa',
              borderLeft: `5px solid ${COLORS[alarm.severity]}`,
              padding: '15px',
              borderRadius: '4px',
              marginBottom: '15px',
            }}
          >
            <h4 style={{
              margin: '0 0 10px 0',
              display: 'flex',
              alignItems: 'center',
            }}>
              {getAlarmIcon(alarm.category)}
              <span style={{ marginLeft: '10px' }}>{alarm.title}</span>
              {acknowledgedAlarms.has(alarm.id) && (
                <span style={{
                  marginLeft: '10px',
                  color: '#FFA000',
                  fontSize: '0.8em',
                }}>
                  (Preso in carico)
                </span>
              )}
            </h4>
            <p>
              <strong>Categoria:</strong> {alarm.category}
            </p>
            <p>
              <strong>Localizzazione:</strong> {alarm.location}
            </p>
            <p>
              <strong>Descrizione:</strong> {alarm.description}
            </p>
            <p>
              <Clock style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              {new Date(alarm.timestamp).toLocaleString()}
            </p>
            {alarm.severity === 'inactive' && (
              <p>
                <CheckCircle style={{
                  marginRight: '5px',
                  verticalAlign: 'middle',
                  color: COLORS.inactive,
                }} />
                Risolto il: {new Date(alarm.resolvedTimestamp).toLocaleString()}
              </p>
            )}
            {alarm.severity !== 'inactive' && (
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleAlarmAction(alarm.id, 'acknowledge')}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: acknowledgedAlarms.has(alarm.id) ? '#4CAF50' : '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                  disabled={acknowledgedAlarms.has(alarm.id)}
                >
                  {acknowledgedAlarms.has(alarm.id) ? 'Preso in Carico' : 'Prendi in Carico'}
                </button>
                <button
                  onClick={() => handleAlarmAction(alarm.id, 'resolve')}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#FF5722',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Risolvi
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        // Vista tabellare
        renderAlarmTable()
      )}

      <Pagination
        alarmsPerPage={alarmsPerPage}
        totalAlarms={filteredAlarms.length}
        paginate={paginate}
      />
    </div>
  </div>
);
};

export default AlarmPanel;
