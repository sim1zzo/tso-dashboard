import React, { useEffect, useState } from 'react';
import { Source, Layer } from 'react-map-gl';

const WeatherLayer = ({ mapInstance }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Simulazione del recupero dei dati meteo
    const fetchWeatherData = async () => {
      // In una implementazione reale, qui si farebbe una chiamata API
      const mockData = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [12.4964, 41.9028]
            },
            properties: {
              temperature: 25,
              windSpeed: 10
            }
          },
          // Aggiungi altri punti meteo qui
        ]
      };
      setWeatherData(mockData);
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) return null;

  return (
    <Source id="weather-data" type="geojson" data={weatherData}>
      <Layer
        id="weather-points"
        type="circle"
        paint={{
          'circle-radius': 10,
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'temperature'],
            0, '#0000FF',
            15, '#00FF00',
            30, '#FF0000'
          ]
        }}
      />
    </Source>
  );
};

export default WeatherLayer;