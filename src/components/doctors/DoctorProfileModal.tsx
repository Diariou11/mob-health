import { useState } from 'react';
import { X, Phone, MapPin, Clock, CalendarCheck, Mail, Globe, UserCheck, Award, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  experience: string;
  languages: string[];
  available: boolean;
  image: string;
  fullBio?: string;
  phone?: string;
  email?: string;
  website?: string;
  education?: string[];
  certifications?: string[];
  publications?: string[];
  consultationHours?: string;
  address?: string;
}

interface DoctorProfileModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const DoctorProfileModal = ({ doctor, onClose }: DoctorProfileModalProps) => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header with close button */}
      <div className="relative h-28 md:h-48 bg-health-blue">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 bg-white/20 hover:bg-white/40 z-10"
          onClick={onClose}
        >
          <X className="h-4 w-4 text-white" />
        </Button>
      </div>

      {/* Doctor info section */}
      <div className="px-6 py-4 md:px-8 relative">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="md:mt-[-4rem] mt-[-3rem] z-10">
            <div className="rounded-full border-4 border-white bg-white h-24 w-24 md:h-32 md:w-32 overflow-hidden">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Basic info */}
          <div className="flex-1 md:mt-[-2rem]">
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <div className="flex items-center gap-2 mt-1 mb-2">
              <Badge className="bg-health-blue/10 text-health-blue border-health-blue/30">
                {doctor.specialty}
              </Badge>
              {doctor.available ? (
                <Badge variant="outline" className="bg-clinic-green/10 text-clinic-green border-clinic-green/30">
                  Disponible
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                  Indisponible
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="flex items-center gap-1 text-sm">
                <CalendarCheck className="h-4 w-4 text-health-blue" />
                <span>{doctor.experience} d'expérience</span>
              </div>
              {doctor.consultationHours && (
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4 text-health-blue" />
                  <span>{doctor.consultationHours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact buttons */}
          <div className="shrink-0 flex md:flex-col gap-3 justify-end md:pt-2">
            <Button 
              className="bg-health-blue hover:bg-health-blue/90"
              onClick={() => setShowAppointmentForm(!showAppointmentForm)}
            >
              {showAppointmentForm ? 'Annuler' : 'Prendre RDV'}
            </Button>
            {doctor.phone && (
              <Button variant="outline" className="border-health-blue text-health-blue hover:bg-health-blue/10">
                <Phone className="h-4 w-4 mr-2" />
                Appeler
              </Button>
            )}
          </div>
        </div>

        {/* Appointment Form */}
        {showAppointmentForm && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Prendre rendez-vous</h3>
            <AppointmentForm 
              doctorName={doctor.name}
              onSuccess={() => {
                setShowAppointmentForm(false);
                onClose();
              }}
            />
          </div>
        )}

        {/* Tabs for more information */}
        <Tabs defaultValue="info" className="mt-6">
          <TabsList>
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="edu">Parcours</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="mt-4 space-y-4">
            {doctor.fullBio && (
              <div>
                <h3 className="font-medium mb-2">À propos</h3>
                <p className="text-sm text-muted-foreground">{doctor.fullBio}</p>
              </div>
            )}
            
            <div>
              <h3 className="font-medium mb-2">Langues parlées</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map(language => (
                  <Badge key={language} variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
            
            {doctor.certifications && doctor.certifications.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Certifications</h3>
                <ul className="text-sm space-y-1">
                  {doctor.certifications.map((cert, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-health-blue shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="edu" className="mt-4 space-y-4">
            {doctor.education && doctor.education.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Éducation</h3>
                <ul className="text-sm space-y-3">
                  {doctor.education.map((edu, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <UserCheck className="h-4 w-4 text-health-blue shrink-0 mt-0.5" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {doctor.publications && doctor.publications.length > 0 && (
              <div>
                <h3 className="font-medium mb-2 mt-4">Publications</h3>
                <ul className="text-sm space-y-2">
                  {doctor.publications.map((pub, i) => (
                    <li key={i}>{pub}</li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="contact" className="mt-4 space-y-3">
            {doctor.address && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-health-blue shrink-0" />
                <span>{doctor.address}</span>
              </div>
            )}
            
            {doctor.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-health-blue shrink-0" />
                <span>{doctor.phone}</span>
              </div>
            )}
            
            {doctor.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-health-blue shrink-0" />
                <span>{doctor.email}</span>
              </div>
            )}
            
            {doctor.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-health-blue shrink-0" />
                <a href={doctor.website} className="text-health-blue hover:underline">{doctor.website}</a>
              </div>
            )}
            
            {doctor.consultationHours && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-health-blue shrink-0" />
                <span>{doctor.consultationHours}</span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorProfileModal;
