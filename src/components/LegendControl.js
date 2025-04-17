import React from 'react';
import styled from 'styled-components';

const LegendContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 10px;
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

const LegendControl = ({ filters = {} }) => {
  return (
    <LegendContainer>
      <LegendItem>
        <LegendColor color="#FF0000" />
        <span>380 kV</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#0000FF" />
        <span>220 kV</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#00FF00" />
        <span>150 kV</span>
      </LegendItem>
      {filters.voltageLevel && (
        <LegendItem>
          <LegendColor color="#FF00FF" />
          <span>Filtered Voltage Level: {filters.voltageLevel}</span>
        </LegendItem>
      )}
      {filters.assetType && (
        <LegendItem>
          <LegendColor color="#00FFFF" />
          <span>Filtered Asset Type: {filters.assetType}</span>
        </LegendItem>
      )}
      {filters.marketZone && (
        <LegendItem>
          <LegendColor color="#FFFF00" />
          <span>Filtered Market Zone: {filters.marketZone}</span>
        </LegendItem>
      )}
      {filters.region && (
        <LegendItem>
          <LegendColor color="#FFA500" />
          <span>Filtered Region: {filters.region}</span>
        </LegendItem>
      )}
      {filters.operationalStatus && (
        <LegendItem>
          <LegendColor color="#800080" />
          <span>Filtered Operational Status: {filters.operationalStatus}</span>
        </LegendItem>
      )}
    </LegendContainer>
  );
};

export default LegendControl;