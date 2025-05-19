
import { motion } from 'framer-motion';
import { Heart, Award, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="container max-w-screen-xl py-12 md:py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Notre <span className="text-health-blue">mission</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-white/90 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          MOB-Health Africa vise à améliorer l'accès aux soins de santé en Guinée en créant un pont numérique entre les patients et les établissements de santé.
        </motion.p>
      </section>

      {/* Vision and Values */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="bg-health-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Target className="text-health-blue h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Notre vision</h3>
              <p className="text-white/80">
                Un système de santé guinéen où chaque citoyen peut facilement localiser et accéder aux services médicaux dont il a besoin.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="bg-clinic-green/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Heart className="text-clinic-green h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Nos valeurs</h3>
              <p className="text-white/80">
                Accessibilité, transparence, innovation et engagement envers la qualité des soins de santé pour tous.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="bg-health-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award className="text-health-blue h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Notre objectif</h3>
              <p className="text-white/80">
                Contribuer à la transformation numérique du système de santé guinéen et améliorer l'expérience des patients.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">Notre <span className="text-health-blue">équipe</span></h2>
        
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white/10 backdrop-blur-lg p-8 rounded-lg border border-white/20">
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="/lovable-uploads/b9f5fe13-d971-4930-a3fa-a8092a4110de.png" 
              alt="Mamadou Oury Barry" 
              className="rounded-lg shadow-lg w-full max-w-[300px] mx-auto border-4 border-health-blue/30"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">Mamadou Oury Barry</h3>
            <p className="text-health-blue font-medium mb-4">Fondateur & Designer UI/UX</p>
            <p className="text-white/90 mb-6 leading-relaxed">
              Mamadou Oury Barry, designer et entrepreneur guinéen, je porte ce projet depuis un an déjà. 
              Professionnel en design graphique et UI/UX, j'ai développé ce prototype fonctionnel petit à petit durant des mois, 
              symbole de mon engagement personnel fort et ma vision ambitieuse à long terme.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-health-blue hover:text-health-blue/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="text-health-blue hover:text-health-blue/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-health-blue hover:text-health-blue/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
