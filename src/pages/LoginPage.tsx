
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const LoginPage = () => {
  const isMobile = useIsMobile();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    
    // Simulation de connexion réussie
    console.log('Connexion avec:', credentials);
    // Redirection vers la page d'accueil
    window.location.href = '/';
  };

  return (
    <div className="container max-w-md py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Se connecter</CardTitle>
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
                  <Label htmlFor="username" className="text-white">Numéro de téléphone ou email</Label>
                  <Input 
                    id="username" 
                    name="username"
                    placeholder="Entrez votre numéro ou email" 
                    value={credentials.username}
                    onChange={handleChange}
                    className="bg-white/20 text-white border-white/30 placeholder:text-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Mot de passe</Label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    value={credentials.password}
                    onChange={handleChange}
                    className="bg-white/20 text-white border-white/30 placeholder:text-white/50"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <Link to="/forgot-password" className="text-sm text-health-blue hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full bg-health-blue hover:bg-health-blue/80">
                  <LogIn className="mr-2 h-4 w-4" /> Se connecter
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-white/20 pt-4">
            <p className="text-center text-sm text-white/70">
              Pas encore de compte ? {' '}
              <Link to="/register" className={isMobile ? "block mt-2 text-health-blue hover:underline" : "text-health-blue hover:underline"}>
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
