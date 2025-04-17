import React from 'react';
import styled from 'styled-components';
import GenerationChart from './GenerationChart';
import EnergyDemandChart from './EnergyDemandChart';
import CrossBorderExchangeChart from './CrossBorderExchangeChart';
import PVPCvsMarketPriceChart from './PVPCvsMarketPriceChart';
import DemandEvolutionChart from './DemandEvolutionChart';

const HomeContainer = styled.div`
  padding: 20px;
  background-color: #f5f7fa;
`;

const ChartGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainChartContainer = styled.div`
  width: 100%;
`;

const SecondaryChartsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const SmallChartContainer = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <HomeContainer>
      <ChartGrid>
        <MainChartContainer>
          <GenerationChart />
        </MainChartContainer>
        <MainChartContainer>
          <EnergyDemandChart />
        </MainChartContainer>
        <SecondaryChartsContainer>
          <SmallChartContainer>
            <CrossBorderExchangeChart />
          </SmallChartContainer>
          <SmallChartContainer>
            <DemandEvolutionChart />
          </SmallChartContainer>
        </SecondaryChartsContainer>
        <MainChartContainer>
          <PVPCvsMarketPriceChart />
        </MainChartContainer>
      </ChartGrid>
    </HomeContainer>
  );
};

export default Home;