import React, { useRef, useState, useEffect, useCallback } from 'react';
import MapInitializer from './MapInitializer';
import MapLayerManager from './MapLayerManager';
import { categoryColors } from './MapLayerManager';
import FilterPanel from './FilterPanel';
import MapControls from './MapControls';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import ThemeToggle from './ThemeToggle';
import { Info, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubstationCard from './SubstationCard';

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2ltMXp6byIsImEiOiJjbHprMWcxZzgwd2k4MnFyMWU4eW10ZWhrIn0.yql32Gzpus79-RiUSNP-Mg';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  width: 245px;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const MapContainer = styled.div`
  flex-grow: 1;
  position: relative;
  @media (max-width: 768px) {
    height: 70vh;
  }
`;

const Legend = styled.div`
  position: absolute;
  bottom: 30px;
  right: 10px;
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 250px;
  z-index: 1000;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const LegendColor = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  margin-right: 10px;
`;

const LegendButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const TrendingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }
`;

const MapLegend = () => {
  // Fallback in caso l'importazione fallisca
  const colors = categoryColors || {
    Sottostazioni: '#FF5733',
    'Linee di Trasmissione': { 380: '#FF0000', 220: '#0000FF' },
    'Nodi di Interconnessione': '#9B59B6',
    'Centrali Elettriche': {
      Termoelettrica: '#B0BF1A',
      Idroelettrica: '#3498DB',
      Geotermica: '#F1C40F',
      Eolica: '#1ABC9C',
      Solare: '#F39C12',
    },
  };

  return (
    <Legend>
      <h4>Legenda</h4>
      <LegendItem>
        <LegendColor color={colors['Sottostazioni']} />
        <span>Sottostazioni</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={colors['Linee di Trasmissione'][380]} />
        <span>Linee 380 kV</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={colors['Linee di Trasmissione'][220]} />
        <span>Linee 220 kV</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color={colors['Nodi di Interconnessione']} />
        <span>Nodi di Interconnessione</span>
      </LegendItem>
      <h5>Centrali Elettriche</h5>
      {Object.entries(colors['Centrali Elettriche']).map(([type, color]) => (
        <LegendItem key={type}>
          <LegendColor color={color} />
          <span>{type}</span>
        </LegendItem>
      ))}
    </Legend>
  );
};
const NetworkMap = () => {
  const mapContainer = useRef(null);
  const [activeMapStyle, setActiveMapStyle] = useState('streets');
  const [mapInstance, setMapInstance] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    subCategory: '',
    element: [],
  });
  const [networkModel] = useState({
    substations: [
      {
        id: 'ravenna',
        name: 'Ravenna',
        coordinates: [12.1986, 44.4175],
        voltage: '380/220 kV',
      },
      {
        id: 'perugia',
        name: 'Perugia',
        coordinates: [12.3908, 43.1107],
        voltage: '380/220 kV',
      },
      {
        id: 'pescara',
        name: 'Pescara',
        coordinates: [14.2054, 42.4617],
        voltage: '380/220 kV',
      },
      {
        id: 'laquila',
        name: "L'Aquila",
        coordinates: [13.3988, 42.3498],
        voltage: '380/220 kV',
      },
      {
        id: 'campobasso',
        name: 'Campobasso',
        coordinates: [14.6588, 41.5602],
        voltage: '380/220 kV',
      },
      {
        id: 'avellino',
        name: 'Avellino',
        coordinates: [14.7951, 40.9146],
        voltage: '380/220 kV',
      },
      {
        id: 'paestum',
        name: 'Paestum',
        coordinates: [15.0102, 40.4214],
        voltage: '380/220 kV',
      },
      {
        id: 'ancona',
        name: 'Ancona',
        coordinates: [13.5136, 43.6158],
        voltage: '380/220 kV',
      },
      {
        id: 'potenza',
        name: 'Potenza',
        coordinates: [15.8056, 40.6404],
        voltage: '380/220 kV',
      },
      {
        id: 'lecce',
        name: 'Lecce',
        coordinates: [18.1718, 40.3516],
        voltage: '380/220 kV',
      },
      {
        id: 'catanzaro',
        name: 'Catanzaro',
        coordinates: [16.5988, 38.9098],
        voltage: '380/220 kV',
      },
      {
        id: 'messina',
        name: 'Messina',
        coordinates: [15.554, 38.1938],
        voltage: '380/220 kV',
      },
      {
        id: 'catania',
        name: 'Catania',
        coordinates: [15.0878, 37.5079],
        voltage: '380/220 kV',
      },
      {
        id: 'siracusa',
        name: 'Siracusa',
        coordinates: [15.2933, 37.0755],
        voltage: '380/220 kV',
      },
      {
        id: 'trapani',
        name: 'Trapani',
        coordinates: [12.514, 38.0173],
        voltage: '380/220 kV',
      },
      {
        id: 'aosta',
        name: 'Aosta',
        coordinates: [7.3201, 45.7349],
        voltage: '220 kV',
      },
      {
        id: 'bergamo',
        name: 'Bergamo',
        coordinates: [9.6773, 45.6983],
        voltage: '220 kV',
      },
      {
        id: 'verona',
        name: 'Verona',
        coordinates: [10.9917, 45.4384],
        voltage: '220 kV',
      },
      {
        id: 'trento',
        name: 'Trento',
        coordinates: [11.1217, 46.0664],
        voltage: '220 kV',
      },
      {
        id: 'ferrara',
        name: 'Ferrara',
        coordinates: [11.6193, 44.8378],
        voltage: '220 kV',
      },
      {
        id: 'siena',
        name: 'Siena',
        coordinates: [11.3306, 43.3189],
        voltage: '220 kV',
      },
      {
        id: 'viterbo',
        name: 'Viterbo',
        coordinates: [12.1048, 42.4173],
        voltage: '220 kV',
      },
      {
        id: 'salerno',
        name: 'Salerno',
        coordinates: [14.7595, 40.6824],
        voltage: '220 kV',
      },
      {
        id: 'taranto',
        name: 'Taranto',
        coordinates: [17.2417, 40.4645],
        voltage: '220 kV',
      },
      {
        id: 'oristano',
        name: 'Oristano',
        coordinates: [8.5919, 39.9062],
        voltage: '220 kV',
      },
      {
        id: 'romaNord',
        name: 'Roma Nord',
        coordinates: [12.4964, 41.9028],
        voltage: '380/220 kV',
      },
      {
        id: 'milanoOvest',
        name: 'Milano Ovest',
        coordinates: [9.19, 45.4642],
        voltage: '380/220 kV',
      },
      {
        id: 'torinoSud',
        name: 'Torino Sud',
        coordinates: [7.6869, 45.0703],
        voltage: '380/220 kV',
      },
      {
        id: 'firenzeCasellina',
        name: 'Firenze Casellina',
        coordinates: [11.2558, 43.7696],
        voltage: '380/220 kV',
      },
      {
        id: 'bolognaOvest',
        name: 'Bologna Ovest',
        coordinates: [11.3426, 44.4949],
        voltage: '380/220 kV',
      },
      {
        id: 'veneziaFusina',
        name: 'Venezia Fusina',
        coordinates: [12.3083, 45.4064],
        voltage: '380/220 kV',
      },
      {
        id: 'napoliPatria',
        name: 'Napoli Patria',
        coordinates: [14.2681, 40.8518],
        voltage: '380/220 kV',
      },
      {
        id: 'bari',
        name: 'Bari',
        coordinates: [16.8719, 41.1171],
        voltage: '380/220 kV',
      },
      {
        id: 'palermoBellolampo',
        name: 'Palermo Bellolampo',
        coordinates: [13.3615, 38.1157],
        voltage: '220 kV',
      },
      {
        id: 'cagliariRumianca',
        name: 'Cagliari Rumianca',
        coordinates: [9.1217, 39.2238],
        voltage: '380/220 kV',
      },
      {
        id: 'Olbia',
        name: 'Olbia',
        coordinates: [9.4889, 40.9231],
        voltage: '380/220 kV',
      },
      {
        id: 'genova',
        name: 'Genova',
        coordinates: [8.9463, 44.4056],
        voltage: '380/220 kV',
      },
      {
        id: 'laSpezia',
        name: 'La Spezia',
        coordinates: [9.824, 44.1024],
        voltage: '380/220 kV',
      },
      {
        id: 'padova',
        name: 'Padova',
        coordinates: [11.8768, 45.4064],
        voltage: '380/220 kV',
      },
      {
        id: 'udine',
        name: 'Udine Ovest',
        coordinates: [13.2306, 46.064],
        voltage: '380/220 kV',
      },
      {
        id: 'foggia',
        name: 'Foggia',
        coordinates: [15.5444, 41.4621],
        voltage: '380/220 kV',
      },
      {
        id: 'rondissone',
        name: 'Rondissone',
        coordinates: [7.8581, 45.2328],
        voltage: '380/220 kV',
      },
      {
        id: 'piacenza',
        name: 'Piacenza',
        coordinates: [9.693, 45.0526],
        voltage: '380/220 kV',
      },
      {
        id: 'parma',
        name: 'Parma',
        coordinates: [10.3279, 44.8015],
        voltage: '380/220 kV',
      },
      {
        id: 'dolo',
        name: 'Dolo',
        coordinates: [12.0823, 45.4279],
        voltage: '380/220 kV',
      },
      {
        id: 'colunga',
        name: 'Colunga',
        coordinates: [11.4048, 44.54],
        voltage: '380/220 kV',
      },
      {
        id: 'villavalle',
        name: 'Villavalle',
        coordinates: [12.7351, 42.5614],
        voltage: '380/220 kV',
      },
      {
        id: 'rossano',
        name: 'Rossano',
        coordinates: [16.6337, 39.5748],
        voltage: '380/220 kV',
      },
      {
        id: 'sorgente',
        name: 'Sorgente',
        coordinates: [15.5453, 38.1938],
        voltage: '380/220 kV',
      },
      {
        id: 'rizziconi',
        name: 'Rizziconi',
        coordinates: [15.9637, 38.4115],
        voltage: '380/220 kV',
      },
    ],
    lines: [
      {
        id: 'bolognaOvest-ravenna-380kV',
        name: 'Bologna-Ravenna',
        from: 'bolognaOvest',
        to: 'ravenna',
        voltage: 380,
        coordinates: [
          [11.3426, 44.4949],
          [12.1986, 44.4175],
        ],
      },
      {
        id: 'ravenna-perugia-380kV',
        name: 'Ravenna-Perugia',
        from: 'ravenna',
        to: 'perugia',
        voltage: 380,
        coordinates: [
          [12.1986, 44.4175],
          [12.3908, 43.1107],
        ],
      },
      {
        id: 'perugia-pescara-380kV',
        name: 'Perugia-Pescara',
        from: 'perugia',
        to: 'pescara',
        voltage: 380,
        coordinates: [
          [12.3908, 43.1107],
          [14.2054, 42.4617],
        ],
      },
      {
        id: 'perugia-laquila-380kV',
        name: "Perugia-L'Aquila",
        from: 'perugia',
        to: 'laquila',
        voltage: 380,
        coordinates: [
          [12.3908, 43.1107],
          [13.3988, 42.3498],
        ],
      },
      {
        id: 'laquila-campobasso-380kV',
        name: "L'Aquila-Campobasso",
        from: 'laquila',
        to: 'campobasso',
        voltage: 380,
        coordinates: [
          [13.3988, 42.3498],
          [14.6588, 41.5602],
        ],
      },
      {
        id: 'roma-olbia-380kV',
        name: 'Roma-Olbia',
        from: 'romaNord',
        to: 'olbia',
        voltage: 380,
        coordinates: [
          [12.4964, 41.9028], // Coordinate di Roma Nord
          [9.4889, 40.9231], // Coordinate di Olbia
        ],
      },
      {
        id: 'campobasso-avellino-380kV',
        name: 'Campobasso-Avellino',
        from: 'campobasso',
        to: 'avellino',
        voltage: 380,
        coordinates: [
          [14.6588, 41.5602],
          [14.7951, 40.9146],
        ],
      },
      {
        id: 'avellino-paestum-380kV',
        name: 'Avellino-Paestum',
        from: 'avellino',
        to: 'paestum',
        voltage: 380,
        coordinates: [
          [14.7951, 40.9146],
          [15.0102, 40.4214],
        ],
      },
      {
        id: 'ravenna-ancona-380kV',
        name: 'Ravenna-Ancona',
        from: 'ravenna',
        to: 'ancona',
        voltage: 380,
        coordinates: [
          [12.1986, 44.4175],
          [13.5136, 43.6158],
        ],
      },
      {
        id: 'ancona-foggia-380kV',
        name: 'Ancona-Foggia',
        from: 'ancona',
        to: 'foggia',
        voltage: 380,
        coordinates: [
          [13.5136, 43.6158],
          [15.5444, 41.4621],
        ],
      },
      {
        id: 'foggia-potenza-380kV',
        name: 'Foggia-Potenza',
        from: 'foggia',
        to: 'potenza',
        voltage: 380,
        coordinates: [
          [15.5444, 41.4621],
          [15.8056, 40.6404],
        ],
      },
      {
        id: 'torino-aosta-220kV',
        name: 'Torino-Aosta',
        from: 'torinoSud',
        to: 'aosta',
        voltage: 220,
        coordinates: [
          [7.6869, 45.0703],
          [7.3201, 45.7349],
        ],
      },
      {
        id: 'milano-bergamo-220kV',
        name: 'Milano-Bergamo',
        from: 'milanoOvest',
        to: 'bergamo',
        voltage: 220,
        coordinates: [
          [9.19, 45.4642],
          [9.6773, 45.6983],
        ],
      },
      {
        id: 'verona-trento-220kV',
        name: 'Verona-Trento',
        from: 'verona',
        to: 'trento',
        voltage: 220,
        coordinates: [
          [10.9917, 45.4384],
          [11.1217, 46.0664],
        ],
      },
      {
        id: 'bologna-ferrara-220kV',
        name: 'Bologna-Ferrara',
        from: 'bolognaOvest',
        to: 'ferrara',
        voltage: 220,
        coordinates: [
          [11.3426, 44.4949],
          [11.6193, 44.8378],
        ],
      },
      {
        id: 'firenze-siena-220kV',
        name: 'Firenze-Siena',
        from: 'firenzeCasellina',
        to: 'siena',
        voltage: 220,
        coordinates: [
          [11.2558, 43.7696],
          [11.3306, 43.3189],
        ],
      },
      {
        id: 'roma-viterbo-220kV',
        name: 'Roma-Viterbo',
        from: 'romaNord',
        to: 'viterbo',
        voltage: 220,
        coordinates: [
          [12.4964, 41.9028],
          [12.1048, 42.4173],
        ],
      },
      {
        id: 'napoli-salerno-220kV',
        name: 'Napoli-Salerno',
        from: 'napoliPatria',
        to: 'salerno',
        voltage: 220,
        coordinates: [
          [14.2681, 40.8518],
          [14.7595, 40.6824],
        ],
      },
      {
        id: 'bari-taranto-220kV',
        name: 'Bari-Taranto',
        from: 'bari',
        to: 'taranto',
        voltage: 220,
        coordinates: [
          [16.8719, 41.1171],
          [17.2417, 40.4645],
        ],
      },
      {
        id: 'catania-messina-220kV',
        name: 'Catania-Messina',
        from: 'catania',
        to: 'messina',
        voltage: 220,
        coordinates: [
          [15.0878, 37.5079],
          [15.554, 38.1938],
        ],
      },
      {
        id: 'cagliari-oristano-220kV',
        name: 'Cagliari-Oristano',
        from: 'cagliariRumianca',
        to: 'oristano',
        voltage: 220,
        coordinates: [
          [9.1217, 39.2238],
          [8.5919, 39.9062],
        ],
      },
      {
        id: 'potenza-lecce-380kV',
        name: 'Potenza-Lecce',
        from: 'potenza',
        to: 'lecce',
        voltage: 380,
        coordinates: [
          [15.8056, 40.6404],
          [18.1718, 40.3516],
        ],
      },
      {
        id: 'potenza-catanzaro-380kV',
        name: 'Potenza-Catanzaro',
        from: 'potenza',
        to: 'catanzaro',
        voltage: 380,
        coordinates: [
          [15.8056, 40.6404],
          [16.5988, 38.9098],
        ],
      },
      {
        id: 'messina-catania-380kV',
        name: 'Messina-Catania',
        from: 'messina',
        to: 'catania',
        voltage: 380,
        coordinates: [
          [15.554, 38.1938],
          [15.0878, 37.5079],
        ],
      },
      {
        id: 'catania-siracusa-380kV',
        name: 'Catania-Siracusa',
        from: 'catania',
        to: 'siracusa',
        voltage: 380,
        coordinates: [
          [15.0878, 37.5079],
          [15.2933, 37.0755],
        ],
      },
      {
        id: 'siracusa-trapani-380kV',
        name: 'Siracusa-Trapani',
        from: 'siracusa',
        to: 'trapani',
        voltage: 380,
        coordinates: [
          [15.2933, 37.0755],
          [12.514, 38.0173],
        ],
      },
      {
        id: 'trapani-palermo-380kV',
        name: 'Trapani-Palermo',
        from: 'trapani',
        to: 'palermoBellolampo',
        voltage: 380,
        coordinates: [
          [12.514, 38.0173],
          [13.3615, 38.1157],
        ],
      },
      {
        id: 'milanoOvest-firenzeCasellina-380kV',
        name: 'Milano Ovest-Firenze',
        from: 'milanoOvest',
        to: 'firenzeCasellina',
        voltage: 380,
        coordinates: [
          [9.19, 45.4642],
          [11.2558, 43.7696],
        ],
      },
      {
        id: 'genova-pisa-220kV',
        name: 'Genova-Pisa',
        from: 'genova',
        to: 'pisa',
        voltage: 220,
        coordinates: [
          [8.9463, 44.4056],
          [10.4018, 43.7228],
        ],
      },
      {
        id: 'pisa-firenzeCasellina-220kV',
        name: 'Pisa-Firenze',
        from: 'pisa',
        to: 'firenzeCasellina',
        voltage: 220,
        coordinates: [
          [10.4018, 43.7228],
          [11.2558, 43.7696],
        ],
      },
      {
        id: 'milanoOvest-genova-220kV',
        name: 'Milano Ovest-Genova',
        from: 'milanoOvest',
        to: 'genova',
        voltage: 220,
        coordinates: [
          [9.19, 45.4642],
          [8.9463, 44.4056],
        ],
      },
      {
        id: 'torinoSud-genova-220kV',
        name: 'Torino Sud-Genova',
        from: 'torinoSud',
        to: 'genova',
        voltage: 220,
        coordinates: [
          [7.6869, 45.0703],
          [8.9463, 44.4056],
        ],
      },

      {
        id: 'milanoOvest-torinoSud-380kV',
        name: 'Milano Ovest-Torino Sud',
        from: 'milanoOvest',
        to: 'torinoSud',
        voltage: 380,
        coordinates: [
          [9.19, 45.4642],
          [7.6869, 45.0703],
        ],
      },
      {
        id: 'milanoOvest-piacenza-380kV',
        name: 'Milano Ovest-Piacenza',
        from: 'milanoOvest',
        to: 'piacenza',
        voltage: 380,
        coordinates: [
          [9.19, 45.4642],
          [9.693, 45.0526],
        ],
      },
      {
        id: 'torinoSud-rondissone-380kV',
        name: 'Torino Sud-Rondissone',
        from: 'torinoSud',
        to: 'rondissone',
        voltage: 380,
        coordinates: [
          [7.6869, 45.0703],
          [7.8581, 45.2328],
        ],
      },
      {
        id: 'rondissone-genova-380kV',
        name: 'Rondissone-Genova',
        from: 'rondissone',
        to: 'genova',
        voltage: 380,
        coordinates: [
          [7.8581, 45.2328],
          [8.9463, 44.4056],
        ],
      },
      {
        id: 'genova-laSpezia-380kV',
        name: 'Genova-La Spezia',
        from: 'genova',
        to: 'laSpezia',
        voltage: 380,
        coordinates: [
          [8.9463, 44.4056],
          [9.824, 44.1024],
        ],
      },
      {
        id: 'laSpezia-firenzeCasellina-380kV',
        name: 'La Spezia-Firenze Casellina',
        from: 'laSpezia',
        to: 'firenzeCasellina',
        voltage: 380,
        coordinates: [
          [9.824, 44.1024],
          [11.2558, 43.7696],
        ],
      },
      {
        id: 'firenzeCasellina-romaNord-380kV',
        name: 'Firenze Casellina-Roma Nord',
        from: 'firenzeCasellina',
        to: 'romaNord',
        voltage: 380,
        coordinates: [
          [11.2558, 43.7696],
          [12.4964, 41.9028],
        ],
      },
      {
        id: 'romaNord-napoliPatria-380kV',
        name: 'Roma Nord-Napoli Patria',
        from: 'romaNord',
        to: 'napoliPatria',
        voltage: 380,
        coordinates: [
          [12.4964, 41.9028],
          [14.2681, 40.8518],
        ],
      },
      {
        id: 'napoliPatria-foggia-380kV',
        name: 'Napoli Patria-Foggia',
        from: 'napoliPatria',
        to: 'foggia',
        voltage: 380,
        coordinates: [
          [14.2681, 40.8518],
          [15.5444, 41.4621],
        ],
      },
      {
        id: 'foggia-bari-380kV',
        name: 'Foggia-Bari',
        from: 'foggia',
        to: 'bari',
        voltage: 380,
        coordinates: [
          [15.5444, 41.4621],
          [16.8719, 41.1171],
        ],
      },
      {
        id: 'bari-rossano-380kV',
        name: 'Bari-Rossano',
        from: 'bari',
        to: 'rossano',
        voltage: 380,
        coordinates: [
          [16.8719, 41.1171],
          [16.6337, 39.5748],
        ],
      },
      {
        id: 'rossano-rizziconi-380kV',
        name: 'Rossano-Rizziconi',
        from: 'rossano',
        to: 'rizziconi',
        voltage: 380,
        coordinates: [
          [16.6337, 39.5748],
          [15.9637, 38.4115],
        ],
      },
      {
        id: 'rizziconi-sorgente-380kV',
        name: 'Rizziconi-Sorgente',
        from: 'rizziconi',
        to: 'sorgente',
        voltage: 380,
        coordinates: [
          [15.9637, 38.4115],
          [15.5453, 38.1938],
        ],
      },
      {
        id: 'milanoOvest-veneziaFusina-380kV',
        name: 'Milano Ovest-Venezia Fusina',
        from: 'milanoOvest',
        to: 'veneziaFusina',
        voltage: 380,
        coordinates: [
          [9.19, 45.4642],
          [12.3083, 45.4064],
        ],
      },
      {
        id: 'veneziaFusina-padova-380kV',
        name: 'Venezia Fusina-Padova',
        from: 'veneziaFusina',
        to: 'padova',
        voltage: 380,
        coordinates: [
          [12.3083, 45.4064],
          [11.8768, 45.4064],
        ],
      },
      {
        id: 'padova-udine-380kV',
        name: 'Padova-Udine Ovest',
        from: 'padova',
        to: 'udine',
        voltage: 380,
        coordinates: [
          [11.8768, 45.4064],
          [13.2306, 46.064],
        ],
      },
      {
        id: 'bolognaOvest-dolo-380kV',
        name: 'Bologna Ovest-Dolo',
        from: 'bolognaOvest',
        to: 'dolo',
        voltage: 380,
        coordinates: [
          [11.3426, 44.4949],
          [12.0823, 45.4279],
        ],
      },
      {
        id: 'bolognaOvest-colunga-380kV',
        name: 'Bologna Ovest-Colunga',
        from: 'bolognaOvest',
        to: 'colunga',
        voltage: 380,
        coordinates: [
          [11.3426, 44.4949],
          [11.4048, 44.54],
        ],
      },
      {
        id: 'romaNord-firenzeCasellina-220kV',
        name: 'Roma Nord-Firenze Casellina',
        from: 'romaNord',
        to: 'firenzeCasellina',
        voltage: 220,
        coordinates: [
          [12.4964, 41.9028],
          [11.2558, 43.7696],
        ],
      },
      {
        id: 'napoliPatria-romaNord-220kV',
        name: 'Napoli Patria-Roma Nord',
        from: 'napoliPatria',
        to: 'romaNord',
        voltage: 220,
        coordinates: [
          [14.2681, 40.8518],
          [12.4964, 41.9028],
        ],
      },
      {
        id: 'palermoBellolampo-cagliariRumianca-220kV',
        name: 'Palermo Bellolampo-Cagliari Rumianca',
        from: 'palermoBellolampo',
        to: 'cagliariRumianca',
        voltage: 380,
        coordinates: [
          [13.3615, 38.1157],
          [9.1217, 39.2238],
        ],
      },
      {
        id: 'rossano-bari-220kV',
        name: 'Rossano-Bari',
        from: 'rossano',
        to: 'bari',
        voltage: 220,
        coordinates: [
          [16.6337, 39.5748],
          [16.8719, 41.1171],
        ],
      },
      {
        id: 'sorgente-rizziconi-220kV',
        name: 'Sorgente-Rizziconi',
        from: 'sorgente',
        to: 'rizziconi',
        voltage: 220,
        coordinates: [
          [15.5453, 38.1938],
          [15.9637, 38.4115],
        ],
      },
    ],
    generatingUnits: [
      {
        id: 'civitavecchia',
        name: 'Civitavecchia',
        type: 'Termoelettrica',
        capacity: 1980,
        coordinates: [11.7992, 42.0944],
      },
      {
        id: 'entracque',
        name: 'Entracque',
        type: 'Idroelettrica',
        capacity: 1065,
        coordinates: [7.4336, 44.1995],
      },
      {
        id: 'larderello',
        name: 'Larderello',
        type: 'Geotermica',
        capacity: 769,
        coordinates: [10.8715, 43.259],
      },
      {
        id: 'troia',
        name: 'Troia',
        type: 'Eolica',
        capacity: 30,
        coordinates: [15.3269, 41.4374],
      },
      {
        id: 'montalto',
        name: 'Montalto di Castro',
        type: 'Solare',
        capacity: 45,
        coordinates: [11.6065, 42.325],
      },
      {
        id: 'brindisiSud',
        name: 'Brindisi Sud',
        type: 'Termoelettrica',
        capacity: 2640,
        coordinates: [18.0167, 40.6524],
      },
      {
        id: 'laSpezia',
        name: 'La Spezia',
        type: 'Termoelettrica',
        capacity: 1280,
        coordinates: [9.824, 44.1024],
      },
      {
        id: 'presenzano',
        name: 'Presenzano',
        type: 'Idroelettrica',
        capacity: 1000,
        coordinates: [14.1465, 41.3703],
      },
    ],
    interconnectionNodes: [
      { id: 'venaus', name: 'Venaus', coordinates: [6.9556, 45.1839] },
      { id: 'gorlago', name: 'Gorlago', coordinates: [9.7653, 45.6839] },
      {
        id: 'redipuglia',
        name: 'Redipuglia',
        coordinates: [13.4833, 45.8433],
      },
      {
        id: 'villaTirano',
        name: 'Villa di Tirano',
        coordinates: [10.1667, 46.2],
      },
      { id: 'pinciana', name: 'Pinciana', coordinates: [14.33, 47.33] },
    ],
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [selectedSubstation, setSelectedSubstation] = useState(null);
  const fallbackColors = {
    Sottostazioni: '#FF5733',
    'Linee di Trasmissione': { 380: '#FF0000', 220: '#0000FF' },
    'Nodi di Interconnessione': '#9B59B6',
    'Centrali Elettriche': {
      Termoelettrica: '#E74C3C',
      Idroelettrica: '#3498DB',
      Geotermica: '#F1C40F',
      Eolica: '#1ABC9C',
      Solare: '#F39C12',
    },
  };

  const colors = categoryColors || fallbackColors;

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    handleStyleChange(newMode ? 'dark' : 'streets');
  };

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleStyleChange = (newStyle) => {
    const styles = {
      streets: 'mapbox://styles/mapbox/streets-v11',
      satellite: 'mapbox://styles/mapbox/satellite-v9',
      topographic: 'mapbox://styles/mapbox/outdoors-v11',
      dark: 'mapbox://styles/mapbox/dark-v10',
    };

    if (mapInstance && styles[newStyle]) {
      mapInstance.setStyle(styles[newStyle]);
      setActiveMapStyle(newStyle);
    }
  };

  const handleElementSelect = useCallback(
    (element) => {
      if (!mapInstance || !element.coordinates) {
        console.error(
          'Mappa non inizializzata o coordinate mancanti:',
          element
        );
        return;
      }
  
      if (
        element.type === 'line' &&
        Array.isArray(element.coordinates) &&
        element.coordinates.length >= 2
      ) {
        // Gestione delle linee di trasmissione
        const bounds = new mapboxgl.LngLatBounds();
        element.coordinates.forEach((coord) => bounds.extend(coord));
        mapInstance.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 1000,
        });
        setSelectedSubstation(null); // Rimuove la card della sottostazione se era visualizzata
        localStorage.removeItem('selectedSubstationId'); // Rimuove l'ID della sottostazione da localStorage
      } else if (
        Array.isArray(element.coordinates) &&
        element.coordinates.length === 2
      ) {
        // Gestione di sottostazioni e altri elementi puntuali
        mapInstance.flyTo({
          center: element.coordinates,
          zoom: 14, // Zoom configurabile
          essential: true,
          duration: 1000,
        });
        if (element.type === 'substation') {
          setSelectedSubstation(element);
          // Salva l'ID della sottostazione in localStorage
          localStorage.setItem('selectedSubstationId', element.id || element.name);
        } else {
          setSelectedSubstation(null);
          localStorage.removeItem('selectedSubstationId');
        }
      } else {
        console.error('Formato coordinate non valido:', element.coordinates);
        return;
      }
  
      setSelectedElement(element);
    },
    [mapInstance]
  );

  const resetMap = useCallback(() => {
    if (mapInstance) {
      mapInstance.flyTo({
        center: [12.4964, 41.9028], // Coordinate centrali dell'Italia
        zoom: 4.5, // Zoom out per mostrare tutta l'Italia
        essential: true,
      });
    }

    setFilters({
      category: 'All',
      subCategory: '',
      elements: [],
    });

    setSelectedElement(null);
    setSelectedSubstation(null); // Aggiungi questa riga per rimuovere la sottostazione selezionata
  }, [mapInstance]);

  useEffect(() => {
    if (!mapInstance) return;

    const handleClick = (e) => {
      if (e.features.length > 0) {
        const feature = e.features[0];
        handleElementSelect(feature.properties);
      }
    };

    // Funzione per rimuovere il tooltip
    const removeTooltip = () => {
      if (tooltipRef.current) {
        tooltipRef.current.remove();
      }
    };

    // Aggiungi gli event listener per ogni layer
    [
      'substations-layer',
      'transmission-lines-layer',
      'interconnection-nodes-layer',
      'power-plants-layer',
    ].forEach((layerId) => {
      mapInstance.on('click', layerId, handleClick);
      mapInstance.on('mouseleave', layerId, removeTooltip);
    });

    // Cleanup function
    return () => {
      if (mapInstance) {
        [
          'substations-layer',
          'transmission-lines-layer',
          'interconnection-nodes-layer',
          'power-plants-layer',
        ].forEach((layerId) => {
          mapInstance.off('click', layerId, handleClick);
          mapInstance.off('mouseleave', layerId, removeTooltip);
        });
      }
    };
  }, [mapInstance, handleElementSelect]);

  return (
    <div className='network-map-container'>
      <DashboardContainer>
        <LeftPanel>
          <FilterPanel
            networkModel={networkModel}
            onFilterChange={handleFilterChange}
            onElementSelect={handleElementSelect}
            onResetMap={resetMap}
            selectedCategory={filters.category}
            selectedSubCategory={filters.subCategory}
          />
          <MapControls
            activeMapStyle={activeMapStyle}
            setActiveMapStyle={handleStyleChange}
          />
        </LeftPanel>
        <MapContainer ref={mapContainer}>
          <MapInitializer
            mapContainer={mapContainer}
            setMapInstance={setMapInstance}
            initialStyle={activeMapStyle}
          />
          {mapInstance && networkModel && (
            <MapLayerManager
              mapInstance={mapInstance}
              networkModel={networkModel}
              filters={filters}
              selectedElement={selectedElement}
            />
          )}
          <ThemeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <LegendButton onClick={() => setShowLegend(!showLegend)}>
            <Info size={24} />
          </LegendButton>
          {showLegend && <MapLegend />}
        </MapContainer>
      </DashboardContainer>
      {selectedSubstation && (
        <SubstationCard
          substation={selectedSubstation}
          onClose={() => setSelectedSubstation(null)}
        />
      )}
    </div>
  );
};

export default NetworkMap;
