import React, { useEffect } from 'react';

const FilterManager = ({ mapInstance, filters, networkModel, setFilteredElements }) => {
  useEffect(() => {
    if (!mapInstance || !networkModel) return;

    const applyFilters = () => {
      let filtered = [];
      if (filters.assetType === 'substations') filtered = networkModel.substations || [];
      else if (filters.assetType === 'transmission-lines') filtered = networkModel.lines || [];
      else if (filters.assetType === 'interconnection-nodes') filtered = networkModel.interconnectionNodes || [];
      else if (filters.assetType === 'power-plants') filtered = networkModel.powerPlants || [];
      else {
        filtered = [
          ...(networkModel.substations || []),
          ...(networkModel.lines || []),
          ...(networkModel.interconnectionNodes || []),
          ...(networkModel.powerPlants || []),
        ];
      }

      filtered = filtered.filter(element => {
        if (!element) return false;
        if (filters.voltageLevel && element.voltage !== filters.voltageLevel) return false;
        if (filters.marketZone && element.marketZone !== filters.marketZone) return false;
        if (filters.region && element.region !== filters.region) return false;
        if (filters.operationalStatus && element.operationalStatus !== filters.operationalStatus) return false;
        return true;
      });

      setFilteredElements(filtered);

      // Aggiorna i filtri sulla mappa
      ['substations', 'transmission-lines', 'interconnection-nodes', 'power-plants'].forEach(layer => {
        if (mapInstance.getLayer(layer)) {
          mapInstance.setFilter(layer, ['in', 'id', ...filtered.map(e => e.id).filter(id => id)]);
        }
      });
    };

    applyFilters();

  }, [mapInstance, filters, networkModel, setFilteredElements]);

  return null;
};

export default FilterManager;