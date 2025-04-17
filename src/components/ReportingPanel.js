import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title as ChartTitle, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  ChartTitle,
  Tooltip,
  Legend
);

const PanelContainer = styled.div`
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const PanelTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
`;

const ReportSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  color: #444;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  height: 300px;
  margin-bottom: 20px;
`;

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const KPICard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const KPIValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
`;

const KPILabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const ReportingPanel = () => {
  const [loadData, setLoadData] = useState([]);
  const [generationMix, setGenerationMix] = useState(null);
  const [kpis, setKPIs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simula una chiamata API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dati di carico simulati
        const loadData = Array.from({length: 24}, (_, i) => ({
          hour: i,
          load: Math.floor(Math.random() * (45000 - 30000 + 1) + 30000)
        }));

        // Mix di generazione simulato
        const generationMix = {
          labels: ['Termoelettrico', 'Idroelettrico', 'Eolico', 'Solare', 'Altre rinnovabili'],
          datasets: [{
            data: [40, 20, 15, 20, 5],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
          }]
        };

        // KPI simulati
        const kpis = {
          availability: 99.98,
          congestionHours: 120,
          renewablePenetration: 35.2,
          co2Emissions: 250,
          loadFactor: 78.5
        };

        setLoadData(loadData);
        setGenerationMix(generationMix);
        setKPIs(kpis);
      } catch (error) {
        console.error("Errore nel caricamento dei dati:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadChartData = {
    labels: loadData.map(d => `${d.hour}:00`),
    datasets: [
      {
        label: 'Carico (MW)',
        data: loadData.map(d => d.load),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  if (isLoading) {
    return <div>Caricamento in corso...</div>;
  }

  const generateReport = () => {
    // Implementazione della generazione del report
    console.log('Generazione report avviata');
    // In un'applicazione reale, questa funzione potrebbe triggerare un'API call
    // o generare un PDF da scaricare
  };
  return (
    <PanelContainer>
      <PanelTitle>Reporting e Analisi</PanelTitle>
      
      <ReportSection>
        <SectionTitle>Andamento del Carico</SectionTitle>
        <ChartContainer>
          {loadData.length > 0 && (
            <Line data={loadChartData} options={{ maintainAspectRatio: false }} />
          )}
        </ChartContainer>
      </ReportSection>

      <ReportSection>
        <SectionTitle>Mix di Generazione</SectionTitle>
        <ChartContainer>
          {generationMix && (
            <Pie data={generationMix} options={{ maintainAspectRatio: false }} />
          )}
        </ChartContainer>
      </ReportSection>

      <ReportSection>
        <SectionTitle>KPI di Sistema</SectionTitle>
        <KPIContainer>
          <KPICard>
            <KPIValue>{kpis.availability}%</KPIValue>
            <KPILabel>Disponibilità della rete</KPILabel>
          </KPICard>
          <KPICard>
            <KPIValue>{kpis.congestionHours}</KPIValue>
            <KPILabel>Ore di congestione</KPILabel>
          </KPICard>
          <KPICard>
            <KPIValue>{kpis.renewablePenetration}%</KPIValue>
            <KPILabel>Penetrazione rinnovabili</KPILabel>
          </KPICard>
          <KPICard>
            <KPIValue>{kpis.co2Emissions}</KPIValue>
            <KPILabel>Emissioni CO2 (g/kWh)</KPILabel>
          </KPICard>
          <KPICard>
            <KPIValue>{kpis.loadFactor}%</KPIValue>
            <KPILabel>Fattore di carico</KPILabel>
          </KPICard>
        </KPIContainer>
      </ReportSection>

      <Button onClick={generateReport}>Genera Report Completo</Button>
    </PanelContainer>
  );
};

export default ReportingPanel;
