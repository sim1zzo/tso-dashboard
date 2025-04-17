import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Activity, Zap, Wind, Sun } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './Alert';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const TabButton = ({ active, onClick, children }) => (
  <button
    className={`px-6 py-3 font-semibold text-sm ${active 
      ? 'bg-blue-600 text-white' 
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} rounded-t-lg`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children, highlight }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${highlight ? 'text-red-600 font-semibold' : ''}`}>
    {children}
  </td>
);

const N1SecurityAnalysis = () => {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState('regional');

  useEffect(() => {
    const fetchAnalysisResults = async () => {
      // Simulated API call
      const mockResults = {
        criticalElements: [
          { id: 'LINE001', name: 'Milano Ovest-Torino Sud', overload: '120%', region: 'Nord' },
          { id: 'TRANSF002', name: 'Firenze Casellina', overload: '110%', region: 'Centro' },
          { id: 'LINE003', name: 'Roma Nord-Napoli Patria', overload: '105%', region: 'Centro' },
          { id: 'LINE004', name: 'Foggia-Bari', overload: '115%', region: 'Sud' },
          { id: 'TRANSF005', name: 'Palermo Bellolampo', overload: '108%', region: 'Isole' },
        ],
        lastUpdateTime: new Date().toLocaleString(),
        regionalStats: {
          Nord: { criticalCount: 1, averageLoad: 85 },
          Centro: { criticalCount: 2, averageLoad: 92 },
          Sud: { criticalCount: 1, averageLoad: 88 },
          Isole: { criticalCount: 1, averageLoad: 80 },
        },
        loadTrend: [
          { time: '00:00', load: 70 },
          { time: '04:00', load: 65 },
          { time: '08:00', load: 85 },
          { time: '12:00', load: 95 },
          { time: '16:00', load: 100 },
          { time: '20:00', load: 90 },
        ],
      };
      setAnalysisResults(mockResults);
    };

    fetchAnalysisResults();
    const interval = setInterval(fetchAnalysisResults, 15 * 60 * 1000); // Update every 15 minutes

    return () => clearInterval(interval);
  }, []);

  const getCoordinates = (name) => {
    // Realistic coordinates for the mentioned locations
    const coordinates = {
      'Milano Ovest-Torino Sud': [45.4642, 9.1900], // Milano
      'Firenze Casellina': [43.7696, 11.2558], // Firenze
      'Roma Nord-Napoli Patria': [41.9028, 12.4964], // Roma
      'Foggia-Bari': [41.1171, 16.8719], // Bari
      'Palermo Bellolampo': [38.1157, 13.3615], // Palermo
    };
    return coordinates[name] || [41.9028, 12.4964]; // Default to Rome if not found
  };

  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const renderMap = () => (
    <MapContainer center={[41.9028, 12.4964]} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {analysisResults?.criticalElements.map((element) => (
        <Marker 
          key={element.id} 
          position={getCoordinates(element.name)}
          icon={customIcon}
        >
          <Popup>
            <div>
              <strong>{element.name}</strong>
              <br />
              Sovraccarico: <span style={{ color: 'red' }}>{element.overload}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );



  const renderRegionalStats = () => (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader>Regione</TableHeader>
            <TableHeader>Elementi Critici</TableHeader>
            <TableHeader>Carico Medio</TableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Object.entries(analysisResults.regionalStats).map(([region, stats]) => (
            <tr key={region}>
              <TableCell>{region}</TableCell>
              <TableCell highlight>{stats.criticalCount}</TableCell>
              <TableCell>{stats.averageLoad}%</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCriticalElements = () => (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Regione</TableHeader>
            <TableHeader>Sovraccarico</TableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {analysisResults.criticalElements.map((element) => (
            <tr key={element.id}>
              <TableCell>{element.name}</TableCell>
              <TableCell>{element.region}</TableCell>
              <TableCell highlight>{element.overload}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLoadTrend = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={analysisResults.loadTrend}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="load" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderPowerGeneration = () => (
    <div className="flex justify-around bg-white p-6 rounded-lg shadow">
      <div className="text-center">
        <Zap size={40} className="mx-auto text-yellow-500 mb-2" />
        <p className="font-semibold">Termoelettrico</p>
        <p className="text-2xl font-bold text-yellow-600">45%</p>
      </div>
      <div className="text-center">
        <Activity size={40} className="mx-auto text-blue-500 mb-2" />
        <p className="font-semibold">Idroelettrico</p>
        <p className="text-2xl font-bold text-blue-600">25%</p>
      </div>
      <div className="text-center">
        <Wind size={40} className="mx-auto text-green-500 mb-2" />
        <p className="font-semibold">Eolico</p>
        <p className="text-2xl font-bold text-green-600">15%</p>
      </div>
      <div className="text-center">
        <Sun size={40} className="mx-auto text-orange-500 mb-2" />
        <p className="font-semibold">Solare</p>
        <p className="text-2xl font-bold text-orange-600">15%</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Analisi di Sicurezza N-1</h1>
      
      {analysisResults && (
        <>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Avviso Critico</AlertTitle>
            <AlertDescription>
              Rilevati {analysisResults.criticalElements.length} elementi critici. Ultimo aggiornamento: {analysisResults.lastUpdateTime}
            </AlertDescription>
          </Alert>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Panoramica della Rete</h2>
            {renderMap()}
          </div>

          {/* Aggiungiamo uno spazio di 1cm (circa 38px) dopo la mappa */}
          <div className="h-10"></div>

          <div className="mt-4"> {/* Ridotto da mt-16 a mt-4 per compensare lo spazio aggiunto sopra */}
            <div className="flex space-x-1 mb-4"> {/* Ridotto da mb-8 a mb-4 */}
              <TabButton active={activeTab === 'regional'} onClick={() => setActiveTab('regional')}>
                Statistiche Regionali
              </TabButton>
              <TabButton active={activeTab === 'critical'} onClick={() => setActiveTab('critical')}>
                Elementi Critici
              </TabButton>
              <TabButton active={activeTab === 'load'} onClick={() => setActiveTab('load')}>
                Trend di Carico
              </TabButton>
              <TabButton active={activeTab === 'generation'} onClick={() => setActiveTab('generation')}>
                Mix Energetico
              </TabButton>
            </div>

            {/* Aggiungiamo uno spazio di 1cm (circa 38px) dopo i filtri */}
            <div className="h-10"></div>

            <div className="mt-4"> {/* Ridotto da mt-8 a mt-4 per compensare lo spazio aggiunto sopra */}
              {activeTab === 'regional' && renderRegionalStats()}
              {activeTab === 'critical' && renderCriticalElements()}
              {activeTab === 'load' && renderLoadTrend()}
              {activeTab === 'generation' && renderPowerGeneration()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default N1SecurityAnalysis;