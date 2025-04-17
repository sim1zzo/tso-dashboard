// src/services/AlarmService.js
import { IEC61850AlarmSystem } from 'iec-61850-alarm';

export class AlarmService {
  constructor() {
    this.alarmSystem = new IEC61850AlarmSystem();
    // this.subscribers = [];
  }
  createAlarm(logicalNode, dataObject, reason) {
    return this.alarmModel.createAlarm(logicalNode, dataObject, reason);
  }

  async initialize() {
    try {
      await this.alarmSystem.connect();
      this.alarmSystem.onAlarm(this.handleNewAlarm.bind(this));
    } catch (error) {
      console.error(
        "Errore durante l'inizializzazione del sistema di allarmi:",
        error
      );
      throw new Error('Impossibile inizializzare il sistema di allarmi');
    }
  }

  handleNewAlarm(alarm) {
    this.subscribers.forEach((callback) => callback(alarm));
  }

  subscribeToAlarms(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  async acknowledgeAlarm(alarmId) {
    try {
      await this.alarmSystem.acknowledgeAlarm(alarmId);
      return { success: true, message: 'Allarme riconosciuto con successo' };
    } catch (error) {
      console.error("Errore durante il riconoscimento dell'allarme:", error);
      throw new Error("Impossibile riconoscere l'allarme");
    }
  }

  async getAlarmHistory(startDate, endDate) {
    try {
      const history = await this.alarmSystem.getAlarmHistory(
        startDate,
        endDate
      );
      return history;
    } catch (error) {
      console.error('Errore nel recupero della storia degli allarmi:', error);
      throw new Error('Impossibile recuperare la storia degli allarmi');
    }
  }
}
