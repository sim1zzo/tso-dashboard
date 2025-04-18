import React, { useState, useRef, useEffect } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  BarChart2,
  Send,
  Wind,
  Database,
  Zap,
  Search,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

const AIGridAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Ciao, sono il tuo Assistente AI per la Gestione della Rete. Come posso aiutarti oggi con la gestione della rete elettrica?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

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
    } else if (normalizedQuery.includes('previsione') || normalizedQuery.includes('domanda')) {
      return "Ho analizzato i dati storici e le previsioni meteo per le prossime 48 ore. La domanda di energia prevista raggiungerà un picco di 47.2 GW domani alle 18:00, principalmente guidata da temperature elevate nelle regioni centrali e meridionali. Suggerisco di aumentare la capacità di riserva terziaria nella fascia oraria 16:00-20:00 e di predisporre l'attivazione degli accordi di interruzione con l'industria dell'acciaio.";
    } else if (normalizedQuery.includes('rinnovabili') || normalizedQuery.includes('solare')) {
      return "Basandomi sulle previsioni meteo, stimo una produzione solare di 12.3 GW alle ore 12:00 di domani, concentrata principalmente in Puglia e Sicilia. La produzione eolica notturna sarà significativa, con circa 4.8 GW nelle ore 22:00-02:00. Per gestire al meglio queste fonti, consiglio di preparare le unità di pompaggio idroelettrico per l'accumulo durante le ore di picco della produzione solare, e di ridurre il carico programmato delle unità termiche a carbone nelle stesse ore.";
    } else if (normalizedQuery.includes('linea') || normalizedQuery.includes('flusso')) {
      return "La linea ad alta tensione Milano-Bologna sta attualmente operando all'87% della sua capacità nominale. Con le attuali condizioni meteo, raccomando di non superare il 92% per mantenere un adeguato margine di sicurezza. Ho analizzato la possibilità di redistribuire i flussi di potenza utilizzando il controllo degli angoli di fase nei nodi di Roma Nord e Firenze Sud, con un potenziale miglioramento del 7-9% nei margini di sicurezza.";
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
    setShowSuggestions(false);

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
    <div className="modern-assistant">
      <div className="assistant-header">
        <div className="header-content">
          <h2 className="assistant-title">
            <Zap size={20} className="title-icon" />
            Assistente AI per la Gestione della Rete
          </h2>
          <p className="assistant-subtitle">
            Sistema di supporto decisionale basato su intelligenza artificiale
          </p>
        </div>
      </div>

      <div className="assistant-content">
        <div className="main-content">
          {/* Metrics Row */}
          <div className="metrics-row">
            <div className="metric">
              <TrendingUp size={16} className="metric-icon" />
              <div className="metric-data">
                <div className="metric-value">{metrics.networkStability}%</div>
                <div className="metric-label">Stabilità Rete</div>
              </div>
            </div>
            
            <div className="metric">
              <Wind size={16} className="metric-icon renewable" />
              <div className="metric-data">
                <div className="metric-value">{metrics.renewablePenetration}%</div>
                <div className="metric-label">Penetrazione Rinnovabili</div>
              </div>
            </div>
            
            <div className="metric">
              <AlertTriangle size={16} className="metric-icon warning" />
              <div className="metric-data">
                <div className="metric-value">{metrics.congestionProbability}%</div>
                <div className="metric-label">Probabilità Congestione</div>
              </div>
            </div>
            
            <div className="metric">
              <BarChart2 size={16} className="metric-icon accuracy" />
              <div className="metric-data">
                <div className="metric-value">{metrics.demandForecastAccuracy}%</div>
                <div className="metric-label">Accuratezza Previsioni</div>
              </div>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="conversation-area">
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.role}`}>
                  <div className="message-content">{message.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="loading-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Fai una domanda sulla gestione della rete..."
                className="input-field"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || input.trim() === ''}
                className="send-button"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Suggestions Area - Only shown when no conversation has started */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-area">
              <h3 className="suggestions-title">Domande suggerite</h3>
              <div className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <button 
                    key={index}
                    className="suggestion-button"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="suggestion-text">{suggestion}</span>
                    <ChevronRight size={16} className="suggestion-icon" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with Knowledge Base */}
        <div className="knowledge-sidebar">
          <div className="knowledge-header">
            <Database size={16} />
            <h3>Knowledge Base</h3>
          </div>
          
          <div className="knowledge-items">
            {knowledgeBase.map((item, index) => (
              <div key={index} className="knowledge-item">
                <h4 className="knowledge-title">{item.title}</h4>
                <p className="knowledge-description">{item.description}</p>
              </div>
            ))}
          </div>
          
          <button className="advanced-search-button">
            <Search size={14} />
            <span>Ricerca avanzata</span>
          </button>
          
          <div className="external-links">
            <a href="#" className="external-link">
              <ExternalLink size={14} />
              <span>Dashboard operativa</span>
            </a>
            <a href="#" className="external-link">
              <ExternalLink size={14} />
              <span>Previsioni meteo</span>
            </a>
            <a href="#" className="external-link">
              <ExternalLink size={14} />
              <span>Analisi avanzate</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-assistant {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background-color: #f8f9fa;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          max-width: 1200px;
          margin: 0 auto;
        }

        .assistant-header {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: white;
          padding: 16px 24px;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .assistant-title {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
        }

        .title-icon {
          margin-right: 10px;
        }

        .assistant-subtitle {
          margin: 5px 0 0;
          font-size: 14px;
          opacity: 0.8;
        }

        .assistant-content {
          display: flex;
          background-color: white;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .metrics-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .metric {
          background-color: #f8fafc;
          border-radius: 8px;
          padding: 12px;
          flex: 1;
          min-width: 120px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .metric:last-child {
          margin-right: 0;
        }

        .metric-icon {
          color: #3b82f6;
          margin-right: 10px;
        }

        .metric-icon.renewable {
          color: #10b981;
        }

        .metric-icon.warning {
          color: #f59e0b;
        }

        .metric-icon.accuracy {
          color: #8b5cf6;
        }

        .metric-data {
          display: flex;
          flex-direction: column;
        }

        .metric-value {
          font-size: 18px;
          font-weight: 600;
        }

        .metric-label {
          font-size: 12px;
          color: #64748b;
        }

        .conversation-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: #f8fafc;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          min-height: 300px;
          max-height: 400px;
        }

        .message {
          margin-bottom: 16px;
          max-width: 80%;
          clear: both;
        }

        .message.user {
          float: right;
        }

        .message.assistant {
          float: left;
        }

        .message-content {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .message.user .message-content {
          background-color: #2563eb;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.assistant .message-content {
          background-color: #e2e8f0;
          color: #334155;
          border-bottom-left-radius: 4px;
        }

        .loading-indicator {
          display: flex;
          width: 60px;
          justify-content: space-between;
          padding: 12px;
          background-color: #e2e8f0;
          border-radius: 18px;
          margin-bottom: 16px;
          border-bottom-left-radius: 4px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background-color: #94a3b8;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }

        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          } 40% { 
            transform: scale(1.0);
          }
        }

        .input-area {
          display: flex;
          padding: 12px;
          background-color: white;
          border-top: 1px solid #e2e8f0;
        }

        .input-field {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 24px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-field:focus {
          border-color: #2563eb;
        }

        .send-button {
          margin-left: 10px;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background-color: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .send-button:hover {
          background-color: #1d4ed8;
        }

        .send-button:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
        }

        .suggestions-area {
          margin-top: 20px;
        }

        .suggestions-title {
          font-size: 14px;
          color: #64748b;
          margin-bottom: 10px;
        }

        .suggestions-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 10px;
        }

        .suggestion-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background-color: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s;
          color: #334155;
        }

        .suggestion-button:hover {
          background-color: #e2e8f0;
        }

        .suggestion-text {
          flex: 1;
          margin-right: 10px;
        }

        .suggestion-icon {
          color: #64748b;
          flex-shrink: 0;
        }

        .knowledge-sidebar {
          width: 280px;
          padding: 20px;
          background-color: #f8fafc;
          border-left: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .knowledge-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          color: #334155;
        }

        .knowledge-header h3 {
          margin: 0 0 0 8px;
          font-size: 16px;
        }

        .knowledge-items {
          flex: 1;
        }

        .knowledge-item {
          padding: 12px;
          background-color: white;
          border-radius: 8px;
          margin-bottom: 10px;
          border: 1px solid #e2e8f0;
        }

        .knowledge-title {
          margin: 0 0 5px 0;
          font-size: 14px;
          color: #334155;
        }

        .knowledge-description {
          margin: 0;
          font-size: 12px;
          color: #64748b;
        }

        .advanced-search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          margin: 16px 0;
          background-color: white;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          color: #334155;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .advanced-search-button:hover {
          background-color: #f1f5f9;
        }

        .advanced-search-button svg {
          margin-right: 8px;
        }

        .external-links {
          margin-top: auto;
        }

        .external-link {
          display: flex;
          align-items: center;
          padding: 8px 0;
          color: #2563eb;
          font-size: 14px;
          text-decoration: none;
        }

        .external-link:hover {
          text-decoration: underline;
        }

        .external-link svg {
          margin-right: 8px;
          font-size: 12px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .assistant-content {
            flex-direction: column;
          }

          .knowledge-sidebar {
            width: auto;
            border-left: none;
            border-top: 1px solid #e2e8f0;
          }

          .metric {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AIGridAssistant;