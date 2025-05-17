
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  User, 
  FileText, 
  Calendar, 
  Activity, 
  Clock, 
  Pill, 
  Clipboard, 
  Heart, 
  ChevronRight, 
  Plus,
  Copy,
  MapPin,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PatientPage = () => {
  const { toast } = useToast();
  const [patientId] = useState(() => {
    const savedId = localStorage.getItem('MOBHealth_PatientID');
    if (savedId) return savedId;
    
    const newId = uuidv4().substring(0, 12).toUpperCase();
    localStorage.setItem('MOBHealth_PatientID', newId);
    return newId;
  });
  
  const copyPatientId = () => {
    navigator.clipboard.writeText(patientId);
    toast({
      title: "ID copié",
      description: "Votre identifiant médical a été copié dans le presse-papiers.",
    });
  };

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Mamadou Diallo",
      specialty: "Cardiologie",
      location: "Hôpital National Donka",
      date: "12/06/2025",
      time: "09:30",
      status: "upcoming"
    },
    {
      id: 2,
      doctor: "Dr. Fatoumata Camara",
      specialty: "Pédiatrie",
      location: "Clinique Ambroise Paré",
      date: "28/05/2025",
      time: "14:15",
      status: "completed"
    }
  ];

  const medications = [
    {
      id: 1,
      name: "Paracétamol",
      dosage: "500mg",
      frequency: "3 fois par jour",
      duration: "5 jours",
      remaining: 12
    },
    {
      id: 2,
      name: "Amoxicilline",
      dosage: "250mg",
      frequency: "2 fois par jour",
      duration: "7 jours",
      remaining: 8
    }
  ];

  const allergies = ["Pénicilline", "Arachides"];
  const conditions = ["Hypertension", "Asthme"];

  return (
    <div className="container max-w-screen-xl py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Patient info sidebar */}
        <div className="md:w-72 lg:w-80 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <Badge className="bg-clinic-green">Vérifié</Badge>
              </div>
              <CardTitle className="mt-2">Mariama Keita</CardTitle>
              <CardDescription>Née le 15/03/1992</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Identifiant médical unique</p>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-md">
                    <code className="text-sm font-mono font-bold">{patientId}</code>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={copyPatientId}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Groupe sanguin</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      O+
                    </Badge>
                    <span className="text-xs text-muted-foreground">(Donneuse universelle)</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Contact d'urgence</p>
                  <p className="text-sm">Ibrahim Keita (Frère)</p>
                  <p className="text-sm">+224 621 23 45 67</p>
                </div>
              </div>
              
              <div className="border-t mt-6 pt-4">
                <Button 
                  variant="outline"
                  className="w-full mb-2"
                >
                  Modifier profil
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-destructive text-destructive hover:bg-destructive/10"
                >
                  Contact d'urgence
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informations médicales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {allergies.map(allergy => (
                    <Badge key={allergy} variant="outline" className="bg-amber-50 border-amber-200 text-amber-700">
                      {allergy}
                    </Badge>
                  ))}
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Conditions médicales</p>
                <div className="flex flex-wrap gap-2">
                  {conditions.map(condition => (
                    <Badge key={condition} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                Voir dossier médical complet
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Mon Espace Patient</h1>
          
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-xl mb-6">
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="medications">Médicaments</TabsTrigger>
              <TabsTrigger value="records">Dossiers</TabsTrigger>
              <TabsTrigger value="results">Résultats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Rendez-vous à venir</CardTitle>
                    <Button>
                      Nouveau rendez-vous
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {appointments.filter(app => app.status === 'upcoming').map(appointment => (
                    <div key={appointment.id} className="flex border-b last:border-0 pb-4 mb-4 last:mb-0 last:pb-0">
                      <div className="mr-4 bg-health-blue/10 p-2 rounded-full h-fit">
                        <Calendar className="h-5 w-5 text-health-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{appointment.doctor}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        
                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{appointment.time}, {appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {appointments.filter(app => app.status === 'upcoming').length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">Aucun rendez-vous à venir</p>
                      <Button variant="link" className="mt-2">
                        Planifier un rendez-vous
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Historique des rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.filter(app => app.status === 'completed').map(appointment => (
                    <div key={appointment.id} className="flex border-b last:border-0 pb-4 mb-4 last:mb-0 last:pb-0">
                      <div className="mr-4 bg-muted p-2 rounded-full h-fit">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{appointment.doctor}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          </div>
                          <Badge variant="outline">Terminé</Badge>
                        </div>
                        
                        <div className="mt-2 flex items-center gap-3 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{appointment.time}, {appointment.date}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medications" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Médicaments actuels</CardTitle>
                </CardHeader>
                <CardContent>
                  {medications.map(medication => (
                    <div key={medication.id} className="flex border-b last:border-0 pb-4 mb-4 last:mb-0 last:pb-0">
                      <div className="mr-4 bg-clinic-green/10 p-2 rounded-full h-fit">
                        <Pill className="h-5 w-5 text-clinic-green" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{medication.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {medication.dosage} • {medication.frequency}
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {medication.remaining} restants
                          </Badge>
                        </div>
                        
                        <div className="mt-2 text-sm flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>Durée: {medication.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Renouvellement</CardTitle>
                    <Button>
                      Demander
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">
                      Vous pouvez demander un renouvellement de vos ordonnances auprès de vos médecins.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="records" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Dossier Médical Électronique</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-24 flex-col gap-2 justify-center text-left items-start px-4">
                      <div className="flex items-center gap-2 text-health-blue">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">Consultations</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Historique de toutes vos consultations médicales
                      </p>
                    </Button>
                    
                    <Button variant="outline" className="h-24 flex-col gap-2 justify-center text-left items-start px-4">
                      <div className="flex items-center gap-2 text-health-blue">
                        <Activity className="h-5 w-5" />
                        <span className="font-medium">Antécédents</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Historique médical personnel et familial
                      </p>
                    </Button>
                    
                    <Button variant="outline" className="h-24 flex-col gap-2 justify-center text-left items-start px-4">
                      <div className="flex items-center gap-2 text-health-blue">
                        <Clipboard className="h-5 w-5" />
                        <span className="font-medium">Vaccinations</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Carnet de vaccination et rappels
                      </p>
                    </Button>
                    
                    <Button variant="outline" className="h-24 flex-col gap-2 justify-center text-left items-start px-4">
                      <div className="flex items-center gap-2 text-health-blue">
                        <Heart className="h-5 w-5" />
                        <span className="font-medium">Mesures vitales</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Tension, pouls, température et autres mesures
                      </p>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Documents médicaux</CardTitle>
                    <Button>
                      Télécharger
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Résumé médical</p>
                          <p className="text-xs text-muted-foreground">Ajouté le 25/04/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Ordonnance - Dr. Diallo</p>
                          <p className="text-xs text-muted-foreground">Ajouté le 12/04/2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Résultats d'examens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-health-blue" />
                        <div>
                          <p className="font-medium">Analyse de sang complète</p>
                          <p className="text-xs text-muted-foreground">
                            Hôpital National Donka • 28/04/2025
                          </p>
                        </div>
                      </div>
                      <Badge>Nouveau</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Radiographie pulmonaire</p>
                          <p className="text-xs text-muted-foreground">
                            Clinique Pasteur • 15/03/2025
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Ajouter de nouveaux résultats</h3>
                    <div className="flex gap-2">
                      <Input type="file" className="flex-1" />
                      <Button>
                        Téléverser
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
