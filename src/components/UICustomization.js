import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CustomizationContainer = styled.div`
  padding: 20px;
`;

const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const Widget = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;

const UICustomization = () => {
  const [widgets, setWidgets] = useState([]);
  const [availableWidgets, setAvailableWidgets] = useState([]);

  useEffect(() => {
    // Simulazione del caricamento dei widget disponibili
    setAvailableWidgets([
      { id: 1, name: 'Stato della Rete' },
      { id: 2, name: 'Allarmi Attivi' },
      { id: 3, name: 'Previsioni Meteo' },
      { id: 4, name: 'Produzione Rinnovabile' },
    ]);

    // Carica la configurazione salvata dell'utente
    const savedConfig = localStorage.getItem('userDashboardConfig');
    if (savedConfig) {
      setWidgets(JSON.parse(savedConfig));
    }
  }, []);

  const addWidget = (widget) => {
    setWidgets([...widgets, widget]);
  };

  const removeWidget = (widgetId) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const saveConfiguration = () => {
    localStorage.setItem('userDashboardConfig', JSON.stringify(widgets));
    alert('Configurazione salvata con successo!');
  };

  return (
    <CustomizationContainer>
      <h2>Personalizzazione Dashboard</h2>
      <h3>Widget Disponibili:</h3>
      <div>
        {availableWidgets.map(widget => (
          <button key={widget.id} onClick={() => addWidget(widget)}>
            Aggiungi {widget.name}
          </button>
        ))}
      </div>
      <h3>La Tua Dashboard:</h3>
      <WidgetGrid>
        {widgets.map(widget => (
          <Widget key={widget.id}>
            <h4>{widget.name}</h4>
            <button onClick={() => removeWidget(widget.id)}>Rimuovi</button>
          </Widget>
        ))}
      </WidgetGrid>
      <button onClick={saveConfiguration}>Salva Configurazione</button>
    </CustomizationContainer>
  );
};

export default UICustomization;