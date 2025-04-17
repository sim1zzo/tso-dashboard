import React, { useState } from 'react';
import styled from 'styled-components';
import DemandForecast from './analysis/DemandForecast';
import DispatchOptimization from './analysis/DispatchOptimization.js';
import PredictiveMaintenance from './analysis/PredictiveMaintenance';
import NetworkStability from './analysis/NetworkStability';
import CongestionManagement from './analysis/CongestionManagement';
import VirtualAssistant from './analysis/VirtualAssistant';
import CyberSecurity from './analysis/CyberSecurity';
import RenewableIntegration from './analysis/RenewableIntegration';
import WhatIfSimulation from './analysis/WhatIfSimulation';
import N1SecurityAnalysis from './analysis/N1SecurityAnalysis';
import InterconnectionMonitoring from './analysis/InterconnectionMonitoring';

const AnalysisContainer = styled.div`
  padding: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;
  margin-right: 5px;
  margin-bottom: 5px;
  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e9ecef')};
  }
`;

const AnalysisHub = () => {
  const [activeTab, setActiveTab] = useState('demandForecast');

  const renderContent = () => {
    switch (activeTab) {
      case 'demandForecast':
        return <DemandForecast />;
      case 'dispatchOptimization':
        return <DispatchOptimization />;
      case 'predictiveMaintenance':
        return <PredictiveMaintenance />;
      case 'networkStability':
        return <NetworkStability />;
      case 'congestionManagement':
        return <CongestionManagement />;
      case 'virtualAssistant':
        return <VirtualAssistant />;
      case 'cyberSecurity':
        return <CyberSecurity />;
      case 'renewableIntegration':
        return <RenewableIntegration />;
      case 'whatIfSimulation':
        return <WhatIfSimulation />;
      case 'n1SecurityAnalysis':
        return <N1SecurityAnalysis />;
      case 'interconnectionMonitoring':
        return <InterconnectionMonitoring />;
      default:
        return <div>Seleziona un'analisi</div>;
    }
  };

  return (
    <AnalysisContainer>
      <h1>Hub di Analisi Avanzata</h1>
      <TabContainer>
        <Tab
          active={activeTab === 'demandForecast'}
          onClick={() => setActiveTab('demandForecast')}
        >
          Previsione Domanda
        </Tab>
        <Tab
          active={activeTab === 'dispatchOptimization'}
          onClick={() => setActiveTab('dispatchOptimization')}
        >
          Ottimizzazione Dispacciamento
        </Tab>
        <Tab
          active={activeTab === 'predictiveMaintenance'}
          onClick={() => setActiveTab('predictiveMaintenance')}
        >
          Manutenzione Predittiva
        </Tab>
        <Tab
          active={activeTab === 'networkStability'}
          onClick={() => setActiveTab('networkStability')}
        >
          Stabilità di Rete
        </Tab>
        <Tab
          active={activeTab === 'congestionManagement'}
          onClick={() => setActiveTab('congestionManagement')}
        >
          Gestione Congestioni
        </Tab>
        <Tab
          active={activeTab === 'virtualAssistant'}
          onClick={() => setActiveTab('virtualAssistant')}
        >
          Assistente Virtuale
        </Tab>
        <Tab
          active={activeTab === 'cyberSecurity'}
          onClick={() => setActiveTab('cyberSecurity')}
        >
          Cybersecurity
        </Tab>
        <Tab
          active={activeTab === 'renewableIntegration'}
          onClick={() => setActiveTab('renewableIntegration')}
        >
          Integrazione Rinnovabili
        </Tab>
        <Tab
          active={activeTab === 'whatIfSimulation'}
          onClick={() => setActiveTab('whatIfSimulation')}
        >
          Simulazione "What-If"
        </Tab>
        <Tab
          active={activeTab === 'n1SecurityAnalysis'}
          onClick={() => setActiveTab('n1SecurityAnalysis')}
        >
          Analisi di Sicurezza N-1
        </Tab>
        <Tab
          active={activeTab === 'interconnectionMonitoring'}
          onClick={() => setActiveTab('interconnectionMonitoring')}
        >
          Monitoraggio Interconnessioni
        </Tab>
      </TabContainer>
      {renderContent()}
    </AnalysisContainer>
  );
};

export default AnalysisHub;