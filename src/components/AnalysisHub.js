import React, { useState } from 'react';
import './AnalysisHub.css';

// Importazione dei componenti per ciascun tab
import DemandForecast from './analysis/DemandForecast';
import DispatchOptimization from './analysis/DispatchOptimization';
import PredictiveMaintenance from './analysis/PredictiveMaintenance';
import NetworkStability from './analysis/NetworkStability';
import CongestionManagement from './analysis/CongestionManagement';
import VirtualAssistant from './analysis/VirtualAssistant';
import CyberSecurity from './analysis/CyberSecurity';
import RenewableIntegration from './analysis/RenewableIntegration';
import WhatIfSimulation from './analysis/WhatIfSimulation';
import N1SecurityAnalysis from './analysis/N1SecurityAnalysis';
import InterconnectionMonitoring from './analysis/InterconnectionMonitoring';
import AIAnomalyDetection from './analysis/AIAnomalyDetection';
import AIGridAssistant from './analysis/AIGridAssistant';

const AnalysisHub = () => {
  const [activeTab, setActiveTab] = useState('gridassistant');

  // Definire i tab esattamente come nell'immagine
  const tabs = [
    {
      id: 'gridassistant',
      label: 'AI Grid Assistant',
      component: AIGridAssistant,
    },
    {
      id: 'anomalyDetection',
      label: 'Anomaly Detection',
      component: AIAnomalyDetection,
    },
    {
      id: 'manutenzione',
      label: 'Predictive Maintenance',
      component: PredictiveMaintenance,
    },
    {
      id: 'previsione',
      label: 'Demand Forecast',
      component: DemandForecast,
    },
    // {
    //   id: 'stabilita',
    //   label: 'Stabilità di Rete',
    //   component: NetworkStability,
    // },
    {
      id: 'congestioni',
      label: 'Gestione Congestioni',
      component: CongestionManagement,
    },
    // {
    //   id: 'assistente',
    //   label: 'Assistente Virtuale',
    //   component: VirtualAssistant,
    // },
    // { id: 'cybersecurity', label: 'Cybersecurity', component: CyberSecurity },
    {
      id: 'rinnovabili',
      label: 'Integrazione Rinnovabili',
      component: RenewableIntegration,
    },
  ];

  const secondaryTabs = [
    // {
    //   id: 'simulazione',
    //   label: 'Simulazione "What-If"',
    //   component: WhatIfSimulation,
    // },
    // {
    //   id: 'analisiN1',
    //   label: 'Analisi di Sicurezza N-1',
    //   component: N1SecurityAnalysis,
    // },
    // {
    //   id: 'monitoraggio',
    //   label: 'Monitoraggio Interconnessioni',
    //   component: InterconnectionMonitoring,
    // },
  ];

  // Trova il componente da renderizzare in base al tab attivo
  const renderActiveComponent = () => {
    const activeTabData = [...tabs, ...secondaryTabs].find(
      (tab) => tab.id === activeTab
    );
    if (!activeTabData) return null;

    const ActiveComponent = activeTabData.component;
    return <ActiveComponent />;
  };

  return (
    <div className='hub-container'>
      <h1>Hub di Analisi Avanzata</h1>

      <div className='tab-container'>
        {/* Prima riga di tab */}
        <div className='tab-row'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Seconda riga di tab */}
        <div className='tab-row'>
          {secondaryTabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Area contenuto - Mostra il componente corrispondente al tab attivo */}
      <div className='content-area'>{renderActiveComponent()}</div>
    </div>
  );
};

export default AnalysisHub;
