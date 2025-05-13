
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Search, MapPin, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

// Temporary access token - in production this should come from environment variables
// This would normally be stored in a .env file and accessed via process.env.MAPBOX_ACCESS_TOKEN
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHpmaTY2czAwazdmMnFwYXI2OTR2YXd2In0.1sFkY3uEfNUDtYfZH8v6cQ';

// Sample data for health facilities
const healthFacilities = [
  {
    id: 1,
    name: "Hôpital National Donka",
    type: "Hôpital",
    category: "public",
    specialty: ["general", "pediatrie", "cardiologie"],
    coordinates: [-13.6773, 9.5370],
    address: "Conakry, Guinée",
    phone: "+224 628 12 34 56",
    beds: 15,
    doctors: 8,
    services: ["urgences", "chirurgie", "maternité"],
    hasEmergency: true,
    hasBloodBank: true,
    languages: ["français", "soussou", "peul"]
  },
  {
    id: 2,
    name: "Clinique Pasteur",
    type: "Clinique",
    category: "private",
    specialty: ["general", "ophtalmologie"],
    coordinates: [-13.6568, 9.5420],
    address: "Kaloum, Conakry",
    phone: "+224 623 45 67 89",
    beds: 8,
    doctors: 5,
    services: ["consultation", "ophtalmologie", "optique"],
    hasEmergency: false,
    hasBloodBank: false,
    languages: ["français", "anglais"]
  },
  {
    id: 3,
    name: "Centre de Santé Matam",
    type: "Centre de Santé",
    category: "public",
    specialty: ["general", "vaccination"],
    coordinates: [-13.6670, 9.5520],
    address: "Matam, Conakry",
    phone: "+224 622 98 76 54",
    beds: 4,
    doctors: 2,
    services: ["consultation", "vaccination", "planning familial"],
    hasEmergency: false,
    hasBloodBank: false,
    languages: ["français", "malinké"]
  },
  {
    id: 4,
    name: "Clinique Ambroise Paré",
    type: "Clinique",
    category: "private",
    specialty: ["general", "gynecologie", "pediatrie"],
    coordinates: [-13.6473, 9.5470],
    address: "Camayenne, Conakry",
    phone: "+224 625 11 22 33",
    beds: 12,
    doctors: 6,
    services: ["consultation", "échographie", "maternité"],
    hasEmergency: true,
    hasBloodBank: false,
    languages: ["français", "anglais", "soussou"]
  },
  {
    id: 5,
    name: "Hôpital Ignace Deen",
    type: "Hôpital",
    category: "public",
    specialty: ["general", "pneumologie", "neurologie"],
    coordinates: [-13.7073, 9.5170],
    address: "Kaloum, Conakry",
    phone: "+224 621 56 78 90",
    beds: 20,
    doctors: 12,
    services: ["urgences", "radiologie", "laboratoire"],
    hasEmergency: true,
    hasBloodBank: true,
    languages: ["français", "peul", "soussou", "malinké"]
  }
];

const MapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter state
  const [distance, setDistance] = useState([10]);
  const [facilitiesShown, setFacilitiesShown] = useState(healthFacilities);
  const [filters, setFilters] = useState({
    type: {
      hopital: true,
      clinique: true,
      centre: true
    },
    specialty: {
      general: true,
      pediatrie: true,
      cardiologie: true,
      gynecologie: false,
      ophtalmologie: false
    },
    services: {
      urgences: false,
      maternite: false,
      vaccination: false,
      bloodBank: false
    },
    languages: {
      francais: true,
      anglais: false,
      peul: false,
      soussou: false,
      malinke: false
    }
  });

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
    // Filter facilities based on search term
    const filtered = healthFacilities.filter(facility => 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFacilitiesShown(filtered);

    // If map is loaded, update markers
    if (map.current && map.current.loaded()) {
      // Remove existing markers
      document.querySelectorAll('.mapboxgl-marker').forEach(el => el.remove());
      
      // Add new markers based on filtered facilities
      filtered.forEach(facility => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '28px';
        el.style.height = '28px';
        el.style.backgroundImage = facility.hasEmergency 
          ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")` 
          : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230057A3' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")`;
        el.style.backgroundSize = '100%';
        
        el.addEventListener('click', () => {
          setSelectedFacility(facility);
        });
        
        new mapboxgl.Marker(el)
          .setLngLat(facility.coordinates as [number, number]) // Fixed: Type assertion to correct format
          .addTo(map.current!);
      });
    }
  }, [searchTerm]);

  const addMarkers = () => {
    healthFacilities.forEach(facility => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '28px';
      el.style.height = '28px';
      el.style.backgroundImage = facility.hasEmergency 
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")` 
        : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230057A3' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3'%3E%3C/circle%3E%3C/svg%3E")`;
      el.style.backgroundSize = '100%';
      
      el.addEventListener('click', () => {
        setSelectedFacility(facility);
      });
      
      if (map.current) {
        new mapboxgl.Marker(el)
          .setLngLat(facility.coordinates as [number, number]) // Fixed: Type assertion to correct format
          .addTo(map.current);
      }
    });
  };

  const zoomToFacility = (facility: any) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: facility.coordinates as [number, number], // Fixed: Type assertion to correct format
      zoom: 15,
      essential: true
    });
    
    setSelectedFacility(facility);
  };

  const closePopup = () => {
    setSelectedFacility(null);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Search and filter bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un établissement ou service..."
            className="pl-8 pr-4 py-5 bg-white/95 shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white/95 shadow-md">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtres de recherche</SheetTitle>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Distance</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">0 km</span>
                  <span className="text-sm">{distance[0]} km</span>
                  <span className="text-sm">25 km</span>
                </div>
                <Slider
                  defaultValue={[10]}
                  max={25}
                  step={1}
                  value={distance}
                  onValueChange={setDistance}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Type d'établissement</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hopital" checked={filters.type.hopital} />
                    <Label htmlFor="hopital">Hôpital</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="clinique" checked={filters.type.clinique} />
                    <Label htmlFor="clinique">Clinique</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="centre" checked={filters.type.centre} />
                    <Label htmlFor="centre">Centre de Santé</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Spécialités</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="general" checked={filters.specialty.general} />
                    <Label htmlFor="general">Médecine générale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pediatrie" checked={filters.specialty.pediatrie} />
                    <Label htmlFor="pediatrie">Pédiatrie</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cardiologie" checked={filters.specialty.cardiologie} />
                    <Label htmlFor="cardiologie">Cardiologie</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gynecologie" checked={filters.specialty.gynecologie} />
                    <Label htmlFor="gynecologie">Gynécologie</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ophtalmologie" checked={filters.specialty.ophtalmologie} />
                    <Label htmlFor="ophtalmologie">Ophtalmologie</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Services</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="urgences" checked={filters.services.urgences} />
                    <Label htmlFor="urgences">Service d'urgence</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="maternite" checked={filters.services.maternite} />
                    <Label htmlFor="maternite">Maternité</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vaccination" checked={filters.services.vaccination} />
                    <Label htmlFor="vaccination">Vaccination</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bloodBank" checked={filters.services.bloodBank} />
                    <Label htmlFor="bloodBank">Banque de sang</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Langues parlées</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="francais" checked={filters.languages.francais} />
                    <Label htmlFor="francais">Français</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="anglais" checked={filters.languages.anglais} />
                    <Label htmlFor="anglais">Anglais</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="peul" checked={filters.languages.peul} />
                    <Label htmlFor="peul">Peul</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="soussou" checked={filters.languages.soussou} />
                    <Label htmlFor="soussou">Soussou</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="malinke" checked={filters.languages.malinke} />
                    <Label htmlFor="malinke">Malinké</Label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-clinic-green hover:bg-clinic-green/90">
                Appliquer les filtres
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Map container */}
      <div ref={mapContainer} className="h-full" />
      
      {/* List of facilities (mobile scroll up panel) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg transition-transform duration-300 md:max-w-sm md:left-4 md:bottom-4 md:rounded-xl">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="font-medium">Établissements ({facilitiesShown.length})</h2>
          <div className="flex gap-1">
            <Badge variant="outline" className="bg-slate-50">
              Filtres actifs: 3
            </Badge>
          </div>
        </div>
        
        <div className="max-h-[30vh] overflow-y-auto">
          {facilitiesShown.map(facility => (
            <div 
              key={facility.id} 
              className="p-3 border-b hover:bg-slate-50 cursor-pointer transition-colors"
              onClick={() => zoomToFacility(facility)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{facility.name}</h3>
                  <p className="text-sm text-foreground/70">{facility.type} • {facility.address}</p>
                </div>
                {facility.hasEmergency && (
                  <Badge className="bg-destructive">Urgences</Badge>
                )}
              </div>
              
              <div className="flex gap-2 mt-2">
                {facility.hasBloodBank && (
                  <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                    Banque de sang
                  </Badge>
                )}
                {facility.services.slice(0, 2).map(service => (
                  <Badge key={service} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected facility details */}
      {selectedFacility && (
        <div className="absolute top-4 right-4 bottom-24 md:bottom-4 w-full max-w-xs bg-white rounded-xl shadow-lg overflow-y-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2"
            onClick={closePopup}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-4">
            <h2 className="text-xl font-medium">{selectedFacility.name}</h2>
            <p className="text-foreground/70">{selectedFacility.type}</p>
            
            <div className="flex items-center gap-1 mt-2 text-sm">
              <MapPin className="h-4 w-4 text-health-blue" />
              <span>{selectedFacility.address}</span>
            </div>
            
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium mb-1">Contact</h3>
                <p className="text-sm">{selectedFacility.phone}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFacility.services.map(service => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-8">
                <div>
                  <h3 className="font-medium mb-1">Lits disponibles</h3>
                  <p className="text-lg font-medium text-health-blue">
                    {selectedFacility.beds} <span className="text-sm font-normal text-foreground/70">/ 30</span>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Médecins</h3>
                  <p className="text-lg font-medium text-health-blue">{selectedFacility.doctors}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Langues parlées</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFacility.languages.map(lang => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button className="w-full bg-clinic-green hover:bg-clinic-green/90">
                Voir détails complets
              </Button>
              
              {selectedFacility.hasEmergency && (
                <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                  Contacter urgences
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapPage;
