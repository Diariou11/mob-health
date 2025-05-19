
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, X, Phone, Clock, Shield, UserRound, Languages } from 'lucide-react';
import { HealthFacility } from '@/types/facility';
import { Separator } from "@/components/ui/separator";

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
        <h2 className="text-xl font-medium text-health-blue">{facility.name}</h2>
        <p className="text-foreground/70">{facility.type}</p>
        
        <div className="flex items-center gap-1 mt-2 text-sm">
          <MapPin className="h-4 w-4 text-health-blue" />
          <span>{facility.address}</span>
        </div>
        
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Phone className="h-4 w-4 text-health-blue" />
              <h3 className="font-medium">Contact</h3>
            </div>
            <p className="text-sm">{facility.phone}</p>
            {facility.email && <p className="text-sm text-health-blue">mobarry6790@gmail.com</p>}
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-health-blue" />
              <h3 className="font-medium">Services</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {facility.services.map(service => (
                <Badge key={service} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950/20">
                  {service}
                </Badge>
              ))}
            </div>
            
            {facility.hasEmergency && (
              <Badge className="mt-2 bg-red-500 text-white">
                Service d'urgence
              </Badge>
            )}
            
            {facility.hasBloodBank && (
              <Badge className="mt-2 ml-2 bg-red-100 text-red-800 border-red-300">
                Banque de sang
              </Badge>
            )}
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Shield className="h-4 w-4 text-health-blue" />
              <h3 className="font-medium">Spécialités</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {facility.specialty.map(spec => (
                <Badge key={spec} variant="secondary" className="text-xs bg-health-blue/10 dark:bg-health-blue/20">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-8">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <UserRound className="h-4 w-4 text-health-blue" />
                <h3 className="font-medium">Disponibilité</h3>
              </div>
              <p className="text-lg font-medium text-health-blue">
                {facility.beds} <span className="text-sm font-normal text-foreground/70">lits disponibles</span>
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Médecins</h3>
              <p className="text-lg font-medium text-health-blue">{facility.doctors}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Languages className="h-4 w-4 text-health-blue" />
              <h3 className="font-medium">Langues parlées</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {facility.languages.map(lang => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button className="w-full bg-clinic-green hover:bg-clinic-green/90">
            Prendre rendez-vous
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
