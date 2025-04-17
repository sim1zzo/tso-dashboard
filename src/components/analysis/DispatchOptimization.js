import React, { useState, useEffect } from 'react';
import { Activity, Zap, Sun, AlertTriangle } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { CIMModel } from '../../models/CIMModel';
import { DispatchOptimizationService } from '../../services/DispatchOptimizationService';

const DispatchOptimization = () => {
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [networkState, setNetworkState] = useState(null);
  const [cimModel] = useState(new CIMModel());
  const [optimizationService] = useState(new DispatchOptimizationService());
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [congestions, setCongestions] = useState([
    { id: 1, location: 'Linea Milano-Torino', severity: 'Alta', expectedDuration: '2 ore', loadPercentage: 115 },
    { id: 2, location: 'Nodo Roma', severity: 'Media', expectedDuration: '1 ora', loadPercentage: 95 },
    { id: 3, location: 'Trasformatore Firenze', severity: 'Bassa', expectedDuration: '30 minuti', loadPercentage: 85 },
  ]);

  const [mitigationStrategies, setMitigationStrategies] = useState([
    { id: 1, action: 'Ridispacciamento centrale termoelettrica Piacenza', cost: 5000, impact: 'Riduzione congestione del 30%', efficiency: 85 },
    { id: 2, action: 'Attivazione riserva idroelettrica Valtellina', cost: 3000, impact: 'Riduzione congestione del 20%', efficiency: 75 },
    { id: 3, action: 'Modulazione parco eolico Puglia', cost: 1000, impact: 'Riduzione congestione del 10%', efficiency: 60 },
  ]);

  useEffect(() => {
    const initializeModel = async () => {
      await cimModel.initialize();
      const state = await cimModel.getCurrentNetworkState();
      setNetworkState(state);

      const detectedCongestions = cimModel.detectCongestions();
      setCongestions(detectedCongestions);

      const strategies = cimModel.generateMitigationStrategies(detectedCongestions);
      setMitigationStrategies(strategies);
    };
    initializeModel();
  }, [cimModel]);

  const runOptimization = async () => {
    setIsLoading(true);
    const result = await optimizationService.optimizeDispatch(networkState);
    setOptimizationResult(result);
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

  const renderNetworkState = () => {
    if (!networkState) return null;
    const totalLoad = networkState.loadForecast.IT_NORD + networkState.loadForecast.IT_CENTRO + networkState.loadForecast.IT_SUD;
    const renewableGeneration = networkState.renewableForecast.windForecast.IT_NORD + networkState.renewableForecast.windForecast.IT_SUD + networkState.renewableForecast.solarForecast.IT_NORD + networkState.renewableForecast.solarForecast.IT_SUD;

    // Dati di esempio per il grafico
    const crossBorderFlowData = [
      { border: 'Francia', flow: 1500 },
      { border: 'Svizzera', flow: -800 },
      { border: 'Austria', flow: 300 },
      { border: 'Slovenia', flow: -200 },
      { border: 'Grecia', flow: 100 },
    ];

   return (
      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>Stato Attuale della Rete</h3>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <div style={{textAlign: 'center'}}>
            <Zap size={24} color="#FF6347" />
            <div style={{fontWeight: 'bold', fontSize: '18px'}}>{totalLoad.toLocaleString()} MW</div>
            <div>Carico Totale</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <Sun size={24} color="#FFD700" />
            <div style={{fontWeight: 'bold', fontSize: '18px'}}>{renewableGeneration.toLocaleString()} MW</div>
            <div>Generazione Rinnovabile</div>
          </div>
        </div>
        <h4 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px'}}>Flussi di Scambio Transfrontaliero</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={crossBorderFlowData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="border" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="flow" fill="#3D9970" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderCongestions = () => {
    if (!congestions.length) return null;
    return (
      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>Congestioni Rilevate</h3>
        {congestions.map((congestion) => (
          <div key={congestion.id} style={{marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
              <AlertTriangle size={20} color={congestion.severity === 'Alta' ? '#FF4136' : congestion.severity === 'Media' ? '#FF851B' : '#2ECC40'} style={{marginRight: '10px'}} />
              <strong>{congestion.location}</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
              <span>Severità: {congestion.severity}</span>
              <span>Durata Stimata: {congestion.expectedDuration}</span>
              <span style={{color: congestion.loadPercentage > 100 ? '#FF4136' : '#2ECC40'}}>
                Carico: {congestion.loadPercentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMitigationStrategies = () => {
    if (!mitigationStrategies.length) return null;
    return (
      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>Strategie di Mitigazione Proposte</h3>
        {mitigationStrategies.map((strategy) => (
          <div key={strategy.id} style={{marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
            <div style={{fontWeight: 'bold', marginBottom: '5px'}}>{strategy.action}</div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px'}}>
              <span>Costo: €{strategy.cost.toLocaleString()}</span>
              <span>Impatto: {strategy.impact}</span>
              <span style={{color: strategy.efficiency > 80 ? '#2ECC40' : strategy.efficiency > 60 ? '#FF851B' : '#FF4136'}}>
                Efficienza: {strategy.efficiency}%
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOptimizationResult = () => {
    if (!optimizationResult) return null;
    return (
      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>Piano di Dispacciamento Ottimizzato</h3>
        {optimizationResult.dispatchPlan.map((unit, index) => (
          <div key={index} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
            <span>{unit.unit}</span>
            <span style={{fontWeight: 'bold'}}>{unit.output} MW</span>
          </div>
        ))}
        <div style={{marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
            <span>Costo Totale:</span>
            <span style={{fontWeight: 'bold'}}>€{optimizationResult.totalCost}</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>Emissioni CO2:</span>
            <span style={{fontWeight: 'bold'}}>{optimizationResult.co2Emissions} tons</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Activity style={{marginRight: '10px'}} /> Ottimizzazione del Dispacciamento (IEC 61970)
      </h2>
      
      <button onClick={runOptimization} style={buttonStyle} disabled={isLoading}>
        {isLoading ? 'Ottimizzazione in corso...' : 'Esegui Ottimizzazione'}
      </button>

      {showResults && (
        <>
          {renderNetworkState()}
          {renderCongestions()}
          {renderMitigationStrategies()}
          {renderOptimizationResult()}
        </>
      )}

      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>Informazioni sul Sistema</h3>
        <ul style={{listStyleType: 'disc', paddingLeft: '20px'}}>
          <li>L'algoritmo di ottimizzazione utilizza il modello CIM (IEC 61970) per rappresentare la rete elettrica.</li>
          <li>Considerazione di vincoli di rete, costi di produzione, emissioni di CO2, integrazione di energie rinnovabili e scambi transfrontalieri.</li>
          <li>Conformità agli standard ENTSO-E per il dispacciamento transfrontaliero.</li>
        </ul>
      </div>
    </div>
  );
};

export default DispatchOptimization;