import React from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

const ExportButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ExportControl = ({ mapInstance }) => {
  const handleExport = () => {
    html2canvas(document.querySelector('.mapboxgl-canvas')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'map-export.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <ExportButton onClick={handleExport}>
      Export Map
    </ExportButton>
  );
};

export default ExportControl;