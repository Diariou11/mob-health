
import { Badge } from '@/components/ui/badge';
import { HealthFacility } from '@/types/facility';

interface FacilityListProps {
  facilities: HealthFacility[];
  onSelectFacility: (facility: HealthFacility) => void;
  activeFiltersCount?: number;
}

const FacilityList = ({ 
  facilities, 
  onSelectFacility, 
  activeFiltersCount = 0 
}: FacilityListProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg transition-transform duration-300 md:max-w-sm md:left-4 md:bottom-4 md:rounded-xl">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="font-medium">Établissements ({facilities.length})</h2>
        <div className="flex gap-1">
          <Badge variant="outline" className="bg-slate-50">
            Filtres actifs: {activeFiltersCount}
          </Badge>
        </div>
      </div>
      
      <div className="max-h-[30vh] overflow-y-auto">
        {facilities.map(facility => (
          <div 
            key={facility.id} 
            className="p-3 border-b hover:bg-slate-50 cursor-pointer transition-colors"
            onClick={() => onSelectFacility(facility)}
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
  );
};

export default FacilityList;
