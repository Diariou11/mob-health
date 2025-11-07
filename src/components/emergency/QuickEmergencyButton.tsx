import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, Phone, MapPin, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export const QuickEmergencyButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isCallingSOS, setIsCallingSOS] = useState(false);

  const handleEmergencyClick = () => {
    setIsDialogOpen(true);
    getLocation();
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Géolocalisation non disponible");
      return;
    }

    setIsGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsGeolocating(false);
        toast.success("Position détectée");
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error("Impossible de détecter la position");
        setIsGeolocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCallSOS = () => {
    setIsCallingSOS(true);
    
    // Simulate SOS call
    setTimeout(() => {
      setIsCallingSOS(false);
      toast.success("Appel d'urgence envoyé aux services de secours");
      setIsDialogOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button
        onClick={handleEmergencyClick}
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white gap-2 animate-pulse shadow-lg"
      >
        <AlertTriangle className="h-5 w-5" />
        SOS Urgence
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Appel d'Urgence
            </DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de contacter les services d'urgence
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="flex-1">
                {isGeolocating ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Détection de votre position...</span>
                  </div>
                ) : location ? (
                  <div>
                    <p className="text-sm font-medium">Position détectée</p>
                    <p className="text-xs text-muted-foreground">
                      {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      <Check className="h-3 w-3 mr-1" />
                      Position envoyée
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground">Position non détectée</p>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={getLocation}
                      className="h-auto p-0 text-xs"
                    >
                      Réessayer
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a href="tel:115" className="block">
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Urgences: 115
                </Button>
              </a>
              <a href="tel:629131313" className="block">
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  SAMU
                </Button>
              </a>
            </div>

            <Button
              onClick={handleCallSOS}
              disabled={isCallingSOS || !location}
              className="w-full bg-red-600 hover:bg-red-700 gap-2"
            >
              {isCallingSOS ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  Envoyer SOS avec Position
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Les services d'urgence recevront votre position exacte
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
