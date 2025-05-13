
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';
import { HealthFacility } from '@/types/facility';

interface FacilityDetailsProps {
  facility: HealthFacility;
  onClose: () => void;
}

const FacilityDetails = ({ facility, onClose }: FacilityDetailsProps) => {
  return (
    <div className="absolute top-4 right-4 bottom-24 md:bottom-4 w-full max-w-xs bg-white rounded-xl shadow-lg overflow-y-auto">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="p-4">
        <h2 className="text-xl font-medium">{facility.name}</h2>
        <p className="text-foreground/70">{facility.type}</p>
        
        <div className="flex items-center gap-1 mt-2 text-sm">
          <MapPin className="h-4 w-4 text-health-blue" />
          <span>{facility.address}</span>
        </div>
        
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium mb-1">Contact</h3>
            <p className="text-sm">{facility.phone}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Services</h3>
            <div className="flex flex-wrap gap-2">
              {facility.services.map(service => (
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
                {facility.beds} <span className="text-sm font-normal text-foreground/70">/ 30</span>
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Médecins</h3>
              <p className="text-lg font-medium text-health-blue">{facility.doctors}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Langues parlées</h3>
            <div className="flex flex-wrap gap-2">
              {facility.languages.map(lang => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button className="w-full bg-clinic-green hover:bg-clinic-green/90">
            Voir détails complets
          </Button>
          
          {facility.hasEmergency && (
            <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
              Contacter urgences
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
