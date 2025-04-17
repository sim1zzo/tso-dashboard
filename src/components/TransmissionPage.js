import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Activity, Zap, Clock, AlertTriangle } from 'lucide-react';

const TransmissionPage = () => {
  const [activeTypes, setActiveTypes] = useState([
    '400 kV',
    '220 kV',
    '132 kV',
    '66 kV',
  ]);

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

  const flexContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: '20px',
    marginBottom: '20px',
  };

  const flexItemStyle = {
    flex: '1 1 0',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    minWidth: '0', // Questo previene l'overflow del contenuto
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px',
    backgroundColor: '#f8f8f8',
    borderBottom: '2px solid #ddd',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  };

  const COLORS = {
    '400 kV': '#FF6B6B',
    '220 kV': '#4ECDC4',
    '132 kV': '#45B7D1',
    '66 kV': '#FFA07A',
  };

  const gridData = [
    {
      year: 2020,
      '400 kV': 21000,
      '220 kV': 19500,
      '132 kV': 2800,
      '66 kV': 2700,
    },
    {
      year: 2021,
      '400 kV': 21500,
      '220 kV': 19800,
      '132 kV': 2850,
      '66 kV': 2800,
    },
    {
      year: 2022,
      '400 kV': 21800,
      '220 kV': 20000,
      '132 kV': 2900,
      '66 kV': 2900,
    },
    {
      year: 2023,
      '400 kV': 22000,
      '220 kV': 20100,
      '132 kV': 2950,
      '66 kV': 2950,
    },
    {
      year: 2024,
      '400 kV': 22210,
      '220 kV': 20266,
      '132 kV': 2985,
      '66 kV': 2985,
    },
  ];

  const availabilityData = [
    {
      label: 'NATIONAL MONTHLY AVAILABILITY',
      value: 98.5,
      period: 'July 2024',
    },
    {
      label: 'PENINSULAR MONTHLY AVAILABILITY',
      value: 98.5,
      period: 'July 2024',
    },
    { label: 'SICILY', value: 99.9, period: 'July 2024' },
    { label: 'SARDINIA', value: 99.4, period: 'July 2024' },
  ];

  const energyData = [
    {
      region: 'Nazionale',
      energyNotSupplied: 0.0,
      averageInterruptionTime: 0.0,
    },
    {
      region: 'Nord-Ovest',
      energyNotSupplied: 0.0,
      averageInterruptionTime: 0.0,
    },
    {
      region: 'Nord-Est',
      energyNotSupplied: 0.0,
      averageInterruptionTime: 0.0,
    },
    { region: 'Centro', energyNotSupplied: 0.0, averageInterruptionTime: 0.0 },
    { region: 'Sud', energyNotSupplied: 0.0, averageInterruptionTime: 0.0 },
    { region: 'Isole', energyNotSupplied: 0.0, averageInterruptionTime: 0.0 },
  ];

  const handleLegendClick = (entry) => {
    setActiveTypes((prev) =>
      prev.includes(entry.dataKey)
        ? prev.filter((e) => e !== entry.dataKey)
        : [...prev, entry.dataKey]
    );
  };

  const processedData = useMemo(() => {
    return gridData.map((yearData) => {
      const result = { year: yearData.year };
      Object.keys(COLORS).forEach((key) => {
        if (activeTypes.includes(key)) {
          result[key] = yearData[key];
        }
      });
      return result;
    });
  }, [gridData, activeTypes]);

  const totalLength = useMemo(() => {
    const latestYear = gridData[gridData.length - 1];
    return Object.keys(COLORS).reduce((sum, key) => sum + latestYear[key], 0);
  }, [gridData]);

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Activity style={{ marginRight: '10px' }} /> Transmission
      </h2>

      <div style={cardStyle}>
        <h3
          style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          <Zap
            size={24}
            style={{ marginRight: '10px', verticalAlign: 'middle' }}
          />
          Grid Availability
        </h3>
        <div style={flexContainerStyle}>
          {availabilityData.map((item, index) => (
            <div key={index} style={flexItemStyle}>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#3385ad',
                }}
              >
                {item.value}%
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {item.period}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <h3
          style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          <AlertTriangle
            size={24}
            style={{ marginRight: '10px', verticalAlign: 'middle' }}
          />
          ENERGY NOT SUPPLIED (ENS) AND AVERAGE INTERRUPTION TIME (AIT)
        </h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Region</th>
              <th style={thStyle}>Energy not supplied [MWh]</th>
              <th style={thStyle}>Average interruption time [min]</th>
            </tr>
          </thead>
          <tbody>
            {energyData.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.region}</td>
                <td style={tdStyle}>{item.energyNotSupplied.toFixed(2)}</td>
                <td style={tdStyle}>
                  {item.averageInterruptionTime.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={cardStyle}>
        <h3
          style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}
        >
          <Clock
            size={24}
            style={{ marginRight: '10px', verticalAlign: 'middle' }}
          />
          EVOLUTION OF NATIONAL TRANSMISSION GRID
        </h3>
        <ResponsiveContainer width='100%' height={400}>
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [
                `${value} km`,
                `Transmission grid ${name}`,
              ]}
            />
            <Legend onClick={handleLegendClick} />
            {Object.keys(COLORS).map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId='a'
                fill={COLORS[key]}
                name={`Transmission grid ${key}`}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Total length in 2024: {totalLength} km
        </div>
      </div>
    </div>
  );
};

export default TransmissionPage;
