
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { HealthFacility } from '@/types/facility';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GeolocationButton } from './GeolocationButton';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

// Get Mapbox token from environment variable
const getMapboxToken = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('get-mapbox-token');
    if (error) throw error;
    return data?.token || '';
  } catch (error) {
    console.error('Error fetching Mapbox token:', error);
    return '';
  }
};

interface MapContainerProps {
  facilities: HealthFacility[];
  onFacilitySelect: (facility: HealthFacility) => void;
}

const MapContainer = ({ facilities, onFacilitySelect }: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      if (!mapContainer.current) return;
      
      try {
        setIsLoading(true);
        const token = await getMapboxToken();
        
        if (!token) {
          setError('Impossible de charger la carte. Veuillez réessayer plus tard.');
          setIsLoading(false);
          return;
        }
        
        mapboxgl.accessToken = token;
        
        // Initialize map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/streets-v12',
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
          setIsLoading(false);
          toast.info("Carte interactive chargée", { 
            description: "Cliquez sur les marqueurs pour voir les détails des établissements de santé", 
            duration: 3000 
          });
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Erreur lors du chargement de la carte');
        setIsLoading(false);
      }
    };
    
    initMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    // Update map style when dark mode changes
    if (map.current && map.current.loaded()) {
      map.current.setStyle(isDarkMode ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/streets-v12');
    }
  }, [isDarkMode]);

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

  const handleUserLocation = (coords: [number, number]) => {
    if (!map.current) return;

    // Remove previous user marker if exists
    if (userMarker.current) {
      userMarker.current.remove();
    }

    // Create user location marker
    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#3b82f6';
    el.style.border = '3px solid white';
    el.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.5)';

    userMarker.current = new mapboxgl.Marker(el)
      .setLngLat(coords)
      .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><strong>Votre position</strong></div>'))
      .addTo(map.current);

    // Fly to user location
    map.current.flyTo({
      center: coords,
      zoom: 13,
      duration: 2000
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="h-full w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="text-center p-4">
            <p className="text-destructive mb-2">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-sm text-primary hover:underline"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full">
        {/* Map controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <GeolocationButton onLocationFound={handleUserLocation} />
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="sm"
            className="gap-2 shadow-md"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDarkMode ? 'Clair' : 'Sombre'}
          </Button>
        </div>
        
        {/* Color legend for map markers */}
        <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 p-2 rounded-md shadow-md z-10 text-xs">
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
    </div>
  );
};

export default MapContainer;
