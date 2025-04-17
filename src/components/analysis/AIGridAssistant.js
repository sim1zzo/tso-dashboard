import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, AlertTriangle, BarChart2, Send } from 'lucide-react';

// Componente per l'assistente AI con layout fisso
const AIGridAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Ciao, sono il tuo Assistente AI per la Gestione della Rete. Come posso aiutarti oggi con la gestione della rete elettrica?',
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Metriche statiche
  const metrics = {
    networkStability: 97,
    renewablePenetration: 42,
    congestionProbability: 15,
    demandForecastAccuracy: 98.2
  };

  // Suggerimenti predefiniti
  const suggestions = [
    'Analizza il rischio di congestione sulla linea Milano-Torino nelle prossime 3 ore',
    'Suggerisci la migliore strategia di dispacciamento considerando le previsioni meteo',
    "Calcola l'impatto della manutenzione programmata sulla sottostazione Roma Nord",
    'Quali sono le zone a rischio blackout nelle prossime 24 ore?'
  ];

  // Knowledge base
  const knowledgeBase = [
    { title: 'Dati in tempo reale', description: 'Integrazione con SCADA e PMU' },
    { title: 'Previsioni meteo', description: '48 ore, risoluzione 15 min' },
    { title: 'Modelli di rete', description: 'CIM 16v29a, aggiornato 1h fa' },
    { title: 'Storico eventi', description: '5 anni di dati operativi' }
  ];

  useEffect(() => {
    // Scroll al fondo della chat quando arrivano nuovi messaggi
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Funzione per gestire la risposta simulata dell'assistente
  const getSimulatedResponse = (query) => {
    const normalizedQuery = query.toLowerCase();

    if (normalizedQuery.includes('congestione') || normalizedQuery.includes('milano')) {
      return "Analisi completata. Il rischio di congestione sulla linea Milano-Torino nelle prossime 3 ore è moderato (35%). Fattori principali: alta produzione eolica prevista (450 MW) nel Nord-Ovest con domanda inferiore alle medie stagionali. Consiglio: monitorare il flusso e prepararsi a riconfiguare il dispacciamento se supera l'85% della capacità.";
    } else if (normalizedQuery.includes('dispacciamento') || normalizedQuery.includes('meteo')) {
      return "In base alle previsioni meteo delle prossime 24 ore (forti venti nel Sud, irradiazione solare elevata al Centro), raccomando di: 1) Aumentare la riserva rotante del 10% a partire dalle 14:00, 2) Ridurre la generazione termoelettrica nel Sud di circa 500 MW gradualmente dalle 12:00 alle 16:00, 3) Preparare le unità idroelettriche di Presenzano per compensazione rapida.";
    } else if (normalizedQuery.includes('manutenzione') || normalizedQuery.includes('roma')) {
      return "L'impatto della manutenzione programmata sulla sottostazione Roma Nord causerà una riduzione della capacità di trasferimento Nord-Centro di circa 800 MW per 6 ore. Suggerisco di: 1) Attivare le unità di riserva nell'area di Roma dalle 09:00, 2) Ridurre l'export verso la Grecia di 300 MW durante la manutenzione, 3) Posticipare la manutenzione di altri asset nella stessa area nelle prossime 72 ore.";
    } else if (normalizedQuery.includes('blackout') || normalizedQuery.includes('rischio')) {
      return "Analisi del rischio blackout completata. Le zone a maggior rischio nelle prossime 24 ore sono: 1) Area metropolitana di Napoli (indice di rischio: 0.32) a causa dell'ondata di calore prevista e conseguente aumento dei carichi di condizionamento, 2) Area di Palermo (indice di rischio: 0.28) per la limitata capacità di interconnessione durante il picco serale. Consiglio: attivare il piano di riduzione volontaria dei carichi industriali a Napoli dalle 14:00 alle 18:00.";
    } else {
      return "Ho analizzato la tua richiesta ma necessito di maggiori dettagli per fornirti un'analisi precisa. Puoi specificare quale area geografica, linea o sottostazione ti interessa? Oppure puoi chiedermi informazioni su previsioni della domanda, integrazione delle rinnovabili, congestioni di rete o ottimizzazione del dispacciamento.";
    }
  };

  // Gestione dell'invio del messaggio
  const handleSend = () => {
    if (input.trim() === '') return;

    // Aggiungi messaggio utente
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setIsLoading(true);

    // Simula ritardo API
    setTimeout(() => {
      const responseContent = getSimulatedResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: responseContent
        }
      ]);
      setIsLoading(false);
    }, 1000);

    setInput('');
  };

  // Gestione click sui suggerimenti
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <div className="ai-assistant-container">
      {/* Titolo e descrizione */}
      <h2 className="ai-title">
        <img src="/gear-icon.svg" alt="AI" className="icon" /> Assistente AI per la Gestione della Rete
      </h2>
      <p className="ai-description">
        Sistema di supporto decisionale basato su intelligenza artificiale per la gestione della rete elettrica
      </p>

      {/* Indicatori di stato */}
      <div className="metrics-section">
        <div className="metric-item">
          <TrendingUp size={16} className="metric-icon" />
          <div className="metric-value">{metrics.networkStability}%</div>
          <div className="metric-label">Stabilità Rete</div>
        </div>

        <div className="metric-item">
          <img src="/wind-icon.svg" alt="Wind" className="metric-icon" />
          <div className="metric-value">{metrics.renewablePenetration}%</div>
          <div className="metric-label">Penetrazione Rinnovabili</div>
        </div>

        <div className="metric-item">
          <AlertTriangle size={16} className="metric-icon" />
          <div className="metric-value">{metrics.congestionProbability}%</div>
          <div className="metric-label">Probabilità Congestione</div>
        </div>

        <div className="metric-item">
          <BarChart2 size={16} className="metric-icon" />
          <div className="metric-value">{metrics.demandForecastAccuracy}%</div>
          <div className="metric-label">Accuratezza Previsioni</div>
        </div>
      </div>

      {/* Area conversazione */}
      <div className="chat-area">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role === 'assistant' ? 'assistant-message' : 'user-message'}`}
          >
            {message.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input utente */}
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Fai una domanda sulla gestione della rete..."
          className="chat-input"
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading}
          className="send-button"
        >
          <Send size={16} />
        </button>
      </div>

      {/* Knowledge Base */}
      <div className="knowledge-base">
        <h3 className="kb-title">Knowledge Base</h3>
        <ul className="kb-list">
          {knowledgeBase.map((item, index) => (
            <li key={index} className="kb-item">
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggerimenti */}
      <div className="suggestions">
        <h3 className="suggestions-title">Domande suggerite</h3>
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .ai-assistant-container {
          font-family: Arial, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .ai-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }

        .icon {
          margin-right: 8px;
        }

        .ai-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .metrics-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .metric-item {
          text-align: left;
          margin-right: 20px;
        }

        .metric-icon {
          margin-bottom: 5px;
        }

        .metric-value {
          font-size: 18px;
          font-weight: bold;
        }

        .metric-label {
          font-size: 12px;
          color: #666;
        }

        .chat-area {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px;
          height: 300px;
          overflow-y: auto;
          margin-bottom: 10px;
          background-color: #f9f9f9;
        }

        .message {
          margin-bottom: 10px;
          padding: 8px 12px;
          border-radius: 5px;
          max-width: 80%;
        }

        .assistant-message {
          background-color: #f0f0f0;
          align-self: flex-start;
        }

        .user-message {
          background-color: #e1f5fe;
          align-self: flex-end;
          margin-left: auto;
        }

        .input-area {
          display: flex;
          margin-bottom: 20px;
        }

        .chat-input {
          flex-grow: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 5px 0 0 5px;
          font-size: 14px;
        }

        .send-button {
          background-color: #1976d2;
          color: white;
          border: none;
          border-radius: 0 5px 5px 0;
          padding: 0 15px;
          cursor: pointer;
        }

        .send-button:disabled {
          background-color: #cccccc;
        }

        .knowledge-base, .suggestions {
          margin-top: 20px;
        }

        .kb-title, .suggestions-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .kb-list, .suggestions-list {
          list-style-type: none;
          padding: 0;
        }

        .kb-item {
          margin-bottom: 8px;
          border-bottom: 1px solid #eee;
          padding-bottom: 8px;
        }

        .kb-item p {
          margin: 5px 0 0 0;
          font-size: 12px;
          color: #666;
        }

        .suggestion-item {
          padding: 8px;
          background-color: #f5f5f5;
          margin-bottom: 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .suggestion-item:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default AIGridAssistant;