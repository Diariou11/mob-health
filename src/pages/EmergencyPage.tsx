
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle,
  Ambulance, 
  Clock,
  MapPin,
  Phone,
  User,
  Heart,
  Circle,
  LocateFixed
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmergencyPage = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState('ambulance');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchingHelp, setSearchingHelp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [emergencyType, setEmergencyType] = useState('ambulance');
  
  const handleEmergencyRequest = (type: string) => {
    setEmergencyType(type);
    setShowConfirmDialog(true);
  };

  const confirmEmergency = () => {
    setShowConfirmDialog(false);
    setEmergencySubmitted(true);
    setLoadingLocation(true);
    
    // Simulate getting location
    setTimeout(() => {
      setLoadingLocation(false);
      setSearchingHelp(true);
      
      // Progress simulation
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 5;
        setProgress(progressValue);
        
        if (progressValue >= 100) {
          clearInterval(interval);
          setSearchingHelp(false);
          
          toast({
            title: "Aide en route",
            description: emergencyType === 'blood' 
              ? "Donneurs de sang O+ trouvés. 3 donneurs potentiels contactés." 
              : "Une ambulance a été envoyée à votre position. Arrivée estimée: 8 minutes.",
            duration: 6000,
          });
        }
      }, 250);
    }, 2000);
  };

  const cancelEmergency = () => {
    setEmergencySubmitted(false);
    setSearchingHelp(false);
    setProgress(0);
    
    toast({
      title: "Demande annulée",
      description: "Votre demande d'urgence a été annulée.",
    });
  };

  const resetEmergency = () => {
    setEmergencySubmitted(false);
    setSearchingHelp(false);
    setProgress(0);
  };

  return (
    <div className="container max-w-screen-xl py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="h-7 w-7 text-destructive" />
          <h1 className="text-2xl md:text-3xl font-bold">Module d'urgence</h1>
        </div>
        
        {!emergencySubmitted ? (
          <Tabs defaultValue={tab} onValueChange={setTab} className="space-y-8">
            <Alert className="mb-6 border-destructive/50 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Ce service est uniquement destiné aux urgences médicales réelles. Une utilisation inappropriée peut entraîner des sanctions.
              </AlertDescription>
            </Alert>
            
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="ambulance">
                <Ambulance className="h-4 w-4 mr-2" />
                Ambulance
              </TabsTrigger>
              <TabsTrigger value="blood">
                <Heart className="h-4 w-4 mr-2" />
                Besoin de sang
              </TabsTrigger>
              <TabsTrigger value="accident">
                <AlertCircle className="h-4 w-4 mr-2" />
                Accident
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ambulance">
              <EmergencyCard 
                title="Demande d'ambulance"
                description="Demandez une ambulance à votre position actuelle ou à une adresse spécifique."
                icon={<Ambulance className="h-5 w-5" />}
                onRequestEmergency={() => handleEmergencyRequest('ambulance')}
              />
            </TabsContent>
            
            <TabsContent value="blood">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2.5 rounded-full">
                      <Heart className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <CardTitle>Besoin urgent de sang</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Lancez un appel aux donneurs de sang compatibles à proximité.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Groupe sanguin requis</Label>
                      <RadioGroup defaultValue="O-positive">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="A-positive" id="A-positive" />
                            <Label htmlFor="A-positive">A+</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="A-negative" id="A-negative" />
                            <Label htmlFor="A-negative">A-</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="B-positive" id="B-positive" />
                            <Label htmlFor="B-positive">B+</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="B-negative" id="B-negative" />
                            <Label htmlFor="B-negative">B-</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="AB-positive" id="AB-positive" />
                            <Label htmlFor="AB-positive">AB+</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="AB-negative" id="AB-negative" />
                            <Label htmlFor="AB-negative">AB-</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="O-positive" id="O-positive" />
                            <Label htmlFor="O-positive">O+</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="O-negative" id="O-negative" />
                            <Label htmlFor="O-negative">O-</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Quantité nécessaire</Label>
                      <RadioGroup defaultValue="1-unit">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1-unit" id="1-unit" />
                            <Label htmlFor="1-unit">1 unité</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2-units" id="2-units" />
                            <Label htmlFor="2-units">2 unités</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3-units" id="3-units" />
                            <Label htmlFor="3-units">3+ unités</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Établissement de santé</Label>
                      <Input placeholder="Nom de l'hôpital ou de la clinique" defaultValue="Hôpital National Donka" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Raison du besoin (optionnel)</Label>
                      <Textarea placeholder="Expliquez brièvement pourquoi ce sang est nécessaire" />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-2">
                  <Button 
                    className="w-full text-white bg-red-600 hover:bg-red-700"
                    onClick={() => handleEmergencyRequest('blood')}
                  >
                    Lancer l'appel aux donneurs
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Cette requête sera envoyée aux donneurs compatibles dans un rayon de 10 km.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="accident">
              <EmergencyCard 
                title="Signaler un accident"
                description="Signalez un accident et demandez de l'aide d'urgence."
                icon={<AlertCircle className="h-5 w-5" />}
                onRequestEmergency={() => handleEmergencyRequest('accident')}
              />
            </TabsContent>
            
            <div className="mt-8">
              <h2 className="text-xl font-medium mb-4">Services d'urgence à proximité</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Hôpital National Donka</CardTitle>
                      <Badge className="bg-green-600">Ouvert</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>2.5 km • Conakry, Guinée</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>+224 628 12 34 56</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Urgences 24/7
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Banque de sang
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-base">Clinique Ambroise Paré</CardTitle>
                      <Badge className="bg-green-600">Ouvert</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>5.7 km • Camayenne, Conakry</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>+224 625 11 22 33</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Urgences
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        ) : (
          <EmergencyStatus 
            loadingLocation={loadingLocation}
            searchingHelp={searchingHelp}
            progress={progress}
            onCancel={cancelEmergency}
            onReset={resetEmergency}
            emergencyType={emergencyType}
          />
        )}
      </div>
      
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Confirmer la demande d'urgence</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center mb-4">
              Êtes-vous sûr de vouloir envoyer cette demande d'urgence ? 
              Ce service est réservé aux situations d'urgence réelles.
            </p>
            <div className="flex justify-center">
              <div className="bg-red-100 p-3 rounded-full">
                {emergencyType === 'ambulance' && <Ambulance className="h-8 w-8 text-red-600" />}
                {emergencyType === 'blood' && <Heart className="h-8 w-8 text-red-600" />}
                {emergencyType === 'accident' && <AlertCircle className="h-8 w-8 text-red-600" />}
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="sm:flex-1"
              onClick={() => setShowConfirmDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              className="sm:flex-1 bg-red-600 hover:bg-red-700"
              onClick={confirmEmergency}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const EmergencyCard = ({ 
  title, 
  description, 
  icon, 
  onRequestEmergency 
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  onRequestEmergency: () => void;
}) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="bg-red-100 p-2.5 rounded-full">
          {icon}
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </CardHeader>
    
    <CardContent>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Votre position actuelle</Label>
          <div className="flex gap-2">
            <Input 
              className="flex-1" 
              placeholder="Adresse ou localisation" 
              defaultValue="Localisation GPS automatique"
            />
            <Button variant="outline" size="icon">
              <LocateFixed className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Nature de l'urgence</Label>
          <RadioGroup defaultValue="medical">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medical" id="medical" />
                <Label htmlFor="medical">Urgence médicale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accident" id="accident-type" />
                <Label htmlFor="accident-type">Accident</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pregnancy" id="pregnancy" />
                <Label htmlFor="pregnancy">Grossesse / Accouchement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Autre urgence</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label>Informations complémentaires (optionnel)</Label>
          <Textarea placeholder="Décrivez brièvement la situation d'urgence" />
        </div>
      </div>
    </CardContent>
    
    <CardFooter className="flex flex-col space-y-2">
      <Button 
        className="w-full text-white bg-red-600 hover:bg-red-700"
        onClick={onRequestEmergency}
      >
        Demander une ambulance en urgence
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Une notification sera envoyée aux services d'urgence les plus proches.
      </p>
    </CardFooter>
  </Card>
);

const EmergencyStatus = ({ 
  loadingLocation,
  searchingHelp,
  progress,
  onCancel,
  onReset,
  emergencyType
}: {
  loadingLocation: boolean;
  searchingHelp: boolean;
  progress: number;
  onCancel: () => void;
  onReset: () => void;
  emergencyType: string;
}) => {
  return (
    <div className="mt-8">
      {loadingLocation ? (
        <Card className="border-2 border-destructive">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-red-100 p-4 rounded-full"
              >
                <LocateFixed className="h-8 w-8 text-red-600" />
              </motion.div>
              <h2 className="text-xl font-semibold">Localisation en cours...</h2>
              <p className="text-muted-foreground text-center">
                Nous déterminons votre position exacte pour envoyer de l'aide.
              </p>
              
              <div className="flex items-center justify-center w-16 h-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
              
              <Button 
                variant="outline" 
                className="border-destructive text-destructive hover:bg-destructive/10 mt-4"
                onClick={onCancel}
              >
                Annuler la demande
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : searchingHelp ? (
        <Card className="border-2 border-destructive">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center space-y-4 w-full">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-red-100 p-4 rounded-full"
              >
                {emergencyType === 'ambulance' && <Ambulance className="h-8 w-8 text-red-600" />}
                {emergencyType === 'blood' && <Heart className="h-8 w-8 text-red-600" />}
                {emergencyType === 'accident' && <AlertCircle className="h-8 w-8 text-red-600" />}
              </motion.div>
              
              <h2 className="text-xl font-semibold">
                {emergencyType === 'blood' ? 'Recherche de donneurs...' : 'Recherche d\'une ambulance...'}
              </h2>
              
              <div className="w-full max-w-md">
                <Progress value={progress} className="h-2" />
              </div>
              
              <p className="text-muted-foreground text-center">
                {emergencyType === 'blood' 
                  ? 'Notification envoyée aux donneurs compatibles à proximité...' 
                  : 'Alerte envoyée aux services d\'urgence les plus proches...'}
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <Circle className="h-3 w-3 fill-red-600 animate-pulse" />
                <span className="text-sm font-medium">Demande en cours</span>
              </div>
              
              <Button 
                variant="outline" 
                className="border-destructive text-destructive hover:bg-destructive/10 mt-4"
                onClick={onCancel}
              >
                Annuler la demande
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-green-600">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-green-100 p-4 rounded-full"
              >
                {emergencyType === 'ambulance' && <Ambulance className="h-8 w-8 text-green-600" />}
                {emergencyType === 'blood' && <Heart className="h-8 w-8 text-green-600" />}
                {emergencyType === 'accident' && <AlertCircle className="h-8 w-8 text-green-600" />}
              </motion.div>
              
              <h2 className="text-xl font-semibold">
                {emergencyType === 'blood' ? 'Donneurs trouvés!' : 'Ambulance en route!'}
              </h2>
              
              <p className="text-center">
                {emergencyType === 'blood' 
                  ? '3 donneurs de sang compatibles ont été notifiés et sont en route vers l\'hôpital.' 
                  : 'Une ambulance a été envoyée à votre position. Temps d\'arrivée estimé: 8 minutes.'}
              </p>
              
              <div className="bg-slate-50 rounded-lg p-4 w-full max-w-md">
                {emergencyType === 'blood' ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Donneur 1 (O+)</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        En route
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Donneur 2 (O+)</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Confirme
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Donneur 3 (O+)</span>
                      </div>
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                        Notifié
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Ambulance className="h-4 w-4 text-muted-foreground" />
                        <span>Ambulance #A-123</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        En route
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Arrivée estimée: 8 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Distance: 3.2 km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>Contact: +224 622 33 44 55</span>
                    </div>
                  </div>
                )}
              </div>
              
              <Button 
                className="bg-clinic-green hover:bg-clinic-green/90 mt-4"
                onClick={onReset}
              >
                Fermer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmergencyPage;
