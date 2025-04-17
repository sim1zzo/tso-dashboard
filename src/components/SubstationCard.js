import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import Gauge from './Gauge';
import { RefreshCw, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUnit, getMin, getMax } from '../utils/utils';

const CardContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
`;

const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #2d3748;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #718096;
  margin-bottom: 4px;
`;

const GaugeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }

  svg {
    margin-right: 8px;
  }
`;

const TimestampContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 12px;
  color: #718096;
`;

const TrendingLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #718096;
  margin-top: 5px;
`;

const TrendingButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }
`;

const SubstationCard = ({ substation }) => {
  const [data, setData] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const intervalRef = useRef(null);

  const generateRandomData = (key) => {
    const min = getMin(key);
    const max = getMax(key);
    return min + Math.random() * (max - min);
  };

  const handleMetricSelection = (metric) => {
    setSelectedMetrics((prev) => {
      if (prev.includes(metric)) {
        return prev.filter((m) => m !== metric);
      } else {
        const firstMetricUnit = getUnit(prev[0]);
        const currentMetricUnit = getUnit(metric);
        if (prev.length === 0 || firstMetricUnit === currentMetricUnit) {
          return [...prev, metric];
        } else {
          alert(
            `Puoi selezionare solo metriche con la stessa unità di misura (${firstMetricUnit})`
          );
          return prev;
        }
      }
    });
  };

  const updateData = useCallback(() => {
    setData((prevData) => {
      const newData = {};
      [
        'voltage',
        'frequency',
        'activePower',
        'reactivePower',
        'powerFactor',
        'transformerLoad',
        'transformerTemperature',
      ].forEach((key) => {
        const currentValue = generateRandomData(key);
        const oldData = prevData[key] || {
          min: Infinity,
          max: -Infinity,
          avg: 0,
          count: 0,
        };
        newData[key] = {
          current: currentValue,
          min: Math.min(oldData.min, currentValue),
          max: Math.max(oldData.max, currentValue),
          avg:
            (oldData.avg * oldData.count + currentValue) / (oldData.count + 1),
          count: oldData.count + 1,
          timestamp: new Date().toISOString(),
        };
      });
      return newData;
    });
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    updateData();
    intervalRef.current = setInterval(updateData, 60000);
    return () => clearInterval(intervalRef.current);
  }, [updateData]);

  return (
    <CardContainer>
      <Header>
        <div>
          <Title>{substation.name}</Title>
          <Subtitle>Coordinate: {substation.coordinates.join(', ')}</Subtitle>
          <Subtitle>Livello di tensione: {substation.voltage}</Subtitle>
          <Subtitle>
            Ultimo aggiornamento: {lastUpdate.toLocaleTimeString()}
          </Subtitle>
        </div>
        <RefreshButton onClick={updateData}>
          <RefreshCw size={18} />
          Aggiorna
        </RefreshButton>
      </Header>
      <GaugeGrid>
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <Gauge
              title={
                key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, ' $1')
              }
              value={value.current}
              unit={getUnit(key)}
              min={getMin(key)}
              max={getMax(key)}
              minDay={value.min}
              maxDay={value.max}
              avgDay={value.avg}
            />
           <TimestampContainer>
              <Clock size={12} style={{marginRight: '4px'}} />
              {new Date(value.timestamp).toLocaleTimeString()}
            </TimestampContainer>
            <TrendingLabel>
              <input
                type="checkbox"
                checked={selectedMetrics.includes(key)}
                onChange={() => handleMetricSelection(key)}
              />
              Seleziona per il trending
            </TrendingLabel>
          </div>
        ))}
      </GaugeGrid>
      {selectedMetrics.length > 0 && (
        <TrendingButton to={`/trending/${substation.id}?metrics=${selectedMetrics.join(',')}`}>
          <TrendingUp size={18} style={{marginRight: '5px'}} />
          Visualizza Trending
        </TrendingButton>
      )}
    </CardContainer>
  );
};

export default SubstationCard;