import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Zap, Euro, TrendingDown } from 'lucide-react';

const CongestionManagement = () => {
  const [congestions, setCongestions] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeCongestions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCongestions([
        { location: 'Linea Milano-Torino', severity: 'Alta', expectedDuration: '2 ore', load: 120 },
        { location: 'Nodo Roma', severity: 'Media', expectedDuration: '1 ora', load: 105 },
        { location: 'Linea Napoli-Bari', severity: 'Bassa', expectedDuration: '30 minuti', load: 95 },
      ]);
      setStrategies([
        { action: 'Ridispacciamento centrale termica Piacenza', cost: 5000, impact: 'Riduzione congestione del 70%', efficiency: 70 },
        { action: 'Attivazione riserva idroelettrica Valtellina', cost: 3000, impact: 'Riduzione congestione del 50%', efficiency: 50 },
        { action: 'Modulazione parco eolico Puglia', cost: 2000, impact: 'Riduzione congestione del 30%', efficiency: 30 },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Alta': return 'red';
      case 'Media': return 'orange';
      case 'Bassa': return 'green';
      default: return 'gray';
    }
  };

  const containerStyle = {
    padding: '24px',
    backgroundColor: '#f3f4f6',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    marginTop: '16px'
  };

  const buttonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '8px',
    marginBottom: '8px'
  };

  const renderCongestions = () => (
    <div style={cardStyle}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Congestioni Rilevate:</h3>
      {congestions.map((cong, index) => (
        <div key={index} style={itemStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AlertTriangle style={{ color: getSeverityColor(cong.severity), marginRight: '8px' }} />
            <span style={{ fontWeight: 'bold' }}>{cong.location}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: getSeverityColor(cong.severity), fontWeight: 'bold' }}>
              Severità: {cong.severity}
            </div>
            <div style={{ fontSize: '14px', color: '#4b5563' }}>
              Durata prevista: {cong.expectedDuration}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStrategies = () => (
    <div style={cardStyle}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Strategie di Mitigazione Suggerite:</h3>
      {strategies.map((strategy, index) => (
        <div key={index} style={itemStyle}>
          <div>
            <div style={{ fontWeight: 'bold' }}>{strategy.action}</div>
            <div style={{ fontSize: '14px', color: '#4b5563' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
                <Euro size={16} style={{ marginRight: '4px' }} />
                Costo: €{strategy.cost}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <TrendingDown size={16} style={{ marginRight: '4px' }} />
                {strategy.impact}
              </span>
            </div>
          </div>
          <div style={{ fontWeight: 'bold', color: '#3b82f6' }}>
            Efficienza: {strategy.efficiency}%
          </div>
        </div>
      ))}
    </div>
  );

  const renderEfficiencyChart = () => (
    <div style={cardStyle}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Efficienza delle Strategie</h3>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={strategies}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="action" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="efficiency" fill="#8884d8" name="Efficienza (%)" />
            <Bar dataKey="cost" fill="#82ca9d" name="Costo (€)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
        <Zap style={{ marginRight: '8px' }} /> Gestione Intelligente delle Congestioni
      </h2>
      
      <button 
        onClick={analyzeCongestions}
        style={buttonStyle}
        disabled={isLoading}
      >
        {isLoading ? 'Analisi in corso...' : 'Analizza Congestioni'}
      </button>

      {congestions.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
          <div>
            {renderCongestions()}
            {renderStrategies()}
          </div>
          <div>
            {renderEfficiencyChart()}
          </div>
        </div>
      )}

      <div style={{ ...cardStyle, marginTop: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Informazioni sul Sistema</h3>
        <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
          <li>Il sistema utilizza algoritmi predittivi basati su machine learning per anticipare congestioni di rete.</li>
          <li>Le strategie di ridispacciamento suggerite sono ottimizzate per mitigare le congestioni con il minimo impatto economico.</li>
          <li>Viene fornita una valutazione dell'impatto economico e dell'efficienza per ciascuna strategia proposta.</li>
          <li>I dati in tempo reale provenienti da PMU (Phasor Measurement Units) sono integrati nell'analisi.</li>
          <li>Il sistema considera anche le previsioni meteo per ottimizzare l'utilizzo delle risorse rinnovabili nella gestione delle congestioni.</li>
        </ul>
      </div>
    </div>
  );
};

export default CongestionManagement;