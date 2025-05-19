
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { HealthFacility } from '@/types/facility';

// Set map token - in production this should be an environment variable
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHpmaTY2czAwazdmMnFwYXI2OTR2YXd2In0.1sFkY3uEfNUDtYfZH8v6cQ';

interface MapContainerProps {
  facilities: HealthFacility[];
  onFacilitySelect: (facility: HealthFacility) => void;
}

const MapContainer = ({ facilities, onFacilitySelect }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-13.6773, 9.5370], // Conakry, Guinea
      zoom: 5 // Start with a wider view to see more facilities
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
      // Make sure we call addMarkers after load
      addMarkers();
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    // If map is loaded, update markers whenever facilities change
    if (map.current && map.current.loaded()) {
      // Clear existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      
      // Add new markers based on filtered facilities
      addMarkers();
    }
  }, [facilities]);

  const addMarkers = () => {
    if (!map.current) return;
    
    // If no facilities, center map on Conakry
    if (facilities.length === 0) {
      map.current.flyTo({
        center: [-13.6773, 9.5370], // Conakry, Guinea
        zoom: 5
      });
      return;
    }

    // Create bounds object to fit all markers
    const bounds = new mapboxgl.LngLatBounds();

    facilities.forEach(facility => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '32px'; // Bigger marker
      el.style.height = '32px';
      el.style.backgroundImage = facility.hasEmergency 
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")` 
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230057A3' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")`;
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';
      
      // Add click handler
      el.addEventListener('click', () => {
        console.log('Facility clicked:', facility.name);
        onFacilitySelect(facility);
      });
      
      // Add popup on hover
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(
        `<div>
          <strong>${facility.name}</strong><br>
          ${facility.type}<br>
          ${facility.address}
        </div>`
      );
      
      // Create and store marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat(facility.coordinates as mapboxgl.LngLatLike)
        .setPopup(popup)
        .addTo(map.current!);
        
      markers.current.push(marker);
      
      // Add marker position to bounds
      bounds.extend(facility.coordinates as mapboxgl.LngLatLike);
      
      // Add hover events for popup
      el.addEventListener('mouseenter', () => marker.togglePopup());
      el.addEventListener('mouseleave', () => marker.togglePopup());
    });
    
    // If we have facilities, fit the map to show all markers
    if (facilities.length > 0) {
      map.current.fitBounds(bounds, {
        padding: 70, // Add more padding to ensure all markers are visible
        maxZoom: 12  // Limit how much we can zoom in
      });
    }
  };

  return (
    <div ref={mapContainer} className="h-full w-full" />
  );
};

export default MapContainer;
