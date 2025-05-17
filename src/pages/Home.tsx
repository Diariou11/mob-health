import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
const Home = () => {
  return <div className="container max-w-screen-xl py-8 md:py-12">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-health-blue">Connecter</span> les patients aux{' '}
              <span className="text-clinic-green">soins de santé</span> en Guinée
            </h1>
            
            <p className="text-xl text-foreground/80 leading-relaxed mb-8">
              MOB-Health Africa est l'annuaire numérique unifié des établissements de santé guinéens. 
              Trouvez rapidement des services médicaux, gérez vos urgences, et accédez à votre dossier médical.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/map">
                <Button className="bg-clinic-green hover:bg-clinic-green/90 text-white w-full sm:w-auto px-6 py-6 text-lg">
                  Commencer
                </Button>
              </Link>
              
              <Link to="/emergency">
                <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10 w-full sm:w-auto px-6 py-6 text-lg">
                  Urgence
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div className="flex-1 flex justify-center" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8,
        delay: 0.3
      }}>
          <img alt="MOB-Health Africa" className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[400px]" src="/lovable-uploads/8a7d8c0d-abc8-4d14-b2eb-3a451e9dff45.png" />
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Notre plateforme offre
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard title="Annuaire médical complet" description="Accédez à tous les établissements de santé en Guinée avec des informations détaillées et à jour." color="bg-health-blue" />
          <FeatureCard title="Services d'urgence" description="Trouvez des services d'urgence proches, demandez du sang ou une ambulance en quelques clics." color="bg-destructive" />
          <FeatureCard title="Dossier médical numérique" description="Gérez votre dossier médical et partagez-le avec les professionnels de santé autorisés." color="bg-clinic-green" />
        </div>
      </section>
      
      {/* Access Offline Section */}
      <section className="py-12 bg-slate-50 rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Accessible même sans internet</h2>
            <p className="text-foreground/80 mb-6">
              Notre service est disponible par SMS et USSD pour les zones sans connexion internet. 
              Accédez aux informations essentielles partout en Guinée.
            </p>
            <Link to="/ussd">
              <Button variant="outline" className="border-health-blue text-health-blue hover:bg-health-blue/10">
                En savoir plus sur l'accès hors ligne
              </Button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-[220px] border">
              <div className="border-b pb-2 text-center font-medium">Service USSD</div>
              <div className="py-4 text-center">
                <p className="mb-2">Pour accéder aux services:</p>
                <p className="font-bold text-xl">*555*123#</p>
              </div>
              <div className="text-center text-sm text-foreground/70 pt-2 border-t">
                Sans frais • Disponible 24/7
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
const FeatureCard = ({
  title,
  description,
  color
}: {
  title: string;
  description: string;
  color: string;
}) => <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
      <div className="w-5 h-5 bg-white rounded-sm" />
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-foreground/70">{description}</p>
  </div>;
export default Home;