
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { HealthFacility } from '@/types/facility';
import { toast } from "sonner";

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
      toast.info("Carte interactive chargée", { 
        description: "Cliquez sur les marqueurs pour voir les détails des établissements de santé", 
        duration: 3000 
      });
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
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '36px'; // Bigger marker for better visibility
      el.style.height = '36px';
      el.style.backgroundImage = facility.hasEmergency 
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")` 
        : facility.type.toLowerCase().includes('clinique') 
          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234CAF50' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")`
          : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230057A3' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")`;
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';
      el.style.filter = 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.5))'; // Add shadow for better visibility
      
      // Make markers slightly pulse to draw attention
      el.style.animation = 'pulse 2s infinite';
      
      // Add click handler with improved visibility
      el.addEventListener('click', () => {
        console.log('Facility clicked:', facility.name);
        // Add visual feedback on click
        el.style.transform = 'scale(1.2)';
        setTimeout(() => {
          el.style.transform = 'scale(1)';
        }, 200);
        onFacilitySelect(facility);
      });
      
      // Add popup on hover with more detailed information
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        className: 'custom-popup'
      }).setHTML(
        `<div class="p-2">
          <strong class="text-health-blue">${facility.name}</strong><br>
          <span class="text-sm font-medium">${facility.type}</span><br>
          ${facility.address}<br>
          <small class="text-clinic-green">Cliquez pour plus d'infos</small>
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
      
      // Add hover events for popup with better visual feedback
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
        marker.togglePopup();
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        marker.togglePopup();
      });
    });
    
    // If we have facilities, fit the map to show all markers
    if (facilities.length > 0) {
      map.current.fitBounds(bounds, {
        padding: 70, // Add more padding to ensure all markers are visible
        maxZoom: 12  // Limit how much we can zoom in
      });
    }

    // Add CSS for pulse animation
    if (!document.getElementById('marker-pulse-animation')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'marker-pulse-animation';
      styleElement.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .custom-popup .mapboxgl-popup-content {
          padding: 8px;
          border-radius: 6px;
          border-left: 4px solid #0057A3;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
      `;
      document.head.appendChild(styleElement);
    }
  };

  return (
    <div ref={mapContainer} className="h-full w-full">
      {/* Color legend for map markers */}
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md z-10 text-xs">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-[#0057A3] rounded-full mr-1"></div>
          <span>Hôpitaux</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-[#4CAF50] rounded-full mr-1"></div>
          <span>Cliniques</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#ef4444] rounded-full mr-1"></div>
          <span>Urgences</span>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
