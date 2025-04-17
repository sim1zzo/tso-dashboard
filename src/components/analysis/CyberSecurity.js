import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { IEC62351SecurityService } from '../../services/IEC62351SecurityService';

const CyberSecurity = () => {
  const [alerts, setAlerts] = useState([]);
  const [securityService, setSecurityService] = useState(null);

  useEffect(() => {
    const initSecurity = async () => {
      const service = new IEC62351SecurityService();
      await service.initialize();
      setSecurityService(service);
    };

    initSecurity();
  }, []);

  useEffect(() => {
    if (!securityService) return;

    const monitorSecurity = () => {
      const newAlert = securityService.detectThreat();
      if (newAlert) {
        setAlerts(prev => [...prev, newAlert]);
      }
    };

    const interval = setInterval(monitorSecurity, 5000);
    return () => clearInterval(interval);
  }, [securityService]);

  const handleAlertResponse = (id) => {
    if (securityService) {
      securityService.respondToThreat(id);
    }
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const containerStyle = {
    padding: '24px',
    backgroundColor: '#f3f4f6',
    fontFamily: 'Arial, sans-serif'
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center'
  };

  const alertContainerStyle = {
    marginTop: '24px'
  };

  const alertBoxStyle = (severity) => ({
    backgroundColor: severity === 'high' ? '#FEE2E2' : '#FEF3C7',
    border: `1px solid ${severity === 'high' ? '#FCA5A5' : '#FCD34D'}`,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    position: 'relative'
  });

  const alertHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  };

  const alertTitleStyle = (severity) => ({
    fontWeight: 'bold',
    color: severity === 'high' ? '#DC2626' : '#D97706',
    display: 'flex',
    alignItems: 'center'
  });

  const buttonStyle = {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const infoSectionStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Shield style={{ marginRight: '12px' }} /> Cybersecurity Intelligente (IEC 62351)
      </h2>

      <div style={alertContainerStyle}>
        <h3 style={{ ...headerStyle, fontSize: '20px' }}>
          <Bell style={{ marginRight: '8px' }} /> Alert in tempo reale:
        </h3>
        {alerts.map(alert => (
          <div key={alert.id} style={alertBoxStyle(alert.severity)}>
            <div style={alertHeaderStyle}>
              <span style={alertTitleStyle(alert.severity)}>
                {alert.severity === 'high' ? (
                  <AlertTriangle style={{ marginRight: '8px' }} />
                ) : (
                  <CheckCircle style={{ marginRight: '8px' }} />
                )}
                {alert.severity === 'high' ? 'ALTA PRIORITÀ' : 'BASSA PRIORITÀ'}
              </span>
              <small>{alert.timestamp}</small>
            </div>
            <p style={{ marginBottom: '12px' }}>{alert.message}</p>
            <button 
              style={buttonStyle} 
              onClick={() => handleAlertResponse(alert.id)}
            >
              Gestisci Alert
            </button>
          </div>
        ))}
        {alerts.length === 0 && (
          <p>Nessun alert attivo al momento. Il sistema sta monitorando continuamente.</p>
        )}
      </div>

      <div style={infoSectionStyle}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Informazioni sul Sistema</h3>
        <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
          <li>Implementazione conforme allo standard IEC 62351 per la sicurezza dei sistemi di controllo energetici.</li>
          <li>Monitoraggio continuo e rilevamento delle minacce basato su algoritmi di machine learning.</li>
          <li>Aggiornamento automatico delle politiche di sicurezza in risposta alle nuove minacce identificate.</li>
          <li>Integrazione con sistemi SIEM (Security Information and Event Management) per una visione completa della sicurezza.</li>
          <li>Supporto per l'autenticazione multi-fattore e la gestione avanzata delle identità per l'accesso ai sistemi critici.</li>
        </ul>
      </div>
    </div>
  );
};

export default CyberSecurity;