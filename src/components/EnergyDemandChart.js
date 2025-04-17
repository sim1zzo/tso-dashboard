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
  // Real: partenza da 26000, picco a 28000, discesa a 22000
  // Scheduled: partenza da 27000, scende a 21000, sale a scalini fino a 30000, e poi scende a 25000
  // Forecasted: partenza da 27000, scende a 20000, risale a 28000, e poi riscende a 25000

  { time: '00:00', real: 26.0, scheduled: 27.0, forecasted: 27.0 },
  { time: '00:15', real: 26.2, scheduled: 26.8, forecasted: 26.7 },
  { time: '00:30', real: 26.4, scheduled: 26.6, forecasted: 26.5 },
  { time: '00:45', real: 26.6, scheduled: 26.4, forecasted: 26.2 },
  { time: '01:00', real: 26.8, scheduled: 26.2, forecasted: 26.0 },
  { time: '01:15', real: 27.0, scheduled: 26.0, forecasted: 25.7 },
  { time: '01:30', real: 27.2, scheduled: 25.8, forecasted: 25.5 },
  { time: '01:45', real: 27.4, scheduled: 25.6, forecasted: 25.2 },
  { time: '02:00', real: 27.6, scheduled: 25.4, forecasted: 25.0 },
  { time: '02:15', real: 27.8, scheduled: 25.2, forecasted: 24.7 },
  { time: '02:30', real: 28.0, scheduled: 25.0, forecasted: 24.5 },
  { time: '02:45', real: 27.9, scheduled: 24.8, forecasted: 24.2 },
  { time: '03:00', real: 27.8, scheduled: 24.6, forecasted: 24.0 },
  { time: '03:15', real: 27.6, scheduled: 24.4, forecasted: 23.7 },
  { time: '03:30', real: 27.4, scheduled: 24.2, forecasted: 23.5 },
  { time: '03:45', real: 27.2, scheduled: 24.0, forecasted: 23.2 },
  { time: '04:00', real: 27.0, scheduled: 23.8, forecasted: 23.0 },
  { time: '04:15', real: 26.8, scheduled: 23.6, forecasted: 22.7 },
  { time: '04:30', real: 26.6, scheduled: 23.4, forecasted: 22.5 },
  { time: '04:45', real: 26.4, scheduled: 23.2, forecasted: 22.2 },
  { time: '05:00', real: 26.2, scheduled: 23.0, forecasted: 22.0 },
  { time: '05:15', real: 26.0, scheduled: 22.8, forecasted: 21.7 },
  { time: '05:30', real: 25.8, scheduled: 22.6, forecasted: 21.5 },
  { time: '05:45', real: 25.6, scheduled: 22.4, forecasted: 21.2 },
  { time: '06:00', real: 25.4, scheduled: 22.2, forecasted: 21.0 },
  { time: '06:15', real: 25.2, scheduled: 22.0, forecasted: 20.7 },
  { time: '06:30', real: 25.0, scheduled: 21.8, forecasted: 20.5 },
  { time: '06:45', real: 24.8, scheduled: 21.6, forecasted: 20.2 },
  { time: '07:00', real: 24.6, scheduled: 21.4, forecasted: 20.0 },
  { time: '07:15', real: 24.4, scheduled: 21.2, forecasted: 20.2 },
  { time: '07:30', real: 24.2, scheduled: 21.0, forecasted: 20.5 },
  { time: '07:45', real: 24.0, scheduled: 21.2, forecasted: 20.7 },
  { time: '08:00', real: 23.8, scheduled: 21.5, forecasted: 21.0 },
  { time: '08:15', real: 23.6, scheduled: 21.7, forecasted: 21.2 },
  { time: '08:30', real: 23.4, scheduled: 22.0, forecasted: 21.5 },
  { time: '08:45', real: 23.2, scheduled: 22.2, forecasted: 21.7 },
  { time: '09:00', real: 23.0, scheduled: 22.5, forecasted: 22.0 },
  { time: '09:15', real: 22.8, scheduled: 22.7, forecasted: 22.2 },
  { time: '09:30', real: 22.6, scheduled: 23.0, forecasted: 22.5 },
  { time: '09:45', real: 22.4, scheduled: 23.2, forecasted: 22.7 },
  { time: '10:00', real: 22.2, scheduled: 23.5, forecasted: 23.0 },
  { time: '10:15', real: 22.4, scheduled: 23.7, forecasted: 23.2 },
  { time: '10:30', real: 22.6, scheduled: 24.0, forecasted: 23.5 },
  { time: '10:45', real: 22.8, scheduled: 24.2, forecasted: 23.7 },
  { time: '11:00', real: 23.0, scheduled: 24.5, forecasted: 24.0 },
  { time: '11:15', real: 23.2, scheduled: 24.7, forecasted: 24.2 },
  { time: '11:30', real: 23.4, scheduled: 25.0, forecasted: 24.5 },
  { time: '11:45', real: 23.6, scheduled: 25.2, forecasted: 24.7 },
  { time: '12:00', real: 23.8, scheduled: 25.5, forecasted: 25.0 },
  { time: '12:15', real: 24.0, scheduled: 25.7, forecasted: 25.2 },
  { time: '12:30', real: 24.2, scheduled: 26.0, forecasted: 25.5 },
  { time: '12:45', real: 24.4, scheduled: 26.2, forecasted: 25.7 },
  { time: '13:00', real: 24.6, scheduled: 26.5, forecasted: 26.0 },
  { time: '13:15', real: 24.8, scheduled: 26.7, forecasted: 26.2 },
  { time: '13:30', real: 25.0, scheduled: 27.0, forecasted: 26.5 },
  { time: '13:45', real: 25.2, scheduled: 27.2, forecasted: 26.7 },
  { time: '14:00', real: 25.4, scheduled: 27.5, forecasted: 27.0 },
  { time: '14:15', real: 25.6, scheduled: 27.7, forecasted: 27.2 },
  { time: '14:30', real: 25.8, scheduled: 28.0, forecasted: 27.5 },
  { time: '14:45', real: 26.0, scheduled: 28.2, forecasted: 27.7 },
  { time: '15:00', real: 26.2, scheduled: 28.5, forecasted: 28.0 },
  { time: '15:15', real: 26.4, scheduled: 28.7, forecasted: 27.8 },
  { time: '15:30', real: 26.6, scheduled: 29.0, forecasted: 27.7 },
  { time: '15:45', real: 26.8, scheduled: 29.2, forecasted: 27.5 },
  { time: '16:00', real: 27.0, scheduled: 29.5, forecasted: 27.4 },
  { time: '16:15', real: 27.2, scheduled: 29.7, forecasted: 27.2 },
  { time: '16:30', real: 27.4, scheduled: 30.0, forecasted: 27.1 },
  { time: '16:45', real: 27.6, scheduled: 29.7, forecasted: 26.9 },
  { time: '17:00', real: 27.8, scheduled: 29.5, forecasted: 26.8 },
  { time: '17:15', real: 28.0, scheduled: 29.2, forecasted: 26.6 },
  { time: '17:30', real: 27.8, scheduled: 29.0, forecasted: 26.5 },
  { time: '17:45', real: 27.6, scheduled: 28.7, forecasted: 26.3 },
  { time: '18:00', real: 27.4, scheduled: 28.5, forecasted: 26.2 },
  { time: '18:15', real: 27.2, scheduled: 28.2, forecasted: 26.0 },
  { time: '18:30', real: 27.0, scheduled: 28.0, forecasted: 25.9 },
  { time: '18:45', real: 26.8, scheduled: 27.7, forecasted: 25.7 },
  { time: '19:00', real: 26.6, scheduled: 27.5, forecasted: 25.6 },
  { time: '19:15', real: 26.4, scheduled: 27.2, forecasted: 25.4 },
  { time: '19:30', real: 26.2, scheduled: 27.0, forecasted: 25.3 },
  { time: '19:45', real: 26.0, scheduled: 26.7, forecasted: 25.1 },
  { time: '20:00', real: 25.8, scheduled: 26.5, forecasted: 25.0 },
  { time: '20:15', real: 25.6, scheduled: 26.2, forecasted: 25.2 },
  { time: '20:30', real: 25.4, scheduled: 26.0, forecasted: 25.4 },
  { time: '20:45', real: 25.2, scheduled: 25.7, forecasted: 25.6 },
  { time: '21:00', real: 25.0, scheduled: 25.5, forecasted: 25.8 },
  { time: '21:15', real: 24.8, scheduled: 25.2, forecasted: 26.0 },
  { time: '21:30', real: 24.6, scheduled: 25.0, forecasted: 26.2 },
  { time: '21:45', real: 24.4, scheduled: 24.7, forecasted: 26.4 },
  { time: '22:00', real: 24.2, scheduled: 24.5, forecasted: 26.6 },
  { time: '22:15', real: 24.0, scheduled: 24.2, forecasted: 26.8 },
  { time: '22:30', real: 23.8, scheduled: 24.0, forecasted: 27.0 },
  { time: '22:45', real: 23.6, scheduled: 23.7, forecasted: 27.2 },
  { time: '23:00', real: 23.4, scheduled: 23.5, forecasted: 27.0 },
  { time: '23:15', real: 23.2, scheduled: 23.2, forecasted: 26.8 },
  { time: '23:30', real: 23.0, scheduled: 23.0, forecasted: 26.6 },
  { time: '23:45', real: 22.8, scheduled: 22.7, forecasted: 26.4 },
  { time: '23:59', real: 22.6, scheduled: 22.5, forecasted: 26.2 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipTitle>{`${label}`}</TooltipTitle>
        <TooltipItem color='#ffc658'>{`Real demand: ${payload[0].value.toFixed(
          1
        )} GW`}</TooltipItem>
        <TooltipItem color='#8884d8'>{`Scheduled demand: ${payload[1].value.toFixed(
          1
        )} GW`}</TooltipItem>
        <TooltipItem color='#82ca9d'>{`Forecasted demand: ${payload[2].value.toFixed(
          1
        )} GW`}</TooltipItem>
      </TooltipContainer>
    );
  }
  return null;
};

const EnergyDemandChart = () => {
  const [activeLines, setActiveLines] = useState({
    real: true,
    scheduled: true,
    forecasted: true,
  });

  const handleLegendClick = (dataKey) => {
    setActiveLines((prev) => {
      const newState = { ...prev, [dataKey]: !prev[dataKey] };
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
    <Card borderColor='#FFC107'>
      {' '}
      {/* Colore giallo per la domanda energetica */}
      <CardHeader>
        <CardTitle>
          ELECTRICAL ENERGY DEMAND IN REAL TIME - PENINSULAR
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='time' />
            <YAxis
              label={{
                value: 'GW',
                position: 'insideLeft',
                offset: 0,
                style: { textAchor: 'middle', font: 'bold 15px Arial'},
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
            <Line
              type='monotone'
              dataKey='real'
              stroke='#ffc658'
              strokeWidth={2}
              dot={false}
              name='Real demand'
              strokeOpacity={activeLines.real ? 1 : 0.3}
            />
            <Line
              type='monotone'
              dataKey='scheduled'
              stroke='#8884d8'
              strokeWidth={2}
              dot={false}
              name='Scheduled demand'
              strokeOpacity={activeLines.scheduled ? 1 : 0.3}
            />
            <Line
              type='monotone'
              dataKey='forecasted'
              stroke='#82ca9d'
              strokeWidth={2}
              dot={false}
              name='Forecasted demand'
              strokeOpacity={activeLines.forecasted ? 1 : 0.3}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EnergyDemandChart;
