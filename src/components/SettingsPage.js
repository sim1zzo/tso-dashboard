import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AuthService } from '../services/AuthService';
import { SettingsService } from '../services/SettingsService';
import ProfileSettings from './settings/ProfileSettings';
import DisplaySettings from './settings/DisplaySettings';
import SecuritySettings from './settings/SecuritySettings';
import NotificationSettings from './settings/NotificationSettings';
import SystemSettings from './settings/SystemSettings';
import HelpModal from './HelpModal';

const SettingsContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.active ? '#007bff' : '#f8f9fa')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e9ecef')};
  }
`;

const SettingsContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpContent, setHelpContent] = useState('');

  const authService = new AuthService();
  const settingsService = new SettingsService();

  useEffect(() => {
    const user = authService.getCurrentUser();
    setUserRole(user.role);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleHelpClick = (content) => {
    setHelpContent(content);
    setShowHelpModal(true);
  };

  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings onHelpClick={handleHelpClick} />;
      case 'display':
        return <DisplaySettings onHelpClick={handleHelpClick} />;
      case 'security':
        return <SecuritySettings onHelpClick={handleHelpClick} />;
      case 'notifications':
        return <NotificationSettings onHelpClick={handleHelpClick} />;
      case 'system':
        return userRole === 'Administrator' ? <SystemSettings onHelpClick={handleHelpClick} /> : null;
      default:
        return null;
    }
  };

  return (
    <SettingsContainer>
      <h1>Impostazioni</h1>
      <SearchBar
        type='text'
        placeholder='Cerca impostazioni...'
        value={searchTerm}
        onChange={handleSearch}
      />
      <TabContainer>
        <Tab
          active={activeTab === 'profile'}
          onClick={() => handleTabChange('profile')}
        >
          Profilo Utente
        </Tab>
        <Tab
          active={activeTab === 'display'}
          onClick={() => handleTabChange('display')}
        >
          Visualizzazione
        </Tab>
        <Tab
          active={activeTab === 'security'}
          onClick={() => handleTabChange('security')}
        >
          Sicurezza
        </Tab>
        <Tab
          active={activeTab === 'notifications'}
          onClick={() => handleTabChange('notifications')}
        >
          Notifiche
        </Tab>
        {userRole === 'Administrator' && (
          <Tab
            active={activeTab === 'system'}
            onClick={() => handleTabChange('system')}
          >
            Impostazioni di Sistema
          </Tab>
        )}
      </TabContainer>
      <SettingsContent>{renderSettingsContent()}</SettingsContent>
      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        content={helpContent}
      />
    </SettingsContainer>
  );
};

export default SettingsPage;
