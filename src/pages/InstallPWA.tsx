import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, CheckCircle, Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-4">
              Installer MOB-Health Africa
            </CardTitle>
            <CardDescription className="text-white/80 text-lg">
              Profitez de l'application même hors ligne, directement depuis votre appareil
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isInstalled ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="h-20 w-20 text-clinic-green mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Application déjà installée !
                </h3>
                <p className="text-white/80">
                  Vous pouvez maintenant accéder à MOB-Health depuis votre écran d'accueil
                </p>
              </motion.div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <Smartphone className="h-10 w-10 text-health-blue mb-2" />
                      <CardTitle className="text-white">Sur Mobile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-white/80">
                        <li>✓ Accès rapide depuis l'écran d'accueil</li>
                        <li>✓ Fonctionne hors ligne</li>
                        <li>✓ Notifications push</li>
                        <li>✓ Économise de l'espace</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <Monitor className="h-10 w-10 text-clinic-green mb-2" />
                      <CardTitle className="text-white">Sur Ordinateur</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-white/80">
                        <li>✓ Fenêtre dédiée</li>
                        <li>✓ Expérience similaire à une app</li>
                        <li>✓ Accès direct depuis le bureau</li>
                        <li>✓ Mise à jour automatique</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {deferredPrompt ? (
                  <Button
                    onClick={handleInstall}
                    size="lg"
                    className="w-full bg-health-blue hover:bg-health-blue/80 text-white"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Installer l'application
                  </Button>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-white/80 mb-4">
                      Pour installer l'application sur votre appareil :
                    </p>
                    <div className="space-y-2 text-left bg-white/5 p-4 rounded-lg text-white/80">
                      <p><strong>Sur Chrome (Android) :</strong> Menu → Installer l'application</p>
                      <p><strong>Sur Safari (iOS) :</strong> Partager → Sur l'écran d'accueil</p>
                      <p><strong>Sur Chrome/Edge (Desktop) :</strong> Icône d'installation dans la barre d'adresse</p>
                    </div>
                  </div>
                )}

                <div className="text-center text-sm text-white/60">
                  L'application sera toujours synchronisée avec la version en ligne
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InstallPWA;
