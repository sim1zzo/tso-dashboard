import React, { useState, useEffect } from 'react';
import { Activity, Zap, TrendingUp, Wind, Calendar } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const fetchData = () => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => ({
    time: new Date(now.getTime() + i * 3600000).toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    prevista: Math.floor(Math.random() * 10000) + 20000,
    effettiva: Math.floor(Math.random() * 10000) + 20000,
  }));
};

const DemandForecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [activeTab, setActiveTab] = useState('grafico');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setForecastData(fetchData());
  }, []);

  const runForecast = async () => {
    setIsLoading(true);
    // Simuliamo un'operazione asincrona
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowResults(true);
    setIsLoading(false);
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const InfoCard = ({ title, value, icon: Icon }) => (
    <div style={{ textAlign: 'center' }}>
      <Icon size={24} color='#3D9970' />
      <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{value}</div>
      <div>{title}</div>
    </div>
  );

  const renderForecastChart = () => {
    return (
      <div style={cardStyle}>
        <h3
          style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          Previsione vs Domanda Effettiva
        </h3>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='prevista'
              stroke='#8884d8'
              name='Domanda Prevista'
            />
            <Line
              type='monotone'
              dataKey='effettiva'
              stroke='#82ca9d'
              name='Domanda Effettiva'
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderForecastTable = () => {
    return (
      <div style={cardStyle}>
        <h3
          style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          Dati di Previsione
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f8f8' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Ora</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>
                  Prevista (MW)
                </th>
                <th style={{ padding: '10px', textAlign: 'left' }}>
                  Effettiva (MW)
                </th>
              </tr>
            </thead>
            <tbody>
              {forecastData.map((data, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{data.time}</td>
                  <td style={{ padding: '10px' }}>{data.prevista}</td>
                  <td style={{ padding: '10px' }}>{data.effettiva}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Activity style={{ marginRight: '10px' }} /> Dashboard di Previsione
        Domanda Energetica
      </h2>

      <button onClick={runForecast} style={buttonStyle} disabled={isLoading}>
        {isLoading ? 'Previsione in corso...' : 'Esegui Previsione'}
      </button>

      {showResults && (
        <>
          <div style={cardStyle}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <InfoCard title='Domanda Attuale' value='32,456 MW' icon={Zap} />
              <InfoCard
                title='Picco Previsto'
                value='35,789 MW'
                icon={TrendingUp}
              />
              <InfoCard
                title='Produzione Rinnovabile'
                value='45%'
                icon={Wind}
              />
              <InfoCard title='Giorno Tipo' value='Feriale' icon={Calendar} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setActiveTab('grafico')}
              style={{
                ...buttonStyle,
                backgroundColor: activeTab === 'grafico' ? '#3D9970' : '#ddd',
                color: activeTab === 'grafico' ? 'white' : 'black',
                marginRight: '10px',
              }}
            >
              Grafico
            </button>
            <button
              onClick={() => setActiveTab('tabella')}
              style={{
                ...buttonStyle,
                backgroundColor: activeTab === 'tabella' ? '#3D9970' : '#ddd',
                color: activeTab === 'tabella' ? 'white' : 'black',
              }}
            >
              Tabella
            </button>
          </div>

          {activeTab === 'grafico'
            ? renderForecastChart()
            : renderForecastTable()}
        </>
      )}

      <div style={cardStyle}>
        <h3
          style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          Informazioni sul Sistema
        </h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>
            Il modello di previsione utilizza dati storici, previsioni
            meteorologiche e informazioni su eventi speciali.
          </li>
          <li>
            Conformità agli standard ENTSO-E per la previsione della domanda.
          </li>
          <li>
            Aggiornamento in tempo reale dei dati di consumo e generazione.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DemandForecast;
