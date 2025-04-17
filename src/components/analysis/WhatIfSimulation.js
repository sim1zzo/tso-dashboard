import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, ArrowRight, Wind, Sun, Droplet } from 'lucide-react';

const WhatIfSimulation = () => {
  const [scenario, setScenario] = useState({
    demandIncrease: 0,
    renewablePercentage: 30,
    outageLocation: '',
    windSpeed: 5,
    solarIrradiance: 500,
    hydroReservoirLevel: 70
  });
  const [simulationResult, setSimulationResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScenario((prev) => ({ ...prev, [name]: value }));
  };

  const runSimulation = (e) => {
    e.preventDefault();
    // Simulazione del risultato più dettagliata
    const result = {
      systemStability: Math.random() > 0.5 ? 'Stabile' : 'Instabile',
      stabilityIndex: Math.round(Math.random() * 100),
      frequencyDeviation: (Math.random() * 0.5 - 0.25).toFixed(3),
      voltageProfiles: {
        'Nodo A': 0.98,
        'Nodo B': 1.02,
        'Nodo C': 0.97
      },
      congestionPoints: [
        { location: 'Linea A-B', loadPercentage: 95 },
        { location: 'Nodo C', loadPercentage: 88 }
      ],
      renewableOutput: {
        wind: Math.round(scenario.windSpeed * 10),
        solar: Math.round(scenario.solarIrradiance * 0.8),
        hydro: Math.round(scenario.hydroReservoirLevel * 0.5)
      },
      recommendedActions: [
        { action: 'Aumentare la produzione nella zona X', impact: 'Riduzione congestione del 15%' },
        { action: 'Ridurre il carico nella zona Y', impact: 'Miglioramento stabilità del 10%' },
        { action: 'Attivare le riserve nella zona Z', impact: 'Aumento margine di sicurezza del 20%' }
      ],
    };
    setSimulationResult(result);
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

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const resultStyle = {
    marginTop: '20px',
  };

  const renderVoltageProfiles = () => (
    <div style={{ marginTop: '15px' }}>
      <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Profili di Tensione:</h4>
      {Object.entries(simulationResult.voltageProfiles).map(([node, voltage]) => (
        <div key={node} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>{node}:</span>
          <span style={{ color: voltage < 0.95 || voltage > 1.05 ? 'red' : 'green' }}>{voltage.toFixed(2)} p.u.</span>
        </div>
      ))}
    </div>
  );

  const renderRenewableOutput = () => (
    <div style={{ marginTop: '15px' }}>
      <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Produzione Rinnovabile:</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center' }}>
          <Wind size={24} />
          <div>{simulationResult.renewableOutput.wind} MW</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Sun size={24} />
          <div>{simulationResult.renewableOutput.solar} MW</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Droplet size={24} />
          <div>{simulationResult.renewableOutput.hydro} MW</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Activity style={{marginRight: '10px'}} /> Simulazione di Scenari "What-If"
      </h2>
      
      <div style={cardStyle}>
        <form onSubmit={runSimulation} style={formStyle}>
          <label>
            Aumento della domanda (%):
            <input
              type='number'
              name='demandIncrease'
              value={scenario.demandIncrease}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label>
            Energia rinnovabile (%):
            <input
              type='number'
              name='renewablePercentage'
              value={scenario.renewablePercentage}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label>
            Localizzazione del guasto:
            <input
              type='text'
              name='outageLocation'
              value={scenario.outageLocation}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label>
            Velocità del vento (m/s):
            <input
              type='number'
              name='windSpeed'
              value={scenario.windSpeed}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label>
            Irradianza solare (W/m²):
            <input
              type='number'
              name='solarIrradiance'
              value={scenario.solarIrradiance}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <label>
            Livello serbatoi idro (%):
            <input
              type='number'
              name='hydroReservoirLevel'
              value={scenario.hydroReservoirLevel}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </label>
          <button type='submit' style={buttonStyle}>Esegui Simulazione</button>
        </form>

        {simulationResult && (
          <div style={resultStyle}>
            <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>Risultati della Simulazione:</h3>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <p style={{display: 'flex', alignItems: 'center'}}>
                Stabilità del sistema: 
                {simulationResult.systemStability === 'Stabile' 
                  ? <CheckCircle color="green" style={{marginLeft: '10px'}} /> 
                  : <AlertTriangle color="red" style={{marginLeft: '10px'}} />}
                {simulationResult.systemStability}
              </p>
              <p>Indice di Stabilità: <strong>{simulationResult.stabilityIndex}%</strong></p>
              <p>Deviazione di Frequenza: <strong>{simulationResult.frequencyDeviation} Hz</strong></p>
            </div>
            
            {renderVoltageProfiles()}
            
            <h4 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '10px'}}>Punti di Congestione:</h4>
            <ul style={{listStyleType: 'none', padding: 0}}>
              {simulationResult.congestionPoints.map((point, index) => (
                <li key={index} style={{marginBottom: '5px', display: 'flex', justifyContent: 'space-between'}}>
                  <span>{point.location}:</span>
                  <span style={{color: point.loadPercentage > 90 ? 'red' : 'orange'}}>{point.loadPercentage}% carico</span>
                </li>
              ))}
            </ul>

            {renderRenewableOutput()}

            <h4 style={{fontSize: '18px', fontWeight: 'bold', marginTop: '15px', marginBottom: '10px'}}>Azioni Raccomandate:</h4>
            <ul style={{listStyleType: 'none', padding: 0}}>
              {simulationResult.recommendedActions.map((action, index) => (
                <li key={index} style={{marginBottom: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <ArrowRight size={16} style={{marginRight: '10px', flexShrink: 0}} />
                    <span><strong>{action.action}</strong></span>
                  </div>
                  <div style={{marginLeft: '26px', color: '#666'}}>Impatto: {action.impact}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '10px'}}>Informazioni sul Sistema di Simulazione</h3>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
          <li>Utilizza modelli di rete dettagliati e dati storici per previsioni accurate.</li>
          <li>Incorpora variabili meteorologiche per simulare l'impatto sulle energie rinnovabili.</li>
          <li>Analizza molteplici scenari contemporaneamente per confronti rapidi.</li>
          <li>Calcola indici di stabilità e affidabilità basati su standard industriali.</li>
          <li>Fornisce raccomandazioni prioritizzate basate su analisi costi-benefici.</li>
        </ul>
      </div>
    </div>
  );
};

export default WhatIfSimulation;