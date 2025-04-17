import axios from 'axios';

export class RawDataService {
  async getRawData(filters) {
    try {
      const response = await axios.get('/api/raw-data', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching raw data:', error);
      throw error;
    }
  }

  async downloadRawData(format) {
    try {
      const response = await axios.get(`/api/raw-data/download?format=${format}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `raw_data.${format}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading raw data:', error);
      throw error;
    }
  }
}