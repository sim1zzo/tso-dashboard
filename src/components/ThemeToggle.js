import React from 'react';
import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
`;

const ThemeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <ToggleButton onClick={toggleDarkMode}>
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </ToggleButton>
  );
};

export default ThemeToggle;
