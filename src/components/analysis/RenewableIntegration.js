import React, { useState, useEffect } from 'react';
import { Sun, Wind, TrendingUp, Zap, BarChart2, Cloud, Droplet } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RenewableIntegration = () => {
  const [forecastData, setForecastData] = useState(null);
  const [renewablePercentage, setRenewablePercentage] = useState(0);
  const [carbonSavings, setCarbonSavings] = useState(0);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const generateForecast = () => {
    const hours = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    const solarData = hours.map(hour => {
      const hourNum = parseInt(hour);
      if (hourNum >= 6 && hourNum <= 18) {
        return Math.floor(Math.random() * 300) + 100;
      }
      return 0;
    });
    const windData = hours.map(() => Math.floor(Math.random() * 200) + 100);
    const hydroData = hours.map(() => Math.floor(Math.random() * 150) + 50);
    const demandData = hours.map(() => Math.floor(Math.random() * 200) + 300);

    const data = {
      labels: hours,
      datasets: [
        {
          label: 'Produzione Solare',
          data: solarData,
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.5)',
          fill: true,
        },
        {
          label: 'Produzione Eolica',
          data: windData,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          fill: true,
        },
        {
          label: 'Produzione Idroelettrica',
          data: hydroData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          fill: true,
        },
        {
          label: 'Domanda Prevista',
          data: demandData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: false,
        }
      ]
    };
    setForecastData(data);

    // Calcola la percentuale di rinnovabili
    const totalRenewable = solarData.reduce((a, b) => a + b, 0) + windData.reduce((a, b) => a + b, 0) + hydroData.reduce((a, b) => a + b, 0);
    const totalDemand = demandData.reduce((a, b) => a + b, 0);
    const percentage = (totalRenewable / totalDemand) * 100;
    setRenewablePercentage(percentage.toFixed(2));

    // Calcola il risparmio di CO2 (esempio semplificato)
    const carbonSaved = totalRenewable * 0.5; // 0.5 kg CO2 risparmiati per kWh di rinnovabile
    setCarbonSavings(carbonSaved.toFixed(2));
  };

  useEffect(() => {
    generateForecast();
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>
        <Zap style={{marginRight: '10px'}} /> Ottimizzazione dell'Integrazione delle Rinnovabili
      </h2>
      
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <div style={{...cardStyle, flex: 1, marginRight: '10px'}}>
          <h3 style={{fontSize: '18px', marginBottom: '10px'}}>Percentuale Rinnovabili</h3>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#4CAF50'}}>{renewablePercentage}%</div>
        </div>
        <div style={{...cardStyle, flex: 1, marginLeft: '10px'}}>
          <h3 style={{fontSize: '18px', marginBottom: '10px'}}>Risparmio CO2</h3>
          <div style={{fontSize: '24px', fontWeight: 'bold', color: '#2196F3'}}>{carbonSavings} kg</div>
        </div>
      </div>

      <div style={cardStyle}>
        <button onClick={generateForecast} style={buttonStyle}>
          <BarChart2 size={18} style={{marginRight: '5px'}} /> Aggiorna Previsione
        </button>
        {forecastData && (
          <div style={{ marginTop: '20px', height: '400px' }}>
            <Line 
              data={forecastData} 
              options={{ 
                maintainAspectRatio: false,
                responsive: true,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                scales: {
                  y: {
                    stacked: true,
                    title: {
                      display: true,
                      text: 'Potenza (MW)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Ora del giorno'
                    }
                  }
                },
                plugins: {
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  },
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Previsione Produzione Rinnovabile e Domanda'
                  }
                }
              }} 
            />
          </div>
        )}
      </div>

      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>
          <TrendingUp size={24} style={{marginRight: '10px', verticalAlign: 'middle'}} />
          Strategie di Ottimizzazione
        </h3>
        <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
          <li style={{marginBottom: '10px'}}>
            <Wind size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Previsioni meteo avanzate per migliorare l'accuratezza delle stime di produzione eolica e solare
          </li>
          <li style={{marginBottom: '10px'}}>
            <Sun size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Ottimizzazione del dispacciamento in tempo reale basata su algoritmi di machine learning
          </li>
          <li style={{marginBottom: '10px'}}>
            <Cloud size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Integrazione di sistemi di accumulo per gestire la variabilità della produzione rinnovabile
          </li>
          <li style={{marginBottom: '10px'}}>
            <Droplet size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Coordinamento con impianti idroelettrici per bilanciare la produzione intermittente
          </li>
          <li style={{marginBottom: '10px'}}>
            <Zap size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Implementazione di programmi di demand response per allineare il consumo con la produzione rinnovabile
          </li>
        </ul>
      </div>

      <div style={cardStyle}>
        <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '15px'}}>Informazioni sul Sistema</h3>
        <ul style={{listStyleType: 'none', paddingLeft: '0'}}>
          <li style={{marginBottom: '10px'}}>
            <BarChart2 size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Utilizzo di modelli di machine learning per previsioni più accurate della produzione rinnovabile
          </li>
          <li style={{marginBottom: '10px'}}>
            <TrendingUp size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Analisi in tempo reale dei dati per ottimizzare continuamente l'integrazione delle rinnovabili
          </li>
          <li style={{marginBottom: '10px'}}>
            <Zap size={18} style={{marginRight: '10px', verticalAlign: 'middle'}} />
            Monitoraggio costante della stabilità della rete e adattamento dinamico delle strategie di integrazione
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RenewableIntegration;