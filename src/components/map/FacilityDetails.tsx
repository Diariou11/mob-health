
import React from 'react';
import { X, Phone, Clock, Layers, Stethoscope } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { HealthFacility } from "@/types/facility";

interface FacilityDetailsProps {
  facility: HealthFacility;
  onClose: () => void;
}

const FacilityDetails: React.FC<FacilityDetailsProps> = ({ facility, onClose }) => {
  const statusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Limited Services":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-md shadow-lg p-0 max-h-[85vh] overflow-y-auto">
      <div className="relative p-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10 bg-black/20 hover:bg-black/40 text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <img 
          src={facility.imageUrl || "https://placehold.co/600x400?text=No+Image"} 
          alt={facility.name}
          className="h-40 w-full object-cover object-center rounded-t-md"
        />
      </div>
      <div className="p-4 space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-health-blue">{facility.name}</h2>
            <Badge className={statusColor(facility.status)}>
              {facility.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{facility.address}</p>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Phone className="h-4 w-4 text-health-blue" />
            <h3 className="font-medium">Contact</h3>
          </div>
          <p className="text-sm">{facility.phone}</p>
          <p className="text-sm text-health-blue">mobarry6790@gmail.com</p>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Layers className="h-4 w-4 text-clinic-green" />
            <h3 className="font-medium">Services</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {facility.services.map(service => (
              <Badge key={service} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-950/20">
                {service}
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Clock className="h-4 w-4 text-clinic-green" />
            <h3 className="font-medium">Heures d'ouverture</h3>
          </div>
          <ul className="text-sm space-y-1">
            <li><span className="font-medium">Lundi-Vendredi:</span> {facility.hours.weekday}</li>
            <li><span className="font-medium">Samedi:</span> {facility.hours.saturday}</li>
            <li><span className="font-medium">Dimanche:</span> {facility.hours.sunday}</li>
          </ul>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Stethoscope className="h-4 w-4 text-health-blue" />
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
        
        <Separator />
        
        <div className="pt-2">
          <Button className="w-full bg-health-blue hover:bg-health-blue/90">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;
