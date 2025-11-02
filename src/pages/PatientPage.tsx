
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  User, Calendar, FileText, AlarmClock, 
  Pill, Heart, Activity, Stethoscope, 
  ClipboardCheck, MapPin, Phone, AlertCircle, Shield as ShieldIcon
} from 'lucide-react';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';

// Type définition pour les données médicales
interface MedicalData {
  consultations: Consultation[];
  antecedents: Antecedent[];
  vaccinations: Vaccination[];
  metrics: Metric[];
}

interface Consultation {
  id: number;
  date: string;
  doctor: string;
  facility: string;
  reason: string;
  diagnosis: string;
  prescription?: string;
  followUp?: string;
}

interface Antecedent {
  id: number;
  type: string;
  description: string;
  date: string;
  severity: "low" | "medium" | "high";
}

interface Vaccination {
  id: number;
  name: string;
  date: string;
  nextDose?: string;
  facility: string;
}

interface Metric {
  id: number;
  date: string;
  weight?: number;
  height?: number;
  bloodPressure?: string;
  bloodGlucose?: number;
  temperature?: number;
  notes?: string;
}

const dummyMedicalData: MedicalData = {
  consultations: [
    {
      id: 1,
      date: "12/04/2025",
      doctor: "Dr. Mamadou Diallo",
      facility: "Hôpital National Donka",
      reason: "Fièvre et maux de tête",
      diagnosis: "Paludisme non compliqué",
      prescription: "Coartem 80/480mg - 1 comprimé toutes les 8 heures pendant 3 jours",
      followUp: "Dans une semaine si les symptômes persistent"
    },
    {
      id: 2,
      date: "23/02/2025",
      doctor: "Dr. Aissatou Barry",
      facility: "Clinique Pasteur",
      reason: "Douleurs lombaires",
      diagnosis: "Contracture musculaire",
      prescription: "Paracetamol 1000mg - 1 comprimé toutes les 6 heures pendant 5 jours\nMyorelaxant - 1 comprimé matin et soir pendant 7 jours",
    },
    {
      id: 3,
      date: "05/01/2025",
      doctor: "Dr. Ibrahima Bah",
      facility: "Centre de Santé Matam",
      reason: "Consultation de routine",
      diagnosis: "Examen normal, aucune anomalie détectée",
    }
  ],
  antecedents: [
    {
      id: 1,
      type: "Allergie",
      description: "Allergie à la pénicilline",
      date: "Depuis l'enfance",
      severity: "high"
    },
    {
      id: 2,
      type: "Chirurgie",
      description: "Appendicectomie",
      date: "Juillet 2022",
      severity: "medium"
    },
    {
      id: 3,
      type: "Maladie chronique",
      description: "Hypertension artérielle légère",
      date: "Diagnostiquée en 2024",
      severity: "low"
    }
  ],
  vaccinations: [
    {
      id: 1,
      name: "COVID-19 (Pfizer)",
      date: "15/01/2023",
      nextDose: "Rappel recommandé en 2026",
      facility: "Centre de vaccination Kaloum"
    },
    {
      id: 2,
      name: "Fièvre jaune",
      date: "20/06/2022",
      facility: "Hôpital Ignace Deen"
    },
    {
      id: 3,
      name: "Hépatite B (dose 3/3)",
      date: "10/12/2021",
      facility: "Clinique Ambroise Paré"
    }
  ],
  metrics: [
    {
      id: 1,
      date: "12/04/2025",
      weight: 72.5,
      height: 175,
      bloodPressure: "128/82",
      temperature: 37.2,
      notes: "Patient stable"
    },
    {
      id: 2,
      date: "23/02/2025",
      weight: 73.0,
      bloodPressure: "130/85",
      bloodGlucose: 5.4,
      temperature: 36.8
    },
    {
      id: 3,
      date: "05/01/2025",
      weight: 72.8,
      bloodPressure: "125/80",
      temperature: 36.5
    }
  ]
};

const PatientPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [medicalData, setMedicalData] = useState<MedicalData>(dummyMedicalData);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [selectedAntecedent, setSelectedAntecedent] = useState<Antecedent | null>(null);
  const [selectedVaccination, setSelectedVaccination] = useState<Vaccination | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);

  return (
    <div className="container max-w-screen-xl py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <User className="mr-2 h-7 w-7 text-health-blue" />
        Mon Espace Patient
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div>
          <Card className="sticky top-24 bg-white dark:bg-card">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-health-blue flex items-center justify-center text-white font-bold text-xl">
                  MD
                </div>
                <div>
                  <CardTitle>Mamadou Doumbouya</CardTitle>
                  <CardDescription>ID: GN-2025-76542</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-health-blue" />
                  <span className="text-sm">05/10/1985</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-health-blue" />
                  <span className="text-sm">Conakry, Guinée</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-health-blue" />
                  <span className="text-sm">+224 621 23 45 67</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-2">
              <Button variant="outline" className="w-full">Modifier profil</Button>
              <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-clinic-green hover:bg-clinic-green/80">
                    Prendre un nouveau rendez-vous
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Prendre un nouveau rendez-vous</DialogTitle>
                  </DialogHeader>
                  <AppointmentForm 
                    onSuccess={() => setAppointmentDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
        
        {/* Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="medical-record" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="profile">Mon Profil</TabsTrigger>
              <TabsTrigger value="medical-record">Dossier Médical</TabsTrigger>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5 text-health-blue" />
                    Informations Personnelles
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Nom complet</p>
                      <p>Mamadou Doumbouya</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Date de naissance</p>
                      <p>05/10/1985</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Sexe</p>
                      <p>Masculin</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Groupe sanguin</p>
                      <p>O+</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p>Quartier Matam, Conakry, Guinée</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p>+224 621 23 45 67</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>m.doumbouya@example.com</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Contact d'urgence</p>
                      <p>Fanta Camara - +224 660 78 90 12 (Épouse)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShieldIcon className="mr-2 h-5 w-5 text-health-blue" />
                    Assurance Maladie
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Organisme</p>
                        <p>Caisse Nationale d'Assurance Maladie de Guinée</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Numéro d'assuré</p>
                        <p>CNAMG-985421-76</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Type de couverture</p>
                        <p>Complète (80%)</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Date d'expiration</p>
                        <p>31/12/2026</p>
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Information</AlertTitle>
                      <AlertDescription>
                        Votre couverture santé est active et à jour. Pensez à renouveler votre adhésion avant décembre 2026.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Medical Record Tab */}
            <TabsContent value="medical-record">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-health-blue" />
                    Dossier Médical Électronique
                  </CardTitle>
                  <CardDescription>
                    Consultez votre historique médical et vos informations de santé
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Tabs defaultValue="consultations" className="space-y-4">
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                      <TabsTrigger value="consultations" className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4" />
                        <span className="hidden md:inline">Consultations</span>
                      </TabsTrigger>
                      <TabsTrigger value="antecedents" className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4" />
                        <span className="hidden md:inline">Antécédents</span>
                      </TabsTrigger>
                      <TabsTrigger value="vaccinations" className="flex items-center gap-2">
                        <Pill className="h-4 w-4" />
                        <span className="hidden md:inline">Vaccinations</span>
                      </TabsTrigger>
                      <TabsTrigger value="metrics" className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        <span className="hidden md:inline">Mesures vitales</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    {/* Consultations */}
                    <TabsContent value="consultations" className="space-y-4">
                      {medicalData.consultations.map(consultation => (
                        <Dialog key={consultation.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:bg-blue-50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{consultation.date}</p>
                                    <p className="text-sm text-muted-foreground">{consultation.facility}</p>
                                    <p className="text-sm">{consultation.diagnosis}</p>
                                  </div>
                                  <Button variant="ghost" size="sm">Voir détails</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Calendar className="h-5 w-5 mr-2 text-health-blue" />
                                Consultation du {consultation.date}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Médecin</p>
                                  <p className="font-medium">{consultation.doctor}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Établissement</p>
                                  <p>{consultation.facility}</p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground">Motif de consultation</p>
                                <p>{consultation.reason}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground">Diagnostic</p>
                                <p className="font-medium">{consultation.diagnosis}</p>
                              </div>
                              
                              {consultation.prescription && (
                                <div>
                                  <p className="text-sm text-muted-foreground">Prescription</p>
                                  <div className="bg-blue-50 p-3 rounded-md mt-1">
                                    {consultation.prescription.split('\n').map((line, i) => (
                                      <p key={i} className="text-sm">{line}</p>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {consultation.followUp && (
                                <div>
                                  <p className="text-sm text-muted-foreground">Suivi</p>
                                  <p>{consultation.followUp}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </TabsContent>
                    
                    {/* Antécédents */}
                    <TabsContent value="antecedents" className="space-y-4">
                      {medicalData.antecedents.map(antecedent => (
                        <Dialog key={antecedent.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:bg-blue-50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <p className="font-medium">{antecedent.type}</p>
                                      <Badge 
                                        className={
                                          antecedent.severity === "high" ? "bg-red-500 ml-2" :
                                          antecedent.severity === "medium" ? "bg-amber-500 ml-2" :
                                          "bg-green-500 ml-2"
                                        }
                                      >
                                        {antecedent.severity === "high" ? "Grave" : 
                                          antecedent.severity === "medium" ? "Modéré" : "Léger"}
                                      </Badge>
                                    </div>
                                    <p className="text-sm">{antecedent.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{antecedent.date}</p>
                                  </div>
                                  <Button variant="ghost" size="sm">Voir détails</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <ClipboardCheck className="h-5 w-5 mr-2 text-health-blue" />
                                {antecedent.type}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="font-medium">{antecedent.description}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p>{antecedent.date}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground">Gravité</p>
                                <Badge 
                                  className={
                                    antecedent.severity === "high" ? "bg-red-500" :
                                    antecedent.severity === "medium" ? "bg-amber-500" :
                                    "bg-green-500"
                                  }
                                >
                                  {antecedent.severity === "high" ? "Grave" : 
                                    antecedent.severity === "medium" ? "Modéré" : "Léger"}
                                </Badge>
                              </div>
                              
                              <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                                <p className="text-sm flex items-center">
                                  <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                                  Cette information sera visible par tout médecin qui vous soigne via la plateforme MOB-Health.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </TabsContent>
                    
                    {/* Vaccinations */}
                    <TabsContent value="vaccinations" className="space-y-4">
                      {medicalData.vaccinations.map(vaccination => (
                        <Dialog key={vaccination.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:bg-blue-50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{vaccination.name}</p>
                                    <p className="text-sm text-muted-foreground">{vaccination.date}</p>
                                    <p className="text-sm">{vaccination.facility}</p>
                                  </div>
                                  <Button variant="ghost" size="sm">Voir détails</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Pill className="h-5 w-5 mr-2 text-health-blue" />
                                Vaccination: {vaccination.name}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Date d'administration</p>
                                <p className="font-medium">{vaccination.date}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground">Établissement</p>
                                <p>{vaccination.facility}</p>
                              </div>
                              
                              {vaccination.nextDose && (
                                <div>
                                  <p className="text-sm text-muted-foreground">Prochaine dose</p>
                                  <p>{vaccination.nextDose}</p>
                                </div>
                              )}
                              
                              <div className="bg-clinic-green/10 p-3 rounded-md border border-clinic-green/20">
                                <p className="text-sm flex items-center text-clinic-green-700">
                                  <Heart className="h-4 w-4 mr-2 text-clinic-green" />
                                  Cette vaccination est à jour dans votre carnet de vaccination numérique.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </TabsContent>
                    
                    {/* Mesures Vitales */}
                    <TabsContent value="metrics" className="space-y-4">
                      {medicalData.metrics.map(metric => (
                        <Dialog key={metric.id}>
                          <DialogTrigger asChild>
                            <Card className="cursor-pointer hover:bg-blue-50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{metric.date}</p>
                                    {metric.bloodPressure && (
                                      <div className="flex items-center gap-2">
                                        <Heart className="h-4 w-4 text-health-blue" />
                                        <p className="text-sm">{metric.bloodPressure} mmHg</p>
                                      </div>
                                    )}
                                    {metric.weight && (
                                      <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-health-blue" />
                                        <p className="text-sm">{metric.weight} kg</p>
                                      </div>
                                    )}
                                  </div>
                                  <Button variant="ghost" size="sm">Voir détails</Button>
                                </div>
                              </CardContent>
                            </Card>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle className="flex items-center">
                                <Activity className="h-5 w-5 mr-2 text-health-blue" />
                                Mesures vitales du {metric.date}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                {metric.weight && (
                                  <div>
                                    <p className="text-sm text-muted-foreground">Poids</p>
                                    <p className="font-medium">{metric.weight} kg</p>
                                  </div>
                                )}
                                
                                {metric.height && (
                                  <div>
                                    <p className="text-sm text-muted-foreground">Taille</p>
                                    <p className="font-medium">{metric.height} cm</p>
                                  </div>
                                )}
                                
                                {metric.bloodPressure && (
                                  <div>
                                    <p className="text-sm text-muted-foreground">Tension artérielle</p>
                                    <p className="font-medium">{metric.bloodPressure} mmHg</p>
                                  </div>
                                )}
                                
                                {metric.temperature && (
                                  <div>
                                    <p className="text-sm text-muted-foreground">Température</p>
                                    <p className="font-medium">{metric.temperature} °C</p>
                                  </div>
                                )}
                                
                                {metric.bloodGlucose && (
                                  <div>
                                    <p className="text-sm text-muted-foreground">Glycémie</p>
                                    <p className="font-medium">{metric.bloodGlucose} mmol/L</p>
                                  </div>
                                )}
                              </div>
                              
                              {metric.notes && (
                                <div>
                                  <p className="text-sm text-muted-foreground">Notes</p>
                                  <p>{metric.notes}</p>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Appointments Tab */}
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-health-blue" />
                    Mes Rendez-vous
                  </CardTitle>
                  <CardDescription>
                    Gérez vos rendez-vous médicaux et consultations à venir
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-health-blue/10 flex items-center justify-center text-health-blue">
                              <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">Consultation Dr. Mamadou Diallo</p>
                              <p className="text-sm text-muted-foreground">Vendredi 25 mai 2025, 10:30</p>
                              <p className="text-sm">Hôpital National Donka</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:self-center">
                            <Button variant="outline" size="sm">Reporter</Button>
                            <Button variant="destructive" size="sm">Annuler</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-health-blue/10 flex items-center justify-center text-health-blue">
                              <AlarmClock className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-medium">Suivi post-opératoire</p>
                              <p className="text-sm text-muted-foreground">Mercredi 12 juin 2025, 14:00</p>
                              <p className="text-sm">Clinique Pasteur</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:self-center">
                            <Button variant="outline" size="sm">Reporter</Button>
                            <Button variant="destructive" size="sm">Annuler</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="text-center py-4">
                      <Button className="bg-health-blue hover:bg-health-blue/90">
                        Prendre un nouveau rendez-vous
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

const Shield = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2s8 3 8 10v3.5c0 1.4-.7 2.7-1.8 3.5l-3.1 2.4a4.8 4.8 0 0 1-6.2 0l-3.1-2.4C4.7 18.2 4 16.9 4 15.5V12c0-7 8-10 8-10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
};

export default PatientPage;
