// src/components/MapLayerManager.js

import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export const categoryColors = {
  Sottostazioni: '#FF5733', // Arancione
  'Linee di Trasmissione': {
    380: '#FF0000', // Rosso per 380 kV
    220: '#0000FF', // Blu per 220 kV
  },
  'Nodi di Interconnessione': '#9B59B6', // Viola
  'Centrali Elettriche': {
    Termoelettrica: '#B0BF1A', // Acid Green
    Idroelettrica: '#3498DB', // Blu
    Geotermica: '#F1C40F', // Giallo
    Eolica: '#1ABC9C', // Verde acqua
    Solare: '#F39C12', // Arancione scuro
  },
};

const MapLayerManager = ({
  mapInstance,
  networkModel,
  filters = {},
  selectedElement,
}) => {


  const powerPlantColors = {
    Termoelettrica: '#b5d334',
    Idroelettrica: '#3498db',
    Geotermica: '#f1c40f',
    Eolica: '#1abc9c',
    Solare: '#f39c12',
  };

  const removeExistingLayers = () => {
    const layerIds = [
      'substations-layer',
      'transmission-lines-layer',
      'interconnection-nodes-layer',
      'power-plants-layer',
    ];

    layerIds.forEach((layerId) => {
      if (mapInstance.getLayer(layerId)) {
        mapInstance.removeLayer(layerId);
      }
      if (mapInstance.getSource(layerId + '-source')) {
        mapInstance.removeSource(layerId + '-source');
      }
    });
  };
  const getColorByCategory = (properties) => {
    if (!properties) return '#999999';

    switch (properties.type) {
      case 'substation':
        return categoryColors['Sottostazioni'];
      case 'line':
        return (
          categoryColors['Linee di Trasmissione'][properties.voltage] ||
          '#999999'
        );
      case 'interconnection':
        return categoryColors['Nodi di Interconnessione'];
      case 'powerPlant':
        return (
          categoryColors['Centrali Elettriche'][properties.type] || '#999999'
        );
      default:
        return '#999999';
    }
  };

  const createFeature = (item, type) => {
    const color =
      type === 'powerPlant'
        ? categoryColors['Centrali Elettriche'][item.type]
        : getColorByCategory({ ...item, type });
    console.log(
      `Creating feature for ${item.name}, type: ${item.type}, color: ${color}`
    );
    return {
      type: 'Feature',
      geometry: {
        type: type === 'line' ? 'LineString' : 'Point',
        coordinates: item.coordinates,
      },
      properties: {
        ...item,
        type,
        color: color,
      },
    };
  };

  const addLayer = (id, type, data, customPaint = {}) => {
    if (data.length > 0) {
      const sourceId = id + '-source';
      if (mapInstance.getSource(sourceId)) {
        mapInstance.removeSource(sourceId);
      }
      mapInstance.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: data,
        },
      });

      const defaultPaint =
        type === 'circle'
          ? {
              'circle-radius': 6,
              'circle-color': ['get', 'color'],
            }
          : {
              'line-color': ['get', 'color'],
              'line-width': 2,
            };

      mapInstance.addLayer({
        id: id,
        type: type,
        source: sourceId,
        paint: { ...defaultPaint, ...customPaint },
      });
    }
  };

  useEffect(() => {
    if (!mapInstance || !networkModel) return;

    const createLayers = () => {
      removeExistingLayers();

      const shouldShowAll = filters.category === 'All';

      if (shouldShowAll || filters.category === 'Sottostazioni') {
        addLayer(
          'substations-layer',
          'circle',
          networkModel.substations.map((s) => createFeature(s, 'substation'))
        );
      }

      if (shouldShowAll || filters.category === 'Linee di Trasmissione') {
        let filteredLines = networkModel.lines;
        if (
          filters.subCategory === '380 kV' ||
          filters.subCategory === '220 kV'
        ) {
          const voltage = parseInt(filters.subCategory);
          filteredLines = networkModel.lines.filter(
            (line) => line.voltage === voltage
          );
        }
        addLayer(
          'transmission-lines-layer',
          'line',
          filteredLines.map((l) => createFeature(l, 'line'))
        );
      }

      if (shouldShowAll || filters.category === 'Nodi di Interconnessione') {
        addLayer(
          'interconnection-nodes-layer',
          'circle',
          networkModel.interconnectionNodes.map((n) =>
            createFeature(n, 'interconnection')
          )
        );
      }

      if (shouldShowAll || filters.category === 'Centrali Elettriche') {
        const powerPlantFeatures = networkModel.generatingUnits
          .filter((p) => {
            if (filters.subCategory && filters.subCategory !== 'All') {
              return p.type === filters.subCategory;
            }
            return true;
          })
          .map((p) => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: p.coordinates },
            properties: { ...p, type: 'powerPlant', plantType: p.type },
          }));

        if (mapInstance.getLayer('power-plants-layer')) {
          mapInstance.removeLayer('power-plants-layer');
        }
        if (mapInstance.getSource('power-plants-source')) {
          mapInstance.removeSource('power-plants-source');
        }

        mapInstance.addSource('power-plants-source', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: powerPlantFeatures,
          },
        });

        mapInstance.addLayer({
          id: 'power-plants-layer',
          type: 'circle',
          source: 'power-plants-source',
          paint: {
            'circle-radius': 6,
            'circle-color': [
              'match',
              ['get', 'plantType'],
              'Termoelettrica',
              powerPlantColors['Termoelettrica'],
              'Idroelettrica',
              powerPlantColors['Idroelettrica'],
              'Geotermica',
              powerPlantColors['Geotermica'],
              'Eolica',
              powerPlantColors['Eolica'],
              'Solare',
              powerPlantColors['Solare'],
              '#2ECC71', // colore di default
            ],
          },
        });

        console.log('Power plant features:', powerPlantFeatures);
      }
    };

    if (mapInstance.isStyleLoaded()) {
      createLayers();
    } else {
      mapInstance.once('style.load', createLayers);
    }
  }, [mapInstance, networkModel, filters]);

  useEffect(() => {
    if (!mapInstance || !selectedElement) return;

    // Rimuovi il layer e la source precedenti se esistono
    if (mapInstance.getLayer('selected-element-layer')) {
      mapInstance.removeLayer('selected-element-layer');
    }
    if (mapInstance.getSource('selected-element-source')) {
      mapInstance.removeSource('selected-element-source');
    }

    let coordinates;
    let zoom = 14;

    if (selectedElement.type === 'line') {
      coordinates = selectedElement.coordinates;
      const bounds = new mapboxgl.LngLatBounds(
        coordinates[0],
        coordinates[coordinates.length - 1]
      );
      mapInstance.fitBounds(bounds, { padding: 100 });
    } else if (Array.isArray(selectedElement.coordinates)) {
      coordinates = selectedElement.coordinates;
      mapInstance.flyTo({
        center: coordinates,
        zoom: zoom,
        essential: true,
      });
    } else if (
      selectedElement.type === 'substation' ||
      selectedElement.type === 'powerPlant' ||
      selectedElement.type === 'interconnection'
    ) {
      const element = networkModel[
        selectedElement.type === 'substation'
          ? 'substations'
          : selectedElement.type === 'powerPlant'
          ? 'generatingUnits'
          : 'interconnectionNodes'
      ].find((s) => s.id === selectedElement.id);
      if (element) {
        coordinates = element.coordinates;
        mapInstance.flyTo({
          center: coordinates,
          zoom: zoom,
          essential: true,
        });
      }
    }

    // Aggiungi un nuovo layer per evidenziare l'elemento selezionato
    if (coordinates) {
      mapInstance.addSource('selected-element-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: selectedElement.type === 'line' ? 'LineString' : 'Point',
            coordinates: coordinates,
          },
          properties: selectedElement,
        },
      });

      mapInstance.addLayer({
        id: 'selected-element-layer',
        type: selectedElement.type === 'line' ? 'line' : 'circle',
        source: 'selected-element-source',
        paint:
          selectedElement.type === 'line'
            ? {
                'line-color': '#FFFF00',
                'line-width': 4,
              }
            : {
                'circle-color': '#FFFF00',
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
              },
      });
    }
  }, [mapInstance, selectedElement, networkModel]);

  return null;
};

export default MapLayerManager;
