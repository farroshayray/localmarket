import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

interface MapComponentProps {
  lat: number;
  lng: number;
}

interface MarkerComponentProps {
  lat: number;
  lng: number;
}

const MarkerComponent: React.FC<MarkerComponentProps> = () => (
  <div style={{ transform: 'translate(-50%, -50%)' }}>
    <img
      src="/images/driver_pinloc.png" // Path ke gambar
      alt="Person on a Motorcycle"
      style={{ width: '40px', height: '40px' }} // Sesuaikan ukuran gambar
    />
  </div>
);

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
  const [mapCenter, setMapCenter] = useState({ lat, lng });

  useEffect(() => {
    // Update center when lat or lng changes
    setMapCenter({ lat, lng });
  }, [lat, lng]);

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '' }}
        center={mapCenter} // Dynamically updated center
        defaultZoom={20}
      >
        <MarkerComponent lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
