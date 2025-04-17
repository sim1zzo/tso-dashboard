import React from 'react';
import styled from 'styled-components';
import { FaLeaf } from 'react-icons/fa';
import { GiWindTurbine } from "react-icons/gi";
import { Card, CardHeader, CardTitle, CardContent } from './Card'; 

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  width: 48%;
`;

const SeparatorLine = styled.div`
  width: 1px;
  background-color: #e0e0e0;
  margin: 0 10px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

const PercentageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const IconBackground = styled.div`
  position: absolute;
  font-size: 80px;
  color: #f0f0f0;
`;

const Percentage = styled.div`
  position: relative;
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const DataLabel = styled.span`
  color: ${props => props.color};
  font-weight: bold;
`;

const DataValue = styled.span`
  background-color: ${props => props.bgcolor};
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
`;

const DateLabel = styled.div`
  font-size: 12px;
  color: #999;
  text-align: right;
`;

const GenerationChart = () => {
  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };
  const currentDate = getCurrentDate();

  const renewableData = {
    percentage: 58,
    today: 462,
    allTimeHigh: 579.8,
    todayDate: currentDate,
    allTimeHighDate: '01/27/2023'
  };

  const zeroCO2Data = {
    percentage: 80,
    today: 626.6,
    allTimeHigh: 743.5,
    todayDate: currentDate,
    allTimeHighDate: '01/27/2023'
  };

  const renewableCapacity = {
    percentage: 63,
    capacity: 79.3
  };

  const zeroCO2Capacity = {
    percentage: 71,
    capacity: 89.7
  };

  const renderGenerationSection = (data, title, icon) => (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <PercentageContainer>
        <IconBackground>
          {icon}
        </IconBackground>
        <Percentage>{data.percentage}%</Percentage>
      </PercentageContainer>
      <DataRow>
        <DataLabel color="#3498db">Today</DataLabel>
        <DataValue bgcolor="#3498db">{data.today} GWh</DataValue>
      </DataRow>
      <DataRow>
        <DataLabel color="#4caf50">All-time high</DataLabel>
        <DataValue bgcolor="#4caf50">{data.allTimeHigh} GWh</DataValue>
      </DataRow>
      <DateLabel>{data.todayDate}</DateLabel>
    </Section>
  );

  const renderCapacitySection = (data, title, icon) => (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <PercentageContainer>
        <IconBackground>
          {icon}
        </IconBackground>
        <Percentage>{data.percentage}%</Percentage>
      </PercentageContainer>
      <DataRow>
        <DataLabel color="#3498db">Capacity</DataLabel>
        <DataValue bgcolor="#3498db">{data.capacity} GW</DataValue>
      </DataRow>
      <DateLabel>{currentDate}</DateLabel>
    </Section>
  );

  return (
    <>
      <Card borderColor="#4CAF50"> {/* Verde per la generazione */}
        <CardHeader>
          <CardTitle>GENERATION - NATIONAL</CardTitle>
        </CardHeader>
        <CardContent>
          <FlexContainer>
            {renderGenerationSection(renewableData, "RENEWABLE GENERATION", <GiWindTurbine />)}
            <SeparatorLine />
            {renderGenerationSection(zeroCO2Data, "ZERO CO2 EQ. GENERATION", <FaLeaf />)}
          </FlexContainer>
        </CardContent>
      </Card>
      <Card borderColor="#2196F3"> {/* Blu per la capacità installata */}
        <CardHeader>
          <CardTitle>INSTALLED CAPACITY - NATIONAL</CardTitle>
        </CardHeader>
        <CardContent>
          <FlexContainer>
            {renderCapacitySection(renewableCapacity, "RENEWABLE CAPACITY", <GiWindTurbine />)}
            <SeparatorLine />
            {renderCapacitySection(zeroCO2Capacity, "ZERO CO2 EQ. CAPACITY", <FaLeaf />)}
          </FlexContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default GenerationChart;