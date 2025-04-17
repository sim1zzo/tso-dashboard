import React from 'react';
import styled from 'styled-components';

const ControlContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const LayerButton = styled.button`
  display: block;
  margin: 5px 0;
  padding: 5px 10px;
  background: ${props => props.active ? '#007bff' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LayerControl = ({ mapInstance, setBaseMap, setShowWeatherLayer }) => {
  const toggleLayer = (layerName) => {
    if (layerName === 'weather') {
      setShowWeatherLayer(prev => !prev);
    } else {
      setBaseMap(layerName);
    }
  };

  return (
    <ControlContainer>
      <LayerButton onClick={() => toggleLayer('streets')}>Streets</LayerButton>
      <LayerButton onClick={() => toggleLayer('satellite')}>Satellite</LayerButton>
      <LayerButton onClick={() => toggleLayer('topographic')}>Topographic</LayerButton>
      <LayerButton onClick={() => toggleLayer('weather')}>Weather</LayerButton>
    </ControlContainer>
  );
};

export default LayerControl;