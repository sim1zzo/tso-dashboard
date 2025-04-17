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
} from 'recharts';
import styled from 'styled-components';
import { DatePicker } from 'antd';
import moment from 'moment';
import { fetchTrendingData } from '../services/trendingService';

const { RangePicker } = DatePicker;

const ChartContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TrendingChart = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const metrics = searchParams.get('metrics').split(',');
  const substationId = localStorage.getItem('selectedSubstationId');

  const [dateRange, setDateRange] = useState([
    moment().startOf('day'),
    moment(),
  ]);
  const [chartData, setChartData] = useState([]);

  const generateData = useCallback(async (start, end) => {
    const data = await fetchTrendingData(substationId, metrics, start, end);
    setChartData(data);
  }, [substationId, metrics]);

  useEffect(() => {
    generateData(dateRange[0], dateRange[1]);
  }, [dateRange, generateData]);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  };

  const getLineColor = (index) => {
    if (metrics.length === 1) {
      return '#1890ff'; // Colore blu fisso per una sola linea
    }
    // Array di colori per multiple linee
    const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];
    return colors[index % colors.length];
  };

  return (
    <ChartContainer>
      <Title>Trending per Sottostazione {substationId}</Title>
      <RangePicker
        onChange={handleDateChange}
        value={dateRange}
        showTime={{ format: 'HH:mm' }}
        format='YYYY-MM-DD HH:mm'
        disabledDate={(current) => current && current > moment().endOf('day')}
      />
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='timestamp' />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Legend />
          {metrics.map((metric, index) => (
            <Line
              key={metric}
              type='monotone'
              dataKey={metric}
              stroke={getLineColor(index)}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TrendingChart;