
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Phone, Clock, User, Search, Mic, Heart, Stethoscope, Pill, CalendarCheck, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import FacilityDetailCard from '@/components/facilities/FacilityDetailCard';

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
  {
    id: 6,
    name: "Dr. Aminata Touré",
    specialty: "Gynécologue",
    hospital: "Hôpital Jean Paul II",
    experience: "10 ans",
    languages: ["français", "peul", "anglais"],
    available: true,
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  },
  {
    id: 7,
    name: "Dr. Sekou Kondé",
    specialty: "Neurologue",
    hospital: "Clinique Pasteur",
    experience: "14 ans",
    languages: ["français", "soussou"],
    available: false,
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  },
  {
    id: 8,
    name: "Dr. Marie Soumah",
    specialty: "Dermatologue",
    hospital: "Centre Médical de Ratoma",
    experience: "7 ans",
    languages: ["français", "malinké", "anglais"],
    available: true,
    image: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=250&h=250&q=80"
  }
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
    email: "contact@donka.gov.gn",
    website: "https://hopitaldonka.gov.gn",
    openingHours: "24h/24, 7j/7",
    beds: 15,
    doctors: 40,
    services: ["urgences", "chirurgie", "maternité", "cardiologie", "pédiatrie"],
    doctorsList: [doctors[0], doctors[3], doctors[5]],
    hasEmergency: true,
    distance: 2.5,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "L'Hôpital National Donka est le plus grand établissement hospitalier de Guinée, offrant une gamme complète de services médicaux spécialisés. Situé à Conakry, il sert de centre de référence national pour les cas complexes."
  },
  {
    id: 2,
    name: "Clinique Pasteur",
    type: "Clinique",
    category: "private",
    address: "Kaloum, Conakry",
    phone: "+224 623 45 67 89",
    email: "info@cliniquepasteur.gn",
    website: "https://cliniquepasteur.gn",
    openingHours: "8h-22h, 7j/7",
    beds: 30,
    doctors: 25,
    services: ["consultation", "ophtalmologie", "radiologie", "laboratoire"],
    doctorsList: [doctors[3], doctors[6]],
    hasEmergency: false,
    distance: 3.8,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "La Clinique Pasteur est un établissement de santé privé de renom à Kaloum, offrant des soins médicaux de qualité dans un environnement moderne et confortable. Spécialisée en ophtalmologie et diagnostics avancés."
  },
  {
    id: 3,
    name: "Centre de Santé Matam",
    type: "Centre de Santé",
    category: "public",
    address: "Matam, Conakry",
    phone: "+224 622 98 76 54",
    email: "cs.matam@sante.gov.gn",
    openingHours: "8h-20h, Lun-Sam",
    beds: 12,
    doctors: 8,
    services: ["consultation", "vaccination", "planning familial", "pédiatrie"],
    doctorsList: [doctors[2]],
    hasEmergency: false,
    distance: 1.2,
    image: "https://images.unsplash.com/photo-1538108149855-05943f469b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "Le Centre de Santé de Matam propose des soins de santé primaires à la population locale. Il s'agit d'un point d'accès essentiel aux services de base comme la vaccination, le suivi des grossesses et les consultations générales."
  },
  {
    id: 4,
    name: "Clinique Ambroise Paré",
    type: "Clinique",
    category: "private",
    address: "Camayenne, Conakry",
    phone: "+224 625 11 22 33",
    email: "contact@clinique-ap.gn",
    website: "https://clinique-ambroisepare.gn",
    openingHours: "7h-21h, 7j/7",
    beds: 25,
    doctors: 20,
    services: ["consultation", "échographie", "maternité", "pédiatrie"],
    doctorsList: [doctors[1]],
    hasEmergency: true,
    distance: 5.7,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "La Clinique Ambroise Paré est reconnue pour son excellence en soins mères-enfants. Avec une équipe de professionnels dédiés, elle offre un environnement chaleureux pour les futures mamans et les nouveau-nés."
  },
  {
    id: 5,
    name: "Hôpital Ignace Deen",
    type: "Hôpital",
    category: "public",
    address: "Kaloum, Conakry",
    phone: "+224 621 56 78 90",
    email: "info@ignacedeen.gov.gn",
    website: "https://hopital-ignacedeen.gov.gn",
    openingHours: "24h/24, 7j/7",
    beds: 45,
    doctors: 35,
    services: ["urgences", "radiologie", "laboratoire", "chirurgie"],
    doctorsList: [doctors[4]],
    hasEmergency: true,
    distance: 4.3,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b3db4fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "L'Hôpital Ignace Deen est l'un des principaux centres hospitaliers de Conakry. Il dispose de nombreux services spécialisés et d'équipements modernes pour assurer des soins de qualité à tous les patients."
  },
  {
    id: 6,
    name: "Centre Médical de Ratoma",
    type: "Centre de Santé",
    category: "public",
    address: "Ratoma, Conakry",
    phone: "+224 620 12 34 56",
    email: "cm.ratoma@sante.gov.gn",
    openingHours: "8h-18h, Lun-Sam",
    beds: 10,
    doctors: 15,
    services: ["consultation", "vaccination", "soins dentaires", "pharmacie"],
    doctorsList: [doctors[7]],
    hasEmergency: false,
    distance: 6.1,
    image: "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "Le Centre Médical de Ratoma dessert une large population dans la commune de Ratoma. Il offre des services de santé communautaires et sert de premier point de contact pour de nombreux patients."
  },
  {
    id: 7,
    name: "Hôpital Jean Paul II",
    type: "Hôpital",
    category: "private",
    address: "Kipé, Conakry",
    phone: "+224 624 55 66 77",
    email: "contact@hjp2.org",
    website: "https://hopital-jeanpaul2.org",
    openingHours: "24h/24, 7j/7",
    beds: 35,
    doctors: 30,
    services: ["urgences", "chirurgie", "gynécologie", "pédiatrie", "cardiologie"],
    doctorsList: [doctors[5]],
    hasEmergency: true,
    distance: 7.5,
    image: "https://images.unsplash.com/photo-1586534313131-8b27a61258b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "L'Hôpital Jean Paul II est un établissement privé moderne qui propose une prise en charge médicale de haute qualité. Ses installations de pointe et son personnel qualifié en font un choix privilégié pour de nombreux patients."
  },
  {
    id: 8,
    name: "Hôpital Régional de Kindia",
    type: "Hôpital",
    category: "public",
    address: "Kindia, Guinée",
    phone: "+224 622 87 65 43",
    email: "hopital.kindia@sante.gov.gn",
    openingHours: "24h/24, 7j/7",
    beds: 30,
    doctors: 18,
    services: ["urgences", "chirurgie", "maternité", "pédiatrie"],
    doctorsList: [],
    hasEmergency: true,
    distance: 135,
    image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a88b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "L'Hôpital Régional de Kindia est le principal établissement de santé de la région de Kindia. Il offre une large gamme de services médicaux et sert de référence pour plusieurs préfectures environnantes."
  },
  {
    id: 9,
    name: "Hôpital Régional de Kankan",
    type: "Hôpital",
    category: "public",
    address: "Kankan, Guinée",
    phone: "+224 628 00 11 22",
    email: "hopital.kankan@sante.gov.gn",
    openingHours: "24h/24, 7j/7",
    beds: 28,
    doctors: 16,
    services: ["urgences", "chirurgie", "médecine interne", "pédiatrie"],
    doctorsList: [],
    hasEmergency: true,
    distance: 650,
    image: "https://images.unsplash.com/photo-1538108149855-05943f469b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "L'Hôpital Régional de Kankan est un centre médical important dans la région Est de la Guinée. Il dispose de plusieurs services spécialisés pour répondre aux besoins de santé de la population locale."
  },
  {
    id: 10,
    name: "Pharmacie Centrale de Kaloum",
    type: "Pharmacie",
    category: "private",
    address: "Kaloum, Conakry",
    phone: "+224 621 33 44 55",
    email: "contact@pcentralekaloum.gn",
    website: "https://pharmaciecentralekaloum.gn",
    openingHours: "8h-23h, 7j/7",
    beds: 0,
    doctors: 0,
    services: ["médicaments", "parapharmacie", "conseils santé"],
    doctorsList: [],
    hasEmergency: false,
    distance: 3.2,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&h=200&q=80",
    description: "La Pharmacie Centrale de Kaloum est l'une des plus grandes pharmacies de Conakry. Elle propose une large gamme de médicaments et produits de santé, ainsi que des conseils professionnels."
  }
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('facilities');
  const [specialty, setSpecialty] = useState('');
  const [distance, setDistance] = useState([10]);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
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

  const handleViewDetails = (facility: any) => {
    setSelectedFacility(facility);
  };

  return (
    <div className="container max-w-screen-xl py-8 bg-gradient-to-b from-background to-blue-50/30 dark:from-background dark:to-blue-950/10">
      <div className="mb-8 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
          <Search className="mr-2 h-6 w-6 text-health-blue" />
          Recherche avancée
        </h1>
        
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
                <SelectItem value="all">Toutes les spécialités</SelectItem>
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
                <SelectItem value="all">Toutes les langues</SelectItem>
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
                <SelectItem value="all">Tous les types</SelectItem>
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
          <TabsTrigger value="facilities" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Établissements
          </TabsTrigger>
          <TabsTrigger value="doctors" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Médecins
          </TabsTrigger>
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
                <motion.div 
                  key={facility.id} 
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden bg-white dark:bg-card">
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
                          <Badge className="bg-destructive animate-pulse-scale">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Urgences
                          </Badge>
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
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-health-blue" />
                        <span>{facility.openingHours}</span>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap mt-2">
                        {facility.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20">
                            {service}
                          </Badge>
                        ))}
                        {facility.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{facility.services.length - 3}
                          </Badge>
                        )}
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            className="w-full bg-health-blue hover:bg-health-blue/90"
                            onClick={() => handleViewDetails(facility)}
                          >
                            Voir détails
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0">
                          {selectedFacility && (
                            <FacilityDetailCard 
                              id={facility.id}
                              name={facility.name}
                              type={facility.type}
                              address={facility.address}
                              description={facility.description}
                              phone={facility.phone}
                              email={facility.email}
                              website={facility.website}
                              openingHours={facility.openingHours}
                              services={facility.services}
                              doctors={facility.doctorsList.length > 0 ? facility.doctorsList : [
                                {
                                  name: "Dr. Emmanuel Koné",
                                  specialty: "Médecine générale",
                                  available: true
                                },
                                {
                                  name: "Dr. Mariame Sylla",
                                  specialty: "Pédiatrie",
                                  available: false
                                }
                              ]}
                              image={facility.image}
                              onClose={() => setSelectedFacility(null)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </motion.div>
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
                <motion.div 
                  key={doctor.id} 
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden bg-white dark:bg-card">
                    <div className="aspect-square w-full overflow-hidden bg-slate-100">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl">{doctor.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-health-blue/10 text-health-blue border-health-blue/30">
                          {doctor.specialty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="h-4 w-4 text-health-blue" />
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
                        <CalendarCheck className="h-4 w-4 text-health-blue" />
                        <span>Expérience: {doctor.experience}</span>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap mt-2">
                        {doctor.languages.map(language => (
                          <Badge key={language} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20">
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
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {selectedFacility && (
        <Dialog open={!!selectedFacility} onOpenChange={() => setSelectedFacility(null)}>
          <DialogContent className="max-w-4xl p-0">
            <FacilityDetailCard 
              id={selectedFacility.id}
              name={selectedFacility.name}
              type={selectedFacility.type}
              address={selectedFacility.address}
              description={selectedFacility.description}
              phone={selectedFacility.phone}
              email={selectedFacility.email}
              website={selectedFacility.website}
              openingHours={selectedFacility.openingHours}
              services={selectedFacility.services}
              doctors={selectedFacility.doctorsList.length > 0 ? selectedFacility.doctorsList : [
                {
                  name: "Dr. Emmanuel Koné",
                  specialty: "Médecine générale",
                  available: true
                },
                {
                  name: "Dr. Mariame Sylla",
                  specialty: "Pédiatrie",
                  available: false
                }
              ]}
              image={selectedFacility.image}
              onClose={() => setSelectedFacility(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SearchPage;
