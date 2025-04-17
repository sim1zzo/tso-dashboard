import React, { useState } from 'react';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

const TooltipContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
`;

const TooltipTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
`;

const TooltipItem = styled.div`
  color: ${(props) => props.color};
`;

const LegendItem = styled.span`
  cursor: pointer;
  color: ${(props) => (props.active ? props.color : '#999')};
  transition: color 0.3s;
`;

const data = [
  { time: '00:00', pvpc: 120, marketPrice: 110 },
  { time: '00:30', pvpc: 118, marketPrice: 112 },
  { time: '01:00', pvpc: 117, marketPrice: 114 },
  { time: '01:30', pvpc: 116, marketPrice: 115 },
  { time: '02:00', pvpc: 115, marketPrice: 115 },
  { time: '02:30', pvpc: 115, marketPrice: 115 },
  { time: '03:00', pvpc: 115, marketPrice: 115 },
  { time: '03:30', pvpc: 114, marketPrice: 113 },
  { time: '04:00', pvpc: 113, marketPrice: 111 },
  { time: '04:30', pvpc: 112, marketPrice: 108 },
  { time: '05:00', pvpc: 111, marketPrice: 105 },
  { time: '05:30', pvpc: 110, marketPrice: 102 },
  { time: '06:00', pvpc: 110, marketPrice: 100 },
  { time: '06:30', pvpc: 111, marketPrice: 103 },
  { time: '07:00', pvpc: 112, marketPrice: 106 },
  { time: '07:30', pvpc: 114, marketPrice: 108 },
  { time: '08:00', pvpc: 117, marketPrice: 109 },
  { time: '08:30', pvpc: 121, marketPrice: 110 },
  { time: '09:00', pvpc: 125, marketPrice: 110 },
  { time: '09:30', pvpc: 127, marketPrice: 111 },
  { time: '10:00', pvpc: 129, marketPrice: 113 },
  { time: '10:30', pvpc: 130, marketPrice: 115 },
  { time: '11:00', pvpc: 130, marketPrice: 117 },
  { time: '11:30', pvpc: 130, marketPrice: 119 },
  { time: '12:00', pvpc: 130, marketPrice: 120 },
  { time: '12:30', pvpc: 132, marketPrice: 122 },
  { time: '13:00', pvpc: 134, marketPrice: 124 },
  { time: '13:30', pvpc: 136, marketPrice: 126 },
  { time: '14:00', pvpc: 138, marketPrice: 128 },
  { time: '14:30', pvpc: 139, marketPrice: 129 },
  { time: '15:00', pvpc: 140, marketPrice: 130 },
  { time: '15:30', pvpc: 143, marketPrice: 133 },
  { time: '16:00', pvpc: 146, marketPrice: 136 },
  { time: '16:30', pvpc: 148, marketPrice: 138 },
  { time: '17:00', pvpc: 149, marketPrice: 139 },
  { time: '17:30', pvpc: 150, marketPrice: 140 },
  { time: '18:00', pvpc: 150, marketPrice: 140 },
  { time: '18:30', pvpc: 148, marketPrice: 138 },
  { time: '19:00', pvpc: 146, marketPrice: 136 },
  { time: '19:30', pvpc: 143, marketPrice: 133 },
  { time: '20:00', pvpc: 140, marketPrice: 130 },
  { time: '20:30', pvpc: 137, marketPrice: 125 },
  { time: '21:00', pvpc: 130, marketPrice: 110 },
  { time: '21:30', pvpc: 132, marketPrice: 115 },
  { time: '22:00', pvpc: 134, marketPrice: 120 },
  { time: '22:30', pvpc: 137, marketPrice: 125 },
  { time: '23:00', pvpc: 139, marketPrice: 128 },
  { time: '23:30', pvpc: 140, marketPrice: 129 },
  { time: '23:59', pvpc: 140, marketPrice: 130 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipTitle>{label}</TooltipTitle>
        <TooltipItem color='#ffc658'>{`PVPC: ${payload[0].value.toFixed(
          2
        )} €/MWh`}</TooltipItem>
        <TooltipItem color='#82ca9d'>{`Spot market price: ${payload[1].value.toFixed(
          2
        )} €/MWh`}</TooltipItem>
      </TooltipContainer>
    );
  }
  return null;
};

const PVPCvsMarketPriceChart = () => {
  const [activeLines, setActiveLines] = useState({
    pvpc: true,
    marketPrice: true,
  });

  const handleLegendClick = (dataKey) => {
    setActiveLines((prev) => {
      const newState = { ...prev, [dataKey]: !prev[dataKey] };
      // Se stiamo cercando di disattivare l'ultima linea attiva, non lo permettiamo
      if (Object.values(newState).filter(Boolean).length === 0) {
        return prev;
      }
      return newState;
    });
  };

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{ display: 'inline-block', marginRight: '10px' }}
          >
            <LegendItem
              active={activeLines[entry.dataKey]}
              color={entry.color}
              onClick={() => handleLegendClick(entry.dataKey)}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  backgroundColor: activeLines[entry.dataKey]
                    ? entry.color
                    : '#999',
                  marginRight: '5px',
                }}
              ></span>
              {entry.value}
            </LegendItem>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card borderColor='#9C27B0'>
      {' '}
      {/* Colore viola per il confronto dei prezzi */}
      <CardHeader>
        <CardTitle>EVOLUTION OF PVPC VERSUS DAILY MARKET PRICE</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis
              label={{
                value: '€ / MWh',
                position: 'left',
                angle: -90,
                offset: -15,
                style: { textAchor: 'middle', font: 'bold 15px Arial'},
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
            <Line
              type='monotone'
              dataKey='pvpc'
              stroke='#ffc658'
              strokeWidth={2}
              dot={false}
              name='PVPC (€/MWh)'
              strokeOpacity={activeLines.pvpc ? 1 : 0.3}
            />
            <Line
              type='monotone'
              dataKey='marketPrice'
              stroke='#82ca9d'
              strokeWidth={2}
              dot={false}
              name='Spot market price (€/MWh)'
              strokeOpacity={activeLines.marketPrice ? 1 : 0.3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PVPCvsMarketPriceChart;
