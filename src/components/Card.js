import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden; // Assicura che il bordo superiore sia contenuto all'interno degli angoli arrotondati
  position: relative; // Necessario per il posizionamento del bordo superiore

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px; // Altezza del bordo superiore
    background-color: #3498db; // Colore del bordo superiore, puoi modificarlo secondo le tue preferenze
  }
`;

const CardHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eaeaea;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const CardContent = styled.div`
  padding: 16px;
`;

export { Card, CardHeader, CardTitle, CardContent };
