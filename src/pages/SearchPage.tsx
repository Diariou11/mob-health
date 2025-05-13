
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MapPin, Phone, Clock, User, Search, Mic } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Mamadou Diallo",
    specialty: "Cardiologue",
    hospital: "Hôpital National Donka",
    experience: "15 ans",
    languages: ["français", "peul"],
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  },
  {
    id: 2,
    name: "Dr. Fatoumata Camara",
    specialty: "Pédiatre",
    hospital: "Clinique Ambroise Paré",
    experience: "8 ans",
    languages: ["français", "soussou", "anglais"],
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  },
  {
    id: 3,
    name: "Dr. Ibrahima Bah",
    specialty: "Généraliste",
    hospital: "Centre de Santé Matam",
    experience: "5 ans",
    languages: ["français", "malinké"],
    available: false,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  },
  {
    id: 4,
    name: "Dr. Aissatou Barry",
    specialty: "Ophtalmologue",
    hospital: "Clinique Pasteur",
    experience: "12 ans",
    languages: ["français", "peul", "anglais"],
    available: true,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  },
  {
    id: 5,
    name: "Dr. Ousmane Souaré",
    specialty: "Chirurgien",
    hospital: "Hôpital Ignace Deen",
    experience: "20 ans",
    languages: ["français", "soussou"],
    available: true,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  },
];

// Sample data for health facilities
const healthFacilities = [
  {
    id: 1,
    name: "Hôpital National Donka",
    type: "Hôpital",
    category: "public",
    address: "Conakry, Guinée",
    phone: "+224 628 12 34 56",
    beds: 15,
    doctors: 8,
    services: ["urgences", "chirurgie", "maternité"],
    hasEmergency: true,
    distance: 2.5,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80"
  },
  {
    id: 2,
    name: "Clinique Pasteur",
    type: "Clinique",
    category: "private",
    address: "Kaloum, Conakry",
    phone: "+224 623 45 67 89",
    beds: 8,
    doctors: 5,
    services: ["consultation", "ophtalmologie", "optique"],
    hasEmergency: false,
    distance: 3.8,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80"
  },
  {
    id: 3,
    name: "Centre de Santé Matam",
    type: "Centre de Santé",
    category: "public",
    address: "Matam, Conakry",
    phone: "+224 622 98 76 54",
    beds: 4,
    doctors: 2,
    services: ["consultation", "vaccination", "planning familial"],
    hasEmergency: false,
    distance: 1.2,
    image: "https://images.unsplash.com/photo-1538108149855-05943f469b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80"
  },
  {
    id: 4,
    name: "Clinique Ambroise Paré",
    type: "Clinique",
    category: "private",
    address: "Camayenne, Conakry",
    phone: "+224 625 11 22 33",
    beds: 12,
    doctors: 6,
    services: ["consultation", "échographie", "maternité"],
    hasEmergency: true,
    distance: 5.7,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80"
  },
  {
    id: 5,
    name: "Hôpital Ignace Deen",
    type: "Hôpital",
    category: "public",
    address: "Kaloum, Conakry",
    phone: "+224 621 56 78 90",
    beds: 20,
    doctors: 12,
    services: ["urgences", "radiologie", "laboratoire"],
    hasEmergency: true,
    distance: 4.3,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b3db4fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80"
  }
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('facilities');
  const [specialty, setSpecialty] = useState('');
  const [distance, setDistance] = useState([10]);
  const { toast } = useToast();

  const handleVoiceSearch = () => {
    toast({
      title: "Recherche vocale",
      description: "Fonction de recherche vocale activée. Essai de reconnaissance en langues locales simulé.",
    });
  };

  const filteredFacilities = healthFacilities.filter(facility => 
    facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    facility.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container max-w-screen-xl py-8">
      <div className="mb-8 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Recherche avancée</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un établissement, un médecin ou un service..."
            className="pl-10 pr-16 py-6 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-3 top-2"
            onClick={handleVoiceSearch}
          >
            <Mic className="h-5 w-5 text-health-blue" />
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Spécialité</label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les spécialités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les spécialités</SelectItem>
                <SelectItem value="cardiology">Cardiologie</SelectItem>
                <SelectItem value="pediatrics">Pédiatrie</SelectItem>
                <SelectItem value="ophthalmology">Ophtalmologie</SelectItem>
                <SelectItem value="general">Médecine générale</SelectItem>
                <SelectItem value="surgery">Chirurgie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Langues parlées</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les langues" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les langues</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="peul">Peul</SelectItem>
                <SelectItem value="soussou">Soussou</SelectItem>
                <SelectItem value="malinke">Malinké</SelectItem>
                <SelectItem value="english">Anglais</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Type d'établissement</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="hospital">Hôpital</SelectItem>
                <SelectItem value="clinic">Clinique</SelectItem>
                <SelectItem value="center">Centre de santé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Distance maximale</label>
            <span className="text-sm">{distance[0]} km</span>
          </div>
          <Slider
            defaultValue={[10]}
            max={25}
            step={1}
            value={distance}
            onValueChange={setDistance}
          />
        </div>
      </div>
      
      <Tabs defaultValue="facilities" className="max-w-5xl mx-auto" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="facilities">Établissements</TabsTrigger>
          <TabsTrigger value="doctors">Médecins</TabsTrigger>
        </TabsList>
        
        <TabsContent value="facilities" className="space-y-6">
          {filteredFacilities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Aucun établissement trouvé pour votre recherche.</p>
              <p className="text-sm text-muted-foreground mt-2">Essayez d'autres termes ou filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFacilities.map(facility => (
                <Card key={facility.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{facility.name}</CardTitle>
                        <p className="text-muted-foreground">{facility.type}</p>
                      </div>
                      {facility.hasEmergency && (
                        <Badge className="bg-destructive">Urgences</Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-health-blue" />
                      <span>{facility.address} • {facility.distance} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-health-blue" />
                      <span>{facility.phone}</span>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap mt-2">
                      {facility.services.map(service => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Lits disponibles</p>
                        <p className="font-medium">{facility.beds}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Médecins</p>
                        <p className="font-medium">{facility.doctors}</p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full bg-health-blue hover:bg-health-blue/90">
                      Voir détails
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="doctors" className="space-y-6">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Aucun médecin trouvé pour votre recherche.</p>
              <p className="text-sm text-muted-foreground mt-2">Essayez d'autres termes ou filtres.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => (
                <Card key={doctor.id} className="overflow-hidden">
                  <div className="aspect-square w-full overflow-hidden bg-slate-100">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{doctor.name}</CardTitle>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-health-blue" />
                      <span>{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-health-blue" />
                      <span>
                        {doctor.available ? 
                          <span className="text-clinic-green font-medium">Disponible</span> : 
                          <span className="text-destructive">Indisponible</span>
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-health-blue" />
                      <span>Expérience: {doctor.experience}</span>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap mt-2">
                      {doctor.languages.map(language => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full bg-health-blue hover:bg-health-blue/90">
                      Voir profil
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchPage;
