import { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapContainer from '@/components/map/MapContainer';
import FacilityList from '@/components/map/FacilityList';
import FacilityDetails from '@/components/map/FacilityDetails';
import FilterPanel from '@/components/map/FilterPanel';
import SearchBar from '@/components/map/SearchBar';
import { healthFacilities } from '@/data/healthFacilities';
import { HealthFacility, FilterState } from '@/types/facility';
import { toast } from "sonner";

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

  // Handle filter change for a specific category
  const handleFilterChange = (filterCategory: keyof FilterState, filterKey: string, value: boolean) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterCategory]: {
        ...prevFilters[filterCategory],
        [filterKey]: value
      }
    }));
  };

  // Apply filters and search whenever searchTerm changes
  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm]);

  // Show toast when page loads to inform user about the map
  useEffect(() => {
    toast.info("Carte des établissements de santé", {
      description: "Cliquez sur un marqueur pour voir les détails de l'établissement.",
      duration: 5000,
    });
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const applyFiltersAndSearch = () => {
    // Start with all facilities
    let filtered = [...healthFacilities];

    // Apply search filter if there's a search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(facility => 
        facility.name.toLowerCase().includes(term) ||
        facility.type.toLowerCase().includes(term) ||
        facility.services.some(service => service.toLowerCase().includes(term))
      );
    }

    // Apply type filters
    filtered = filtered.filter(facility => {
      const facilityType = facility.type.toLowerCase();
      
      if (facilityType.includes('hôpital') && filters.type.hopital) return true;
      if (facilityType.includes('clinique') && filters.type.clinique) return true;
      if (facilityType.includes('centre') && filters.type.centre) return true;
      
      return false;
    });

    // Apply specialty filters
    filtered = filtered.filter(facility => {
      // If no specialty filters are active, include all facilities
      const anySpecialtyActive = Object.values(filters.specialty).some(v => v);
      if (!anySpecialtyActive) return true;

      // Check if facility has any of the active specialties
      return facility.specialty.some(spec => {
        if (spec.includes('général') && filters.specialty.general) return true;
        if (spec.includes('pédiatrie') && filters.specialty.pediatrie) return true;
        if (spec.includes('cardio') && filters.specialty.cardiologie) return true;
        if (spec.includes('gynéco') && filters.specialty.gynecologie) return true;
        if (spec.includes('ophtalmo') && filters.specialty.ophtalmologie) return true;
        return false;
      });
    });

    // Apply service filters
    filtered = filtered.filter(facility => {
      // If no service filters are active, include all facilities
      const anyServiceActive = Object.values(filters.services).some(v => v);
      if (!anyServiceActive) return true;

      // Check for emergency service
      if (filters.services.urgences && facility.hasEmergency) return true;

      // Check for other services
      return facility.services.some(service => {
        if (service.includes('maternité') && filters.services.maternite) return true;
        if (service.includes('vaccin') && filters.services.vaccination) return true;
        if (facility.hasBloodBank && filters.services.bloodBank) return true;
        return false;
      });
    });

    // Apply language filters
    filtered = filtered.filter(facility => {
      // If no language filters are active, include all facilities
      const anyLanguageActive = Object.values(filters.languages).some(v => v);
      if (!anyLanguageActive) return true;

      // Check if facility supports any of the active languages
      return facility.languages.some(lang => {
        if (lang.includes('français') && filters.languages.francais) return true;
        if (lang.includes('anglais') && filters.languages.anglais) return true;
        if (lang.includes('peul') && filters.languages.peul) return true;
        if (lang.includes('soussou') && filters.languages.soussou) return true;
        if (lang.includes('malinké') && filters.languages.malinke) return true;
        return false;
      });
    });

    // Update the state with filtered facilities
    setFacilitiesShown(filtered);
    console.log(`Showing ${filtered.length} facilities after filtering`);
  };

  const handleApplyFilters = () => {
    applyFiltersAndSearch();
  };

  const zoomToFacility = (facility: HealthFacility) => {
    console.log("Selected facility:", facility.name);
    setSelectedFacility(facility);
  };

  const closePopup = () => {
    setSelectedFacility(null);
  };

  // Calculate active filters count
  const calculateActiveFiltersCount = () => {
    let count = 0;
    
    // Count active type filters
    count += Object.values(filters.type).filter(Boolean).length;
    
    // Count active specialty filters
    count += Object.values(filters.specialty).filter(Boolean).length;
    
    // Count active service filters
    count += Object.values(filters.services).filter(Boolean).length;
    
    // Count active language filters
    count += Object.values(filters.languages).filter(Boolean).length;
    
    // If all filters in a category are active, we count it as 1 instead of counting each filter
    if (Object.values(filters.type).every(Boolean)) count -= Object.values(filters.type).length - 1;
    if (Object.values(filters.specialty).every(Boolean)) count -= Object.values(filters.specialty).length - 1;
    if (Object.values(filters.services).every(Boolean)) count -= Object.values(filters.services).length - 1;
    if (Object.values(filters.languages).every(Boolean)) count -= Object.values(filters.languages).length - 1;
    
    return count;
  };

  const activeFiltersCount = calculateActiveFiltersCount();

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
          onFilterChange={handleFilterChange}
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
