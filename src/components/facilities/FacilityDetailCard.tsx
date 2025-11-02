
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, User, Mail, Globe, Heart, Stethoscope, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';

interface Doctor {
  name: string;
  specialty: string;
  available: boolean;
}

interface FacilityDetailProps {
  id: number;
  name: string;
  type: string;
  address: string;
  description: string;
  phone: string;
  email?: string;
  website?: string;
  openingHours: string;
  services: string[];
  doctors: Doctor[];
  image: string;
  onClose: () => void;
  onMakeAppointment?: () => void; // Added this property as optional
}

const FacilityDetailCard = ({ 
  name, 
  type, 
  address, 
  description,
  phone, 
  email, 
  website, 
  openingHours, 
  services, 
  doctors, 
  image,
  onClose,
  onMakeAppointment
}: FacilityDetailProps) => {
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto overflow-hidden bg-white shadow-xl max-h-[90vh]">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 text-white">
              <Badge className={type.toLowerCase().includes('hôpital') ? 'bg-health-blue' : 'bg-clinic-green'}>
                {type}
              </Badge>
              <h1 className="text-2xl font-bold mt-2">{name}</h1>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-48px-70px)]">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="font-bold text-lg flex items-center">
                  <Stethoscope className="w-5 h-5 mr-2 text-health-blue" />
                  À propos
                </h2>
                <p className="mt-2 text-gray-700">{description}</p>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-health-blue flex-shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-health-blue flex-shrink-0 mt-0.5" />
                    <span>{phone}</span>
                  </div>
                  
                  {email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-health-blue flex-shrink-0 mt-0.5" />
                      <span>{email}</span>
                    </div>
                  )}
                  
                  {website && (
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-health-blue flex-shrink-0 mt-0.5" />
                      <a href={website} target="_blank" rel="noopener noreferrer" className="text-health-blue hover:underline">
                        {website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-health-blue flex-shrink-0 mt-0.5" />
                    <span>{openingHours}</span>
                  </div>
                </div>

                <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full mt-6 bg-health-blue hover:bg-health-blue/90 flex items-center justify-center"
                      onClick={() => {
                        if (onMakeAppointment) {
                          onMakeAppointment();
                        } else {
                          setShowAppointmentDialog(true);
                        }
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Prendre rendez-vous
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Prendre rendez-vous à {name}</DialogTitle>
                    </DialogHeader>
                    <AppointmentForm 
                      facilityName={name}
                      onSuccess={() => setShowAppointmentDialog(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              
              <div>
                <h2 className="font-bold text-lg flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-health-blue" />
                  Services
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {services.map((service, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {service}
                    </Badge>
                  ))}
                </div>
                
                <h2 className="font-bold text-lg mt-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-health-blue" />
                  Médecins
                </h2>
                <div className="space-y-3 mt-3">
                  {doctors.map((doctor, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      </div>
                      <Badge variant={doctor.available ? "default" : "outline"} className={doctor.available ? "bg-clinic-green" : ""}>
                        {doctor.available ? "Disponible" : "Indisponible"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </ScrollArea>
        
        <CardFooter className="flex justify-between p-6">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default FacilityDetailCard;
