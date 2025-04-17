import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Info, TrendingUp, AlertTriangle } from 'lucide-react';

const VirtualAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const chatBoxStyle = {
    height: '400px',
    overflowY: 'scroll',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
  };

  const inputStyle = {
    width: 'calc(100% - 110px)',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    // Simulazione di risposta dell'assistente
    setTimeout(() => {
      const assistantResponse = getAssistantResponse(input);
      setMessages(prev => [...prev, { text: assistantResponse, sender: 'assistant' }]);
    }, 1000);
  };

  const getAssistantResponse = (query) => {
    if (query.toLowerCase().includes('stato della rete')) {
      return 'La rete è attualmente stabile. Tutti i principali nodi sono operativi.';
    } else if (query.toLowerCase().includes('congestione')) {
      return 'Al momento non ci sono congestioni significative. La linea A-B sta operando all\'80% della sua capacità.';
    } else {
      return 'Mi dispiace, non ho informazioni specifiche su questa richiesta. Posso aiutarti con lo stato della rete o informazioni sulle congestioni.';
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <MessageCircle style={{marginRight: '10px'}} /> Assistente Virtuale per Operatori
      </h2>
      
      <div style={cardStyle}>
        <div style={chatBoxStyle} ref={chatBoxRef}>
          {messages.map((message, index) => (
            <div key={index} style={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                backgroundColor: message.sender === 'user' ? '#e6f3ff' : '#f0f0f0',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '70%',
                wordWrap: 'break-word'
              }}>
                <strong>{message.sender === 'user' ? 'Tu' : 'Assistente'}:</strong> {message.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <input 
            style={inputStyle}
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Fai una domanda..."
          />
          <button onClick={handleSend} style={{...buttonStyle, marginLeft: '10px'}}>
            <Send size={18} style={{marginRight: '5px'}} /> Invia
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>
          <Info size={24} style={{marginRight: '10px', verticalAlign: 'middle'}} />
          Informazioni sul Sistema
        </h3>
        <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
          <li style={{marginBottom: '10px'}}>
            <TrendingUp size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            L'assistente utilizza NLP per comprendere e rispondere a query complesse sullo stato della rete.
          </li>
          <li style={{marginBottom: '10px'}}>
            <AlertTriangle size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Il sistema apprende continuamente dalle interazioni per migliorare le sue prestazioni.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualAssistant;