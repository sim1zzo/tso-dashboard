import React from 'react';
import styled from 'styled-components';
import { RotateCw } from 'lucide-react';
import italyMapImage from '../assets/italy.png';
import { Card, CardHeader, CardTitle, CardContent } from './Card'; 


const ItalyMapContainer = styled.div`
  width: 100%;
  padding-top: 47%; /* Adjust based on your image aspect ratio */
  background-image: url(${italyMapImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
`;

const InfoBox = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ImportInfo = styled(InfoBox)`
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  color: #38A169;
`;

const ExportInfo = styled(InfoBox)`
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  color: #3182CE;
`;

const BalanceInfo = styled(InfoBox)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CrossBorderExchangeChart = () => {
  const importData = 48;
  const exportData = -66;
  const balanceData = importData + exportData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>CROSS-BORDER EXCHANGE BALANCE - PROGRAMMED</CardTitle>
      </CardHeader>
      <CardContent>
        <ItalyMapContainer>
          <ImportInfo>
            <strong>Import: {importData} GWh</strong>
          </ImportInfo>
          <ExportInfo>
            <strong>Export: {Math.abs(exportData)} GWh</strong>
          </ExportInfo>
          <BalanceInfo>
            <RotateCw size={24} color="#666" />
            <div><strong>{balanceData} GWh</strong></div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Programmed interconnections balance</div>
          </BalanceInfo>
        </ItalyMapContainer>
      </CardContent>
    </Card>
  );
};

export default CrossBorderExchangeChart;