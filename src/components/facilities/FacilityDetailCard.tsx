
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, User, Mail, Globe, Heart, Stethoscope, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  onClose
}: FacilityDetailProps) => {
  const { toast } = useToast();
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [appointmentPhone, setAppointmentPhone] = useState("");

  const handleAppointment = () => {
    setShowAppointmentDialog(true);
  };

  const handleSubmitAppointment = () => {
    setShowAppointmentDialog(false);
    toast({
      title: "Rendez-vous demandé",
      description: `Votre demande de rendez-vous à ${name} a été enregistrée. Nous vous contacterons pour confirmer.`,
    });
  };

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

                <Button 
                  onClick={handleAppointment} 
                  className="w-full mt-6 bg-health-blue hover:bg-health-blue/90 flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Prendre rendez-vous
                </Button>
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
          <Button className="bg-health-blue hover:bg-health-blue/90" onClick={handleAppointment}>
            <Calendar className="mr-2 h-4 w-4" />
            Prendre rendez-vous
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Prendre rendez-vous à {name}</DialogTitle>
            <DialogDescription>
              Remplissez les informations ci-dessous pour demander un rendez-vous médical.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="doctor">Médecin</Label>
              <Select value={appointmentDoctor} onValueChange={setAppointmentDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un médecin" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.filter(d => d.available).map((doctor, i) => (
                    <SelectItem key={i} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                  <SelectItem value="aucune-preference">Aucune préférence</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Date souhaitée</Label>
              <Input 
                type="date"
                id="date"
                min={new Date().toISOString().split('T')[0]}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="reason">Motif de consultation</Label>
              <Input 
                id="reason" 
                placeholder="Raison de votre visite"
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input 
                id="phone" 
                placeholder="+224 6XX XX XX XX"
                value={appointmentPhone}
                onChange={(e) => setAppointmentPhone(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAppointmentDialog(false)}>Annuler</Button>
            <Button 
              onClick={handleSubmitAppointment}
              className="bg-health-blue hover:bg-health-blue/90"
              disabled={!appointmentDate || !appointmentPhone}
            >
              Confirmer la demande
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FacilityDetailCard;
