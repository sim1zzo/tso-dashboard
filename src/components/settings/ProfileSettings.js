import React, { useState, useEffect, useCallback } from 'react';
import { Settings, User, Mail, Globe } from 'lucide-react';
import { SettingsService } from '../../services/SettingsService';
import { useTheme } from '../../contexts/ThemeContext';

const ProfileSettings = ({ onHelpClick }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    language: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const settingsService = new SettingsService();

  const loadProfileSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user')) || { name: 'Simone Izzo', email: 'si.izzo@reply.it', role: 'admin' };
      const [firstName, ...lastNameParts] = storedUser.name.split(' ');
      const lastName = lastNameParts.join(' ');
      setProfileData({
        firstName,
        lastName,
        email: storedUser.email,
        role: storedUser.role,
        language: 'it' // Assumiamo italiano come default
      });
    } catch (error) {
      console.error('Errore nel caricamento delle impostazioni del profilo:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfileSettings();
  }, [loadProfileSettings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const fullName = `${profileData.firstName} ${profileData.lastName}`;
      const role = fullName === 'Simone Izzo' ? 'admin' : 'Standard';
      const updatedUser = {
        name: fullName,
        email: profileData.email,
        role: role
      };
      await settingsService.saveProfileSettings(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Impostazioni salvate con successo!');
      // Aggiorna il ruolo nel profileData
      setProfileData(prevData => ({
        ...prevData,
        role: role
      }));
      // Forza un aggiornamento dell'header
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Errore nel salvataggio delle impostazioni:', error);
      alert('Si è verificato un errore durante il salvataggio delle impostazioni.');
    }
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
    boxShadow: isDarkMode
      ? '0 2px 4px rgba(255,255,255,0.1)'
      : '0 2px 4px rgba(0,0,0,0.1)',
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
    marginLeft: '10px',
  };

  if (isLoading) {
    return <div style={containerStyle}>Caricamento in corso...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Settings style={{marginRight: '10px'}} /> Impostazioni Profilo
      </h2>
      
      <div style={cardStyle}>
        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px', color: isDarkMode ? '#e2e8f0' : '#2d3748'}}>
            <User style={{marginRight: '5px', verticalAlign: 'middle'}} />
            Nome
          </label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px', color: isDarkMode ? '#e2e8f0' : '#2d3748'}}>
            <User style={{marginRight: '5px', verticalAlign: 'middle'}} />
            Cognome
          </label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px', color: isDarkMode ? '#e2e8f0' : '#2d3748'}}>
            <Mail style={{marginRight: '5px', verticalAlign: 'middle'}} />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px', color: isDarkMode ? '#e2e8f0' : '#2d3748'}}>
            Ruolo
          </label>
          <input
            type="text"
            value={profileData.role}
            readOnly
            style={{...inputStyle, backgroundColor: isDarkMode ? '#4a5568' : '#e2e8f0'}}
          />
        </div>

        <div style={{marginBottom: '15px'}}>
          <label style={{display: 'block', marginBottom: '5px', color: isDarkMode ? '#e2e8f0' : '#2d3748'}}>
            <Globe style={{marginRight: '5px', verticalAlign: 'middle'}} />
            Lingua
          </label>
          <select 
            name="language"
            value={profileData.language} 
            onChange={handleInputChange}
            style={inputStyle}
          >
            <option value="it">Italiano</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <button onClick={handleSave} style={saveButtonStyle}>Salva</button>
          <button onClick={() => onHelpClick('Aiuto per le impostazioni del profilo')} style={helpButtonStyle}>?</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;