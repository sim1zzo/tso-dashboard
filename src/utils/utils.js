export const getUnit = (key) => {
  switch (key) {
    case 'voltage': return 'kV';
    case 'frequency': return 'Hz';
    case 'activePower': return 'MW';
    case 'reactivePower': return 'MVAR';
    case 'powerFactor': return '';
    case 'transformerLoad': return '%';
    case 'transformerTemperature': return '°C';
    default: return '';
  }
};

export const getMin = (key) => {
  switch (key) {
    case 'voltage': return 350;
    case 'frequency': return 49.8;
    case 'activePower': return 0;
    case 'reactivePower': return -250;
    case 'powerFactor': return 0.8;
    case 'transformerLoad': return 0;
    case 'transformerTemperature': return 20;
    default: return 0;
  }
};

export const getMax = (key) => {
  switch (key) {
    case 'voltage': return 400;
    case 'frequency': return 50.2;
    case 'activePower': return 1000;
    case 'reactivePower': return 250;
    case 'powerFactor': return 1;
    case 'transformerLoad': return 100;
    case 'transformerTemperature': return 80;
    default: return 100;
  }
};