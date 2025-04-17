import React from 'react';
import styled from 'styled-components';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e2e6ea')};
  }
`;

const MapControls = ({ activeMapStyle, onStyleChange }) => {
  const handleClick = (style) => {
    if (typeof onStyleChange === 'function') {
      onStyleChange(style);
    } else {
      console.error('onStyleChange is not a function');
    }
  };

  return (
    <ControlsContainer>
      {/* <Button onClick={() => handleClick('streets')} active={activeMapStyle === 'streets'}>Streets</Button>
      <Button onClick={() => handleClick('satellite')} active={activeMapStyle === 'satellite'}>Satellite</Button>
      <Button onClick={() => handleClick('topographic')} active={activeMapStyle === 'topographic'}>Topographic</Button> */}
    </ControlsContainer>
  );
};
export default MapControls;
