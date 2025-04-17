import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  AnimatedSun,
  AnimatedCloud,
  AnimatedRain,
  AnimatedWind,
  AnimatedSnow,
} from './AnimatedWeatherIcons';
import { Thermometer, Wind, Sun } from 'lucide-react';
import styled from 'styled-components';

// Funzione di utilità per generare dati casuali (puoi spostarla in un file separato se lo desideri)
const generateRandomData = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    time: `${i}:00`,
    load: Math.floor(Math.random() * 1000) + 500,
    renewable: Math.floor(Math.random() * 500),
  }));
};

const WeatherIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 5px;
`;

const ForecastPanel = () => {
  const [demandForecast, setDemandForecast] = useState(generateRandomData(24));
  const [renewableForecast, setRenewableForecast] = useState(
    generateRandomData(24)
  );
  const [weatherForecast, setWeatherForecast] = useState([
    {
      time: '00:00',
      temperature: 18,
      windSpeed: 10,
      solarRadiation: 0,
      precipitation: 0,
    },
    {
      time: '06:00',
      temperature: 20,
      windSpeed: 15,
      solarRadiation: 200,
      precipitation: 0,
    },
    {
      time: '12:00',
      temperature: 25,
      windSpeed: 12,
      solarRadiation: 800,
      precipitation: 0,
    },
    {
      time: '18:00',
      temperature: 22,
      windSpeed: 8,
      solarRadiation: 300,
      precipitation: 5,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDemandForecast(generateRandomData(24));
      setRenewableForecast(generateRandomData(24));
      setWeatherForecast((prev) =>
        prev.map((item) => ({
          ...item,
          temperature: item.temperature + (Math.random() - 0.5) * 2,
          windSpeed: Math.max(0, item.windSpeed + (Math.random() - 0.5) * 5),
          solarRadiation: Math.max(
            0,
            item.solarRadiation + (Math.random() - 0.5) * 100
          ),
          precipitation: Math.max(
            0,
            item.precipitation + (Math.random() - 0.5) * 2
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (time, temperature, windSpeed, precipitation) => {
    const hour = parseInt(time.split(':')[0]);
    if (precipitation > 0) {
      return temperature > 0 ? <AnimatedRain /> : <AnimatedSnow />;
    }
    if (windSpeed > 20) {
      return <AnimatedWind />;
    }
    if (hour >= 6 && hour < 18) {
      return temperature > 20 ? <AnimatedSun /> : <AnimatedCloud />;
    }
    return <AnimatedCloud />;
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='bg-blue-600 text-white p-4'>
          <h2 className='text-xl font-semibold'>Previsione della Domanda</h2>
        </div>
        <div className='p-4'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={demandForecast}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='time' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='load'
                stroke='#8884d8'
                name='Domanda Prevista (MW)'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='bg-green-600 text-white p-4'>
          <h2 className='text-xl font-semibold'>Previsione Rinnovabili</h2>
        </div>
        <div className='p-4'>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={renewableForecast}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='time' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='renewable'
                stroke='#82ca9d'
                name='Produzione Rinnovabile (MW)'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='bg-white shadow-lg rounded-lg overflow-hidden col-span-2'>
        <div className='bg-yellow-600 text-white p-4'>
          <h2 className='text-xl font-semibold'>Previsioni Meteo</h2>
        </div>
        <div className='p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {weatherForecast.map((item, index) => (
              <div
                key={index}
                className='bg-gray-100 p-4 rounded-lg text-center'
              >
                <p className='font-bold text-lg mb-2'>{item.time}</p>
                <WeatherIconWrapper>
                  {getWeatherIcon(
                    item.time,
                    item.temperature,
                    item.windSpeed,
                    item.precipitation
                  )}
                </WeatherIconWrapper>
                <InfoRow>
                  <Thermometer size={18} />
                  <span>{item.temperature.toFixed(1)}°C</span>
                </InfoRow>
                <InfoRow>
                  <Wind size={18} />
                  <span>{item.windSpeed.toFixed(1)} km/h</span>
                </InfoRow>
                <InfoRow>
                  <Sun size={18} />
                  <span>{item.solarRadiation.toFixed(1)} W/m²</span>
                </InfoRow>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastPanel;
