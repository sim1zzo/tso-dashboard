import React, { useState, useEffect } from 'react';
import { Activity, ArrowUp, ArrowDown } from 'lucide-react';

const InterconnectionMonitoring = () => {
  const [interconnectionData, setInterconnectionData] = useState(null);

  useEffect(() => {
    const fetchInterconnectionData = async () => {
      // Simulazione di dati
      const mockData = {
        interconnections: [
          { id: 'INT001', name: 'Italia-Francia', flow: 1000, capacity: 3000, atc: 1500 },
          { id: 'INT002', name: 'Italia-Svizzera', flow: -500, capacity: 4000, atc: 2000 },
          { id: 'INT003', name: 'Italia-Austria', flow: 200, capacity: 2000, atc: 1000 },
        ],
        lastUpdateTime: new Date().toLocaleString(),
      };
      setInterconnectionData(mockData);
    };

    fetchInterconnectionData();
    const interval = setInterval(fetchInterconnectionData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
    textAlign: 'left',
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  };

  const renderFlowIndicator = (flow) => {
    if (flow > 0) {
      return <ArrowUp color="green" size={18} />;
    } else if (flow < 0) {
      return <ArrowDown color="red" size={18} />;
    }
    return null;
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Activity style={{marginRight: '10px'}} /> Monitoraggio Interconnessioni
      </h2>
      
      {interconnectionData && (
        <div style={cardStyle}>
          <p style={{marginBottom: '15px', color: '#666'}}>
            Ultimo aggiornamento: {interconnectionData.lastUpdateTime}
          </p>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Interconnessione</th>
                <th style={headerCellStyle}>Flusso (MW)</th>
                <th style={headerCellStyle}>Capacità (MW)</th>
                <th style={headerCellStyle}>ATC (MW)</th>
              </tr>
            </thead>
            <tbody>
              {interconnectionData.interconnections.map((interconnection) => (
                <tr key={interconnection.id}>
                  <td style={cellStyle}>{interconnection.name}</td>
                  <td style={cellStyle}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      {renderFlowIndicator(interconnection.flow)}
                      <span style={{marginLeft: '5px'}}>{Math.abs(interconnection.flow)}</span>
                    </div>
                  </td>
                  <td style={cellStyle}>{interconnection.capacity}</td>
                  <td style={cellStyle}>{interconnection.atc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InterconnectionMonitoring;