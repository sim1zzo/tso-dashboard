import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  Search,
  Clock,
  Zap,
  Shield,
  RefreshCw,
  Activity,
  Download,
  Eye,
  Filter,
  Check,
} from 'lucide-react';

const AIAnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [detectionRunning, setDetectionRunning] = useState(false);
  const [stats, setStats] = useState({
    totalScanned: 0,
    anomaliesDetected: 0,
    falsePositives: 0,
    accuracy: 0,
  });

  // Simulated data for the component
  const generateMockAnomalies = () => {
    const types = ['voltage', 'frequency', 'load', 'cyber', 'communication'];
    const severities = ['critical', 'high', 'medium', 'low'];
    const locations = [
      'Sottostazione Milano Nord',
      'Linea AT Roma-Napoli',
      'Trasformatore Firenze Sud',
      'Nodo di scambio Palermo',
      'Sistema SCADA Centrale',
      'Generatore Brindisi',
      'PMU Bologna',
    ];

    const anomalies = [];
    const now = new Date();

    // Generate between 4-8 anomalies
    const count = Math.floor(Math.random() * 5) + 4;

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const severity =
        severities[Math.floor(Math.random() * severities.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];

      // Create timestamp between now and 24 hours ago
      const timestamp = new Date(now - Math.random() * 24 * 60 * 60 * 1000);

      let description = '';
      let impact = '';
      let recommendation = '';
      let relatedParams = [];

      switch (type) {
        case 'voltage':
          description = `Anomalia di tensione rilevata: ${
            Math.floor(Math.random() * 30) + 370
          } kV, valore fuori dai parametri standard.`;
          impact = 'Rischio di sovratensione sui componenti di rete connessi.';
          recommendation =
            'Verificare regolatori di tensione e considerare redistribuzione di carico reattivo.';
          relatedParams = ['Tensione', 'Potenza reattiva', 'Tap changer'];
          break;
        case 'frequency':
          description = `Variazione anomala di frequenza: ${(
            49.8 +
            Math.random() * 0.4
          ).toFixed(2)} Hz, oscillazioni non standard rilevate.`;
          impact = 'Potenziale instabilità nella sincronizzazione di rete.';
          recommendation =
            'Verificare riserva primaria e valutare attivazione di generazione aggiuntiva.';
          relatedParams = ['Frequenza', 'Potenza attiva', 'Riserva rotante'];
          break;
        case 'load':
          description = `Comportamento anomalo del carico: incremento improvviso del ${
            Math.floor(Math.random() * 30) + 20
          }% in 15 minuti.`;
          impact =
            "Sovraccarico potenziale su linee di trasmissione nell'area.";
          recommendation =
            'Attivare redistribuzione di carico e preparare risorse di regolazione.';
          relatedParams = [
            'Potenza attiva',
            'Corrente di linea',
            'Temperatura conduttori',
          ];
          break;
        case 'cyber':
          description =
            'Pattern sospetti di accesso rilevati sul sistema di telecontrollo.';
          impact = 'Potenziale compromissione della sicurezza operativa.';
          recommendation =
            'Isolare sistema interessato e attivare protocollo di risposta agli incidenti.';
          relatedParams = [
            'Log accessi',
            'Traffico di rete',
            'Attività utenti',
          ];
          break;
        case 'communication':
          description =
            'Perdita intermittente di comunicazione con RTU remota.';
          impact = 'Osservabilità ridotta nella zona interessata.';
          recommendation =
            'Verificare connettività e integrità canali di comunicazione.';
          relatedParams = ['Latenza', 'Pacchetti persi', 'Qualità segnale'];
          break;
        default:
          description = 'Anomalia generale rilevata nel sistema.';
      }

      anomalies.push({
        id: `anomaly-${i + 1}-${Date.now()}`,
        type,
        severity,
        location,
        timestamp,
        description,
        impact,
        recommendation,
        relatedParams,
        confidence: Math.floor(Math.random() * 30) + 70,
        acknowledged: Math.random() > 0.7,
        resolved: Math.random() > 0.8,
      });
    }

    // Sort by severity and then by timestamp (most recent first)
    return anomalies.sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return b.timestamp - a.timestamp;
    });
  };

  // Filter anomalies based on active filter
  const getFilteredAnomalies = () => {
    if (activeFilter === 'all') return anomalies;
    return anomalies.filter((anomaly) => anomaly.severity === activeFilter);
  };

  // Initialize data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      const generatedAnomalies = generateMockAnomalies();
      setAnomalies(generatedAnomalies);

      // Update stats
      setStats({
        totalScanned: Math.floor(Math.random() * 400) + 600,
        anomaliesDetected: generatedAnomalies.length,
        falsePositives: Math.floor(Math.random() * 5),
        accuracy: Math.floor(Math.random() * 10) + 90,
      });

      setIsLoading(false);
    }, 1500);
  }, []);

  // Start new detection
  const handleStartDetection = () => {
    setDetectionRunning(true);
    setIsLoading(true);

    // Simulate detection process
    setTimeout(() => {
      const newAnomalies = generateMockAnomalies();
      setAnomalies(newAnomalies);

      // Update stats
      setStats((prev) => ({
        totalScanned: prev.totalScanned + Math.floor(Math.random() * 100) + 50,
        anomaliesDetected: prev.anomaliesDetected + newAnomalies.length,
        falsePositives: prev.falsePositives + Math.floor(Math.random() * 2),
        accuracy: Math.min(100, prev.accuracy + (Math.random() > 0.7 ? 1 : -1)),
      }));

      setIsLoading(false);
      setDetectionRunning(false);
    }, 3000);
  };

  // Get color for severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#dc2626'; // Rosso
      case 'high':
        return '#ea580c'; // Arancione
      case 'medium':
        return '#ca8a04'; // Giallo
      case 'low':
        return '#65a30d'; // Verde
      default:
        return '#6b7280'; // Grigio
    }
  };

  // Get icon for anomaly type
  const getAnomalyIcon = (type) => {
    switch (type) {
      case 'voltage':
        return <Zap size={16} className='anomaly-icon' />;
      case 'frequency':
        return <Activity size={16} className='anomaly-icon' />;
      case 'load':
        return <TrendingUp size={16} className='anomaly-icon' />;
      case 'cyber':
        return <Shield size={16} className='anomaly-icon' />;
      case 'communication':
        return <Zap size={16} className='anomaly-icon' />;
      default:
        return <AlertTriangle size={16} className='anomaly-icon' />;
    }
  };

  return (
    <div className='anomaly-detection-container'>
      <h2 className='anomaly-title'>
        <AlertTriangle className='icon' /> Rilevamento Anomalie IA
      </h2>
      <p className='anomaly-description'>
        Sistema avanzato di rilevamento anomalie basato su machine learning per
        la rete elettrica
      </p>

      {/* Statistiche */}
      <div className='stats-section'>
        <div className='stat-item'>
          <div className='stat-value'>{stats.totalScanned}</div>
          <div className='stat-label'>Parametri analizzati</div>
        </div>
        <div className='stat-item'>
          <div className='stat-value'>{stats.anomaliesDetected}</div>
          <div className='stat-label'>Anomalie rilevate</div>
        </div>
        <div className='stat-item'>
          <div className='stat-value'>{stats.falsePositives}</div>
          <div className='stat-label'>Falsi positivi</div>
        </div>
        <div className='stat-item'>
          <div className='stat-value'>{stats.accuracy}%</div>
          <div className='stat-label'>Accuratezza rilevamento</div>
        </div>
      </div>

      {/* Controlli */}
      <div className='controls-section'>
        <div className='filters'>
          <span className='filter-label'>Filtro:</span>
          <div className='filter-buttons'>
            <button
              className={`filter-button ${
                activeFilter === 'all' ? 'active' : ''
              }`}
              onClick={() => setActiveFilter('all')}
            >
              Tutte
            </button>
            <button
              className={`filter-button ${
                activeFilter === 'critical' ? 'active' : ''
              }`}
              style={{ color: getSeverityColor('critical') }}
              onClick={() => setActiveFilter('critical')}
            >
              Critiche
            </button>
            <button
              className={`filter-button ${
                activeFilter === 'high' ? 'active' : ''
              }`}
              style={{ color: getSeverityColor('high') }}
              onClick={() => setActiveFilter('high')}
            >
              Alte
            </button>
            <button
              className={`filter-button ${
                activeFilter === 'medium' ? 'active' : ''
              }`}
              style={{ color: getSeverityColor('medium') }}
              onClick={() => setActiveFilter('medium')}
            >
              Medie
            </button>
            <button
              className={`filter-button ${
                activeFilter === 'low' ? 'active' : ''
              }`}
              style={{ color: getSeverityColor('low') }}
              onClick={() => setActiveFilter('low')}
            >
              Basse
            </button>
          </div>
        </div>
        <div className='time-range'>
          <span className='time-label'>Periodo:</span>
          <select
            className='time-select'
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value='1h'>Ultima ora</option>
            <option value='6h'>Ultime 6 ore</option>
            <option value='24h'>Ultime 24 ore</option>
            <option value='7d'>Ultimi 7 giorni</option>
          </select>
        </div>
        <button
          className='detection-button'
          onClick={handleStartDetection}
          disabled={detectionRunning}
        >
          {detectionRunning ? (
            <>
              <RefreshCw className='button-icon spin' /> Rilevamento in corso...
            </>
          ) : (
            <>
              <Search className='button-icon' /> Avvia rilevamento anomalie
            </>
          )}
        </button>
      </div>

      {/* Lista anomalie */}
      <div className='anomalies-list'>
        {isLoading ? (
          <div className='loading'>Caricamento anomalie in corso...</div>
        ) : getFilteredAnomalies().length === 0 ? (
          <div className='no-anomalies'>
            Nessuna anomalia rilevata con i filtri selezionati
          </div>
        ) : (
          getFilteredAnomalies().map((anomaly) => (
            <div
              key={anomaly.id}
              className={`anomaly-card ${anomaly.resolved ? 'resolved' : ''} ${
                anomaly.acknowledged ? 'acknowledged' : ''
              }`}
            >
              <div className='anomaly-header'>
                <div
                  className='anomaly-severity'
                  style={{
                    backgroundColor: getSeverityColor(anomaly.severity),
                  }}
                >
                  {anomaly.severity.toUpperCase()}
                </div>
                <div className='anomaly-time'>
                  <Clock size={14} className='time-icon' />
                  {anomaly.timestamp.toLocaleString()}
                </div>
              </div>
              <div className='anomaly-content'>
                <div className='anomaly-title-row'>
                  {getAnomalyIcon(anomaly.type)}
                  <span className='anomaly-type'>
                    {anomaly.type.toUpperCase()}
                  </span>
                  <span className='anomaly-location'>{anomaly.location}</span>
                </div>
                <div className='anomaly-description'>{anomaly.description}</div>
                <div className='anomaly-details'>
                  <div className='anomaly-impact'>
                    <strong>Impatto:</strong> {anomaly.impact}
                  </div>
                  <div className='anomaly-recommendation'>
                    <strong>Raccomandazione:</strong> {anomaly.recommendation}
                  </div>
                </div>
                <div className='anomaly-params'>
                  {anomaly.relatedParams.map((param, idx) => (
                    <span key={idx} className='param-tag'>
                      {param}
                    </span>
                  ))}
                </div>
                <div className='anomaly-footer'>
                  <div className='anomaly-confidence'>
                    Confidenza AI: <strong>{anomaly.confidence}%</strong>
                  </div>
                  <div className='anomaly-actions'>
                    <button className='action-button examine'>
                      <Eye size={14} className='action-icon' /> Esamina
                    </button>
                    {!anomaly.acknowledged && !anomaly.resolved && (
                      <button className='action-button acknowledge'>
                        <Check size={14} className='action-icon' /> Gestisci
                      </button>
                    )}
                    {anomaly.acknowledged && !anomaly.resolved && (
                      <div className='status-badge acknowledged'>Gestita</div>
                    )}
                    {anomaly.resolved && (
                      <div className='status-badge resolved'>Risolta</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .anomaly-detection-container {
          font-family: Arial, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .anomaly-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
        }

        .icon {
          margin-right: 8px;
        }

        .anomaly-description {
          color: #666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .stats-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .stat-item {
          flex: 1;
          min-width: 120px;
          background-color: #f8f9fa;
          border-radius: 6px;
          padding: 15px;
          margin: 10px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .stat-value {
          font-size: 22px;
          font-weight: bold;
          color: #1f2937;
        }

        .stat-label {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .controls-section {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .filters,
        .time-range {
          margin: 10px 0;
        }

        .filter-label,
        .time-label {
          margin-right: 10px;
          font-weight: 500;
        }

        .filter-buttons {
          display: inline-flex;
          gap: 6px;
        }

        .filter-button {
          background: #e5e7eb;
          border: none;
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
        }

        .filter-button.active {
          font-weight: bold;
          background: #d1d5db;
        }

        .time-select {
          padding: 6px 10px;
          border-radius: 4px;
          border: 1px solid #d1d5db;
        }

        .detection-button {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: #2563eb;
          color: white;
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .button-icon {
          margin-right: 4px;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .anomalies-list {
          margin-top: 20px;
        }

        .anomaly-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-left: 6px solid #6b7280;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .anomaly-card.resolved {
          opacity: 0.6;
        }

        .anomaly-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .anomaly-severity {
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 4px;
          color: white;
          font-size: 12px;
        }

        .anomaly-time {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #6b7280;
        }

        .time-icon {
          margin-right: 4px;
        }

        .anomaly-content {
          padding-left: 4px;
        }

        .anomaly-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .anomaly-type {
          font-size: 14px;
          color: #374151;
        }

        .anomaly-location {
          font-size: 13px;
          color: #6b7280;
        }

        .anomaly-description {
          margin-bottom: 10px;
          font-size: 14px;
          color: #4b5563;
        }

        .anomaly-details {
          font-size: 13px;
          color: #374151;
          margin-bottom: 10px;
        }

        .anomaly-params {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 12px;
        }

        .param-tag {
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: #374151;
        }

        .anomaly-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }

        .anomaly-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .action-button {
          background: #e0e7ff;
          color: #1e40af;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-badge {
          font-size: 11px;
          padding: 4px 6px;
          border-radius: 4px;
          font-weight: bold;
        }

        .status-badge.acknowledged {
          background: #fef08a;
          color: #92400e;
        }

        .status-badge.resolved {
          background: #bbf7d0;
          color: #166534;
        }

        .loading,
        .no-anomalies {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default AIAnomalyDetection;
