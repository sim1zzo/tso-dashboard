import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2ltMXp6byIsImEiOiJjbHprMWcxZzgwd2k4MnFyMWU4eW10ZWhrIn0.yql32Gzpus79-RiUSNP-Mg';

const MapInitializer = ({
  mapContainer,
  setMapInstance,
  setIsStyleLoaded,
  isDarkMode,
}) => {

  const [lng] = useState(12.4964);
  const [lat] = useState(41.9028);
  const [zoom] = useState(5);

  useEffect(() => {
    if (!mapContainer.current) return;

    // In MapInitializer.js
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false, // Aggiunge questa linea
    });

    map.on('load', () => {
      setMapInstance(map);
    });

    map.on('style.load', () => {
      setIsStyleLoaded(true);
    });

    return () => map.remove();
  }, [mapContainer, setMapInstance, setIsStyleLoaded, isDarkMode]);

  return null;
};

export default MapInitializer;
