import React, { useState } from 'react';

function ControlPanel() {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [action, setAction] = useState('');

  const handleControl = () => {
    console.log(`Eseguendo ${action} su ${selectedDevice}`);
    // Qui andrà la logica per inviare il comando al backend
  };

  return (
    <div className='control-panel'>
      <h2>Pannello di Controllo</h2>
      <select
        value={selectedDevice}
        onChange={(e) => setSelectedDevice(e.target.value)}
      >
        <option value=''>Seleziona dispositivo</option>
        <option value='breaker1'>Interruttore Roma Nord</option>
        <option value='transformer1'>Trasformatore Milano Ovest</option>
      </select>
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value=''>Seleziona azione</option>
        <option value='open'>Apri</option>
        <option value='close'>Chiudi</option>
        <option value='adjust'>Regola</option>
      </select>
      <button onClick={handleControl} disabled={!selectedDevice || !action}>
        Esegui Azione
      </button>
    </div>
  );
}

export default ControlPanel;
