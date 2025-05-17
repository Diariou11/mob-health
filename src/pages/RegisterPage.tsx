
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'patient'
  });
  const [error, setError] = useState('');

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
              <Link to="/login" className="text-health-blue hover:underline">
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
