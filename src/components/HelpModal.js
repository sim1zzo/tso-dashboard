// src/components/HelpModal.js
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  // Stili per l'overlay modale
`;

const ModalContent = styled.div`
  // Stili per il contenuto modale
`;

const HelpModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Aiuto</h2>
        <p>{content}</p>
        <button onClick={onClose}>Chiudi</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HelpModal;