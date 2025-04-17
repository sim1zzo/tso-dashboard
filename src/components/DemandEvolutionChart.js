import React from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

const DateStyled = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const DemandItem = styled.div`
  margin-bottom: 15px;
`;

const Region = styled.span`
  font-size: 14px;
  color: #666;
`;

const DemandValue = styled.div`
  font-size: 24px;
  color: #333;
  font-weight: bold;
`;

const Unit = styled.span`
  font-size: 16px;
  color: #666;
  margin-left: 5px;
`;

const DemandEvolutionChart = () => {
  const currentDate = new window.Date().toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric' 
  });

  const demandData = [
    { region: 'NATIONAL', value: 761529 },
    { region: 'PENINSULAR', value: 711640 },
    { region: 'ISLANDERS', value: 25580 },
    { region: 'SICILY', value: 23006 },
    { region: 'SARDINIA', value: 723 },
  ];

  return (
    <Card borderColor="#FF5722"> {/* Colore arancione per l'evoluzione della domanda */}
      <CardHeader>
        <CardTitle>EVOLUTION OF THE DEMAND (B.C.)</CardTitle>
      </CardHeader>
      <CardContent>
        <DateStyled>{currentDate}</DateStyled>
        {demandData.map((item, index) => (
          <DemandItem key={index}>
            <Region>{item.region}</Region>
            <DemandValue>
              {item.value.toLocaleString()}
              <Unit>MWh</Unit>
            </DemandValue>
          </DemandItem>
        ))}
      </CardContent>
    </Card>
  );
};

export default DemandEvolutionChart;