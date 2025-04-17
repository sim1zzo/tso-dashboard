import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(400deg, hsl(200, 54%, 44%) 0%, hsl(200, 54%, 34%) 100%);
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #4a5568;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
  }
`;

const Button = styled.button`
  background-color: #4299e1;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  text-align: center;
  margin-top: 1rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.login(username, password, twoFactorCode);
      if (result.success) {
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              placeholder="Two-Factor Code (if enabled)"
            />
          </InputGroup>
          <Button type="submit">Login</Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;