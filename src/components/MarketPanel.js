import React, { useState, useMemo } from 'react';
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
} from 'recharts';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import ResizeObserverWrapper from './ResizeObserverWrapper';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const GRAY_COLOR = '#D3D3D3';

const priceComponents = [
  { name: 'Daily market', value: 72.83 },
  { name: 'Intraday market', value: 1.5 },
  { name: 'Adjustment Services', value: 5.2 },
  { name: 'Capacity payments', value: 2.17 },
];

const energyManaged = [
  { month: 'Jan', up: 2200, down: -1000, raise: 800, lower: -900 },
  { month: 'Feb', up: 1200, down: -600, raise: 400, lower: -300 },
  { month: 'Mar', up: 1200, down: -600, raise: 400, lower: -300 },
  { month: 'Apr', up: 1200, down: -600, raise: 400, lower: -300 },
  { month: 'May', up: 1200, down: -600, raise: 400, lower: -300 },
  { month: 'Jun', up: 1200, down: -600, raise: 400, lower: -300 },
  { month: 'Jul', up: 1200, down: -600, raise: 400, lower: -300 },
  { month: 'Aug', up: 1500, down: -800, raise: 300, lower: -200 },
  { month: 'Sep', up: 1200, down: -600, raise: 400, lower: -300 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className='custom-tooltip'
        style={{
          backgroundColor: '#fff',
          padding: '5px',
          border: '1px solid #ccc',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].name}</p>
        <p style={{ margin: 0 }}>{`${payload[0].value.toFixed(2)} €/MWh`}</p>
      </div>
    );
  }
  return null;
};

const MarketPanel = () => {
  const [activePieSlices, setActivePieSlices] = useState(
    priceComponents.map(() => true)
  );
  const [activeBarSeries, setActiveBarSeries] = useState({
    up: true,
    down: true,
    raise: true,
    lower: true,
  });

  const handlePieLegendClick = (entry, index) => {
    setActivePieSlices((prev) => {
      const newActive = [...prev];
      newActive[index] = !newActive[index];
      return newActive;
    });
  };

  const handleBarLegendClick = (dataKey) => {
    setActiveBarSeries((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  const activePriceComponents = useMemo(() => {
    return priceComponents.filter((_, index) => activePieSlices[index]);
  }, [activePieSlices]);

  const totalPrice = useMemo(() => {
    return activePriceComponents.reduce(
      (sum, component) => sum + component.value,
      0
    );
  }, [activePriceComponents]);

  return (
    <div>
      <Typography variant='h4' gutterBottom>
        Markets
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{ backgroundColor: '#1976d2', height: '10px' }} />
            <CardContent>
              <Typography variant='h6'>
                Components of the Final Price and Energy at Closing
              </Typography>
              <Typography variant='subtitle2' align='right'>
                July 2024
              </Typography>
              <ResizeObserverWrapper>
                <ResponsiveContainer width='100%' height={300}>
                  <PieChart>
                    <Pie
                      data={activePriceComponents}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={110}
                      fill='#8884d8'
                      dataKey='value'
                    >
                      {activePriceComponents.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              priceComponents.findIndex(
                                (item) => item.name === entry.name
                              ) % COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      onClick={(entry, index) =>
                        handlePieLegendClick(entry, index)
                      }
                      formatter={(value, entry) => [
                        `${value} (${
                          entry.payload?.value?.toFixed(2) ?? 'N/A'
                        } €/MWh)`,
                        null,
                      ]}
                      iconType='circle'
                      payload={priceComponents.map((item, index) => ({
                        id: item.name,
                        type: 'circle',
                        value: item.name,
                        color: activePieSlices[index]
                          ? COLORS[index % COLORS.length]
                          : GRAY_COLOR,
                        payload: item,
                      }))}
                    />
                    <text
                      x={'50%'}
                      y={'40%'}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={'50%'}
                        dy='-1.2em'
                        fontSize='14'
                        fontWeight='bold'
                      >
                        Total price
                      </tspan>
                      <tspan
                        x={'50%'}
                        dy='1.5em'
                        fontSize='18'
                        fontWeight='bold'
                      >{`${totalPrice.toFixed(2)} €/MWh`}</tspan>
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </ResizeObserverWrapper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{ backgroundColor: '#1976d2', height: '10px' }} />
            <CardContent>
              <Typography variant='h6'>
                Energy Managed Through Ancillary Services
              </Typography>
              <ResizeObserverWrapper>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={energyManaged}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='month' />
                    <YAxis unit='GWh' tick={{ fontSize: '80%' }} />{' '}
                    {/* Font ridotto del 20% */}
                    <Tooltip />
                    <Legend
                      onClick={(e) => handleBarLegendClick(e.dataKey)}
                      iconType='circle'
                      formatter={(value, entry) => [
                        `${value} (${
                          entry.payload?.[entry.dataKey]?.toFixed(2) ?? 'N/A'
                        } GWh)`,
                        null,
                      ]}
                      payload={[
                        {
                          value: 'Energy programmed for safety to go up',
                          type: 'circle',
                          id: 'up',
                          color: activeBarSeries.up ? '#82ca9d' : GRAY_COLOR,
                          dataKey: 'up',
                        },
                        {
                          value: 'Energy programmed for safety to go down',
                          type: 'circle',
                          id: 'down',
                          color: activeBarSeries.down ? '#8884d8' : GRAY_COLOR,
                          dataKey: 'down',
                        },
                        {
                          value: 'Energy balance to be raised',
                          type: 'circle',
                          id: 'raise',
                          color: activeBarSeries.raise ? '#ffc658' : GRAY_COLOR,
                          dataKey: 'raise',
                        },
                        {
                          value: 'Balance energy to be lowered',
                          type: 'circle',
                          id: 'lower',
                          color: activeBarSeries.lower ? '#ff8042' : GRAY_COLOR,
                          dataKey: 'lower',
                        },
                      ]}
                    />
                    {activeBarSeries.up && (
                      <Bar
                        dataKey='up'
                        stackId='a'
                        fill='#82ca9d'
                        name='Energy programmed for safety to go up'
                      />
                    )}
                    {activeBarSeries.down && (
                      <Bar
                        dataKey='down'
                        stackId='a'
                        fill='#8884d8'
                        name='Energy programmed for safety to go down'
                      />
                    )}
                    {activeBarSeries.raise && (
                      <Bar
                        dataKey='raise'
                        stackId='a'
                        fill='#ffc658'
                        name='Energy balance to be raised'
                      />
                    )}
                    {activeBarSeries.lower && (
                      <Bar
                        dataKey='lower'
                        stackId='a'
                        fill='#ff8042'
                        name='Balance energy to be lowered'
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </ResizeObserverWrapper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ backgroundColor: '#1976d2', height: '10px' }} />
            <CardContent>
              <Typography variant='h6'>Cost of Ancillary Services</Typography>
              <Typography variant='h3' align='center'>
                178.43 Mill.€
              </Typography>
              <Typography variant='subtitle1' align='center'>
                July 2024
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ backgroundColor: '#1976d2', height: '10px' }} />
            <CardContent>
              <Typography variant='h6'>
                Variation of Volume of Energy Managed Through Ancillary Services
              </Typography>
              <Typography variant='h3' align='center'>
                8.0%
              </Typography>
              <Typography variant='subtitle1' align='center'>
                July 2024
              </Typography>
              <Typography variant='body2' align='center'>
                Regarding same period of the previous year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MarketPanel;
