import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  Navigate,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import NetworkMap from './components/NetworkMap';
import AlarmPanel from './components/AlarmPanel';
import { NetworkProvider } from './components/NetworkContext';
import MarketPanel from './components/MarketPanel';
import MaintenancePanel from './components/MaintenancePanel';
import ReportingPanel from './components/ReportingPanel';
import RawDataPanel from './components/RawDataPanel';
import { setupErrorHandling } from './utils/errorHandling';
import TransmissionPage from './components/TransmissionPage';
import AnalysisHub from './components/AnalysisHub';
import Login from './components/Login';
import Unauthorized from './components/Unauthorized';
import { AuthService } from './services/AuthService';
import SettingsPage from './components/SettingsPage';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import TrendingChart from './components/TrendingChart';
import 'antd/dist/reset.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  height: calc(100vh - 60px); /* Sottrai l'altezza dell'header */
`;

const CentralArea = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  height: 100vh; /* Altezza fissa */
  position: relative;
  display: flex;
  flex-direction: column;
`;

// const TabContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
// `;

const TabButtons = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.isActive ? '#f0f0f0' : 'transparent')};
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

// const TabContent = styled.div`
//   flex-grow: 1;
//   overflow-y: auto;
// `;

const DashboardContainer = styled.div`
  padding: 20px;
`;

const DashboardTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authService = new AuthService();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setupErrorHandling();

    const checkAuth = () => {
      const authStatus = authService.isAuthenticated();
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000);

    return () => clearInterval(interval);
  }, []);

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'map':
        return <NetworkMap />;
      case 'maintenance':
        return <MaintenancePanel />;
      case 'reporting':
        return <ReportingPanel />;
      case 'activeAlarm':
        return <AlarmPanel />;
      case 'rawData': // Nuovo caso
        return <RawDataPanel />;
      default:
        return <NetworkMap />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyles theme={theme} />
      <NetworkProvider>
        <Router>
          <AppContainer>
            <Header
              toggleTheme={toggleTheme}
              isDarkMode={theme === 'dark'}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
            <MainContent>
              {isAuthenticated && <Sidebar />}
              <CentralArea>
                <Routes>
                  <Route
                    path='/login'
                    element={
                      isAuthenticated ? (
                        <Navigate to='/home' replace />
                      ) : (
                        <Login setIsAuthenticated={setIsAuthenticated} />
                      )
                    }
                  />
                  <Route path='/unauthorized' element={<Unauthorized />} />
                  <Route
                    path='/'
                    element={
                      isAuthenticated ? (
                        <Navigate to='/home' replace />
                      ) : (
                        <Navigate to='/login' replace />
                      )
                    }
                  />
                  <Route
                    path='/home'
                    element={
                      <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/dashboard'
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        requiredRole='Operator'
                      >
                        <DashboardContainer>
                          <DashboardTitle>TSO Sense Reply</DashboardTitle>
                          <TabButtons>
                            <TabButton
                              isActive={activeTab === 'map'}
                              onClick={() => setActiveTab('map')}
                            >
                              Mappa
                            </TabButton>
                            <TabButton
                              isActive={activeTab === 'maintenance'}
                              onClick={() => setActiveTab('maintenance')}
                            >
                              Manutenzione
                            </TabButton>
                            <TabButton
                              isActive={activeTab === 'reporting'}
                              onClick={() => setActiveTab('reporting')}
                            >
                              Reporting
                            </TabButton>
                            <TabButton
                              isActive={activeTab === 'activeAlarm'}
                              onClick={() => setActiveTab('activeAlarm')}
                            >
                              Active Alarm
                            </TabButton>
                            <TabButton
                              isActive={activeTab === 'rawData'}
                              onClick={() => setActiveTab('rawData')}
                            >
                              Raw Data
                            </TabButton>
                          </TabButtons>
                          {renderDashboardContent()}
                        </DashboardContainer>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/transmission'
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        requiredRole='Operator'
                      >
                        <TransmissionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/market'
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        requiredRole='Analyst'
                      >
                        <MarketPanel />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/analisi'
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        requiredRole='Analyst'
                      >
                        <AnalysisHub />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/impostazioni'
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        requiredRole='User'
                      >
                        <SettingsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/trending/:substationId'
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        requiredRole='Operator'
                      >
                        <TrendingChart />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </CentralArea>
            </MainContent>
          </AppContainer>
        </Router>
      </NetworkProvider>
    </>
  );
}

const ProtectedRoute = ({ children, isAuthenticated, requiredRole }) => {
  const location = useLocation();
  const authService = new AuthService();

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (requiredRole && !authService.isAuthorized(requiredRole)) {
    return <Navigate to='/unauthorized' replace />;
  }

  return children;
};

export default function AppWithProviders() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  );
}
