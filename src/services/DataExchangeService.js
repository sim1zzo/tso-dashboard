// src/services/DataExchangeService.js
import { IEC61850Client, IEC60870Client, IEC62325Client, ENTSOEClient } from 'iec-protocols';

export class DataExchangeService {
  constructor() {
    this.iec61850Client = new IEC61850Client();
    this.iec60870Client = new IEC60870Client();
    this.iec62325Client = new IEC62325Client();
    this.entsoeClient = new ENTSOEClient();
  }

  async fetchSubstationData() {
    return this.iec61850Client.fetchData();
  }

  async sendRealtimeData(data) {
    return this.iec60870Client.sendData(data);
  }

  async fetchMarketData() {
    return this.iec62325Client.fetchData();
  }

  async sendSchedule(schedule) {
    return this.entsoeClient.sendSchedule(schedule);
  }
}