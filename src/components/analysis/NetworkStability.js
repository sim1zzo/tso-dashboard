import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const NetworkStability = () => {
  const [stabilityStatus, setStabilityStatus] = useState('stable');
  const [frequencyData, setFrequencyData] = useState([]);
  const [loadData, setLoadData] = useState([]);
  const [stabilityScore, setStabilityScore] = useState(95);
  const [energyMix, setEnergyMix] = useState({
    Thermal: 46,
    Hydro: 35,
    Wind: 21,
    Solar: 12
  });

  useEffect(() => {
    const simulateRealTimeData = () => {
      const newStatus = Math.random() > 0.9 ? 'unstable' : 'stable';
      setStabilityStatus(newStatus);
      setStabilityScore(
        newStatus === 'stable'
          ? Math.floor(Math.random() * 20) + 80
          : Math.floor(Math.random() * 30) + 40
      );

      setFrequencyData((prev) => [
        ...prev.slice(-4),
        {
          time: new Date().toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          value: 50 + (Math.random() - 0.5) * 0.2,
        },
      ]);

      setLoadData((prev) => [
        ...prev.slice(-4),
        {
          time: new Date().toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          value: 30000 + Math.random() * 5000,
        },
      ]);

      setEnergyMix({
        thermal: 40 + Math.random() * 10,
        hydro: 30 + Math.random() * 10,
        wind: 20 + Math.random() * 10,
        solar: 10 + Math.random() * 5,
      });
    };

    const interval = setInterval(simulateRealTimeData, 5000);
    return () => clearInterval(interval);
  }, []);



  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const statusStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const statusTextStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const scoreStyle = {
    textAlign: 'right',
  };

  const scoreValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
  };

  const scoreLabelStyle = {
    fontSize: '14px',
    color: '#666',
  };

  const chartTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };



  const renderStatusIndicator = () => (
    <div style={cardStyle}>
      <div style={statusStyle}>
        <div style={statusTextStyle}>
          {stabilityStatus === 'stable' ? (
            <CheckCircle
              color='green'
              size={24}
              style={{ marginRight: '10px' }}
            />
          ) : (
            <AlertTriangle
              color='red'
              size={24}
              style={{ marginRight: '10px' }}
            />
          )}
          Stato: {stabilityStatus === 'stable' ? 'Stabile' : 'Instabile'}
        </div>
        <div style={scoreStyle}>
          <div style={scoreValueStyle}>{stabilityScore}%</div>
          <div style={scoreLabelStyle}>Indice di Stabilità</div>
        </div>
      </div>
    </div>
  );

  const renderChart = (data, label) => (
    <div style={cardStyle}>
      <h3 style={chartTitleStyle}>{label}</h3>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <XAxis dataKey='time' axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Line type='monotone' dataKey='value' stroke='#8884d8' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderEnergyMix = () => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{marginRight: '10px', fontSize: '24px'}}>≡</span>
        Mix Energetico
      </h3>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        {Object.entries(energyMix).map(([source, percentage]) => (
          <div key={source} style={{textAlign: 'center'}}>
            <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '5px'}}>
              {Math.round(percentage)}%
            </div>
            <div style={{
              fontSize: '14px',
              color: source === 'Thermal' ? '#FF6347' : 
                     source === 'Hydro' ? '#4682B4' : 
                     source === 'Wind' ? '#32CD32' : 
                     '#FFD700'
            }}>
              {source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{padding: '20px', backgroundColor: '#f0f0f0', fontFamily: 'Arial, sans-serif'}}>
      <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center'}}>
        <Activity style={{marginRight: '10px'}} /> Analisi della Stabilità di Rete
      </h2>

      {renderStatusIndicator()}
      {renderChart(frequencyData, 'Frequenza di Rete (Hz)')}
      {renderChart(loadData, 'Carico di Sistema (MW)')}
      {renderEnergyMix()}
    </div>
  );
};

export default NetworkStability;
