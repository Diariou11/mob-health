import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { QuickEmergencyButton } from '@/components/emergency/QuickEmergencyButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronRight, AlertTriangle, Phone, UserRound, CalendarClock, MapPin, Activity, ClipboardList, Ambulance as AmbulanceIcon, Loader, Clock, ThumbsUp, Droplet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const ambulanceTypes = [
  {
    id: 'basic',
    name: 'Standard',
    description: 'Pour transport médical non urgent',
    price: '50 000 GNF',
    features: ['Équipement de base', 'Personnel médical standard', 'Pour cas non critiques'],
    eta: '15-25 min'
  },
  {
    id: 'advanced',
    name: 'Avancé',
    description: 'Pour urgences médicales',
    price: '100 000 GNF',
    features: ['Équipement médical avancé', 'Personnel médical qualifié', 'Monitoring continu'],
    eta: '10-20 min'
  },
  {
    id: 'intensive',
    name: 'Soins intensifs',
    description: 'Pour cas critiques nécessitant une intervention immédiate',
    price: '150 000 GNF',
    features: ['Équipement de soins intensifs', 'Personnel médical spécialisé', 'Interventions médicales avancées'],
    eta: '5-15 min'
  }
];

const accidentTypes = [
  {
    id: 'traffic',
    name: 'Accident de la route',
    description: 'Pour les victimes d\'accidents de circulation',
    severity: ['Léger', 'Modéré', 'Grave'],
    services: ['Premiers secours', 'Extraction de véhicule', 'Transport médicalisé', 'Stabilisation sur site'],
    protocol: 'Protocole d\'urgence traumatologique routière'
  },
  {
    id: 'work',
    name: 'Accident de travail',
    description: 'Pour les accidents en milieu professionnel',
    severity: ['Léger', 'Modéré', 'Grave'],
    services: ['Évaluation des risques', 'Soins spécifiques', 'Transport adapté', 'Rapport d\'incident'],
    protocol: 'Protocole d\'intervention en milieu professionnel'
  },
  {
    id: 'home',
    name: 'Accident domestique',
    description: 'Pour les accidents à domicile',
    severity: ['Léger', 'Modéré', 'Grave'],
    services: ['Premiers soins', 'Évaluation médicale', 'Transport si nécessaire'],
    protocol: 'Protocole d\'urgence domestique'
  },
  {
    id: 'burn',
    name: 'Brûlures',
    description: 'Pour les victimes de brûlures',
    severity: ['1er degré', '2ème degré', '3ème degré'],
    services: ['Traitement spécifique', 'Évaluation de la surface corporelle', 'Transport vers unité spécialisée'],
    protocol: 'Protocole de prise en charge des brûlures'
  },
  {
    id: 'drowning',
    name: 'Noyade',
    description: 'Pour les victimes de noyade',
    severity: ['Légère', 'Modérée', 'Sévère'],
    services: ['Réanimation cardio-pulmonaire', 'Oxygénothérapie', 'Transport médicalisé urgent'],
    protocol: 'Protocole d\'urgence pour noyade'
  },
  {
    id: 'fall',
    name: 'Chute de hauteur',
    description: 'Pour les victimes de chutes importantes',
    severity: ['Légère', 'Modérée', 'Sévère'],
    services: ['Immobilisation', 'Évaluation traumatologique', 'Transport spécialisé'],
    protocol: 'Protocole traumatologique pour chutes'
  }
];

const bloodGroups = [
  { id: 'a-pos', label: 'A+', color: 'bg-red-100 text-red-800' },
  { id: 'a-neg', label: 'A-', color: 'bg-red-100 text-red-800' },
  { id: 'b-pos', label: 'B+', color: 'bg-red-100 text-red-800' },
  { id: 'b-neg', label: 'B-', color: 'bg-red-100 text-red-800' },
  { id: 'ab-pos', label: 'AB+', color: 'bg-purple-100 text-purple-800' },
  { id: 'ab-neg', label: 'AB-', color: 'bg-purple-100 text-purple-800' },
  { id: 'o-pos', label: 'O+', color: 'bg-blue-100 text-blue-800' },
  { id: 'o-neg', label: 'O-', color: 'bg-blue-100 text-blue-800' },
];

const EmergencyPage = () => {
  const [activeTab, setActiveTab] = useState('ambulance');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedAccidentType, setSelectedAccidentType] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [selectedBloodGroups, setSelectedBloodGroups] = useState<string[]>([]);
  const [unknownBloodGroup, setUnknownBloodGroup] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get user location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Geolocation error:', error)
      );
    }
  }, []);
  
  const handleSubmitAmbulance = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande d'ambulance envoyée",
      description: "Une équipe médicale sera bientôt en route vers votre position.",
    });
    setSuccessDialogOpen(true);
  };
  
  const handleSubmitAccident = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Signalement d'accident envoyé",
      description: "Les services d'urgence ont été alertés et sont en route.",
    });
    setSuccessDialogOpen(true);
  };
  
  const handleSubmitBloodRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande de sang envoyée",
      description: "Votre demande a été enregistrée et sera traitée en urgence.",
    });
    setSuccessDialogOpen(true);
  };

  const toggleBloodGroup = (groupId: string) => {
    if (unknownBloodGroup) {
      setUnknownBloodGroup(false);
    }
    
    if (selectedBloodGroups.includes(groupId)) {
      setSelectedBloodGroups(selectedBloodGroups.filter(g => g !== groupId));
    } else {
      setSelectedBloodGroups([...selectedBloodGroups, groupId]);
    }
  };
  
  const toggleUnknownGroup = () => {
    if (unknownBloodGroup) {
      setUnknownBloodGroup(false);
    } else {
      setSelectedBloodGroups([]);
      setUnknownBloodGroup(true);
    }
  };

  return (
    <div className="container max-w-screen-xl py-8 bg-gradient-to-b from-background to-blue-50/30 dark:from-background dark:to-blue-950/10 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center text-health-blue">Urgences Médicales</h1>
        <p className="text-center mb-8 text-muted-foreground">
          Services d'urgence disponibles 24h/24 et 7j/7 à travers toute la Guinée
        </p>
        
        <Alert className="mb-8 border-red-300 bg-red-50 dark:bg-red-950/30">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-600 flex items-center justify-between">
            <span>En cas d'urgence vitale</span>
            <QuickEmergencyButton />
          </AlertTitle>
          <AlertDescription>
            Appelez directement les services d'urgence au <span className="font-bold">115</span> ou le SAMU au <span className="font-bold">629 13 13 13</span>
          </AlertDescription>
        </Alert>
        
        <Tabs defaultValue="ambulance" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full mb-8">
            <TabsTrigger value="ambulance" className="text-base py-3 data-[state=active]:bg-health-blue data-[state=active]:text-white">
              <AmbulanceIcon className="mr-2 h-5 w-5" />
              Ambulance
            </TabsTrigger>
            <TabsTrigger value="accident" className="text-base py-3 data-[state=active]:bg-health-blue data-[state=active]:text-white">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Accident
            </TabsTrigger>
            <TabsTrigger value="blood" className="text-base py-3 data-[state=active]:bg-health-blue data-[state=active]:text-white">
              <Droplet className="mr-2 h-5 w-5" />
              Sang
            </TabsTrigger>
          </TabsList>
          
          {/* Ambulance Content */}
          <TabsContent value="ambulance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {ambulanceTypes.map((type) => (
                <motion.div 
                  key={type.id}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card 
                    className={`cursor-pointer h-full ${selectedService === type.id ? 'ring-2 ring-health-blue shadow-lg' : ''}`}
                    onClick={() => setSelectedService(type.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{type.name}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </div>
                        {selectedService === type.id && (
                          <div className="h-6 w-6 rounded-full bg-health-blue flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Tarif</span>
                        <span className="font-medium">{type.price}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-health-blue" />
                        <span className="text-sm">Temps d'arrivée estimé: {type.eta}</span>
                      </div>
                      <Separator className="my-3" />
                      <ul className="space-y-2">
                        {type.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-health-blue shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <form onSubmit={handleSubmitAmbulance} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-health-blue">Formulaire de demande d'ambulance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name">Nom du patient</Label>
                  <Input id="name" placeholder="Prénom et Nom" required />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+224 XXX XX XX XX" required />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="address">Adresse de prise en charge</Label>
                <Input id="address" placeholder="Adresse complète" required />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="details">Détails médicaux</Label>
                <Textarea id="details" placeholder="Décrivez l'état du patient et les symptômes" rows={3} />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="urgent" />
                <Label htmlFor="urgent" className="text-red-600">Situation urgente nécessitant une intervention immédiate</Label>
              </div>
              
              <Button type="submit" className="w-full bg-health-blue hover:bg-health-blue/90">
                <AmbulanceIcon className="mr-2 h-5 w-5" />
                Demander une ambulance
              </Button>
            </form>
          </TabsContent>
          
          {/* Accident Content */}
          <TabsContent value="accident" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {accidentTypes.map((type) => (
                <motion.div 
                  key={type.id}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card 
                    className={`cursor-pointer h-full ${selectedAccidentType === type.id ? 'ring-2 ring-health-blue shadow-lg' : ''}`}
                    onClick={() => setSelectedAccidentType(type.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{type.name}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                        </div>
                        {selectedAccidentType === type.id && (
                          <div className="h-6 w-6 rounded-full bg-health-blue flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <Activity className="h-4 w-4 text-health-blue" />
                          Niveaux de gravité
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {type.severity.map((level, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className={
                                idx === 0 ? "bg-yellow-100 text-yellow-800 border-yellow-200" : 
                                idx === 1 ? "bg-orange-100 text-orange-800 border-orange-200" :
                                "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <ClipboardList className="h-4 w-4 text-health-blue" />
                          Services d'intervention
                        </h4>
                        <ul className="space-y-1 text-sm">
                          {type.services.map((service, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="h-3 w-3 text-health-blue shrink-0 mt-0.5" />
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-2 text-sm text-muted-foreground">
                        Protocole: {type.protocol}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <form onSubmit={handleSubmitAccident} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-health-blue">Signaler un accident</h3>
              
              {selectedAccidentType && (
                <div className="space-y-3 mb-6">
                  <Label htmlFor="severity">Niveau de gravité</Label>
                  <RadioGroup 
                    defaultValue={selectedSeverity} 
                    onValueChange={setSelectedSeverity}
                    className="flex flex-wrap gap-4"
                  >
                    {accidentTypes.find(t => t.id === selectedAccidentType)?.severity.map((level, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={level} id={`severity-${idx}`} />
                        <Label htmlFor={`severity-${idx}`} className={
                          idx === 0 ? "text-yellow-700" : 
                          idx === 1 ? "text-orange-700" :
                          "text-red-700"
                        }>
                          {level}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="reporter">Votre nom</Label>
                  <Input id="reporter" placeholder="Prénom et Nom" required />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+224 XXX XX XX XX" required />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="accident-location">Lieu de l'accident</Label>
                <Input id="accident-location" placeholder="Adresse ou description précise du lieu" required />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="victims">Nombre approximatif de victimes</Label>
                <Input id="victims" type="number" min="1" defaultValue="1" required />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="accident-details">Description de l'accident</Label>
                <Textarea 
                  id="accident-details" 
                  placeholder="Décrivez l'accident et l'état des victimes avec le plus de détails possible" 
                  rows={4} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-health-blue hover:bg-health-blue/90">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Signaler cet accident
              </Button>
            </form>
          </TabsContent>
          
          {/* Blood Request Content */}
          <TabsContent value="blood" className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                  <Droplet className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-health-blue">Don de sang</h3>
                  <p className="text-muted-foreground">Votre don peut sauver des vies</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <p>
                  En cas d'urgence médicale nécessitant du sang, vous pouvez faire une demande rapide 
                  auprès des donneurs compatibles à proximité. Notre système contactera immédiatement 
                  les donneurs disponibles correspondant au groupe sanguin requis.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                  {bloodGroups.map((group) => (
                    <div 
                      key={group.id}
                      className={`p-3 ${group.color} border rounded-lg text-center cursor-pointer transition-all ${
                        selectedBloodGroups.includes(group.id) 
                          ? 'ring-2 ring-red-500 dark:ring-red-400 shadow-md' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => toggleBloodGroup(group.id)}
                    >
                      <div className="font-bold text-2xl mb-1">{group.label}</div>
                      <div className="text-xs">
                        {selectedBloodGroups.includes(group.id) ? (
                          <span className="flex items-center justify-center gap-1">
                            <Check className="h-3 w-3" /> Sélectionné
                          </span>
                        ) : 'Cliquez pour sélectionner'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmitBloodRequest} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-6 text-health-blue">Formulaire de demande de sang</h3>
              
              <div className="space-y-4 mb-6">
                <Label className="text-base font-medium">Groupe(s) sanguin(s) requis:</Label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                  {bloodGroups.map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`group-${group.id}`} 
                        checked={selectedBloodGroups.includes(group.id)}
                        onCheckedChange={() => toggleBloodGroup(group.id)}
                        disabled={unknownBloodGroup}
                        className={selectedBloodGroups.includes(group.id) ? "bg-red-600 text-white border-red-600" : ""}
                      />
                      <Label 
                        htmlFor={`group-${group.id}`}
                        className={`font-medium ${selectedBloodGroups.includes(group.id) ? "text-red-600" : ""}`}
                      >
                        {group.label}
                      </Label>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-2 mt-2 border-t pt-3">
                  <Checkbox 
                    id="unknown-group" 
                    checked={unknownBloodGroup}
                    onCheckedChange={() => toggleUnknownGroup()}
                  />
                  <Label htmlFor="unknown-group">Je ne connais pas le groupe sanguin requis</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="patient-name">Nom du patient</Label>
                  <Input id="patient-name" placeholder="Prénom et Nom" required />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="requester-phone">Votre téléphone</Label>
                  <Input id="requester-phone" placeholder="+224 XXX XX XX XX" required />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="hospital">Établissement médical</Label>
                <Input id="hospital" placeholder="Nom de l'hôpital ou de la clinique" required />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="urgency-level">Niveau d'urgence</Label>
                <RadioGroup defaultValue="urgent">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgency-urgent" />
                      <Label htmlFor="urgency-urgent" className="text-red-600 font-medium">Très urgent (immédiat)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="urgency-high" />
                      <Label htmlFor="urgency-high" className="text-orange-600">Urgent (24h)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="urgency-medium" />
                      <Label htmlFor="urgency-medium">Modéré (48-72h)</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="units">Nombre d'unités requises</Label>
                <Input id="units" type="number" min="1" defaultValue="1" required />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="additional-info">Informations supplémentaires</Label>
                <Textarea 
                  id="additional-info" 
                  placeholder="Précisez la raison de la demande (chirurgie, accident, etc.) et tout détail pertinent" 
                  rows={3} 
                />
              </div>
              
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                <Droplet className="mr-2 h-5 w-5" />
                Soumettre la demande de sang
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-clinic-green/20 flex items-center justify-center mb-4">
                <ThumbsUp className="h-6 w-6 text-clinic-green" />
              </div>
            </DialogTitle>
            <DialogTitle className="text-center text-2xl">
              {activeTab === 'ambulance' ? 'Ambulance en route' : 
               activeTab === 'accident' ? 'Signalement envoyé' : 
               'Demande de sang envoyée'}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {activeTab === 'ambulance' ? 
                'Une équipe médicale sera bientôt en route vers votre position.' : 
               activeTab === 'accident' ?
                'Les services d\'urgence ont été alertés et sont en route.' :
                'Votre demande de sang a été enregistrée et nous contactons les donneurs disponibles.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 pt-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-4">
              {activeTab === 'ambulance' ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="bg-health-blue/10 p-2 rounded-full">
                      <Loader className="h-5 w-5 text-health-blue animate-spin" />
                    </div>
                    <div>
                      <h4 className="font-medium">Préparation de l'équipe</h4>
                      <p className="text-sm text-muted-foreground">L'équipe médicale se prépare pour l'intervention</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-health-blue/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-health-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Temps d'arrivée estimé</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedService === 'intensive' ? '5-15 minutes' : 
                         selectedService === 'advanced' ? '10-20 minutes' : 
                         '15-25 minutes'}
                      </p>
                    </div>
                  </div>
                </>
              ) : activeTab === 'accident' ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="bg-health-blue/10 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-health-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Type d'accident signalé</h4>
                      <p className="text-sm text-muted-foreground">
                        {accidentTypes.find(t => t.id === selectedAccidentType)?.name || 'Accident'}
                        {selectedSeverity && ` - ${selectedSeverity}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-health-blue/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-health-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Temps d'intervention estimé</h4>
                      <p className="text-sm text-muted-foreground">10-15 minutes</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Droplet className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Groupes sanguins demandés</h4>
                      <p className="text-sm text-muted-foreground">
                        {unknownBloodGroup 
                          ? "À déterminer par le personnel médical"
                          : selectedBloodGroups.length > 0
                            ? selectedBloodGroups.map(id => bloodGroups.find(g => g.id === id)?.label).join(', ')
                            : "Aucun groupe spécifié"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Temps de réponse estimé</h4>
                      <p className="text-sm text-muted-foreground">1-2 heures</p>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex items-start gap-3">
                <div className="bg-health-blue/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-health-blue" />
                </div>
                <div>
                  <h4 className="font-medium">Numéro d'urgence</h4>
                  <p className="text-sm text-muted-foreground">115 ou 629 13 13 13</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setSuccessDialogOpen(false)} className="w-full">
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmergencyPage;
