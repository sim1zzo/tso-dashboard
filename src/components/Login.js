import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import styled, { keyframes } from 'styled-components';
import {
  Eye,
  EyeOff,
  Zap,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle,
  User,
  Lock,
  Key,
} from 'lucide-react';

// Animazioni
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(5deg); }
  66% { transform: translateY(5px) rotate(-3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  background: linear-gradient(
    135deg,
    #0f172a 0%,
    #1e293b 25%,
    #334155 50%,
    #475569 75%,
    #64748b 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
        circle at 25% 25%,
        rgba(59, 130, 246, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 75% 75%,
        rgba(16, 185, 129, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 50% 50%,
        rgba(245, 158, 11, 0.05) 0%,
        transparent 50%
      );
    animation: ${pulse} 8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      repeat;
    animation: ${float} 30s linear infinite;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const BrandContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandLogo = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  position: relative;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  filter: brightness(0) invert(1);
  display: block;
  margin: 0 auto;
`;

const BrandTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #ffffff, #e2e8f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
`;

const BrandSubtitle = styled.p`
  color: #94a3b8;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 500;
  text-align: center;
  max-width: 400px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #e2e8f0;
  font-size: 1.1rem;
  opacity: 0;
  transform: translateX(-20px);
  animation: ${slideIn} 0.6s ease-out forwards;
  animation-delay: ${(props) => props.delay || '0s'};
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2),
    rgba(16, 185, 129, 0.2)
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(59, 130, 246, 0.3);
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    flex: none;
    width: 100%;
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  padding: 3rem;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: ${slideUp} 0.6s ease-out forwards;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05)
    );
    border-radius: 2rem;
    z-index: -1;
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const LoginTitle = styled.h2`
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: #64748b;
  font-size: 1rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:valid {
    border-color: #10b981;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  z-index: 2;
  padding: 0.25rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }
`;

const TwoFactorContainer = styled.div`
  overflow: hidden;
  max-height: ${(props) => (props.show ? '100px' : '0')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: all 0.3s ease;
  margin-top: ${(props) => (props.show ? '0' : '-1.5rem')};
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const SuccessMessage = styled.div`
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.9rem;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
`;

const LoginFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  color: #64748b;
  font-size: 0.9rem;
`;

const DefaultCredentials = styled.div`
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: #1e40af;
`;

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  // Precompila con credenziali di default per demo (opzionale)
  useEffect(() => {
    // setUsername('si.izzo@reply.it');
    // setPassword('password');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.login(username, password, twoFactorCode);
      if (result.success) {
        setSuccess('Login effettuato con successo!');
        setTimeout(() => {
          setIsAuthenticated(true);
          navigate('/home');
        }, 1000);
      } else {
        setError(result.error || 'Credenziali non valide');
      }
    } catch (err) {
      setError('Si è verificato un errore durante il login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  return (
    <LoginContainer>
      <LeftPanel>
        <BrandContainer>
          <BrandLogo>
            <LogoImage
              src={require('../assets/reply-logo.png')}
              alt='Reply Logo'
            />
          </BrandLogo>
          <BrandTitle>TSO Dashboard</BrandTitle>
          <BrandSubtitle>
            Sistema di Gestione della Rete di Trasmissione
          </BrandSubtitle>
        </BrandContainer>

        <FeatureList>
          <FeatureItem delay='0.1s'>
            <FeatureIcon>
              <Activity size={24} color='#3b82f6' />
            </FeatureIcon>
            <div>
              <div style={{ fontWeight: '600' }}>
                Monitoraggio in Tempo Reale
              </div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                Controllo completo della rete elettrica
              </div>
            </div>
          </FeatureItem>

          <FeatureItem delay='0.2s'>
            <FeatureIcon>
              <Shield size={24} color='#10b981' />
            </FeatureIcon>
            <div>
              <div style={{ fontWeight: '600' }}>Sicurezza Avanzata</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                Protezione multi-livello e crittografia
              </div>
            </div>
          </FeatureItem>

          <FeatureItem delay='0.3s'>
            <FeatureIcon>
              <Zap size={24} color='#f59e0b' />
            </FeatureIcon>
            <div>
              <div style={{ fontWeight: '600' }}>Analisi Predittive</div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                IA per ottimizzazione e manutenzione
              </div>
            </div>
          </FeatureItem>
        </FeatureList>
      </LeftPanel>

      <RightPanel>
        <LoginCard>
          <LoginHeader>
            <LoginTitle>Accesso al Sistema</LoginTitle>
            <LoginSubtitle>
              Inserisci le tue credenziali per continuare
            </LoginSubtitle>
          </LoginHeader>

          {error && (
            <ErrorMessage>
              <AlertCircle size={20} />
              {error}
            </ErrorMessage>
          )}

          {success && (
            <SuccessMessage>
              <CheckCircle size={20} />
              {success}
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Username</InputLabel>
              <InputContainer>
                <InputIcon>
                  <User size={20} />
                </InputIcon>
                <Input
                  type='email'
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder='Inserisci il tuo username'
                  required
                />
              </InputContainer>
            </InputGroup>

            <InputGroup>
              <InputLabel>Password</InputLabel>
              <InputContainer>
                <InputIcon>
                  <Lock size={20} />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Inserisci la tua password'
                  required
                />
                <PasswordToggle
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </PasswordToggle>
              </InputContainer>
            </InputGroup>

            <TwoFactorContainer show={showTwoFactor}>
              <InputGroup>
                <InputLabel>Codice 2FA (opzionale)</InputLabel>
                <InputContainer>
                  <InputIcon>
                    <Key size={20} />
                  </InputIcon>
                  <Input
                    type='text'
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder='Inserisci il codice a 6 cifre'
                    maxLength={6}
                  />
                </InputContainer>
              </InputGroup>
            </TwoFactorContainer>

            <RememberMeContainer>
              <Checkbox
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor='rememberMe'>Ricordami</label>
              <span
                style={{
                  marginLeft: 'auto',
                  color: '#3b82f6',
                  cursor: 'pointer',
                }}
                onClick={() => setShowTwoFactor(!showTwoFactor)}
              >
                {showTwoFactor ? 'Nascondi 2FA' : 'Abilita 2FA'}
              </span>
            </RememberMeContainer>

            <LoginButton type='submit' disabled={isLoading}>
              {isLoading ? 'Accesso in corso...' : 'Accedi al Sistema'}
            </LoginButton>
          </Form>

          <LoginFooter>
            TSO Dashboard © 2025 - Sistema di controllo per operatori di rete
          </LoginFooter>
        </LoginCard>
      </RightPanel>
    </LoginContainer>
  );
};

export default Login;
