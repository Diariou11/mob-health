
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const UssdPage = () => {
  const [screen, setScreen] = useState<'intro' | 'menu' | 'hospitals' | 'emergency' | 'result'>('intro');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const isMobile = useIsMobile();
  
  const handleSubmit = () => {
    if (screen === 'intro') {
      // Show the main menu
      setScreen('menu');
      setInput('');
    } else if (screen === 'menu') {
      // Process menu selection
      if (input === '1') {
        setScreen('hospitals');
        setInput('');
      } else if (input === '2') {
        setScreen('emergency');
        setInput('');
      } else {
        setResponse('Option invalide. Veuillez réessayer.');
      }
    } else if (screen === 'hospitals') {
      // Process hospital selection
      if (['1', '2', '3'].includes(input)) {
        setScreen('result');
        setResponse(
          input === '1' ? 'Hôpital National Donka: Ouvert 24/7, Tél: +224 628 12 34 56, Services: Urgences, Maternité, Pédiatrie' :
          input === '2' ? 'Clinique Pasteur: Ouvert 8h-22h, Tél: +224 623 45 67 89, Services: Ophtalmologie, Consultations' :
          'Centre de Santé Matam: Ouvert 8h-18h, Tél: +224 622 98 76 54, Services: Consultations, Vaccinations'
        );
      } else {
        setResponse('Option invalide. Veuillez réessayer.');
      }
    } else if (screen === 'emergency') {
      // Process emergency type
      if (['1', '2', '3'].includes(input)) {
        setScreen('result');
        setResponse(
          'Votre demande d\'urgence a été enregistrée. Un agent vous contactera sous peu au +224 6XX XX XX XX.'
        );
      } else {
        setResponse('Option invalide. Veuillez réessayer.');
      }
    }
  };

  const resetUssd = () => {
    setScreen('intro');
    setInput('');
    setResponse('');
  };

  const goBack = () => {
    if (screen === 'hospitals' || screen === 'emergency') {
      setScreen('menu');
    } else if (screen === 'result') {
      setScreen('menu');
    } else {
      setScreen('intro');
    }
    setInput('');
    setResponse('');
  };

  return (
    <div className="container max-w-screen-xl py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="md:w-1/2 lg:w-3/5 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Simulation USSD</h1>
            <p className="text-muted-foreground">
              Cette simulation démontre comment MOB-Health Africa fonctionnera via le service USSD pour les zones sans connexion internet.
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-medium">Comment ça marche ?</h2>
            <p className="text-muted-foreground">
              En zones rurales ou sans connexion internet, les utilisateurs peuvent accéder aux services essentiels de MOB-Health Africa en composant un code USSD (*555*123#) sur n'importe quel téléphone portable, même les modèles basiques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Services disponibles par USSD</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Trouver un établissement de santé</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Appels d'urgence médicale</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Demandes de donneurs de sang</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Vérification de disponibilité</span>
                </li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Avantages</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Fonctionne sans internet</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Compatible avec tout téléphone</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Gratuit pour les utilisateurs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-clinic-green" />
                  <span>Disponible 24h/24 et 7j/7</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-medium mb-2">Pour démarrer la démonstration</h3>
            <p className="text-sm text-muted-foreground">
              {isMobile ? 
                "Utilisez la simulation USSD ci-dessous pour tester le service. Pour commencer, appuyez sur \"Démarrer\"." :
                "Sur la droite, vous pouvez voir une simulation du service USSD. Pour commencer, cliquez sur \"Démarrer\" dans le téléphone simulé."}
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2 lg:w-2/5 flex justify-center">
          <div className="relative w-full max-w-[220px] md:max-w-[240px]">
            {/* Phone mockup - smaller and more responsive */}
            <div className="border-8 border-gray-800 rounded-[2rem] h-[450px] sm:h-[480px] w-full bg-white overflow-hidden shadow-xl">
              <div className="w-1/2 h-5 bg-gray-800 rounded-b-xl mx-auto mb-1"></div>
              
              {/* Phone content - USSD screen */}
              <div className="h-[calc(100%-6px)] mx-1 border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                {/* Status bar */}
                <div className="h-5 bg-gray-100 flex justify-between items-center px-3">
                  <div className="text-xs">21:42</div>
                  <div className="text-xs">4G</div>
                </div>
                
                {/* USSD Screen */}
                <div className="flex-1 bg-slate-50 flex flex-col">
                  {screen === 'intro' ? (
                    <div className="flex flex-col items-center justify-center h-full p-4">
                      <div className="text-center space-y-3">
                        <div className="text-base font-semibold">MOB-Health USSD</div>
                        <div className="text-sm">Composez:</div>
                        <div className="text-lg font-mono font-bold">*555*123#</div>
                        <Button className="w-full mt-3" size="sm" onClick={handleSubmit}>
                          Démarrer
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex items-center p-2 bg-gray-100 border-b">
                        <Button variant="ghost" size="icon" onClick={goBack} className="h-6 w-6">
                          <ArrowLeft className="h-3 w-3" />
                        </Button>
                        <div className="text-xs font-medium ml-2">MOB-Health USSD</div>
                      </div>
                      
                      <div className="flex-1 p-3 text-xs">
                        {screen === 'menu' && (
                          <div className="space-y-3">
                            <div className="text-sm font-medium">Menu principal</div>
                            <div className="space-y-1">
                              <div>1. Trouver établissements</div>
                              <div>2. Services d'urgence</div>
                              <div>3. Mon dossier médical</div>
                              <div>4. À propos</div>
                            </div>
                            
                            <div className="text-xs">Entrez votre choix:</div>
                          </div>
                        )}
                        
                        {screen === 'hospitals' && (
                          <div className="space-y-3">
                            <div className="text-sm font-medium">Établissements à proximité</div>
                            <div className="space-y-1">
                              <div>1. Hôpital National Donka (2.5km)</div>
                              <div>2. Clinique Pasteur (3.8km)</div>
                              <div>3. Centre de Santé Matam (1.2km)</div>
                              <div>0. Retour</div>
                            </div>
                            
                            <div className="text-xs">Entrez votre choix:</div>
                          </div>
                        )}
                        
                        {screen === 'emergency' && (
                          <div className="space-y-3">
                            <div className="text-sm font-medium">Services d'urgence</div>
                            <div className="space-y-1">
                              <div>1. Demander ambulance</div>
                              <div>2. Besoin de sang</div>
                              <div>3. Signaler accident</div>
                              <div>0. Retour</div>
                            </div>
                            
                            <div className="text-xs">Entrez votre choix:</div>
                          </div>
                        )}
                        
                        {screen === 'result' && (
                          <div className="space-y-3">
                            <div>{response}</div>
                            
                            <div className="text-xs pt-2 border-t">
                              Appuyez sur 0 pour retourner au menu principal
                            </div>
                          </div>
                        )}
                        
                        {response && screen !== 'result' && (
                          <div className="mt-2 p-2 bg-red-50 text-red-800 text-xs rounded">
                            {response}
                          </div>
                        )}
                      </div>
                      
                      {screen !== 'result' && (
                        <div className="p-2 border-t">
                          <div className="flex gap-1">
                            <Input
                              className="flex-1 h-7 px-2 text-xs"
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              maxLength={1}
                            />
                            <Button size="icon" className="h-7 w-7" onClick={handleSubmit}>
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Reset button */}
            <Button
              variant="outline"
              size="sm"
              className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs py-1 px-2 h-auto"
              onClick={resetUssd}
            >
              Réinitialiser la démo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UssdPage;
