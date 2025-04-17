import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggleButton = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center justify-center p-2 rounded-full ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-md hover:shadow-lg transition-all duration-300`}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ThemeToggleButton;