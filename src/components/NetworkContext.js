// NetworkContext.js
import React, { createContext, useState, useContext } from 'react';

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [networkModel] = useState({
    substations: [
      // Nord
      { id: 'sub-1', name: 'Milano Ovest', lat: 45.4642, lng: 9.1900, type: 'substation', region: 'Nord' },
      { id: 'sub-2', name: 'Torino Sud', lat: 45.0703, lng: 7.6869, type: 'substation', region: 'Nord' },
      { id: 'sub-3', name: 'Bologna Ovest', lat: 44.4949, lng: 11.3426, type: 'substation', region: 'Nord' },
      { id: 'sub-4', name: 'Venezia Fusina', lat: 45.4064, lng: 12.3083, type: 'substation', region: 'Nord' },
      { id: 'sub-5', name: 'Genova', lat: 44.4056, lng: 8.9463, type: 'substation', region: 'Nord' },
      { id: 'sub-6', name: 'La Spezia', lat: 44.1024, lng: 9.8240, type: 'substation', region: 'Nord' },
      { id: 'sub-7', name: 'Padova', lat: 45.4064, lng: 11.8768, type: 'substation', region: 'Nord' },
      { id: 'sub-8', name: 'Udine Ovest', lat: 46.0640, lng: 13.2306, type: 'substation', region: 'Nord' },
      { id: 'sub-9', name: 'Rondissone', lat: 45.2328, lng: 7.8581, type: 'substation', region: 'Nord' },
      { id: 'sub-10', name: 'Piacenza', lat: 45.0526, lng: 9.6930, type: 'substation', region: 'Nord' },
      { id: 'sub-11', name: 'Parma', lat: 44.8015, lng: 10.3279, type: 'substation', region: 'Nord' },
      { id: 'sub-12', name: 'Dolo', lat: 45.4279, lng: 12.0823, type: 'substation', region: 'Nord' },
      { id: 'sub-13', name: 'Colunga', lat: 44.5400, lng: 11.4048, type: 'substation', region: 'Nord' },
      // Centro
      { id: 'sub-14', name: 'Roma Nord', lat: 41.9028, lng: 12.4964, type: 'substation', region: 'Centro' },
      { id: 'sub-15', name: 'Firenze Casellina', lat: 43.7696, lng: 11.2558, type: 'substation', region: 'Centro' },
      { id: 'sub-16', name: 'Villavalle', lat: 42.5614, lng: 12.7351, type: 'substation', region: 'Centro' },
      // Sud
      { id: 'sub-17', name: 'Napoli Patria', lat: 40.8518, lng: 14.2681, type: 'substation', region: 'Sud' },
      { id: 'sub-18', name: 'Bari', lat: 41.1171, lng: 16.8719, type: 'substation', region: 'Sud' },
      { id: 'sub-19', name: 'Foggia', lat: 41.4621, lng: 15.5444, type: 'substation', region: 'Sud' },
      { id: 'sub-20', name: 'Rossano', lat: 39.5748, lng: 16.6337, type: 'substation', region: 'Sud' },
      { id: 'sub-21', name: 'Rizziconi', lat: 38.4115, lng: 15.9637, type: 'substation', region: 'Sud' },
      // Isole
      { id: 'sub-22', name: 'Palermo Bellolampo', lat: 38.1157, lng: 13.3615, type: 'substation', region: 'Isole' },
      { id: 'sub-23', name: 'Cagliari Rumianca', lat: 39.2238, lng: 9.1217, type: 'substation', region: 'Isole' },
      { id: 'sub-24', name: 'Sorgente', lat: 38.1938, lng: 15.5453, type: 'substation', region: 'Isole' },
    ],
    lines: [
      // 380 kV
      { id: 'line-1', name: 'Milano Ovest-Torino Sud', voltage: 380, from: 'sub-1', to: 'sub-2', type: 'transmission' },
      { id: 'line-2', name: 'Milano Ovest-Piacenza', voltage: 380, from: 'sub-1', to: 'sub-10', type: 'transmission' },
      { id: 'line-3', name: 'Torino Sud-Rondissone', voltage: 380, from: 'sub-2', to: 'sub-9', type: 'transmission' },
      { id: 'line-4', name: 'Rondissone-Genova', voltage: 380, from: 'sub-9', to: 'sub-5', type: 'transmission' },
      { id: 'line-5', name: 'Genova-La Spezia', voltage: 380, from: 'sub-5', to: 'sub-6', type: 'transmission' },
      { id: 'line-6', name: 'La Spezia-Firenze Casellina', voltage: 380, from: 'sub-6', to: 'sub-15', type: 'transmission' },
      { id: 'line-7', name: 'Firenze Casellina-Roma Nord', voltage: 380, from: 'sub-15', to: 'sub-14', type: 'transmission' },
      { id: 'line-8', name: 'Roma Nord-Napoli Patria', voltage: 380, from: 'sub-14', to: 'sub-17', type: 'transmission' },
      { id: 'line-9', name: 'Napoli Patria-Foggia', voltage: 380, from: 'sub-17', to: 'sub-19', type: 'transmission' },
      { id: 'line-10', name: 'Foggia-Bari', voltage: 380, from: 'sub-19', to: 'sub-18', type: 'transmission' },
      { id: 'line-11', name: 'Bari-Rossano', voltage: 380, from: 'sub-18', to: 'sub-20', type: 'transmission' },
      { id: 'line-12', name: 'Rossano-Rizziconi', voltage: 380, from: 'sub-20', to: 'sub-21', type: 'transmission' },
      { id: 'line-13', name: 'Rizziconi-Sorgente', voltage: 380, from: 'sub-21', to: 'sub-24', type: 'transmission' },
      { id: 'line-14', name: 'Milano Ovest-Venezia Fusina', voltage: 380, from: 'sub-1', to: 'sub-4', type: 'transmission' },
      { id: 'line-15', name: 'Venezia Fusina-Padova', voltage: 380, from: 'sub-4', to: 'sub-7', type: 'transmission' },
      { id: 'line-16', name: 'Padova-Udine Ovest', voltage: 380, from: 'sub-7', to: 'sub-8', type: 'transmission' },
      { id: 'line-17', name: 'Bologna Ovest-Firenze Casellina', voltage: 380, from: 'sub-3', to: 'sub-15', type: 'transmission' },
      { id: 'line-18', name: 'Bologna Ovest-Parma', voltage: 380, from: 'sub-3', to: 'sub-11', type: 'transmission' },
      { id: 'line-19', name: 'Parma-Piacenza', voltage: 380, from: 'sub-11', to: 'sub-10', type: 'transmission' },
      { id: 'line-20', name: 'Bologna Ovest-Colunga', voltage: 380, from: 'sub-3', to: 'sub-13', type: 'transmission' },
      { id: 'line-21', name: 'Colunga-Villavalle', voltage: 380, from: 'sub-13', to: 'sub-16', type: 'transmission' },
      { id: 'line-22', name: 'Villavalle-Roma Nord', voltage: 380, from: 'sub-16', to: 'sub-14', type: 'transmission' },
      // 220 kV
      { id: 'line-23', name: 'Milano Ovest-Genova', voltage: 220, from: 'sub-1', to: 'sub-5', type: 'transmission' },
      { id: 'line-24', name: 'Torino Sud-Genova', voltage: 220, from: 'sub-2', to: 'sub-5', type: 'transmission' },
      { id: 'line-25', name: 'Firenze Casellina-Bologna Ovest', voltage: 220, from: 'sub-15', to: 'sub-3', type: 'transmission' },
      { id: 'line-26', name: 'Roma Nord-Napoli Patria', voltage: 220, from: 'sub-14', to: 'sub-17', type: 'transmission' },
      { id: 'line-27', name: 'Napoli Patria-Foggia', voltage: 220, from: 'sub-17', to: 'sub-19', type: 'transmission' },
      { id: 'line-28', name: 'Foggia-Bari', voltage: 220, from: 'sub-19', to: 'sub-18', type: 'transmission' },
      { id: 'line-29', name: 'Palermo Bellolampo-Sorgente', voltage: 220, from: 'sub-22', to: 'sub-24', type: 'transmission' },
      { id: 'line-30', name: 'Cagliari Rumianca-Sorgente', voltage: 220, from: 'sub-23', to: 'sub-24', type: 'transmission' },
      { id: 'line-31', name: 'Venezia Fusina-Padova', voltage: 220, from: 'sub-4', to: 'sub-7', type: 'transmission' },
      { id: 'line-32', name: 'Padova-Udine Ovest', voltage: 220, from: 'sub-7', to: 'sub-8', type: 'transmission' },
      { id: 'line-33', name: 'Dolo-Venezia Fusina', voltage: 220, from: 'sub-12', to: 'sub-4', type: 'transmission' },
      { id: 'line-34', name: 'Colunga-Bologna Ovest', voltage: 220, from: 'sub-13', to: 'sub-3', type: 'transmission' },
    ],
    interconnectionNodes: [
      { id: 'int-1', name: 'Venaus', lat: 45.1839, lng: 6.9556, type: 'interconnection', country: 'Francia' },
      { id: 'int-2', name: 'Gorlago', lat: 45.6839, lng: 9.7653, type: 'interconnection', country: 'Svizzera' },
      { id: 'int-3', name: 'Villa di Tirano', lat: 46.2000, lng: 10.1667, type: 'interconnection', country: 'Svizzera' },
      { id: 'int-4', name: 'Pinciana', lat: 41.9100, lng: 12.4900, type: 'interconnection', country: 'Austria' },
      { id: 'int-5', name: 'Redipuglia', lat: 45.8433, lng: 13.4833, type: 'interconnection', country: 'Slovenia' },
    ],
    powerPlants: [
      { id: 'pp-1', name: 'Civitavecchia', lat: 42.0944, lng: 11.7992, type: 'powerPlant', plantType: 'Termoelettrica' },
      { id: 'pp-2', name: 'Montalto di Castro', lat: 42.3500, lng: 11.6000, type: 'powerPlant', plantType: 'Termoelettrica' },
      { id: 'pp-3', name: 'Brindisi Sud', lat: 40.6500, lng: 18.0167, type: 'powerPlant', plantType: 'Termoelettrica' },
      { id: 'pp-4', name: 'La Spezia', lat: 44.1024, lng: 9.8240, type: 'powerPlant', plantType: 'Termoelettrica' },
      { id: 'pp-5', name: 'Entracque', lat: 44.2500, lng: 7.3833, type: 'powerPlant', plantType: 'Idroelettrica' },
      { id: 'pp-6', name: 'Presenzano', lat: 41.4000, lng: 14.0833, type: 'powerPlant', plantType: 'Idroelettrica' },
      { id: 'pp-7', name: 'Larderello', lat: 43.2500, lng: 10.8667, type: 'powerPlant', plantType: 'Geotermica' },
      { id: 'pp-8', name: 'Troia', lat: 41.3611, lng: 15.3056, type: 'powerPlant', plantType: 'Eolica' },
    ],
  });
  return (
    <NetworkContext.Provider value={{ networkModel }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);

export default NetworkContext;