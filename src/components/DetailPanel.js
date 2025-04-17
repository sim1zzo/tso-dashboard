// src/components/DetailPanel.js
import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-left: 1px solid #e0e0e0;
  width: 300px;
  height: 100%;
  overflow-y: auto;
`;

const UpdateIndicator = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.updated ? '#4CAF50' : '#ccc'};
  margin-left: 5px;
`;

const DetailPanel = ({ selectedItem, level, realTimeData }) => {
  if (!selectedItem) {
    return <PanelContainer>Seleziona un elemento per vedere i dettagli</PanelContainer>;
  }

  const renderDetails = () => {
    const itemData = realTimeData[selectedItem.id] || {};
    const isUpdated = itemData.lastUpdate && (new Date() - new Date(itemData.lastUpdate)) < 5000;

    switch (level) {
      case 'sottostazione':
        return (
          <>
            <h3>{selectedItem.name} <UpdateIndicator updated={isUpdated} /></h3>
            <p>Livello di tensione: {selectedItem.voltageLevel} kV</p>
            <p>Tensione attuale: {itemData.voltage || 'N/A'} kV</p>
            <p>Potenza in transito: {itemData.power || 'N/A'} MW</p>
            {/* Qui potresti aggiungere uno schema unifilare interattivo */}
            <p>Schema unifilare: [Inserire visualizzazione schema]</p>
          </>
        );
      case 'linea':
        return (
          <>
            <h3>{selectedItem.name} <UpdateIndicator updated={isUpdated} /></h3>
            <p>Tensione: {selectedItem.voltage} kV</p>
            <p>Lunghezza: {selectedItem.length} km</p>
            <p>Capacità: {selectedItem.capacity} MW</p>
            <p>Flusso attuale: {itemData.currentFlow || selectedItem.currentFlow || 'N/A'} MW</p>
            <p>Stato: {itemData.congested || selectedItem.congested ? 'Congestionata' : 'Normale'}</p>
          </>
        );
      case 'centrale':
        return (
          <>
            <h3>{selectedItem.name} <UpdateIndicator updated={isUpdated} /></h3>
            <p>Tipo: {selectedItem.type}</p>
            <p>Capacità: {selectedItem.capacity} MW</p>
            <p>Produzione attuale: {itemData.currentProduction || selectedItem.currentProduction || 'N/A'} MW</p>
            <p>Disponibilità: {itemData.availability || selectedItem.availability || 'N/A'}%</p>
          </>
        );
      default:
        return <p>Dettagli non disponibili</p>;
    }
  };

  return (
    <PanelContainer>
      {renderDetails()}
    </PanelContainer>
  );
};

export default DetailPanel;