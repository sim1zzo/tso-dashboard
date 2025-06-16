import React, { useState, useEffect } from 'react';

const DemandEvolutionChart = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Dati degli scambi commerciali interni tra zone di mercato italiane
  const exchangeData = {
    lastUpdate:
      currentDateTime.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }) +
      ' ' +
      currentDateTime.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    currentDate: currentDateTime.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    currentTime: currentDateTime.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    totalNetExchange: 2845,
  };

  // Zone di mercato italiane con i loro scambi programmati
  const marketZones = [
    {
      id: 'NORD',
      name: 'NORD',
      export: 1250,
      import: 450,
      net: 800,
      color: '#2196F3',
      position: { top: '20%', left: '50%' },
    },
    {
      id: 'CNOR',
      name: 'CENTRO NORD',
      export: 320,
      import: 890,
      net: -570,
      color: '#4CAF50',
      position: { top: '35%', left: '45%' },
    },
    {
      id: 'CSUD',
      name: 'CENTRO SUD',
      export: 680,
      import: 420,
      net: 260,
      color: '#FF9800',
      position: { top: '50%', left: '55%' },
    },
    {
      id: 'SUD',
      name: 'SUD',
      export: 180,
      import: 650,
      net: -470,
      color: '#F44336',
      position: { top: '70%', left: '60%' },
    },
    {
      id: 'CALA',
      name: 'CALABRIA',
      export: 95,
      import: 280,
      net: -185,
      color: '#9C27B0',
      position: { top: '80%', left: '65%' },
    },
    {
      id: 'SICI',
      name: 'SICILIA',
      export: 350,
      import: 125,
      net: 225,
      color: '#FF5722',
      position: { top: '90%', left: '55%' },
    },
    {
      id: 'SARD',
      name: 'SARDEGNA',
      export: 70,
      import: 185,
      net: -115,
      color: '#607D8B',
      position: { top: '60%', left: '25%' },
    },
  ];

  const ZoneRow = ({ zone }) => {
    const netValue = zone.net;
    const isExport = netValue > 0;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid #e9ecef',
          backgroundColor: 'white',
        }}
      >
        {/* Nome zona */}
        <div
          style={{
            flex: '0 0 140px',
            fontSize: '13px',
            fontWeight: 'bold',
            color: zone.color,
            textAlign: 'left',
          }}
        >
          {zone.name}
        </div>

        {/* Valori Export/Import */}
        <div
          style={{
            flex: '0 0 160px',
            fontSize: '11px',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '2px' }}>
            <span style={{ fontWeight: 'bold' }}>EXPORT:</span>{' '}
            <span style={{ fontWeight: 'bold' }}>{zone.export}</span>{' '}
            <span style={{ color: '#666', fontSize: '10px' }}>MW</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>IMPORT:</span>{' '}
            <span style={{ fontWeight: 'bold' }}>{zone.import}</span>{' '}
            <span style={{ color: '#666', fontSize: '10px' }}>MW</span>
          </div>
        </div>

        {/* Freccia direzionale */}
        <div
          style={{
            flex: '0 0 40px',
            textAlign: 'center',
            fontSize: '20px',
            color: isExport ? '#28a745' : '#dc3545',
          }}
        >
          {isExport ? '↗' : '↘'}
        </div>

        {/* Valore netto */}
        <div
          style={{
            flex: '0 0 100px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: isExport ? '#28a745' : '#dc3545',
          }}
        >
          {netValue > 0 ? '+' : ''}
          {netValue} MW
        </div>

        {/* Tipo di flusso */}
        <div
          style={{
            flex: '0 0 80px',
            fontSize: '11px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: isExport ? '#28a745' : '#dc3545',
          }}
        >
          {isExport ? 'NET EXPORT' : 'NET IMPORT'}
        </div>
      </div>
    );
  };

  // Componente mappa Italia semplificata - RIMOSSO

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Linea blu superiore */}
      <div
        style={{
          height: '4px',
          backgroundColor: '#007bff',
          width: '100%',
        }}
      ></div>

      {/* Header */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '16px 20px',
          borderBottom: '1px solid #e9ecef',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '6px',
              }}
            >
              Scheduled Internal Exchange
            </h3>
            <div style={{ fontSize: '12px', color: '#333' }}>
              <span style={{ fontWeight: 'bold' }}>Data:</span>{' '}
              {exchangeData.currentDate}
              <span style={{ marginLeft: '16px', fontWeight: 'bold' }}>
                Ora:
              </span>{' '}
              {exchangeData.currentTime}
            </div>
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#666',
              textAlign: 'right',
            }}
          >
            Ultimo aggiornamento: {exchangeData.lastUpdate}
          </div>
        </div>
      </div>

      {/* Contenuto principale: Solo tabella */}
      <div>
        {/* Header delle colonne */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#f1f3f4',
            borderBottom: '2px solid #dee2e6',
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#495057',
          }}
        >
          <div style={{ flex: '0 0 140px', textAlign: 'left' }}>
            ZONA MERCATO
          </div>
          <div style={{ flex: '0 0 160px', textAlign: 'center' }}>
            EXPORT/IMPORT
          </div>
          <div style={{ flex: '0 0 40px', textAlign: 'center' }}>FLUSSO</div>
          <div style={{ flex: '0 0 100px', textAlign: 'center' }}>
            SALDO NETTO
          </div>
          <div style={{ flex: '0 0 80px', textAlign: 'center' }}>TIPO</div>
        </div>

        {/* Lista delle zone */}
        <div>
          {marketZones.map((zone, index) => (
            <ZoneRow key={index} zone={zone} />
          ))}
        </div>
      </div>

      {/* Footer con statistiche */}
      <div
        style={{
          padding: '12px 20px',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          fontSize: '12px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '12px',
          }}
        >
          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', fontSize: '14px' }}
            >
              {marketZones
                .reduce((sum, zone) => sum + zone.export, 0)
                .toLocaleString()}{' '}
              MW
            </div>
            <div style={{ color: '#666', fontSize: '10px' }}>EXPORT TOT</div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', fontSize: '14px' }}
            >
              {marketZones
                .reduce((sum, zone) => sum + zone.import, 0)
                .toLocaleString()}{' '}
              MW
            </div>
            <div style={{ color: '#666', fontSize: '10px' }}>IMPORT TOT</div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#28a745', fontSize: '14px' }}
            >
              {exchangeData.totalNetExchange.toLocaleString()} MW
            </div>
            <div style={{ color: '#666', fontSize: '10px' }}>SALDO NETTO</div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#007bff', fontSize: '14px' }}
            >
              {marketZones.length}
            </div>
            <div style={{ color: '#666', fontSize: '10px' }}>ZONE MERCATO</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandEvolutionChart;
