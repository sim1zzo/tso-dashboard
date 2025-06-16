import React, { useState, useEffect, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import {
  Euro,
  TrendingUp,
  Zap,
  Clock,
  BarChart3,
  Activity,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
} from 'lucide-react';
// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   ComposedChart,
// } from 'recharts';
// import {
//   Euro,
//   TrendingUp,
//   Zap,
//   Clock,
//   BarChart3,
//   Activity,
//   DollarSign,
//   Calendar,
//   ArrowUpRight,
//   ArrowDownRight,
//   AlertCircle,
// } from 'lucide-react';

const MarketPanel = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [activePieSlices, setActivePieSlices] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [activeBarSeries, setActiveBarSeries] = useState({
    mgp: true,
    mi: true,
    msd: true,
    terre: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
  };

  const headerStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    color: '#2c3e50',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e9ecef',
  };

  const cardWithBorderStyle = {
    ...cardStyle,
    borderTop: '4px solid #007bff',
  };

  // Dati reali dei prezzi zonali di mercato (basati su Terna/GME)
  const zonalPrices = [
    {
      zone: 'Nord',
      price: 73.45,
      volume: 18500,
      variation: 2.3,
      status: 'stable',
    },
    {
      zone: 'Centro-Nord',
      price: 74.2,
      volume: 8200,
      variation: 1.8,
      status: 'up',
    },
    {
      zone: 'Centro-Sud',
      price: 75.1,
      volume: 6800,
      variation: -0.5,
      status: 'down',
    },
    { zone: 'Sud', price: 76.85, volume: 5200, variation: 3.2, status: 'up' },
    {
      zone: 'Sicilia',
      price: 78.2,
      volume: 2100,
      variation: 4.1,
      status: 'up',
    },
    {
      zone: 'Sardegna',
      price: 72.9,
      volume: 1800,
      variation: -1.2,
      status: 'down',
    },
    {
      zone: 'Corsica',
      price: 69.5,
      volume: 150,
      variation: 0.8,
      status: 'stable',
    },
  ];

  // Componenti del prezzo finale (MGP, MI, MSD, ecc.)
  const priceComponents = [
    { name: 'Mercato del Giorno Prima (MGP)', value: 72.83, color: '#3498db' },
    { name: 'Mercato Infragiornaliero (MI)', value: 1.52, color: '#2ecc71' },
    { name: 'Servizi di Dispacciamento (MSD)', value: 5.24, color: '#f39c12' },
    { name: 'TERRE', value: 0.98, color: '#9b59b6' },
    { name: 'Corrispettivi', value: 2.17, color: '#e74c3c' },
  ];

  // Dati di capacità disponibile per macro-area
  const capacityData = [
    {
      area: 'Nord',
      idroelettrico: 12500,
      termico_cc: 18200,
      termico_trad: 8500,
      turbogas: 3200,
      altro: 2100,
      totale: 44500,
    },
    {
      area: 'Centro-Sud',
      idroelettrico: 3200,
      termico_cc: 15800,
      termico_trad: 12200,
      turbogas: 4500,
      altro: 1800,
      totale: 37500,
    },
    {
      area: 'Isole',
      idroelettrico: 800,
      termico_cc: 4200,
      termico_trad: 3800,
      turbogas: 2200,
      altro: 1200,
      totale: 12200,
    },
  ];

  // Dati storici evoluzione prezzi
  const priceEvolution = [
    { month: 'Gen', mgp: 65.2, pun: 67.4, zona_nord: 66.8, zona_sud: 68.1 },
    { month: 'Feb', mgp: 68.5, pun: 70.2, zona_nord: 69.5, zona_sud: 71.8 },
    { month: 'Mar', mgp: 70.1, pun: 72.8, zona_nord: 71.2, zona_sud: 74.5 },
    { month: 'Apr', mgp: 69.8, pun: 71.5, zona_nord: 70.9, zona_sud: 72.8 },
    { month: 'Mag', mgp: 71.2, pun: 73.1, zona_nord: 72.4, zona_sud: 74.2 },
    { month: 'Giu', mgp: 72.8, pun: 74.6, zona_nord: 73.4, zona_sud: 75.9 },
  ];

  // Energia gestita per servizi ancillari
  const ancillaryServices = [
    {
      month: 'Gen',
      energia_su: 2200,
      energia_giu: -1000,
      riserva_sec: 800,
      riserva_ter: -300,
    },
    {
      month: 'Feb',
      energia_su: 1800,
      energia_giu: -800,
      riserva_sec: 600,
      riserva_ter: -250,
    },
    {
      month: 'Mar',
      energia_su: 2100,
      energia_giu: -900,
      riserva_sec: 750,
      riserva_ter: -280,
    },
    {
      month: 'Apr',
      energia_su: 1900,
      energia_giu: -700,
      riserva_sec: 650,
      riserva_ter: -200,
    },
    {
      month: 'Mag',
      energia_su: 2300,
      energia_giu: -1100,
      riserva_sec: 850,
      riserva_ter: -350,
    },
    {
      month: 'Giu',
      energia_su: 2500,
      energia_giu: -1200,
      riserva_sec: 900,
      riserva_ter: -400,
    },
  ];

  const activePriceComponents = useMemo(() => {
    return priceComponents.filter((_, index) => activePieSlices[index]);
  }, [activePieSlices]);

  const totalPrice = useMemo(() => {
    return activePriceComponents.reduce(
      (sum, component) => sum + component.value,
      0
    );
  }, [activePriceComponents]);

  const handlePieLegendClick = (entry, index) => {
    setActivePieSlices((prev) => {
      const newActive = [...prev];
      newActive[index] = !newActive[index];
      return newActive;
    });
  };

  const getVariationIcon = (variation) => {
    if (variation > 0) return <ArrowUpRight size={16} color='#28a745' />;
    if (variation < 0) return <ArrowDownRight size={16} color='#dc3545' />;
    return (
      <span style={{ width: '16px', height: '16px', display: 'inline-block' }}>
        ⊡
      </span>
    );
  };

  const getVariationColor = (variation) => {
    if (variation > 0) return '#28a745';
    if (variation < 0) return '#dc3545';
    return '#6c757d';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '12px',
          }}
        >
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{
                margin: '0 0 4px 0',
                color: entry.color,
                display: 'flex',
                justifyContent: 'space-between',
                minWidth: '120px',
              }}
            >
              <span>{entry.name}:</span>
              <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>
                {typeof entry.value === 'number'
                  ? entry.value.toFixed(2)
                  : entry.value}
                {entry.unit || ''}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Euro style={{ marginRight: '15px' }} size={32} />
        Mercato Elettrico e Adeguatezza del Sistema
      </h2>

      {/* Prezzi Zonali in Tempo Reale */}
      <div style={cardWithBorderStyle}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <DollarSign
            size={24}
            style={{ marginRight: '12px', color: '#28a745' }}
          />
          Prezzi Zonali di Mercato -{' '}
          {currentDateTime.toLocaleDateString('it-IT')}
        </h3>

        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Zona di Mercato
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Prezzo (€/MWh)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Volume (MWh)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Variazione (%)
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    borderBottom: '2px solid #dee2e6',
                    fontWeight: '600',
                  }}
                >
                  Trend
                </th>
              </tr>
            </thead>
            <tbody>
              {zonalPrices.map((zone, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #dee2e6',
                      fontWeight: '600',
                      color: '#495057',
                    }}
                  >
                    {zone.zone}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                    }}
                  >
                    {zone.price.toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                    }}
                  >
                    {zone.volume.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                      color: getVariationColor(zone.variation),
                      fontWeight: '600',
                    }}
                  >
                    {zone.variation > 0 ? '+' : ''}
                    {zone.variation.toFixed(1)}%
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      textAlign: 'center',
                      borderBottom: '1px solid #dee2e6',
                    }}
                  >
                    {getVariationIcon(zone.variation)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistiche riassuntive */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: '#e8f4fd',
              borderRadius: '12px',
              border: '2px solid #007bff',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#007bff',
                marginBottom: '4px',
              }}
            >
              {(
                zonalPrices.reduce((sum, zone) => sum + zone.price, 0) /
                zonalPrices.length
              ).toFixed(2)}{' '}
              €/MWh
            </div>
            <div
              style={{ fontSize: '12px', color: '#495057', fontWeight: '600' }}
            >
              Prezzo Medio Nazionale
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: '#d4edda',
              borderRadius: '12px',
              border: '2px solid #28a745',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#28a745',
                marginBottom: '4px',
              }}
            >
              {zonalPrices
                .reduce((sum, zone) => sum + zone.volume, 0)
                .toLocaleString()}{' '}
              MWh
            </div>
            <div
              style={{ fontSize: '12px', color: '#495057', fontWeight: '600' }}
            >
              Volume Totale
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: '#fff3cd',
              borderRadius: '12px',
              border: '2px solid #ffc107',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#856404',
                marginBottom: '4px',
              }}
            >
              {Math.max(...zonalPrices.map((z) => z.price)).toFixed(2)} €/MWh
            </div>
            <div
              style={{ fontSize: '12px', color: '#495057', fontWeight: '600' }}
            >
              Prezzo Massimo
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '16px',
              backgroundColor: '#f8d7da',
              borderRadius: '12px',
              border: '2px solid #dc3545',
            }}
          >
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#721c24',
                marginBottom: '4px',
              }}
            >
              {Math.min(...zonalPrices.map((z) => z.price)).toFixed(2)} €/MWh
            </div>
            <div
              style={{ fontSize: '12px', color: '#495057', fontWeight: '600' }}
            >
              Prezzo Minimo
            </div>
          </div>
        </div>
      </div>

      {/* Componenti del Prezzo Finale */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}
      >
        <div style={cardWithBorderStyle}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BarChart3
              size={20}
              style={{ marginRight: '10px', color: '#6f42c1' }}
            />
            Componenti del Prezzo Finale -{' '}
            {currentDateTime.toLocaleDateString('it-IT', {
              month: 'long',
              year: 'numeric',
            })}
          </h3>

          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={activePriceComponents}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey='value'
              >
                {activePriceComponents.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <div
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}
            >
              {totalPrice.toFixed(2)} €/MWh
            </div>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              Prezzo Finale Totale
            </div>
          </div>

          {/* Legenda personalizzata */}
          <div style={{ marginTop: '16px' }}>
            {priceComponents.map((component, index) => (
              <div
                key={index}
                onClick={() => handlePieLegendClick(null, index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  margin: '4px 0',
                  backgroundColor: activePieSlices[index]
                    ? '#f8f9fa'
                    : '#e9ecef',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  opacity: activePieSlices[index] ? 1 : 0.6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: component.color,
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                  ></div>
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>
                    {component.name}
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  {component.value.toFixed(2)} €/MWh
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Capacità Disponibile per Macro-Area */}
        <div style={cardWithBorderStyle}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BarChart3
              size={20}
              style={{ marginRight: '10px', color: '#17a2b8' }}
            />
            Capacità Disponibile per Macro-Area
          </h3>

          <ResponsiveContainer width='100%' height={300}>
            <BarChart
              data={capacityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#e9ecef' />
              <XAxis
                dataKey='area'
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
                label={{ value: 'MW', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey='idroelettrico'
                stackId='a'
                fill='#3498db'
                name='Idroelettrico'
              />
              <Bar
                dataKey='termico_cc'
                stackId='a'
                fill='#2ecc71'
                name='Termico CC'
              />
              <Bar
                dataKey='termico_trad'
                stackId='a'
                fill='#f39c12'
                name='Termico Tradizionale'
              />
              <Bar
                dataKey='turbogas'
                stackId='a'
                fill='#e74c3c'
                name='Turbogas'
              />
              <Bar dataKey='altro' stackId='a' fill='#9b59b6' name='Altro' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evoluzione Prezzi e Servizi Ancillari */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Evoluzione Prezzi */}
        <div style={cardWithBorderStyle}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TrendingUp
              size={20}
              style={{ marginRight: '10px', color: '#28a745' }}
            />
            Evoluzione Prezzi 2025
          </h3>

          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={priceEvolution}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#e9ecef' />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
                label={{ value: '€/MWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type='monotone'
                dataKey='mgp'
                stroke='#3498db'
                strokeWidth={3}
                name='MGP'
              />
              <Line
                type='monotone'
                dataKey='pun'
                stroke='#e74c3c'
                strokeWidth={2}
                name='PUN'
              />
              <Line
                type='monotone'
                dataKey='zona_nord'
                stroke='#2ecc71'
                strokeWidth={2}
                name='Zona Nord'
              />
              <Line
                type='monotone'
                dataKey='zona_sud'
                stroke='#f39c12'
                strokeWidth={2}
                name='Zona Sud'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Servizi Ancillari */}
        <div style={cardWithBorderStyle}>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Activity
              size={20}
              style={{ marginRight: '10px', color: '#6f42c1' }}
            />
            Energia Gestita - Servizi Ancillari
          </h3>

          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart
              data={ancillaryServices}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' stroke='#e9ecef' />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#495057' }}
                axisLine={{ stroke: '#dee2e6' }}
                label={{ value: 'GWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey='energia_su' fill='#28a745' name='Energia Su' />
              <Bar dataKey='energia_giu' fill='#dc3545' name='Energia Giù' />
              <Line
                type='monotone'
                dataKey='riserva_sec'
                stroke='#007bff'
                strokeWidth={2}
                name='Riserva Secondaria'
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Riepilogo Costi e Adeguatezza */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '24px',
        }}
      >
        <div
          style={{
            ...cardStyle,
            textAlign: 'center',
            borderTop: '4px solid #28a745',
          }}
        >
          <h4
            style={{
              margin: '0 0 16px 0',
              color: '#495057',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Costo Servizi Ancillari
          </h4>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#28a745',
              marginBottom: '8px',
            }}
          >
            186.4 M€
          </div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            {currentDateTime.toLocaleDateString('it-IT', {
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            textAlign: 'center',
            borderTop: '4px solid #007bff',
          }}
        >
          <h4
            style={{
              margin: '0 0 16px 0',
              color: '#495057',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Margine di Riserva
          </h4>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#007bff',
              marginBottom: '8px',
            }}
          >
            15.2%
          </div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            Adeguatezza del sistema
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            textAlign: 'center',
            borderTop: '4px solid #ffc107',
          }}
        >
          <h4
            style={{
              margin: '0 0 16px 0',
              color: '#495057',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Variazione Volume MSD
          </h4>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#856404',
              marginBottom: '8px',
            }}
          >
            +8.3%
          </div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            vs stesso periodo 2024
          </div>
        </div>

        <div
          style={{
            ...cardStyle,
            textAlign: 'center',
            borderTop: '4px solid #dc3545',
          }}
        >
          <h4
            style={{
              margin: '0 0 16px 0',
              color: '#495057',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Capacità Totale Disponibile
          </h4>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#dc3545',
              marginBottom: '8px',
            }}
          >
            94.2 GW
          </div>
          <div style={{ fontSize: '12px', color: '#6c757d' }}>
            Tutte le macro-aree
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPanel;
