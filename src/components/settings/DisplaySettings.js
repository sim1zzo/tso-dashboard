import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Settings } from 'lucide-react';

const DisplaySettings = () => {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState('medium');
  const [colorScheme, setColorScheme] = useState('default');

  const isDarkMode = theme === 'dark';

  const applySettings = useCallback(() => {
    document.body.style.fontSize = getFontSize();
    document.documentElement.style.setProperty('--primary-color', getColorScheme());
  }, [fontSize, colorScheme]);

  useEffect(() => {
    applySettings();
  }, [applySettings]);

  const getFontSize = () => {
    switch(fontSize) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  };

  const getColorScheme = () => {
    switch(colorScheme) {
      case 'blue': return '#3490dc';
      case 'green': return '#38a169';
      case 'purple': return '#9f7aea';
      default: return '#3490dc';
    }
  };

  const handleSave = () => {
    setTheme(isDarkMode ? 'dark' : 'light');
    applySettings();
    console.log('Impostazioni salvate e applicate:', { theme, fontSize, colorScheme });
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
    color: getColorScheme(),
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#4a5568' : 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: isDarkMode ? '0 2px 4px rgba(255,255,255,0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  };

  const labelStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    color: isDarkMode ? '#e2e8f0' : '#2d3748',
  };

  const selectStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: isDarkMode ? '1px solid #4a5568' : '1px solid #e2e8f0',
    backgroundColor: isDarkMode ? '#2d3748' : 'white',
    color: isDarkMode ? '#e2e8f0' : '#2d3748',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: getColorScheme(),
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const toggleSwitchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
  };

  const toggleInputStyle = {
    opacity: 0,
    width: 0,
    height: 0,
  };

  const toggleSliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDarkMode ? getColorScheme() : '#ccc',
    transition: '.4s',
    borderRadius: '34px',
  };

  const toggleSliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '26px',
    width: '26px',
    left: isDarkMode ? '30px' : '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Settings style={{marginRight: '10px'}} /> Impostazioni di Visualizzazione
      </h2>
      
      <div style={cardStyle}>
        <div style={labelStyle}>
          <span>Modalità Scura</span>
          <label style={toggleSwitchStyle}>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setTheme(isDarkMode ? 'light' : 'dark')}
              style={toggleInputStyle}
            />
            <span style={toggleSliderStyle}>
              <span style={toggleSliderBeforeStyle}></span>
            </span>
          </label>
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={labelStyle}>
            <span>Dimensione del testo</span>
          </label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            style={selectStyle}
          >
            <option value="small">Piccolo</option>
            <option value="medium">Medio</option>
            <option value="large">Grande</option>
          </select>
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={labelStyle}>
            <span>Schema Colori</span>
          </label>
          <select
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value)}
            style={selectStyle}
          >
            <option value="default">Default</option>
            <option value="blue">Blu</option>
            <option value="green">Verde</option>
            <option value="purple">Viola</option>
          </select>
        </div>

        <button onClick={handleSave} style={buttonStyle}>
          Salva Impostazioni
        </button>
      </div>
    </div>
  );
};

export default DisplaySettings;