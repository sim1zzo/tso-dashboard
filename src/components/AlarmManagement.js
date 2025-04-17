// src/components/AlarmManagement.js
import React, { useState, useEffect } from 'react';
import { AlarmService } from '../services/AlarmService';
import styled from 'styled-components';

const AlarmContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const AlarmList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const AlarmItem = styled.li`
  background-color: ${(props) =>
    props.priority === 'high'
      ? '#ffcccb'
      : props.priority === 'medium'
      ? '#ffffcc'
      : '#e6ffed'};
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AcknowledgeButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const AlarmManagement = () => {
  const [alarms, setAlarms] = useState([]);
  const [error, setError] = useState(null);
  const alarmService = new AlarmService();

  useEffect(() => {
    const initializeAlarmService = async () => {
      try {
        await alarmService.initialize();
        const unsubscribe = alarmService.subscribeToAlarms(handleNewAlarm);
        return () => unsubscribe();
      } catch (error) {
        setError("Errore nell'inizializzazione del servizio allarmi");
      }
    };

    initializeAlarmService();
  }, []);

  const handleNewAlarm = (alarm) => {
    setAlarms((prevAlarms) => [...prevAlarms, alarm]);
  };

  const acknowledgeAlarm = async (alarmId) => {
    try {
      await alarmService.acknowledgeAlarm(alarmId);
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) =>
          alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
        )
      );
    } catch (error) {
      setError("Errore nel riconoscimento dell'allarme");
    }
  };

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <AlarmContainer>
      <h2>Gestione Allarmi</h2>
      <AlarmList>
        {alarms.map((alarm) => (
          <AlarmItem key={alarm.id} priority={alarm.priority}>
            <div>
              <strong>{alarm.description}</strong>
              <p>Priorità: {alarm.priority}</p>
              <p>Orario: {new Date(alarm.timestamp).toLocaleString()}</p>
            </div>
            {!alarm.acknowledged && (
              <AcknowledgeButton onClick={() => acknowledgeAlarm(alarm.id)}>
                Riconosci
              </AcknowledgeButton>
            )}
          </AlarmItem>
        ))}
      </AlarmList>
    </AlarmContainer>
  );
};

export default AlarmManagement;
