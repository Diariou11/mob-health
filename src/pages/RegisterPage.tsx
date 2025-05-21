
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, UserPlus, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';

const RegisterPage = () => {
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient'
  });
  const [error, setError] = useState('');
  const [showBloodDonorDialog, setShowBloodDonorDialog] = useState(false);
  const [bloodDonorData, setBloodDonorData] = useState({
    bloodGroup: '',
    lastDonation: '',
    canDonateEmergency: false,
    hasChronicDisease: false,
    chronicDiseaseDetails: '',
    weight: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      userType: value
    });
    
    if (value === 'donneur') {
      setShowBloodDonorDialog(true);
    }
  };
  
  const handleBloodDonorChange = (field: string, value: any) => {
    setBloodDonorData({
      ...bloodDonorData,
      [field]: value
    });
  };
  
  const handleBloodGroupChange = (value: string) => {
    setBloodDonorData({
      ...bloodDonorData,
      bloodGroup: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Simulation d'inscription réussie
    console.log('Inscription avec:', formData);
    if (formData.userType === 'donneur') {
      console.log('Informations du donneur de sang:', bloodDonorData);
    }
    // Redirection vers la page de connexion
    window.location.href = '/login';
  };

  return (
    <div className="container max-w-lg py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Créer un compte</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-destructive/20 text-destructive flex items-center p-3 rounded-md mb-4">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Nom complet *</Label>
                  <Input 
                    id="fullName" 
                    name="fullName"
                    placeholder="Votre nom et prénom" 
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-white/20 text-white border-white/30 placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Numéro de téléphone *</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    placeholder="621 XX XX XX" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white/20 text-white border-white/30 placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email (optionnel)</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    placeholder="exemple@email.com" 
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/20 text-white border-white/30 placeholder:text-white/50"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Mot de passe *</Label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-white/20 text-white border-white/30 placeholder:text-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirmer le mot de passe *</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="••••••••" 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-white/20 text-white border-white/30 placeholder:text-white/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Type d'utilisateur *</Label>
                  <RadioGroup 
                    value={formData.userType} 
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="patient" id="patient" className="text-health-blue" />
                      <Label htmlFor="patient" className="text-white">Patient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medecin" id="medecin" className="text-health-blue" />
                      <Label htmlFor="medecin" className="text-white">Médecin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="institution" id="institution" className="text-health-blue" />
                      <Label htmlFor="institution" className="text-white">Institution sanitaire</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="donneur" id="donneur" className="text-clinic-green" />
                      <Label htmlFor="donneur" className="text-white flex items-center">
                        <Droplet className="h-4 w-4 mr-1 text-red-500" />
                        Donneur de Sang
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full bg-health-blue hover:bg-health-blue/80">
                  <UserPlus className="mr-2 h-4 w-4" /> S'inscrire
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-white/20 pt-4">
            <p className="text-center text-sm text-white/70">
              Déjà inscrit ? {' '}
              <Link to="/login" className={isMobile ? "block mt-2 text-health-blue hover:underline" : "text-health-blue hover:underline"}>
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
      
      <Dialog open={showBloodDonorDialog} onOpenChange={setShowBloodDonorDialog}>
        <DialogContent className="bg-white/90 backdrop-blur-lg max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-health-blue flex items-center">
              <Droplet className="h-5 w-5 mr-2 text-red-500" />
              Information Donneur de Sang
            </DialogTitle>
            <DialogDescription>
              Ces informations nous permettront de vous contacter en cas de besoin de sang compatible.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="font-medium">Groupe sanguin (si vous le connaissez)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { value: 'A+', color: 'text-red-500' },
                  { value: 'A-', color: 'text-red-500' },
                  { value: 'B+', color: 'text-red-600' },
                  { value: 'B-', color: 'text-red-600' },
                  { value: 'AB+', color: 'text-red-700' },
                  { value: 'AB-', color: 'text-red-700' },
                  { value: 'O+', color: 'text-red-800' },
                  { value: 'O-', color: 'text-red-800' }
                ].map(group => (
                  <div 
                    key={group.value}
                    className={`border rounded-md px-2 py-1 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 ${bloodDonorData.bloodGroup === group.value ? 'ring-2 ring-health-blue bg-blue-50' : ''}`}
                    onClick={() => handleBloodGroupChange(group.value)}
                  >
                    <Checkbox 
                      checked={bloodDonorData.bloodGroup === group.value}
                      className={`${bloodDonorData.bloodGroup === group.value ? 'text-health-blue' : ''}`}
                    />
                    <span className={`text-sm font-medium ${group.color}`}>{group.value}</span>
                  </div>
                ))}
                <div 
                  className={`border rounded-md px-2 py-1 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 col-span-2 ${bloodDonorData.bloodGroup === 'unknown' ? 'ring-2 ring-health-blue bg-blue-50' : ''}`}
                  onClick={() => handleBloodGroupChange('unknown')}
                >
                  <Checkbox 
                    checked={bloodDonorData.bloodGroup === 'unknown'}
                    className={`${bloodDonorData.bloodGroup === 'unknown' ? 'text-health-blue' : ''}`}
                  />
                  <span className="text-sm font-medium">Je ne connais pas mon groupe</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight" className="font-medium">Poids approximatif (kg)</Label>
              <Input 
                id="weight" 
                placeholder="Ex: 70" 
                value={bloodDonorData.weight}
                onChange={(e) => handleBloodDonorChange('weight', e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastDonation" className="font-medium">Dernière date de don (si applicable)</Label>
              <Input 
                id="lastDonation" 
                type="date"
                value={bloodDonorData.lastDonation}
                onChange={(e) => handleBloodDonorChange('lastDonation', e.target.value)}
                className="border-gray-300"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="canDonateEmergency"
                checked={bloodDonorData.canDonateEmergency}
                onCheckedChange={(checked) => 
                  handleBloodDonorChange('canDonateEmergency', checked)
                }
              />
              <Label htmlFor="canDonateEmergency">
                Je suis disponible pour des dons d'urgence
              </Label>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hasChronicDisease"
                  checked={bloodDonorData.hasChronicDisease}
                  onCheckedChange={(checked) => 
                    handleBloodDonorChange('hasChronicDisease', checked)
                  }
                />
                <Label htmlFor="hasChronicDisease">
                  J'ai une maladie chronique
                </Label>
              </div>
              
              {bloodDonorData.hasChronicDisease && (
                <Input 
                  placeholder="Précisez la maladie" 
                  value={bloodDonorData.chronicDiseaseDetails}
                  onChange={(e) => handleBloodDonorChange('chronicDiseaseDetails', e.target.value)}
                  className="border-gray-300 mt-2"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowBloodDonorDialog(false)}
              className="w-full sm:w-auto"
            >
              Terminer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterPage;
