import React, { useState } from 'react';
import {
  Brain,
  AlertTriangle,
  Activity,
  Target,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import DemandForecast from './analysis/DemandForecast';
import PredictiveMaintenance from './analysis/PredictiveMaintenance';
import NetworkStability from './analysis/NetworkStability';
import CongestionManagement from './analysis/CongestionManagement';
import AIGridAssistant from './analysis/AIGridAssistant';
import AIAnomalyDetection from './analysis/AIAnomalyDetection';

const AnalysisHub = () => {
  const [activeTab, setActiveTab] = useState('aiGridAssistant');

  const modules = [
    {
      id: 'aiGridAssistant',
      name: 'Assistente IA Grid',
      icon: Brain,
      color: '#4F46E5', // Indigo
      component: AIGridAssistant,
    },
    {
      id: 'aiAnomalyDetection',
      name: 'Rilevamento Anomalie IA',
      icon: AlertTriangle,
      color: '#F43F5E', // Rose
      component: AIAnomalyDetection,
    },
    {
      id: 'demandForecast',
      name: 'Previsione Domanda',
      icon: Activity,
      color: '#10B981', // Emerald
      component: DemandForecast,
    },
    {
      id: 'congestionManagement',
      name: 'Gestione Congestioni',
      icon: Target,
      color: '#F59E0B', // Amber
      component: CongestionManagement,
    },
    {
      id: 'predictiveMaintenance',
      name: 'Manutenzione Predittiva',
      icon: Wrench,
      color: '#6366F1', // Indigo
      component: PredictiveMaintenance,
    },
    {
      id: 'networkStability',
      name: 'Stabilità di Rete',
      icon: TrendingUp,
      color: '#2563EB', // Blue
      component: NetworkStability,
    },
  ];

  // Find the active module
  const activeModule = modules.find((m) => m.id === activeTab);

  return (
    <div className='bg-gray-50 p-6 min-h-screen'>
      <h1 className='text-3xl font-bold text-gray-800 mb-5'>
        Hub di Analisi Avanzata
      </h1>

      {/* Info Banner */}
      <div className='bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 flex items-center'>
        <Brain className='text-blue-500 mr-3 flex-shrink-0' size={24} />
        <p className='text-blue-700'>
          <span className='font-semibold'>
            Hub di Analisi Potenziato con AI
          </span>{' '}
          - Nuovi strumenti di intelligenza artificiale sono ora disponibili per
          supportare le operazioni di rete!
        </p>
      </div>

      {/* Modern Buttons */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8'>
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveTab(module.id)}
            className='relative group'
          >
            <div
              className={`
                flex flex-col items-center justify-center p-5 rounded-xl
                transition-all duration-300 border h-full
                ${
                  activeTab === module.id
                    ? 'bg-white shadow-lg border-transparent transform -translate-y-1'
                    : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-200'
                }
              `}
              style={{
                borderTop:
                  activeTab === module.id ? `3px solid ${module.color}` : '',
              }}
            >
              <div
                className='flex items-center justify-center w-12 h-12 mb-3 rounded-full'
                style={{
                  backgroundColor: `${module.color}10`,
                  color: module.color,
                }}
              >
                <module.icon size={24} />
              </div>

              <span className='text-sm font-medium text-center text-gray-800'>
                {module.name}
              </span>

              {/* Bottom indicator bar for active state */}
              {activeTab === module.id && (
                <div
                  className='absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-12 rounded-t-full'
                  style={{ backgroundColor: module.color }}
                ></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        {activeModule && <activeModule.component />}
      </div>
    </div>
  );
};

export default AnalysisHub;
