import React from 'react';
import styled from 'styled-components';
import { useNetwork } from './NetworkContext';

const DisplayContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 20px;
`;

const NetworkDisplay = () => {
  const { activeFilter, activeView, selectedStation } = useNetwork();

  return (
    <DisplayContainer>
      <h2>Stato Attuale della Rete</h2>
      <p>Filtro Attivo: {activeFilter}</p>
      <p>Vista Attiva: {activeView}</p>
      <p>Stazione Selezionata: {selectedStation || 'Nessuna'}</p>
      {/* Qui potresti aggiungere ulteriori dettagli o visualizzazioni basate sullo stato */}
    </DisplayContainer>
  );
};

export default NetworkDisplay;
