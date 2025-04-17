import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Settings, Lock, Shield } from 'lucide-react';

const SecuritySettings = ({ onHelpClick }) => {
  const [password, setPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleSave = () => {
    // Implementa la logica di salvataggio
    console.log('Impostazioni di sicurezza salvate:', { password, twoFactor });
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: isDarkMode ? '#2d3748' : '#f0f0f0',
    color: isDarkMode ? '#e2e8f0' : '#2d3748',
    minHeight: '100vh',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    color: isDarkMode ? '#63b3ed' : '#3490dc',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#4a5568' : 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: isDarkMode ? '0 2px 4px rgba(255,255,255,0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: isDarkMode ? '1px solid #4a5568' : '1px solid #e2e8f0',
    backgroundColor: isDarkMode ? '#2d3748' : 'white',
    color: isDarkMode ? '#e2e8f0' : '#2d3748',
    fontSize: '16px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: isDarkMode ? '#e2e8f0' : '#2d3748',
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  };

  const checkboxStyle = {
    marginRight: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? '#4299e1' : '#3490dc',
    color: 'white',
    marginRight: '10px',
  };

  const helpButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDarkMode ? '#48bb78' : '#38a169',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Settings style={{marginRight: '10px'}} /> Impostazioni di Sicurezza
      </h2>
      <div style={cardStyle}>
        <div style={{marginBottom: '20px'}}>
          <label style={labelStyle}>
            <Lock style={{marginRight: '5px', verticalAlign: 'middle'}} />
            Nuova Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={checkboxContainerStyle}>
          <input
            type="checkbox"
            checked={twoFactor}
            onChange={(e) => setTwoFactor(e.target.checked)}
            style={checkboxStyle}
          />
          <label style={{...labelStyle, marginBottom: 0}}>
            <Shield style={{marginRight: '5px', verticalAlign: 'middle'}} />
            Abilita autenticazione a due fattori
          </label>
        </div>
        <div>
          <button onClick={handleSave} style={saveButtonStyle}>Salva</button>
          <button onClick={() => onHelpClick('Aiuto per le impostazioni di sicurezza')} style={helpButtonStyle}>?</button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;