import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Sostituire con l'URL reale dell'API

export const fetchSubstationData = async (substationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/substations/${substationId}`);
    return response.data;
  } catch (error) {
    console.error('Errore nel recupero dei dati della sottostazione:', error);
    throw error;
  }
};