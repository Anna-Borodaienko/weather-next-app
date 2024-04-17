'use client';

import 'leaflet/dist/leaflet.css';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import { useGlobalContext } from '@/app/context/GlobalContext';
import { Weather } from '@/app/types/Weather';

function FlyToActiveCity({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo([lat, lon], zoomLev, flyToOptions);
    }
  }, [lat, lon, map]);

  return null;
}

export const Map: React.FC = (): JSX.Element => {
  const { weather }: { weather: Weather } = useGlobalContext();

  const { lat, lon } = weather;

  if (!weather || !lat || !lon) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div className='flex-1 basis-[50%] border rounded-lg'>
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={false}
        className='rounded-lg m-4'
        style={{ height: 'calc(100% - 2rem)', width: 'calc(100% - 2rem)' }}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity
          lat={lat}
          lon={lon}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
