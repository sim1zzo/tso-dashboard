import React, { useState, useEffect } from 'react';
import { Wrench, Calendar, Battery, AlertTriangle, BarChart2, Clock, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PredictiveMaintenance = () => {
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [failureTrendData, setFailureTrendData] = useState([]);

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

  const flexContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px',
  };

  const flexItemStyle = {
    flex: '1 1 200px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const generateSchedule = () => {
    const schedule = [
      { equipment: 'Transformer A', nextMaintenance: '2023-08-15', remainingLifespan: '5 years', status: 'Buono' },
      { equipment: 'Power Line B', nextMaintenance: '2023-09-01', remainingLifespan: '3 years', status: 'Attenzione' },
      { equipment: 'Circuit Breaker C', nextMaintenance: '2023-07-30', remainingLifespan: '2 years', status: 'Critico' },
      { equipment: 'Substation D', nextMaintenance: '2023-10-05', remainingLifespan: '4 years', status: 'Buono' },
    ];
    setMaintenanceSchedule(schedule);
    setShowResults(true);
  };

  useEffect(() => {
    const data = [
      { month: 'Gen', failures: 4 },
      { month: 'Feb', failures: 3 },
      { month: 'Mar', failures: 5 },
      { month: 'Apr', failures: 6 },
      { month: 'Mag', failures: 2 },
      { month: 'Giu', failures: 4 },
      { month: 'Lug', failures: 3 },
      { month: 'Ago', failures: 5 },
      { month: 'Set', failures: 4 },
      { month: 'Ott', failures: 7 },
      { month: 'Nov', failures: 6 },
      { month: 'Dic', failures: 8 },
    ];
    setFailureTrendData(data);
  }, []);

  const InfoCard = ({ title, value, icon: Icon }) => (
    <div style={flexItemStyle}>
      <Icon size={24} color="#3D9970" style={{marginBottom: '10px'}} />
      <h3 style={{margin: '0 0 10px 0'}}>{title}</h3>
      <p style={{fontSize: '24px', fontWeight: 'bold', margin: 0}}>{value}</p>
    </div>
  );

  const EquipmentCard = ({ equipment, nextMaintenance, remainingLifespan, status }) => (
    <div style={{...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Wrench size={24} style={{marginRight: '15px'}} />
        <div>
          <h4 style={{margin: '0 0 5px 0'}}>{equipment}</h4>
          <p style={{margin: '0', color: '#555'}}><strong>Prossima Manutenzione:</strong> {nextMaintenance}</p>
          <p style={{margin: '0', color: '#555'}}><strong>Vita Utile Residua:</strong> {remainingLifespan}</p>
        </div>
      </div>
      <div style={{
        padding: '5px 10px',
        borderRadius: '4px',
        backgroundColor: status === 'Buono' ? '#4CAF50' : status === 'Attenzione' ? '#FFA500' : '#FF0000',
        color: 'white'
      }}>
        {status}
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Wrench style={{marginRight: '10px'}} /> Manutenzione Predittiva
      </h2>
      
      <button onClick={generateSchedule} style={buttonStyle}>
        <Calendar size={18} style={{marginRight: '5px'}} /> Genera Programma di Manutenzione
      </button>

      {showResults && (
        <>
          <div style={flexContainerStyle}>
            <InfoCard title="Manutenzioni Imminenti" value={maintenanceSchedule.length} icon={Calendar} />
            <InfoCard title="Vita Utile Media" value="3.3 anni" icon={Battery} />
            <InfoCard title="Componenti Critici" value="2" icon={AlertTriangle} />
          </div>

          <div style={cardStyle}>
            <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>
              <BarChart2 size={24} style={{marginRight: '10px', verticalAlign: 'middle'}} />
              Trend dei Guasti
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={failureTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="failures" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={cardStyle}>
            <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>
              <Clock size={24} style={{marginRight: '10px', verticalAlign: 'middle'}} />
              Programma di Manutenzione Ottimizzato
            </h3>
            {maintenanceSchedule.map((item, index) => (
              <EquipmentCard key={index} {...item} />
            ))}
          </div>

          <div style={cardStyle}>
            <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>
              <Activity size={24} style={{marginRight: '10px', verticalAlign: 'middle'}} />
              Informazioni sul Sistema
            </h3>
            <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
              <li style={{marginBottom: '10px'}}>
                <AlertTriangle size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
                Il sistema utilizza tecniche di anomaly detection per identificare potenziali guasti.
              </li>
              <li style={{marginBottom: '10px'}}>
                <BarChart2 size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
                L'analisi dei dati storici e in tempo reale permette di prevedere la vita utile residua dei componenti critici.
              </li>
              <li style={{marginBottom: '10px'}}>
                <Calendar size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
                Il programma di manutenzione viene ottimizzato automaticamente in base alle condizioni attuali e previste.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PredictiveMaintenance;