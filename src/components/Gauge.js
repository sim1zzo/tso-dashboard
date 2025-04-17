import React, { useState } from 'react';
import styled from 'styled-components';

const GaugeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const GaugeTitle = styled.h3`
  font-size: 16px;
  color: #4a5568;
  margin-bottom: 10px;
  text-align: center;
`;

const GaugeValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 10px;
`;

const GaugeBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const GaugeBar = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: ${props => props.color};
  transition: width 0.5s ease-in-out;
`;

const MinMaxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  color: #718096;
`;

const Marker = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.position}%;
  width: 2px;
  height: 100%;
  background-color: ${props => props.color};
`;

const Tooltip = styled.div`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 10;
`;

const getColor = (percentage) => {
  if (percentage <= 30) return '#48bb78'; // Verde per 0-30%
  if (percentage <= 60) return '#ecc94b'; // Giallo per 31-60%
  return '#f56565'; // Rosso per 61-100%
};

const Gauge = ({ title, value, unit, min, max, minDay, maxDay, avgDay }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;
  const color = getColor(percentage);

  const minDayPercentage = ((minDay - min) / (max - min)) * 100;
  const maxDayPercentage = ((maxDay - min) / (max - min)) * 100;
  const avgDayPercentage = ((avgDay - min) / (max - min)) * 100;

  return (
    <GaugeContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Tooltip visible={showTooltip}>
        Min: {minDay.toFixed(2)} {unit}<br />
        Max: {maxDay.toFixed(2)} {unit}<br />
        Avg: {avgDay.toFixed(2)} {unit}
      </Tooltip>
      <GaugeTitle>{title}</GaugeTitle>
      <GaugeValue>{value.toFixed(2)} {unit}</GaugeValue>
      <GaugeBarContainer>
        <GaugeBar percentage={percentage} color={color} />
        <Marker position={minDayPercentage} color="#3182ce" />
        <Marker position={maxDayPercentage} color="#e53e3e" />
        <Marker position={avgDayPercentage} color="#805ad5" />
      </GaugeBarContainer>
      <MinMaxContainer>
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </MinMaxContainer>
    </GaugeContainer>
  );
};

export default Gauge;