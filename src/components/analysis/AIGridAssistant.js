import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Zap, Wifi, AlertTriangle, BarChart2, Wind, Database, CheckCircle } from 'lucide-react';
import styled from 'styled-components';

// Styled components
const AssistantContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const HeaderIcon = styled.div`
  margin-right: 15px;
  color: #3385ad;
`;

const MainTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-top: 0;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  color: #333;
`;

const ChatContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f8f9fa;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  margin-bottom: 5px;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'user' ? '#dcf8c6' : '#fff'};
  border: ${props => props.sender === 'user' ? 'none' : '1px solid #e0e0e0'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: #999;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  margin: 0 5px;
`;

const InputContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3385ad;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #286d8e;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StatusCard = styled.div`
  flex: 1;
  background-color: ${props => props.color || '#f8f9fa'};
  padding: 15px;
  border-radius: 8px;
  margin: 0 5px;
  color: ${props => props.textColor || '#333'};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatusTitle = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const StatusValue = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const CapabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const CapabilityItem = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid ${props => props.color || '#3385ad'};
  display: flex;
  align-items: center;
`;

const CapabilityIcon = styled.div`
  margin-right: 10px;
  color: ${props => props.color || '#3385ad'};
`;

const CapabilityText = styled.div`
  font-size: 14px;
`;

// Mockup data for the intelligent grid assistant
const INITIAL_MESSAGES = [
  { 
    id: 1, 
    text: "Benvenuto nel sistema di Assistenza Intelligente alla Gestione della Rete. Come posso assisterti oggi?", 
    sender: 'assistant', 
    timestamp: new Date().toLocaleTimeString() 
  }
];

// Example grid status data
const GRID_STATUS = {
  networkStability: 98.5,
  congestionLevel: 15,
  renewableIntegration: 42,
  loadBalance: 94
};

// AI capabilities
const AI_CAPABILITIES = [
  { id: 1, name: 'Previsione della domanda', icon: <BarChart2 />, color: '#4caf50' },
  { id: 2, name: 'Rilevamento anomalie', icon: <AlertTriangle />, color: '#f44336' },
  { id: 3, name: 'Gestione congestioni', icon: <Zap />, color: '#ff9800' },
  { id: 4, name: 'Integrazione rinnovabili', icon: <Wind />, color: '#2196f3' },
  { id: 5, name: 'Analisi storica', icon: <Database />, color: '#9c27b0' },
  { id: 6, name: 'Monitoraggio connessioni', icon: <Wifi />, color: '#607d8b' }
];

/**
 * AIGridAssistant component provides an AI-powered interface for grid operators
 * to interact with and get insights about the transmission system
 */
const AIGridAssistant = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [gridStatus, setGridStatus] = useState(GRID_STATUS);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatContainerRef = useRef(null);

  // Automatically scroll to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulates grid status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGridStatus(prevStatus => ({
        networkStability: Math.min(100, prevStatus.networkStability + (Math.random() - 0.5) * 2),
        congestionLevel: Math.max(0, Math.min(100, prevStatus.congestionLevel + (Math.random() - 0.5) * 5)),
        renewableIntegration: Math.max(0, Math.min(100, prevStatus.renewableIntegration + (Math.random() - 0.5) * 3)),
        loadBalance: Math.max(0, Math.min(100, prevStatus.loadBalance + (Math.random() - 0.5) * 4))
      }));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(input);
      
      const assistantMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSendMessage();
    }
  };

  // Generate AI response based on input (mockup)
  const generateAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('congestione') || lowerInput.includes('congestion')) {
      return `Attualmente, il livello di congestione della rete è al ${gridStatus.congestionLevel.toFixed(1)}%. Le aree più critiche sono la linea Milano-Torino (85% di carico) e il nodo di Roma Nord (78% di carico). Consiglio un ridispacciamento dell'energia dalla centrale di Montalto di Castro per ridurre il carico.`;
    }
    
    if (lowerInput.includes('rinnovabil') || lowerInput.includes('renewable') || lowerInput.includes('solar') || lowerInput.includes('wind') || lowerInput.includes('solare') || lowerInput.includes('eolic')) {
      return `L'integrazione di energie rinnovabili è attualmente al ${gridStatus.renewableIntegration.toFixed(1)}% della produzione totale. Le previsioni meteo indicano un aumento della produzione eolica nelle prossime 6 ore nella regione Sud, permettendo potenzialmente di raggiungere il 45%.`;
    }
    
    if (lowerInput.includes('stabilità') || lowerInput.includes('stability')) {
      return `La stabilità della rete è attualmente ${gridStatus.networkStability.toFixed(1)}%, che è nell'intervallo ottimale. Tutti i parametri di frequenza sono nella norma (50.02 Hz) e non ci sono oscillazioni significative. I margini di stabilità transitoria sono sufficienti per gestire eventuali contingenze N-1.`;
    }
    
    if (lowerInput.includes('domanda') || lowerInput.includes('carico') || lowerInput.includes('demand') || lowerInput.includes('load')) {
      return `La domanda attuale è di 32.450 MW, con un bilanciamento del carico al ${gridStatus.loadBalance.toFixed(1)}%. Si prevede un picco di 34.800 MW alle ore 19:00. Consiglio di preparare le riserve per gestire il ramping serale.`;
    }
    
    if (lowerInput.includes('previsione') || lowerInput.includes('forecast')) {
      return `Le previsioni per le prossime 24 ore indicano: un picco di domanda di 34.800 MW alle 19:00, produzione rinnovabile in aumento fino al 48% nelle ore centrali della giornata, e nessuna congestione critica prevista. Il margine di riserva rimarrà sopra il 10% durante tutto il periodo.`;
    }
    
    if (lowerInput.includes('anomalia') || lowerInput.includes('anomaly') || lowerInput.includes('allarme') || lowerInput.includes('alarm')) {
      return `Non ci sono anomalie critiche al momento. Ho rilevato alcune piccole deviazioni di tensione nella sottostazione di Bologna Ovest (±5% rispetto al nominale), ma sono all'interno dei limiti operativi. Continuerò a monitorare la situazione.`;
    }
    
    // Default response
    return `Ho analizzato la tua richiesta riguardo "${input}". Sulla base dei dati attuali della rete, la stabilità è al ${gridStatus.networkStability.toFixed(1)}%, l'integrazione rinnovabile è al ${gridStatus.renewableIntegration.toFixed(1)}%, e il livello di congestione è al ${gridStatus.congestionLevel.toFixed(1)}%. Posso fornirti analisi più dettagliate se specifichi un aspetto particolare della rete.`;
  };

  return (
    <AssistantContainer>
      <HeaderSection>
        <HeaderIcon>
          <Cpu size={32} />
        </HeaderIcon>
        <MainTitle>Assistente IA Grid - Supporto Operativo</MainTitle>
      </HeaderSection>
      
      <Card>
        <SectionTitle>
          <CheckCircle size={20} style={{ marginRight: '10px' }} />
          Stato Attuale del Sistema
        </SectionTitle>
        
        <StatusContainer>
          <StatusCard color="#e8f5e9" textColor="#2e7d32">
            <StatusTitle>Stabilità Rete</StatusTitle>
            <StatusValue>{gridStatus.networkStability.toFixed(1)}%</StatusValue>
          </StatusCard>
          
          <StatusCard color="#fbe9e7" textColor="#d84315">
            <StatusTitle>Livello Congestione</StatusTitle>
            <StatusValue>{gridStatus.congestionLevel.toFixed(1)}%</StatusValue>
          </StatusCard>
          
          <StatusCard color="#e3f2fd" textColor="#1565c0">
            <StatusTitle>Integrazione Rinnovabili</StatusTitle>
            <StatusValue>{gridStatus.renewableIntegration.toFixed(1)}%</StatusValue>
          </StatusCard>
          
          <StatusCard color="#edeef8" textColor="#3f51b5">
            <StatusTitle>Bilanciamento Carico</StatusTitle>
            <StatusValue>{gridStatus.loadBalance.toFixed(1)}%</StatusValue>
          </StatusCard>
        </StatusContainer>
      </Card>
      
      <Card>
        <SectionTitle>
          <Cpu size={20} style={{ marginRight: '10px' }} />
          Assistente Intelligente
        </SectionTitle>
        
        <ChatContainer ref={chatContainerRef}>
          {messages.map(message => (
            <MessageContainer key={message.id}>
              <MessageBubble sender={message.sender}>
                {message.text}
              </MessageBubble>
              <MessageTime sender={message.sender}>{message.timestamp}</MessageTime>
            </MessageContainer>
          ))}
          {isProcessing && (
            <MessageContainer>
              <MessageBubble sender="assistant">
                <div>Analisi in corso...</div>
              </MessageBubble>
            </MessageContainer>
          )}
        </ChatContainer>
        
        <InputContainer>
          <Input
            type="text"
            placeholder="Fai una domanda sulla rete..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isProcessing}
          />
          <SendButton onClick={handleSendMessage} disabled={isProcessing}>
            <Send size={18} style={{ marginRight: '5px' }} />
            Invia
          </SendButton>
        </InputContainer>
      </Card>
      
      <Card>
        <SectionTitle>
          <Zap size={20} style={{ marginRight: '10px' }} />
          Capacità dell'Assistente IA
        </SectionTitle>
        
        <CapabilityGrid>
          {AI_CAPABILITIES.map(capability => (
            <CapabilityItem key={capability.id} color={capability.color}>
              <CapabilityIcon color={capability.color}>
                {capability.icon}
              </CapabilityIcon>
              <CapabilityText>{capability.name}</CapabilityText>
            </CapabilityItem>
          ))}
        </CapabilityGrid>
      </Card>
    </AssistantContainer>
  );
};

export default AIGridAssistant;