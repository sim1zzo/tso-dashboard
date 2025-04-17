import React, { useEffect } from 'react';

const MapEffects = ({ mapInstance, isStyleLoaded, isDarkMode, activeFilter }) => {
  useEffect(() => {
    if (!mapInstance || !isStyleLoaded) return;

    mapInstance.setStyle(
      isDarkMode ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10'
    );

    mapInstance.once('style.load', () => {
      // Riapplica i layer dopo il cambio di stile
      // Qui dovresti richiamare le funzioni per aggiungere i layer
    });
  }, [mapInstance, isStyleLoaded, isDarkMode]);

  useEffect(() => {
    if (!mapInstance || !isStyleLoaded || !activeFilter) return;

    const applyFilters = () => {
      const filters = [];
      if (activeFilter.voltage) filters.push(['==', ['get', 'voltage'], activeFilter.voltage]);
      if (activeFilter.assetType) filters.push(['==', ['get', 'type'], activeFilter.assetType]);
      if (activeFilter.marketZone) filters.push(['==', ['get', 'marketZone'], activeFilter.marketZone]);
      if (activeFilter.region) filters.push(['==', ['get', 'region'], activeFilter.region]);
      if (activeFilter.operationalStatus) filters.push(['==', ['get', 'operationalStatus'], activeFilter.operationalStatus]);

      ['power-plants', 'transmission-lines'].forEach(layer => {
        if (mapInstance.getLayer(layer)) {
          mapInstance.setFilter(layer, filters.length > 0 ? ['all', ...filters] : null);
        }
      });
    };

    applyFilters();

  }, [mapInstance, isStyleLoaded, activeFilter]);

  return null;
};

export default MapEffects;