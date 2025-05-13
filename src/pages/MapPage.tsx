
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapContainer from '@/components/map/MapContainer';
import FacilityList from '@/components/map/FacilityList';
import FacilityDetails from '@/components/map/FacilityDetails';
import FilterPanel from '@/components/map/FilterPanel';
import SearchBar from '@/components/map/SearchBar';
import { healthFacilities } from '@/data/healthFacilities';
import { HealthFacility, FilterState } from '@/types/facility';

const MapPage = () => {
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [distance, setDistance] = useState([10]);
  const [facilitiesShown, setFacilitiesShown] = useState(healthFacilities);
  const [filters, setFilters] = useState<FilterState>({
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

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    filterFacilities(value);
  };

  const filterFacilities = (term: string) => {
    // Filter facilities based on search term
    const filtered = healthFacilities.filter(facility => 
      facility.name.toLowerCase().includes(term.toLowerCase()) ||
      facility.type.toLowerCase().includes(term.toLowerCase()) ||
      facility.services.some(service => service.toLowerCase().includes(term.toLowerCase()))
    );
    
    setFacilitiesShown(filtered);
  };

  const handleApplyFilters = () => {
    // This would handle filtering based on all filters
    // For now, we just count the active filters for the UI
    console.log("Filters applied", filters);
  };

  const zoomToFacility = (facility: HealthFacility) => {
    setSelectedFacility(facility);
  };

  const closePopup = () => {
    setSelectedFacility(null);
  };

  // Calculate active filters count (for the UI badge)
  const activeFiltersCount = 3; // In a real app, calculate this based on filter state

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      {/* Search and filter bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2 max-w-md mx-auto">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={handleSearchChange} 
        />
        
        <FilterPanel 
          filters={filters} 
          distance={distance} 
          setDistance={setDistance} 
          onApplyFilters={handleApplyFilters} 
        />
      </div>
      
      {/* Map container */}
      <MapContainer 
        facilities={facilitiesShown} 
        onFacilitySelect={zoomToFacility} 
      />
      
      {/* List of facilities */}
      <FacilityList 
        facilities={facilitiesShown} 
        onSelectFacility={zoomToFacility} 
        activeFiltersCount={activeFiltersCount} 
      />
      
      {/* Selected facility details */}
      {selectedFacility && (
        <FacilityDetails 
          facility={selectedFacility} 
          onClose={closePopup} 
        />
      )}
    </div>
  );
};

export default MapPage;
