import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  Cpu,
  Send,
  TrendingUp,
  AlertTriangle,
  Wind,
  BarChart2,
  Database,
  Zap,
  Activity,
  CheckCircle,
  Wifi,
  X,
  Maximize2,
  Download,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Styled Components
const Container = styled.div`
  background-color: #f5f7fa;
  padding: 1.5rem;
  min-height: 100vh;
  font-family: 'Inter', 'Segoe UI', sans-serif;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #111827;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-top: 0.25rem;
  font-size: 0.95rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border-top: ${(props) =>
    props.accentColor ? `3px solid ${props.accentColor}` : 'none'};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  color: #111827;
`;

const MetricsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
`;

const MetricCard = styled.div`
  flex: 1;
  min-width: 130px;
  background-color: ${(props) => props.bgColor || '#f3f4f6'};
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
  }
`;

const MetricIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: ${(props) => props.color || '#3b82f6'};
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const ChatContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
  margin-bottom: 1rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  background-color: ${(props) => (props.isUser ? '#3b82f6' : '#f3f4f6')};
  color: ${(props) => (props.isUser ? 'white' : '#111827')};
  border-bottom-right-radius: ${(props) => (props.isUser ? '0.25rem' : '1rem')};
  border-bottom-left-radius: ${(props) => (!props.isUser ? '0.25rem' : '1rem')};
  position: relative;
  line-height: 1.5;
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
  padding: 0 0.5rem;
`;

const ChartPreview = styled.div`
  background-color: #f9fafb;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  max-width: 80%;
  border-left: 3px solid
    ${(props) => {
      switch (props.type) {
        case 'line':
          return '#3b82f6';
        case 'bar':
          return '#10b981';
        case 'area':
          return '#8b5cf6';
        case 'heatmap':
          return '#ef4444';
        case 'pie':
          return '#f59e0b';
        case 'stack':
          return '#6366f1';
        case 'gauge':
          return '#ec4899';
        default:
          return '#6b7280';
      }
    }};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ChartPreviewLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const ChartPreviewTitle = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #111827;
`;

const ChartPreviewAction = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: #111827;

  &::placeholder {
    color: #9ca3af;
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0 1.25rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#3b82f6' : '#2563eb')};
  }
`;

const SuggestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SuggestionItem = styled.div`
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-left: 2px solid #e5e7eb;

  &:hover {
    background-color: #f3f4f6;
    border-left-color: #3b82f6;
    transform: translateX(2px);
  }
`;

const KnowledgeItem = styled.div`
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const KnowledgeTitle = styled.span`
  font-weight: 500;
  display: block;
  margin-bottom: 0.25rem;
  color: #111827;
`;

const KnowledgeDesc = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CapabilityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${(props) => `${props.color}10` || '#f3f4f6'};
  border-left: 3px solid ${(props) => props.color || '#3b82f6'};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CapabilityIcon = styled.div`
  margin-right: 0.75rem;
  color: ${(props) => props.color || '#3b82f6'};
`;

const CapabilityName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

// Modal di visualizzazione dati
const DataVisualizationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  padding: 1.5rem;
  transform: ${(props) => (props.isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: transform 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  margin-bottom: 1.5rem;
`;

const DataStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
`;

const StatItem = styled.div`
  background-color: ${(props) => props.bgColor || '#f9fafb'};
  padding: 1rem;
  border-radius: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => (props.primary ? '#3b82f6' : '#f3f4f6')};
  color: ${(props) => (props.primary ? 'white' : '#374151')};
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.primary ? '#2563eb' : '#e5e7eb')};
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #9ca3af;
  border-radius: 50%;
  margin-right: 4px;
  animation: bounce 1.4s infinite ease-in-out;
  animation-delay: ${(props) => props.delay || '0s'};

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
`;

const TypingText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-left: 0.25rem;
`;

// Componente principale
const AIGridAssistant = () => {
  // Stati iniziali
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content:
        'Ciao, sono il tuo Assistente AI per la Gestione della Rete. Come posso aiutarti oggi con la gestione della rete elettrica?',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentChart, setCurrentChart] = useState(null);

  // Suggerimenti di domande frequenti
  const [suggestions] = useState([
    'Analizza il rischio di congestione sulla linea Milano-Torino nelle prossime 3 ore',
    'Suggerisci la migliore strategia di dispacciamento considerando le previsioni meteo',
    "Calcola l'impatto della manutenzione programmata sulla sottostazione Roma Nord",
    'Quali sono le zone a rischio blackout nelle prossime 24 ore?',
    'Qual è la previsione di generazione da fonti rinnovabili per domani?',
    "Come ottimizzare il bilanciamento di rete con l'attuale mix energetico?",
  ]);

  // Metriche del sistema
  const [metrics, setMetrics] = useState({
    networkStability: 97.5,
    renewablePenetration: 42.3,
    congestionProbability: 15.7,
    loadBalance: 94.2,
  });

  // Capacità dell'assistente IA
  const AI_CAPABILITIES = [
    {
      id: 1,
      name: 'Previsione della domanda',
      icon: <BarChart2 size={18} />,
      color: '#4caf50',
    },
    {
      id: 2,
      name: 'Rilevamento anomalie',
      icon: <AlertTriangle size={18} />,
      color: '#f44336',
    },
    {
      id: 3,
      name: 'Gestione congestioni',
      icon: <Zap size={18} />,
      color: '#ff9800',
    },
    {
      id: 4,
      name: 'Integrazione rinnovabili',
      icon: <Wind size={18} />,
      color: '#2196f3',
    },
    {
      id: 5,
      name: 'Analisi storica',
      icon: <Database size={18} />,
      color: '#9c27b0',
    },
    {
      id: 6,
      name: 'Monitoraggio connessioni',
      icon: <Wifi size={18} />,
      color: '#607d8b',
    },
  ];

  const chatEndRef = useRef(null);

  // Auto-scroll al messaggio più recente
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulazione di fluttuazioni nelle metriche
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        networkStability: Math.max(
          90,
          Math.min(99, prev.networkStability + (Math.random() - 0.5) * 2)
        ),
        renewablePenetration: Math.max(
          30,
          Math.min(60, prev.renewablePenetration + (Math.random() - 0.5) * 4)
        ),
        congestionProbability: Math.max(
          5,
          Math.min(40, prev.congestionProbability + (Math.random() - 0.5) * 5)
        ),
        loadBalance: Math.max(
          85,
          Math.min(99, prev.loadBalance + (Math.random() - 0.5) * 3)
        ),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Genera risposte simulate basate sull'input dell'utente
  const getSimulatedResponse = (query) => {
    const normalizedQuery = query.toLowerCase();

    if (
      normalizedQuery.includes('congestione') ||
      normalizedQuery.includes('milano')
    ) {
      return {
        content:
          "Analisi completata. Il rischio di congestione sulla linea Milano-Torino nelle prossime 3 ore è moderato (35%). Fattori principali: alta produzione eolica prevista (450 MW) nel Nord-Ovest con domanda inferiore alle medie stagionali. Consiglio: monitorare il flusso e prepararsi a riconfiguare il dispacciamento se supera l'85% della capacità.",
        chart: 'line',
      };
    } else if (
      normalizedQuery.includes('dispacciamento') ||
      normalizedQuery.includes('meteo')
    ) {
      return {
        content:
          'In base alle previsioni meteo delle prossime 24 ore (forti venti nel Sud, irradiazione solare elevata al Centro), raccomando di: 1) Aumentare la riserva rotante del 10% a partire dalle 14:00, 2) Ridurre la generazione termoelettrica nel Sud di circa 500 MW gradualmente dalle 12:00 alle 16:00, 3) Preparare le unità idroelettriche di Presenzano per compensazione rapida.',
        chart: 'bar',
      };
    } else if (
      normalizedQuery.includes('manutenzione') ||
      normalizedQuery.includes('roma')
    ) {
      return {
        content:
          "L'impatto della manutenzione programmata sulla sottostazione Roma Nord causerà una riduzione della capacità di trasferimento Nord-Centro di circa 800 MW per 6 ore. Suggerisco di: 1) Attivare le unità di riserva nell'area di Roma dalle 09:00, 2) Ridurre l'export verso la Grecia di 300 MW durante la manutenzione, 3) Posticipare la manutenzione di altri asset nella stessa area nelle prossime 72 ore.",
        chart: 'area',
      };
    } else if (
      normalizedQuery.includes('blackout') ||
      normalizedQuery.includes('rischio')
    ) {
      return {
        content:
          "Analisi del rischio blackout completata. Le zone a maggior rischio nelle prossime 24 ore sono: 1) Area metropolitana di Napoli (indice di rischio: 0.32) a causa dell'ondata di calore prevista e conseguente aumento dei carichi di condizionamento, 2) Area di Palermo (indice di rischio: 0.28) per la limitata capacità di interconnessione durante il picco serale. Consiglio: attivare il piano di riduzione volontaria dei carichi industriali a Napoli dalle 14:00 alle 18:00.",
        chart: 'heatmap',
      };
    } else if (
      normalizedQuery.includes('rinnovabili') ||
      normalizedQuery.includes('fonti')
    ) {
      return {
        content:
          'Le previsioni di generazione da fonti rinnovabili per domani indicano una produzione totale di 12.5 GW (42% della domanda prevista). Distribuzione: Eolico 5.2 GW (principali contributi da Puglia e Sicilia), Solare 4.8 GW (picco tra le 12:00 e le 14:00), Idroelettrico 2.5 GW. Nota: la generazione eolica potrebbe superare le previsioni del 15% se le condizioni meteo nel Sud peggiorano.',
        chart: 'pie',
      };
    } else if (
      normalizedQuery.includes('bilanciamento') ||
      normalizedQuery.includes('mix')
    ) {
      return {
        content:
          "Per ottimizzare il bilanciamento con l'attuale mix energetico, suggerisco: 1) Ridurre la generazione termoelettrica di base di 700 MW nelle ore centrali (10:00-16:00), 2) Incrementare la riserva rotante del 15% per compensare la variabilità rinnovabile, 3) Attivare i contratti di demand response per le industrie durante il picco serale (18:00-21:00), 4) Ottimizzare i flussi di interscambio con Francia e Slovenia considerando i prezzi di mercato previsti.",
        chart: 'stack',
      };
    } else if (
      normalizedQuery.includes('stabilità') ||
      normalizedQuery.includes('stability')
    ) {
      return {
        content: `La stabilità della rete è attualmente ${metrics.networkStability.toFixed(
          1
        )}%, che è nell'intervallo ottimale. Tutti i parametri di frequenza sono nella norma (50.02 Hz) e non ci sono oscillazioni significative. I margini di stabilità transitoria sono sufficienti per gestire eventuali contingenze N-1.`,
        chart: 'gauge',
      };
    } else {
      return {
        content:
          "Ho analizzato la tua richiesta ma necessito di maggiori dettagli per fornirti un'analisi precisa. Puoi specificare quale area geografica, linea o sottostazione ti interessa? Oppure puoi chiedermi informazioni su previsioni della domanda, integrazione delle rinnovabili, congestioni di rete o ottimizzazione del dispacciamento.",
      };
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    // Aggiunge il messaggio dell'utente
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 1,
        role: 'user',
        content: input,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
    setIsLoading(true);

    // Simula ritardo di risposta API
    setTimeout(() => {
      const response = getSimulatedResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          role: 'assistant',
          content: response.content,
          chart: response.chart,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setIsLoading(false);
    }, 1500);

    setInput('');
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  // Dati di esempio per i grafici
  const getChartData = (chartType) => {
    switch (chartType) {
      case 'line':
        return {
          title: 'Previsione Carico Linea Milano-Torino',
          data: [
            { ora: '08:00', carico: 620, limite: 1000 },
            { ora: '09:00', carico: 720, limite: 1000 },
            { ora: '10:00', carico: 840, limite: 1000 },
            { ora: '11:00', carico: 880, limite: 1000 },
            { ora: '12:00', carico: 850, limite: 1000 },
            { ora: '13:00', carico: 780, limite: 1000 },
            { ora: '14:00', carico: 750, limite: 1000 },
            { ora: '15:00', carico: 795, limite: 1000 },
            { ora: '16:00', carico: 850, limite: 1000 },
          ],
          stats: [
            {
              label: 'Carico massimo previsto',
              value: '880 MW',
              bgColor: '#fee2e2',
            },
            {
              label: 'Capacità disponibile min.',
              value: '120 MW',
              bgColor: '#e0f2fe',
            },
            {
              label: 'Probabilità congestione',
              value: '35%',
              bgColor: '#fef3c7',
            },
            { label: 'Orario critico', value: '11:00', bgColor: '#f3e8ff' },
          ],
        };
      case 'bar':
        return {
          title: 'Produzione Rinnovabile Prevista',
          data: [
            { ora: '06:00', eolico: 950, solare: 0, idro: 820 },
            { ora: '08:00', eolico: 900, solare: 400, idro: 800 },
            { ora: '10:00', eolico: 850, solare: 1200, idro: 780 },
            { ora: '12:00', eolico: 800, solare: 1800, idro: 750 },
            { ora: '14:00', eolico: 920, solare: 1600, idro: 720 },
            { ora: '16:00', eolico: 980, solare: 900, idro: 800 },
            { ora: '18:00', eolico: 1050, solare: 400, idro: 850 },
            { ora: '20:00', eolico: 1100, solare: 0, idro: 870 },
          ],
          stats: [
            {
              label: 'Produzione totale',
              value: '12.5 GW',
              bgColor: '#dcfce7',
            },
            { label: 'Picco solare', value: '1.8 GW', bgColor: '#fef3c7' },
            { label: 'Picco eolico', value: '1.1 GW', bgColor: '#dbeafe' },
            { label: '% domanda prevista', value: '42%', bgColor: '#f3e8ff' },
          ],
        };
      case 'area':
        return {
          title: 'Impatto sulla Capacità di Trasferimento',
          data: [
            { ora: '07:00', preIntervento: 1800, postIntervento: 1800 },
            { ora: '08:00', preIntervento: 1800, postIntervento: 1800 },
            { ora: '09:00', preIntervento: 1800, postIntervento: 1000 },
            { ora: '10:00', preIntervento: 1800, postIntervento: 1000 },
            { ora: '11:00', preIntervento: 1800, postIntervento: 1000 },
            { ora: '12:00', preIntervento: 1800, postIntervento: 1000 },
            { ora: '13:00', preIntervento: 1800, postIntervento: 1000 },
            { ora: '14:00', preIntervento: 1800, postIntervento: 1000 },
            { ora: '15:00', preIntervento: 1800, postIntervento: 1800 },
            { ora: '16:00', preIntervento: 1800, postIntervento: 1800 },
          ],
          stats: [
            {
              label: 'Riduzione capacità',
              value: '800 MW',
              bgColor: '#fee2e2',
            },
            { label: 'Durata intervento', value: '6 ore', bgColor: '#e0f2fe' },
            {
              label: 'Impatto previsto',
              value: 'Moderato',
              bgColor: '#fef3c7',
            },
            { label: 'Rischio congestione', value: '20%', bgColor: '#f3e8ff' },
          ],
        };
      case 'pie':
        return {
          title: 'Distribuzione Fonti Rinnovabili',
          data: [
            { name: 'Eolico', value: 5.2, color: '#3b82f6' },
            { name: 'Solare', value: 4.8, color: '#f59e0b' },
            { name: 'Idroelettrico', value: 2.5, color: '#06b6d4' },
          ],
          stats: [
            {
              label: 'Totale rinnovabili',
              value: '12.5 GW',
              bgColor: '#dcfce7',
            },
            { label: '% della domanda', value: '42%', bgColor: '#dbeafe' },
            { label: 'Variabilità eolica', value: '±15%', bgColor: '#fef3c7' },
            { label: 'Trend', value: 'In crescita', bgColor: '#f3e8ff' },
          ],
        };
      case 'heatmap':
        return {
          title: 'Mappa di Rischio Blackout',
          data: [
            { area: 'Napoli', rischio: 0.32, carico: 2400, capacita: 2800 },
            { area: 'Palermo', rischio: 0.28, carico: 1800, capacita: 2200 },
            { area: 'Roma', rischio: 0.18, carico: 3200, capacita: 4000 },
            { area: 'Milano', rischio: 0.12, carico: 4100, capacita: 5500 },
            { area: 'Torino', rischio: 0.09, carico: 2300, capacita: 3200 },
          ],
          stats: [
            { label: 'Area più critica', value: 'Napoli', bgColor: '#fee2e2' },
            { label: 'Indice rischio max', value: '0.32', bgColor: '#fef3c7' },
            {
              label: 'Orario critico',
              value: '14:00-18:00',
              bgColor: '#e0f2fe',
            },
            {
              label: 'Causa principale',
              value: 'Ondata calore',
              bgColor: '#f3e8ff',
            },
          ],
        };
      case 'stack':
        return {
          title: 'Ottimizzazione Mix Energetico',
          data: [
            { ora: '06:00', termoelettrico: 9000, rinnovabili: 3000 },
            { ora: '08:00', termoelettrico: 8000, rinnovabili: 5000 },
            { ora: '10:00', termoelettrico: 7000, rinnovabili: 7000 },
            { ora: '12:00', termoelettrico: 6500, rinnovabili: 8500 },
            { ora: '14:00', termoelettrico: 6500, rinnovabili: 8000 },
            { ora: '16:00', termoelettrico: 7000, rinnovabili: 6500 },
            { ora: '18:00', termoelettrico: 8000, rinnovabili: 5000 },
            { ora: '20:00', termoelettrico: 9000, rinnovabili: 3500 },
          ],
          stats: [
            {
              label: 'Riduzione termoelettrico',
              value: '700 MW',
              bgColor: '#fee2e2',
            },
            {
              label: 'Risparmio stimato',
              value: '€42,000',
              bgColor: '#dcfce7',
            },
            { label: 'Picco rinnovabili', value: '8.5 GW', bgColor: '#dbeafe' },
            {
              label: 'Emissioni evitate',
              value: '850 tCO2',
              bgColor: '#f3e8ff',
            },
          ],
        };
      case 'gauge':
        return {
          title: 'Stabilità della Rete',
          data: [
            { parametro: 'Frequenza', valore: 50.02, min: 49.8, max: 50.2 },
            { parametro: 'Tensione AT', valore: 385, min: 380, max: 420 },
            { parametro: 'Margine stabilità', valore: 450, min: 300, max: 800 },
            { parametro: 'Inerzia sistema', valore: 5.2, min: 4, max: 8 },
          ],
          stats: [
            { label: 'Indice stabilità', value: '97.5%', bgColor: '#dcfce7' },
            {
              label: 'Deviazione freq.',
              value: '±0.02 Hz',
              bgColor: '#dbeafe',
            },
            { label: 'Oscillazioni', value: 'Minime', bgColor: '#f3e8ff' },
            {
              label: 'Contingenze N-1',
              value: 'Gestibili',
              bgColor: '#fef3c7',
            },
          ],
        };
      default:
        return {
          title: 'Dati non disponibili',
          data: [],
          stats: [],
        };
    }
  };

  const renderChartContent = (chartType) => {
    const chartData = getChartData(chartType);

    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={chartData.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='ora' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='carico'
                stroke='#3b82f6'
                name='Carico (MW)'
                strokeWidth={2}
              />
              <Line
                type='monotone'
                dataKey='limite'
                stroke='#ef4444'
                name='Limite (MW)'
                strokeDasharray='5 5'
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='ora' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='eolico' name='Eolico (MW)' fill='#3b82f6' />
              <Bar dataKey='solare' name='Solare (MW)' fill='#f59e0b' />
              <Bar dataKey='idro' name='Idroelettrico (MW)' fill='#06b6d4' />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='ora' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type='monotone'
                dataKey='preIntervento'
                stackId='1'
                stroke='#3b82f6'
                fill='#93c5fd'
                name='Pre-intervento (MW)'
              />
              <Area
                type='monotone'
                dataKey='postIntervento'
                stackId='1'
                stroke='#f97316'
                fill='#fdba74'
                name='Post-intervento (MW)'
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={chartData.data}
                cx='50%'
                cy='50%'
                labelLine={true}
                outerRadius={130}
                fill='#8884d8'
                dataKey='value'
                nameKey='name'
                label={({ name, value }) => `${name}: ${value} GW`}
              >
                {chartData.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} GW`, 'Capacità']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'heatmap':
        // Simuliamo una heatmap con un BarChart per semplicità
        return (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData.data}
              layout='vertical'
              margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis type='number' />
              <YAxis dataKey='area' type='category' />
              <Tooltip />
              <Legend />
              <Bar dataKey='rischio' name='Indice di rischio' fill='#ef4444'>
                {chartData.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.rischio > 0.3
                        ? '#ef4444'
                        : entry.rischio > 0.2
                        ? '#f97316'
                        : entry.rischio > 0.1
                        ? '#facc15'
                        : '#84cc16'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      case 'stack':
        return (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={chartData.data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='ora' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type='monotone'
                dataKey='termoelettrico'
                stackId='1'
                stroke='#ef4444'
                fill='#fca5a5'
                name='Termoelettrico (MW)'
              />
              <Area
                type='monotone'
                dataKey='rinnovabili'
                stackId='1'
                stroke='#22c55e'
                fill='#86efac'
                name='Rinnovabili (MW)'
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'gauge':
        // Simuliamo un gauge con un BarChart per semplicità
        return (
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData.data}
              margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='parametro' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='valore' name='Valore corrente' fill='#3b82f6' />
              <Bar dataKey='min' name='Minimo' fill='#ef4444' />
              <Bar dataKey='max' name='Massimo' fill='#10b981' />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return <div>Dati non disponibili</div>;
    }
  };

  const handleOpenModal = (chartType) => {
    setCurrentChart(chartType);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const renderChart = (chartType) => {
    if (!chartType) return null;

    const chartTitles = {
      line: 'Previsione Carico Linea Milano-Torino',
      bar: 'Produzione Rinnovabile Prevista',
      area: 'Impatto sulla Capacità di Trasferimento',
      heatmap: 'Mappa di Rischio Blackout',
      pie: 'Distribuzione Fonti Rinnovabili',
      stack: 'Ottimizzazione Mix Energetico',
      gauge: 'Stabilità della Rete',
    };

    return (
      <ChartPreview type={chartType} onClick={() => handleOpenModal(chartType)}>
        <ChartPreviewLabel>Visualizzazione dati:</ChartPreviewLabel>
        <ChartPreviewTitle>{chartTitles[chartType]}</ChartPreviewTitle>
        <ChartPreviewAction>
          Clicca per visualizzare in dettaglio
        </ChartPreviewAction>
      </ChartPreview>
    );
  };

  return (
    <Container>
      <Header>
        <Title>
          <Cpu size={24} style={{ marginRight: '0.75rem', color: '#3b82f6' }} />
          Assistente AI per la Gestione della Rete
        </Title>
        <Subtitle>
          Sistema di supporto decisionale basato su intelligenza artificiale per
          TSO
        </Subtitle>
      </Header>

      {/* Modal di visualizzazione dati */}
      <DataVisualizationModal isOpen={modalOpen}>
        <ModalContent isOpen={modalOpen}>
          {currentChart && (
            <>
              <ModalHeader>
                <ModalTitle>
                  {currentChart === 'line' && (
                    <TrendingUp
                      size={20}
                      style={{ marginRight: '0.5rem', color: '#3b82f6' }}
                    />
                  )}
                  {currentChart === 'bar' && (
                    <BarChart2
                      size={20}
                      style={{ marginRight: '0.5rem', color: '#10b981' }}
                    />
                  )}
                  {currentChart === 'area' && (
                    <Activity
                      size={20}
                      style={{ marginRight: '0.5rem', color: '#8b5cf6' }}
                    />
                  )}
                  {currentChart === 'heatmap' && (
                    <AlertTriangle
                      size={20}
                      style={{ marginRight: '0.5rem', color: '#ef4444' }}
                    />
                  )}
                  {currentChart === 'pie' && (
                    <Zap
                      size={20}
                      style={{ marginRight: '0.5rem', color: '#f59e0b' }}
                    />
                  )}
                  {currentChart === 'stack' && (
                    <Database
                      size={20}
                      style={{ marginRight: '0.5rem', color: '#6366f1' }}
                    />
                  )}
                  {currentChart === 'gauge' && (
                    <TrendingUp
                      size={20}
                      style={{ marginRight: '0.5rem', color: '#ec4899' }}
                    />
                  )}
                  {getChartData(currentChart).title}
                </ModalTitle>
                <CloseButton onClick={handleCloseModal}>
                  <X size={20} />
                </CloseButton>
              </ModalHeader>

              <ChartContainer>
                {renderChartContent(currentChart)}
              </ChartContainer>

              <DataStats>
                {getChartData(currentChart).stats.map((stat, index) => (
                  <StatItem key={index} bgColor={stat.bgColor}>
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatItem>
                ))}
              </DataStats>

              <ModalActions>
                <ActionButton>
                  <Download size={16} /> Esporta dati
                </ActionButton>
                <ActionButton primary>
                  <Maximize2 size={16} /> Visualizza report completo
                </ActionButton>
              </ModalActions>
            </>
          )}
        </ModalContent>
      </DataVisualizationModal>

      <Grid>
        <div>
          {/* Card Metriche */}
          <Card>
            <CardTitle>
              <CheckCircle
                size={18}
                style={{ marginRight: '0.5rem', color: '#10b981' }}
              />
              Stato Attuale del Sistema
            </CardTitle>

            <MetricsGrid>
              <MetricCard bgColor='#ecfdf5'>
                <MetricIcon color='#10b981'>
                  <TrendingUp size={22} />
                </MetricIcon>
                <MetricValue>
                  {metrics.networkStability.toFixed(1)}%
                </MetricValue>
                <MetricLabel>Stabilità Rete</MetricLabel>
              </MetricCard>

              <MetricCard bgColor='#eff6ff'>
                <MetricIcon color='#3b82f6'>
                  <Wind size={22} />
                </MetricIcon>
                <MetricValue>
                  {metrics.renewablePenetration.toFixed(1)}%
                </MetricValue>
                <MetricLabel>Penetrazione Rinnovabili</MetricLabel>
              </MetricCard>

              <MetricCard bgColor='#fff7ed'>
                <MetricIcon color='#f97316'>
                  <AlertTriangle size={22} />
                </MetricIcon>
                <MetricValue>
                  {metrics.congestionProbability.toFixed(1)}%
                </MetricValue>
                <MetricLabel>Probabilità Congestione</MetricLabel>
              </MetricCard>

              <MetricCard bgColor='#faf5ff'>
                <MetricIcon color='#8b5cf6'>
                  <Activity size={22} />
                </MetricIcon>
                <MetricValue>{metrics.loadBalance.toFixed(1)}%</MetricValue>
                <MetricLabel>Bilanciamento Carico</MetricLabel>
              </MetricCard>
            </MetricsGrid>
          </Card>

          {/* Chat Container */}
          <Card accentColor='#3b82f6'>
            <CardTitle>
              <Cpu
                size={18}
                style={{ marginRight: '0.5rem', color: '#3b82f6' }}
              />
              Assistente Intelligente
            </CardTitle>

            <ChatContainer>
              {messages.map((message) => (
                <MessageWrapper
                  key={message.id}
                  isUser={message.role === 'user'}
                >
                  <MessageBubble isUser={message.role === 'user'}>
                    {message.content}
                  </MessageBubble>

                  {message.chart && renderChart(message.chart)}

                  <MessageTime>{message.timestamp}</MessageTime>
                </MessageWrapper>
              ))}

              {isLoading && (
                <TypingIndicator>
                  <TypingDot />
                  <TypingDot delay='0.2s' />
                  <TypingDot delay='0.4s' />
                  <TypingText>L'assistente sta analizzando...</TypingText>
                </TypingIndicator>
              )}

              <div ref={chatEndRef} />
            </ChatContainer>

            <InputContainer>
              <ChatInput
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder='Fai una domanda sulla gestione della rete...'
                disabled={isLoading}
              />
              <SendButton onClick={handleSend} disabled={isLoading}>
                {isLoading ? (
                  <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                ) : (
                  <Send size={18} />
                )}
              </SendButton>
            </InputContainer>
          </Card>

          {/* Capacità IA */}
          <Card accentColor='#f59e0b'>
            <CardTitle>
              <Zap
                size={18}
                style={{ marginRight: '0.5rem', color: '#f59e0b' }}
              />
              Capacità dell'Assistente IA
            </CardTitle>

            <CapabilitiesGrid>
              {AI_CAPABILITIES.map((capability) => (
                <CapabilityItem key={capability.id} color={capability.color}>
                  <CapabilityIcon color={capability.color}>
                    {capability.icon}
                  </CapabilityIcon>
                  <CapabilityName>{capability.name}</CapabilityName>
                </CapabilityItem>
              ))}
            </CapabilitiesGrid>
          </Card>
        </div>

        <div>
          {/* Knowledge Base */}
          <Card accentColor='#8b5cf6'>
            <CardTitle>
              <Database
                size={18}
                style={{ marginRight: '0.5rem', color: '#8b5cf6' }}
              />
              Knowledge Base
            </CardTitle>

            <KnowledgeItem>
              <KnowledgeTitle>Dati in tempo reale</KnowledgeTitle>
              <KnowledgeDesc>Integrazione con SCADA e PMU</KnowledgeDesc>
            </KnowledgeItem>

            <KnowledgeItem>
              <KnowledgeTitle>Previsioni meteo</KnowledgeTitle>
              <KnowledgeDesc>48 ore, risoluzione 15 min</KnowledgeDesc>
            </KnowledgeItem>

            <KnowledgeItem>
              <KnowledgeTitle>Modelli di rete</KnowledgeTitle>
              <KnowledgeDesc>CIM 16v29a, aggiornato 1h fa</KnowledgeDesc>
            </KnowledgeItem>

            <KnowledgeItem>
              <KnowledgeTitle>Storico eventi</KnowledgeTitle>
              <KnowledgeDesc>5 anni di dati operativi</KnowledgeDesc>
            </KnowledgeItem>
          </Card>

          {/* Suggerimenti */}
          <Card accentColor='#f59e0b'>
            <CardTitle>
              <Zap
                size={18}
                style={{ marginRight: '0.5rem', color: '#f59e0b' }}
              />
              Domande suggerite
            </CardTitle>

            <SuggestionList>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </SuggestionItem>
              ))}
            </SuggestionList>
          </Card>
        </div>
      </Grid>
    </Container>
  );
};

export default AIGridAssistant;
