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
import AIGridAssistant from './analysis/AIGridAssistant';
import AIAnomalyDetection from './analysis/AIAnomalyDetection';
import { AlertTriangle, Brain, Activity, Zap, Cpu, Wind, Shield, Target, TrendingUp, Wifi, UserCheck, Wrench } from 'lucide-react';

const AnalysisContainer = styled.div`
  padding: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 5px;
`;

const Tab = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: ${(props) => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e9ecef')};
    transform: translateY(-2px);
  }
`;

const CategoryLabel = styled.div`
  font-weight: bold;
  padding: 10px 0;
  margin-top: 10px;
  color: #6c757d;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 8px;
`;

const AnalysisHubInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const InfoIcon = styled.div`
  margin-right: 15px;
  color: #007bff;
`;

const AnalysisHub = () => {
  const [activeTab, setActiveTab] = useState('aiGridAssistant'); // Changed default tab to AI Assistant

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
      case 'aiGridAssistant':
        return <AIGridAssistant />;
      case 'aiAnomalyDetection':
        return <AIAnomalyDetection />;
      default:
        return <div>Seleziona un'analisi</div>;
    }
  };

  return (
    <AnalysisContainer>
      <h1 className="text-3xl font-bold mb-4">Hub di Analisi Avanzata</h1>
      
      <AnalysisHubInfo>
        <InfoIcon>
          <Brain size={24} />
        </InfoIcon>
        <div>
          <p><strong>Hub di Analisi Potenziato con AI</strong> - Nuovi strumenti di intelligenza artificiale sono ora disponibili per supportare le operazioni di rete!</p>
        </div>
      </AnalysisHubInfo>
      
      <CategoryLabel>Strumenti basati su AI</CategoryLabel>
      <TabContainer>
        <Tab
          active={activeTab === 'aiGridAssistant'}
          onClick={() => setActiveTab('aiGridAssistant')}
        >
          <Cpu size={18} style={{ marginRight: '8px' }} />
          Assistente AI Grid
        </Tab>
        <Tab
          active={activeTab === 'aiAnomalyDetection'}
          onClick={() => setActiveTab('aiAnomalyDetection')}
        >
          <AlertTriangle size={18} style={{ marginRight: '8px' }} />
          Rilevamento Anomalie IA
        </Tab>
      </TabContainer>
      
      <CategoryLabel>Analisi Operativa</CategoryLabel>
      <TabContainer>
        <Tab
          active={activeTab === 'demandForecast'}
          onClick={() => setActiveTab('demandForecast')}
        >
          <Activity size={18} style={{ marginRight: '8px' }} />
          Previsione Domanda
        </Tab>
        <Tab
          active={activeTab === 'dispatchOptimization'}
          onClick={() => setActiveTab('dispatchOptimization')}
        >
          <Zap size={18} style={{ marginRight: '8px' }} />
          Ottimizzazione Dispacciamento
        </Tab>
        <Tab
          active={activeTab === 'congestionManagement'}
          onClick={() => setActiveTab('congestionManagement')}
        >
          <Target size={18} style={{ marginRight: '8px' }} />
          Gestione Congestioni
        </Tab>
        <Tab
          active={activeTab === 'networkStability'}
          onClick={() => setActiveTab('networkStability')}
        >
          <TrendingUp size={18} style={{ marginRight: '8px' }} />
          Stabilità di Rete
        </Tab>
      </TabContainer>
      
      <CategoryLabel>Pianificazione e Prevenzione</CategoryLabel>
      <TabContainer>
        <Tab
          active={activeTab === 'predictiveMaintenance'}
          onClick={() => setActiveTab('predictiveMaintenance')}
        >
          <Wrench size={18} style={{ marginRight: '8px' }} />
          Manutenzione Predittiva
        </Tab>
        <Tab
          active={activeTab === 'n1SecurityAnalysis'}
          onClick={() => setActiveTab('n1SecurityAnalysis')}
        >
          <Shield size={18} style={{ marginRight: '8px' }} />
          Analisi di Sicurezza N-1
        </Tab>
        <Tab
          active={activeTab === 'whatIfSimulation'}
          onClick={() => setActiveTab('whatIfSimulation')}
        >
          <Target size={18} style={{ marginRight: '8px' }} />
          Simulazione "What-If"
        </Tab>
      </TabContainer>
      
      <CategoryLabel>Integrazione Rinnovabili e Connessioni</CategoryLabel>
      <TabContainer>
        <Tab
          active={activeTab === 'renewableIntegration'}
          onClick={() => setActiveTab('renewableIntegration')}
        >
          <Wind size={18} style={{ marginRight: '8px' }} />
          Integrazione Rinnovabili
        </Tab>
        <Tab
          active={activeTab === 'interconnectionMonitoring'}
          onClick={() => setActiveTab('interconnectionMonitoring')}
        >
          <Wifi size={18} style={{ marginRight: '8px' }} />
          Monitoraggio Interconnessioni
        </Tab>
      </TabContainer>
      
      <CategoryLabel>Sicurezza e Supporto</CategoryLabel>
      <TabContainer>
        <Tab
          active={activeTab === 'cyberSecurity'}
          onClick={() => setActiveTab('cyberSecurity')}
        >
          <Shield size={18} style={{ marginRight: '8px' }} />
          Cybersecurity
        </Tab>
        <Tab
          active={activeTab === 'virtualAssistant'}
          onClick={() => setActiveTab('virtualAssistant')}
        >
          <UserCheck size={18} style={{ marginRight: '8px' }} />
          Assistente Virtuale
        </Tab>
      </TabContainer>
      
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        {renderContent()}
      </div>
    </AnalysisContainer>
  );
};

export default AnalysisHub;