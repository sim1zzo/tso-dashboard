import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
} from 'recharts';
import styled from 'styled-components';
import { DatePicker, Select, Button, Card, Switch } from 'antd';
import { 
  TrendingUp, 
  Download, 
  Maximize2, 
  Settings, 
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import moment from 'moment';
import { fetchTrendingData } from '../services/trendingService';
import { getUnit } from '../utils/utils';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Styled Components con design moderno
const Container = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
`;

const ChartCard = styled(Card)`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }

  .ant-card-body {
    padding: 0;
  }
`;

const Header = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  h2 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    background: rgba(255, 255, 255, 0.2);
    padding: 12px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    color: white;
    transform: translateY(-1px);
  }
`;

const ChartContainer = styled.div`
  padding: 32px;
  background: white;
`;

const MetricsBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const MetricChip = styled.div`
  background: linear-gradient(135deg, ${props => props.color}20, ${props => props.color}10);
  border: 2px solid ${props => props.color}40;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: ${props => props.color}20;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${props => props.color}10, ${props => props.color}05);
  border: 1px solid ${props => props.color}20;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.color}20;
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.color};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  font-weight: 500;
`;

// Tooltip personalizzato
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: 'none',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        minWidth: '200px'
      }}>
        <p style={{ 
          margin: '0 0 8px 0', 
          fontWeight: 'bold', 
          color: '#333',
          fontSize: '14px'
        }}>
          {moment(label).format('DD/MM/YYYY HH:mm')}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ 
            margin: '4px 0', 
            color: entry.color,
            fontWeight: '600',
            fontSize: '13px'
          }}>
            {entry.name}: {entry.value.toFixed(3)} {getUnit(entry.dataKey)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrendingChart = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const metrics = searchParams.get('metrics')?.split(',') || [];
  const substationId = localStorage.getItem('selectedSubstationId');

  const [dateRange, setDateRange] = useState([
    moment().subtract(24, 'hours'),
    moment(),
  ]);
  const [chartData, setChartData] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [showBrush, setShowBrush] = useState(false);
  const [aggregation, setAggregation] = useState('raw');

  const generateData = useCallback(async (start, end) => {
    try {
      const data = await fetchTrendingData(substationId, metrics, start, end);
      setChartData(data);
    } catch (error) {
      console.error('Error fetching trending data:', error);
    }
  }, [substationId, metrics]);

  useEffect(() => {
    if (metrics.length > 0) {
      generateData(dateRange[0], dateRange[1]);
    }
  }, [dateRange, generateData, metrics]);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  };

  const getLineColor = (metric) => {
    const colorMap = {
      voltage: '#3b82f6',
      frequency: '#10b981',
      activePower: '#f59e0b',
      reactivePower: '#ef4444',
      powerFactor: '#8b5cf6',
      transformerLoad: '#06b6d4',
      transformerTemperature: '#f43f5e'
    };
    return colorMap[metric] || '#6b7280';
  };

  const getMetricIcon = (metric) => {
    const iconMap = {
      voltage: <Zap size={16} />,
      frequency: <Activity size={16} />,
      activePower: <TrendingUp size={16} />,
      reactivePower: <BarChart3 size={16} />,
      powerFactor: <Settings size={16} />,
      transformerLoad: <Activity size={16} />,
      transformerTemperature: <Activity size={16} />
    };
    return iconMap[metric];
  };

  const getMetricLabel = (metric) => {
    const labelMap = {
      voltage: 'Tensione',
      frequency: 'Frequenza',
      activePower: 'Potenza Attiva',
      reactivePower: 'Potenza Reattiva',
      powerFactor: 'Fattore di Potenza',
      transformerLoad: 'Carico Trasformatore',
      transformerTemperature: 'Temperatura Trasformatore'
    };
    return labelMap[metric] || metric;
  };

  const calculateStats = (data, metric) => {
    if (!data.length) return { min: 0, max: 0, avg: 0, current: 0 };
    
    const values = data.map(d => d[metric]).filter(v => v !== undefined);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const current = values[values.length - 1] || 0;
    
    return { min, max, avg, current };
  };

  // Determina l'unità principale per l'asse Y
  const getPrimaryUnit = () => {
    if (metrics.length === 1) {
      return getUnit(metrics[0]);
    }
    // Se ci sono metriche multiple, raggruppa per unità
    const units = metrics.map(metric => getUnit(metric));
    const uniqueUnits = [...new Set(units)];
    return uniqueUnits.length === 1 ? uniqueUnits[0] : '';
  };

  const primaryUnit = getPrimaryUnit();

  return (
    <Container>
      <ChartCard>
        <Header>
          <Title>
            <div className="icon">
              <TrendingUp size={24} />
            </div>
            <h2>Trending - Sottostazione {substationId}</h2>
          </Title>
          <Controls>
            <RangePicker
              value={dateRange}
              onChange={handleDateChange}
              showTime={{ format: 'HH:mm' }}
              format='DD/MM/YYYY HH:mm'
              disabledDate={(current) => current && current > moment().endOf('day')}
              style={{ borderRadius: '8px' }}
            />
            <Select
              value={aggregation}
              onChange={setAggregation}
              style={{ width: 120, borderRadius: '8px' }}
            >
              <Option value="raw">Raw</Option>
              <Option value="5min">5 min</Option>
              <Option value="15min">15 min</Option>
              <Option value="1hour">1 ora</Option>
            </Select>
            <StyledButton icon={<Download size={16} />}>
              Esporta
            </StyledButton>
          </Controls>
        </Header>

        <ChartContainer>
          {/* Chips delle metriche */}
          <MetricsBar>
            {metrics.map((metric) => (
              <MetricChip key={metric} color={getLineColor(metric)}>
                {getMetricIcon(metric)}
                {getMetricLabel(metric)}
              </MetricChip>
            ))}
          </MetricsBar>

          {/* Statistiche */}
          <StatsGrid>
            {metrics.map((metric) => {
              const stats = calculateStats(chartData, metric);
              return (
                <StatCard key={metric} color={getLineColor(metric)}>
                  <StatValue color={getLineColor(metric)}>
                    {stats.current.toFixed(3)}
                  </StatValue>
                  <StatLabel>
                    {getMetricLabel(metric)} ({getUnit(metric)})
                  </StatLabel>
                </StatCard>
              );
            })}
          </StatsGrid>

          {/* Controlli grafici */}
          <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Switch 
                checked={showGrid} 
                onChange={setShowGrid} 
                size="small"
              />
              Griglia
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Switch 
                checked={showBrush} 
                onChange={setShowBrush} 
                size="small"
              />
              Zoom Temporale
            </label>
          </div>

          {/* Grafico principale */}
          <ResponsiveContainer width='100%' height={500}>
            <LineChart 
              data={chartData}
              margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
            >
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray='3 3' 
                  stroke='#e2e8f0'
                  strokeOpacity={0.5}
                />
              )}
              <XAxis 
                dataKey='timestamp'
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickFormatter={(value) => moment(value).format('HH:mm')}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                tickLine={{ stroke: '#cbd5e1' }}
                axisLine={{ stroke: '#cbd5e1' }}
                label={{ 
                  value: primaryUnit ? `Valore (${primaryUnit})` : 'Valore', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#64748b', fontSize: '14px', fontWeight: '600' }
                }}
                domain={['dataMin - 5%', 'dataMax + 5%']}
                tickFormatter={(value) => value.toFixed(3)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                height={36}
                wrapperStyle={{ paddingBottom: '20px' }}
              />
              
              {metrics.map((metric, index) => (
                <Line
                  key={metric}
                  type='monotone'
                  dataKey={metric}
                  stroke={getLineColor(metric)}
                  strokeWidth={3}
                  dot={false}
                  name={`${getMetricLabel(metric)} (${getUnit(metric)})`}
                  activeDot={{ 
                    r: 6,
                    stroke: getLineColor(metric),
                    strokeWidth: 2,
                    fill: '#fff',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                  }}
                />
              ))}

              {/* Linea di riferimento per il valore attuale */}
              <ReferenceLine 
                x={chartData[chartData.length - 1]?.timestamp}
                stroke='#64748b'
                strokeDasharray='2 2'
                strokeOpacity={0.7}
              />

              {showBrush && chartData.length > 0 && (
                <Brush 
                  dataKey='timestamp'
                  height={30}
                  stroke='#667eea'
                  fill='rgba(102, 126, 234, 0.1)'
                  tickFormatter={(value) => moment(value).format('HH:mm')}
                  startIndex={0}
                  endIndex={chartData.length - 1}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCard>
    </Container>
  );
};

export default TrendingChart;