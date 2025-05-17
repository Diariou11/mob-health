
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { HealthFacility } from '@/types/facility';

// Temporary access token - in production this should come from environment variables
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHpmaTY2czAwazdmMnFwYXI2OTR2YXd2In0.1sFkY3uEfNUDtYfZH8v6cQ';

interface MapContainerProps {
  facilities: HealthFacility[];
  onFacilitySelect: (facility: HealthFacility) => void;
}

const MapContainer = ({ facilities, onFacilitySelect }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-13.6773, 9.5370], // Conakry, Guinea
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add user location control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      'top-right'
    );

    // When map loads, add markers
    map.current.on('load', () => {
      addMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    // If map is loaded, update markers
    if (map.current && map.current.loaded()) {
      // Remove existing markers
      document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());
      
      // Add new markers based on filtered facilities
      addMarkers();
    }
  }, [facilities]);

  const addMarkers = () => {
    facilities.forEach(facility => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '28px';
      el.style.height = '28px';
      el.style.backgroundImage = facility.hasEmergency 
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")` 
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230057A3' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")`;
      el.style.backgroundSize = '100%';
      
      el.addEventListener('click', () => {
        onFacilitySelect(facility);
      });
      
      if (map.current) {
        new mapboxgl.Marker(el)
          .setLngLat(facility.coordinates as mapboxgl.LngLatLike)
          .addTo(map.current);
      }
    });
  };

  const flyToFacility = (facility: HealthFacility) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: facility.coordinates as mapboxgl.LngLatLike,
      zoom: 15,
      essential: true
    });
  };

  return (
    <div ref={mapContainer} className="h-full" />
  );
};

export default MapContainer;
