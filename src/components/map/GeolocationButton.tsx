import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Crosshair, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface GeolocationButtonProps {
  onLocationFound: (coords: [number, number]) => void;
}

export const GeolocationButton = ({ onLocationFound }: GeolocationButtonProps) => {
  const [isLocating, setIsLocating] = useState(false);

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error("Géolocalisation non supportée par votre navigateur");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.longitude,
          position.coords.latitude
        ];
        onLocationFound(coords);
        toast.success("Position détectée !");
        setIsLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error("Impossible de détecter votre position");
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  return (
    <Button
      onClick={handleGeolocation}
      disabled={isLocating}
      variant="outline"
      size="sm"
      className="gap-2 shadow-md"
    >
      {isLocating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Crosshair className="h-4 w-4" />
      )}
      Ma Position
    </Button>
  );
};
