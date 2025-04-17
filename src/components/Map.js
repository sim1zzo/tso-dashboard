import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([41.9028, 12.4964], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        mapRef.current
      );
    }
  }, []);

  return <div id='map' style={{ height: '600px' }}></div>;
}

export default Map;
