import React, { useState } from 'react';
import styled from 'styled-components';

const SettingGroup = styled.div`
  margin-bottom: 20px;
`;

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const SettingInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const SystemSettings = ({ onHelpClick }) => {
  const [maintenance, setMaintenance] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState('daily');

  const handleSave = () => {
    // Implementa la logica di salvataggio
    console.log('Impostazioni di sistema salvate:', { maintenance, backupFrequency });
  };

  return (
    <div>
      <h2>Impostazioni di Sistema</h2>
      <SettingGroup>
        <SettingLabel>
          <input
            type="checkbox"
            checked={maintenance}
            onChange={(e) => setMaintenance(e.target.checked)}
          />
          Modalità manutenzione
        </SettingLabel>
      </SettingGroup>
      <SettingGroup>
        <SettingLabel>Frequenza di backup</SettingLabel>
        <select value={backupFrequency} onChange={(e) => setBackupFrequency(e.target.value)}>
          <option value="daily">Giornaliera</option>
          <option value="weekly">Settimanale</option>
          <option value="monthly">Mensile</option>
        </select>
      </SettingGroup>
      <SaveButton onClick={handleSave}>Salva</SaveButton>
      <button onClick={() => onHelpClick('Aiuto per le impostazioni di sistema')}>?</button>
    </div>
  );
};

export default SystemSettings;