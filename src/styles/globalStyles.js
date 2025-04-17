import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: ${props => props.theme === 'light' ? '#007bff' : '#4da6ff'};
    --background-color: ${props => props.theme === 'light' ? '#ffffff' : '#333333'};
    --text-color: ${props => props.theme === 'light' ? '#333333' : '#ffffff'};
    --border-color: ${props => props.theme === 'light' ? '#dee2e6' : '#555555'};
    --input-background-color: ${props => props.theme === 'light' ? '#ffffff' : '#4d4d4d'};
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: all 0.3s ease;
  }

  // Aggiungi altri stili globali qui
`;