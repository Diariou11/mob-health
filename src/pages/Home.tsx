
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Heart, Phone, Clock, MapPin, UserPlus } from 'lucide-react';

const Home = () => {
  return <div className="container max-w-screen-xl py-8 md:py-12 backdrop-blur-sm bg-black/20">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
              <span className="text-white">Connecter</span> les patients aux{' '}
              <span className="text-white">soins de santé</span> en Guinée
            </h1>
            
            <motion.p 
              className="text-xl text-white drop-shadow-md leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              MOB-Health Africa est l'annuaire numérique unifié des établissements de santé guinéens. 
              Trouvez rapidement des services médicaux, gérez vos urgences, et accédez à votre dossier médical.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/map">
                <Button className="bg-clinic-green hover:bg-clinic-green/90 text-white w-full sm:w-auto px-6 py-6 text-lg">
                  Commencer
                </Button>
              </Link>
              
              <Link to="/emergency">
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 w-full sm:w-auto px-6 py-6 text-lg bg-white/30 backdrop-blur-sm">
                  Urgence
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex-1 flex justify-center" 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{ 
            duration: 1,
            delay: 0.3,
            repeat: Infinity, 
            repeatDelay: 0.5,
            ease: "easeInOut"
          }}
        >
          <img alt="MOB-Health Africa" className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[400px] animate-pulse-scale" src="/lovable-uploads/8a7d8c0d-abc8-4d14-b2eb-3a451e9dff45.png" />
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white drop-shadow-lg">
          Notre plateforme offre
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Link to="/map" className="block w-full h-full">
            <FeatureCard 
              title="Annuaire médical complet" 
              description="Accédez à tous les établissements de santé en Guinée avec des informations détaillées et à jour." 
              color="bg-health-blue"
              icon={<MapPin className="text-white" />} 
            />
          </Link>
          <Link to="/emergency" className="block w-full h-full">
            <FeatureCard 
              title="Services d'urgence" 
              description="Trouvez des services d'urgence proches, demandez du sang ou une ambulance en quelques clics." 
              color="bg-destructive"
              icon={<Phone className="text-white" />} 
            />
          </Link>
          <Link to="/patient" className="block w-full h-full">
            <FeatureCard 
              title="Dossier médical numérique" 
              description="Gérez votre dossier médical et partagez-le avec les professionnels de santé autorisés." 
              color="bg-clinic-green"
              icon={<User className="text-white" />} 
            />
          </Link>
        </div>
      </section>
      
      {/* Access Offline Section */}
      <section className="py-12 bg-black/40 backdrop-blur-md rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Accessible même sans internet</h2>
            <p className="text-white mb-6 drop-shadow-md">
              Notre service est disponible par SMS et USSD pour les zones sans connexion internet. 
              Accédez aux informations essentielles partout en Guinée.
            </p>
            <Link to="/ussd">
              <Button variant="outline" className="border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm">
                En savoir plus sur l'accès hors ligne
              </Button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <motion.div 
              className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-lg max-w-[220px] border border-white/30"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="border-b border-white/20 pb-2 text-center font-medium text-white">Service USSD</div>
              <div className="py-4 text-center text-white">
                <p className="mb-2">Pour accéder aux services:</p>
                <p className="font-bold text-xl">*555*123#</p>
              </div>
              <div className="text-center text-sm text-white/70 pt-2 border-t border-white/20">
                Sans frais • Disponible 24/7
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 bg-black/30 backdrop-blur-md rounded-lg p-8 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          <span className="text-white">Quelques uns de nos </span>
          <span className="text-clinic-green">partenaires potentiels</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {partners.map((partner) => (
            <div 
              key={partner} 
              className="bg-white/20 backdrop-blur-md p-4 rounded-lg h-24 w-full flex items-center justify-center"
            >
              <p className="text-white font-medium text-center">{partner}</p>
            </div>
          ))}
        </div>
      </section>
    </div>;
};

const FeatureCard = ({
  title,
  description,
  color,
  icon
}: {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}) => (
  <motion.div 
    className="border border-white/30 rounded-lg p-6 hover:shadow-md transition-shadow bg-white/20 backdrop-blur-md h-full"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2 text-white drop-shadow-md">{title}</h3>
    <p className="text-white/90">{description}</p>
  </motion.div>
);

// List of partners
const partners = [
  "Orange Guinée",
  "MTN",
  "UNICEF",
  "Croix Rouge",
  "Médecins Sans Frontières"
];

export default Home;
