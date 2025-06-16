import React from 'react';

const CrossBorderExchangeChart = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    totalNetExchange: 7525,
  };

  const countries = [
    { name: 'SWITZERLAND', export: 0, import: 3109, color: '#e91e63' },
    { name: 'FRANCE', export: 0, import: 3323, color: '#ff9800' },
    { name: 'AUSTRIA', export: 0, import: 355, color: '#00bcd4' },
    { name: 'SLOVENIA', export: 0, import: 438, color: '#8bc34a' },
    { name: 'CORSICA', export: 114, import: 0, color: '#3f51b5' },
    { name: 'MALTA', export: 86, import: 0, color: '#9e9e9e' },
    { name: 'GREECE', export: 0, import: 500, color: '#f44336' },
    { name: 'MONTENEGRO', export: 0, import: 0, color: '#795548' },
  ];

  const CountryRow = ({ country }) => {
    const netValue = country.import || country.export;
    const isImport = country.import > 0;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid #e9ecef',
          backgroundColor: 'white',
        }}
      >
        {/* Nome paese */}
        <div
          style={{
            flex: '0 0 120px',
            fontSize: '13px',
            fontWeight: 'bold',
            color: country.color,
            textAlign: 'left',
          }}
        >
          {country.name}
        </div>

        {/* Valori Export/Import */}
        <div
          style={{
            flex: '0 0 150px',
            fontSize: '11px',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '2px' }}>
            <span style={{ fontWeight: 'bold' }}>EXPORT:</span>{' '}
            <span style={{ fontWeight: 'bold' }}>{country.export}</span>{' '}
            <span style={{ color: '#666', fontSize: '10px' }}>MW</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>IMPORT:</span>{' '}
            <span style={{ fontWeight: 'bold' }}>{country.import}</span>{' '}
            <span style={{ color: '#666', fontSize: '10px' }}>MW</span>
          </div>
        </div>

        {/* Freccia direzionale */}
        <div
          style={{
            flex: '0 0 40px',
            textAlign: 'center',
            fontSize: '20px',
            color: '#3b82f6',
          }}
        >
          {isImport ? '→' : '←'}
        </div>

        {/* Esagono con valore */}
        <div
          style={{
            flex: '0 0 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#f8f9fa',
              border: `2px solid ${country.color}`,
              clipPath:
                'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: country.color,
                textAlign: 'center',
              }}
            >
              {netValue}
            </div>
            <div
              style={{
                fontSize: '8px',
                color: '#666',
              }}
            >
              MW
            </div>
          </div>
        </div>

        {/* Tipo di flusso */}
        <div
          style={{
            flex: '0 0 60px',
            fontSize: '10px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: isImport ? '#28a745' : '#dc3545',
          }}
        >
          {netValue > 0 ? (isImport ? 'IMPORT' : 'EXPORT') : 'NO FLOW'}
        </div>
      </div>
    );
  };

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
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '8px',
              }}
            >
              Scheduled Foreign Exchange
            </h3>
            <div style={{ fontSize: '14px', color: '#333' }}>
              <span style={{ fontWeight: 'bold' }}>Data:</span>{' '}
              {exchangeData.currentDate}
              <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>
                Ora:
              </span>{' '}
              {exchangeData.currentTime}
            </div>
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#666',
              textAlign: 'right',
            }}
          >
            Ultimo aggiornamento: {exchangeData.lastUpdate}
          </div>
        </div>
      </div>

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
        <div style={{ flex: '0 0 120px', textAlign: 'left' }}>PAESE</div>
        <div style={{ flex: '0 0 150px', textAlign: 'center' }}>
          EXPORT/IMPORT
        </div>
        <div style={{ flex: '0 0 40px', textAlign: 'center' }}>FLUSSO</div>
        <div style={{ flex: '0 0 80px', textAlign: 'center' }}>VALORE</div>
        <div style={{ flex: '0 0 60px', textAlign: 'center' }}>TIPO</div>
      </div>

      {/* Lista dei paesi */}
      <div>
        {countries.map((country, index) => (
          <CountryRow key={index} country={country} />
        ))}
      </div>

      {/* Totale centrale */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderTop: '2px solid #dee2e6',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#495057',
            }}
          >
            TOTAL NET EXCHANGE
          </div>

          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'white',
              border: '3px solid #333',
              clipPath:
                'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              {exchangeData.totalNetExchange.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#666',
                fontWeight: 'bold',
              }}
            >
              MW
            </div>
          </div>
        </div>
      </div>

      {/* Footer con statistiche */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: '#f8f9fa',
          fontSize: '13px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
          }}
        >
          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}
            >
              7,725 MW
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>IMPORT TOTALE</div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#333', fontSize: '16px' }}
            >
              200 MW
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>EXPORT TOTALE</div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#28a745', fontSize: '16px' }}
            >
              7,525 MW
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>SALDO NETTO</div>
          </div>

          <div>
            <div
              style={{ fontWeight: 'bold', color: '#007bff', fontSize: '16px' }}
            >
              8
            </div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              INTERCONNESSIONI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossBorderExchangeChart;
