import React, { useState, useEffect } from 'react';
import { Clock, LogOut, Settings } from 'lucide-react';
import { AuthService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #3385ad;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

const LogoContainer = styled.div`
  display: flex;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  filter: brightness(0) invert(1);
`;

const CurrentTime = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const UserInitials = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #3385ad;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  color: #333;
  z-index: 1000;
  width: 300px; // Aumentato la larghezza
`;

const DropdownItem = styled.div`
  margin-bottom: 0.75rem;
  font-size: 1rem;
`;

const SettingsButton = styled.button`
  background-color: #3385ad;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-top: 1.5rem;
  width: 100%;
`;

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Ottieni le informazioni dell'utente dal servizio di autenticazione
      const currentUser = authService.getCurrentUser();

      if (currentUser) {
        // Estrai il nome dal formato email (prendiamo la parte prima del @)
        const nameParts = currentUser.username.split('@')[0].split('.');
        const name = nameParts
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');

        // Mappa il ruolo dell'AuthService al formato utilizzato nell'interfaccia
        const roleMapping = {
          Administrator: 'admin',
          User: 'Standard',
        };

        // Carica le impostazioni utente personalizzate se esistono
        const storedUserSettings =
          JSON.parse(localStorage.getItem('user_settings')) || {};

        // Usa i dati personalizzati se disponibili, altrimenti usa i valori predefiniti
        setUser({
          name: storedUserSettings.name || name,
          email: currentUser.username,
          role: roleMapping[currentUser.roles[0]] || 'Standard',
        });
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleStorageChange = () => {
      if (isAuthenticated) {
        const storedUserSettings = JSON.parse(
          localStorage.getItem('user_settings')
        );
        const currentUser = authService.getCurrentUser();

        if (storedUserSettings && currentUser) {
          const roleMapping = {
            Administrator: 'admin',
            User: 'Standard',
          };

          setUser({
            ...user,
            name: storedUserSettings.name || user.name,
            role: roleMapping[currentUser.roles[0]] || 'Standard',
          });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navigateToSettings = () => {
    navigate('/impostazioni');
    setShowDropdown(false);
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={require('../assets/reply-logo.png')} alt='Reply Logo' />
      </LogoContainer>
      <CurrentTime>
        <Clock size={18} style={{ marginRight: '8px' }} />
        {currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })}
      </CurrentTime>
      {isAuthenticated && (
        <UserInfo>
          <UserInitials onClick={toggleDropdown}>
            {getInitials(user.name)}
          </UserInitials>
          <LogoutButton onClick={handleLogout}>
            <LogOut size={18} style={{ marginRight: '5px' }} />
            Logout
          </LogoutButton>
          {showDropdown && (
            <Dropdown>
              <DropdownItem>
                <strong>Nome:</strong> {user.name}
              </DropdownItem>
              <DropdownItem>
                <strong>Email:</strong> {user.email}
              </DropdownItem>
              <DropdownItem>
                <strong>Ruolo:</strong> {user.role}
              </DropdownItem>
              <SettingsButton onClick={navigateToSettings}>
                <Settings size={18} style={{ marginRight: '5px' }} />
                Impostazioni
              </SettingsButton>
            </Dropdown>
          )}
        </UserInfo>
      )}
    </HeaderContainer>
  );
};

export default Header;
