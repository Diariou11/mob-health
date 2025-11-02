import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, Heart, Phone, Clock, MapPin, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AppointmentForm } from '@/components/appointments/AppointmentForm';
import Autoplay from "embla-carousel-autoplay";
import doctorAmadouBarry from '@/assets/doctor-amadou-barry.jpg';
import doctorFatoumataDiallo from '@/assets/doctor-fatoumata-diallo.jpg';
import doctorMohamedCamara from '@/assets/doctor-mohamed-camara.jpg';

const Home = () => {
  const [activeDoctor, setActiveDoctor] = useState<number | null>(null);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');

  return <div className="container max-w-screen-xl py-8 md:py-12 backdrop-blur-sm bg-gradient-to-br from-black/30 via-health-blue/10 to-clinic-green/10 rounded-3xl">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-health-blue/5 to-clinic-green/5 rounded-3xl blur-3xl -z-10" />
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
              <span className="text-white">Connecter</span> les patients aux{' '}
              <span className="text-white">soins de santé</span> en Guinée
            </h1>
            
            <motion.p 
              className="text-xl text-white drop-shadow-md leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              MOB-Health Africa est l'annuaire numérique unifié des établissements de santé guinéens. 
              Trouvez rapidement des services médicaux, gérez vos urgences, et accédez à votre dossier médical.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/map" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full"
                >
                  <Button className="bg-gradient-to-br from-clinic-green to-health-blue hover:shadow-2xl hover:shadow-clinic-green/50 text-white w-full px-8 py-6 text-lg font-semibold relative overflow-hidden group">
                    <span className="relative z-10">Commencer</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-health-blue to-clinic-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/emergency" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-full"
                >
                  <Button className="bg-gradient-to-br from-destructive to-orange-600 hover:shadow-2xl hover:shadow-destructive/50 text-white w-full px-8 py-6 text-lg font-semibold relative overflow-hidden group border-2 border-white/30">
                    <span className="relative z-10">🚨 Urgence</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-destructive opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex-1 flex justify-center" 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: [0, -5, 0],
          }}
          transition={{ 
            duration: 6,
            delay: 0.5,
            repeat: Infinity, 
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        >
          <img alt="MOB-Health Africa" className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[400px]" src="/lovable-uploads/8a7d8c0d-abc8-4d14-b2eb-3a451e9dff45.png" />
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white drop-shadow-lg">
          Notre plateforme offre
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link to="/map" className="block w-full h-full">
              <FeatureCard 
                title="Annuaire médical complet" 
                description="Accédez à tous les établissements de santé en Guinée avec des informations détaillées et à jour." 
                color="from-health-blue to-health-blue/80"
                icon={<MapPin className="text-white" />} 
              />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/emergency" className="block w-full h-full">
              <FeatureCard 
                title="Services d'urgence" 
                description="Trouvez des services d'urgence proches, demandez du sang ou une ambulance en quelques clics." 
                color="from-destructive to-orange-600"
                icon={<Phone className="text-white" />} 
              />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/patient" className="block w-full h-full">
              <FeatureCard 
                title="Dossier médical numérique" 
                description="Gérez votre dossier médical et partagez-le avec les professionnels de santé autorisés." 
                color="from-clinic-green to-clinic-green/80"
                icon={<User className="text-white" />} 
              />
            </Link>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Doctors Section */}
      <section className="py-12 bg-black/30 backdrop-blur-md rounded-lg p-8 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
          <span className="text-white">Nos </span>
          <span className="text-clinic-green">médecins</span>
        </h2>
        
        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {doctors.map((doctor, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-white/20 h-16 w-16 overflow-hidden">
                          <img 
                            src={doctor.avatar} 
                            alt={doctor.name} 
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-white">{doctor.name}</CardTitle>
                          <CardDescription className="text-white/70">{doctor.specialty}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 text-sm">{doctor.shortBio}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 bg-white/10 text-white border-white/30 hover:bg-white/20 font-medium"
                        onClick={() => setActiveDoctor(activeDoctor === index ? null : index)}
                      >
                        {activeDoctor === index ? "Masquer" : "Voir profil"}
                      </Button>
                      <Dialog open={appointmentDialogOpen && selectedDoctor === doctor.name} onOpenChange={(open) => {
                        setAppointmentDialogOpen(open);
                        if (!open) setSelectedDoctor('');
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            className="flex-1 bg-clinic-green text-white hover:bg-clinic-green/80 font-medium"
                            onClick={() => {
                              setSelectedDoctor(doctor.name);
                              setAppointmentDialogOpen(true);
                            }}
                          >
                            Prendre RDV
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Prendre rendez-vous avec {doctor.name}</DialogTitle>
                          </DialogHeader>
                          <AppointmentForm 
                            doctorName={doctor.name}
                            onSuccess={() => setAppointmentDialogOpen(false)}
                          />
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                    
                    {activeDoctor === index && (
                      <div className="px-6 pb-6 mt-2 border-t border-white/20 pt-4 animate-fade-in">
                        <h4 className="font-medium text-white mb-2">Biographie</h4>
                        <p className="text-white/80 text-sm mb-3">{doctor.fullBio}</p>
                        
                        <h4 className="font-medium text-white mb-2">Éducation</h4>
                        <ul className="list-disc list-inside text-white/80 text-sm mb-3">
                          {doctor.education.map((edu, i) => (
                            <li key={i}>{edu}</li>
                          ))}
                        </ul>
                        
                        <h4 className="font-medium text-white mb-2">Disponibilité</h4>
                        <p className="text-white/80 text-sm">{doctor.availability}</p>
                      </div>
                    )}
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4 gap-4">
            <CarouselPrevious className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/30" />
            <CarouselNext className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/30" />
          </div>
        </Carousel>
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
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
          {partnerLogos.map((partner) => (
            <div 
              key={partner.name} 
              className="bg-white/20 backdrop-blur-md p-4 rounded-lg h-24 w-full flex flex-col items-center justify-center"
            >
              <img 
                src={partner.logo} 
                alt={`Logo ${partner.name}`} 
                className="h-12 object-contain mb-2"
              />
              <p className="text-white text-xs font-medium text-center">{partner.name}</p>
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
    className="border-2 border-white/30 rounded-2xl p-8 hover:shadow-2xl transition-all bg-white/10 backdrop-blur-lg h-full relative overflow-hidden group"
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
    <motion.div 
      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg relative z-10`}
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-bold mb-3 text-white drop-shadow-lg relative z-10">{title}</h3>
    <p className="text-white/90 leading-relaxed relative z-10">{description}</p>
  </motion.div>
);

// Fictional doctor data
const doctors = [
  {
    name: "Dr. Amadou Barry",
    specialty: "Cardiologue",
    shortBio: "Spécialiste en cardiologie interventionnelle avec plus de 15 ans d'expérience.",
    fullBio: "Le Dr. Amadou Barry est un cardiologue de renom en Guinée, avec une expertise particulière dans le traitement des maladies cardiaques congénitales et les procédures interventionnelles. Il a traité plus de 5000 patients tout au long de sa carrière et a contribué à plusieurs publications médicales internationales.",
    education: [
      "Doctorat en Médecine, Université de Conakry, 2005",
      "Spécialisation en Cardiologie, Université Paris-Descartes, 2010",
      "Fellowship en Cardiologie Interventionnelle, Hôpital Johns Hopkins, 2012"
    ],
    availability: "Consultations: Lundi, Mercredi et Vendredi, 9h - 17h",
    avatar: doctorAmadouBarry
  },
  {
    name: "Dr. Fatoumata Diallo",
    specialty: "Pédiatre",
    shortBio: "Pédiatre dévouée avec une spécialisation en néonatologie et médecine des adolescents.",
    fullBio: "Le Dr. Diallo a consacré sa carrière à améliorer la santé des enfants en Guinée. Elle est reconnue pour son approche holistique qui prend en compte non seulement la santé physique mais aussi le bien-être émotionnel et social des enfants. Elle est également active dans plusieurs programmes d'éducation sanitaire communautaire.",
    education: [
      "Doctorat en Médecine, Université Gamal Abdel Nasser de Conakry, 2008",
      "Résidence en Pédiatrie, CHU de Donka, 2012",
      "Certification en Néonatologie, Université de Dakar, 2014"
    ],
    availability: "Consultations: Mardi, Jeudi et Samedi, 8h - 16h",
    avatar: doctorFatoumataDiallo
  },
  {
    name: "Dr. Mohamed Camara",
    specialty: "Chirurgien",
    shortBio: "Chirurgien général avec expertise en chirurgie traumatologique et laparoscopique.",
    fullBio: "Le Dr. Camara est l'un des chirurgiens les plus expérimentés de Guinée, ayant pratiqué plus de 3000 interventions chirurgicales. Il est pionnier dans l'introduction de techniques chirurgicales mini-invasives dans le pays et forme activement la prochaine génération de chirurgiens guinéens.",
    education: [
      "Doctorat en Médecine, Université de Conakry, 2003",
      "Résidence en Chirurgie Générale, Hôpital National Ignace Deen, 2008",
      "Fellowship en Chirurgie Laparoscopique, Hôpital Pitié-Salpêtrière, Paris, 2010"
    ],
    availability: "Consultations: Lundi à Vendredi, 10h - 15h",
    avatar: doctorMohamedCamara
  }
];

// Updated partners with logo information - replacing MTN with OMS
const partnerLogos = [
  {
    name: "Orange Guinée",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png"
  },
  {
    name: "OMS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/1200px-Flag_of_the_United_Nations.svg.png"
  },
  {
    name: "UNICEF",
    logo: "/lovable-uploads/13761787-71b9-4473-99a6-3eec92b534ec.png"
  },
  {
    name: "Croix Rouge",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_the_Red_Cross.svg/1200px-Flag_of_the_Red_Cross.svg.png"
  },
  {
    name: "Médecins Sans Frontières",
    logo: "/lovable-uploads/a50dd1df-4862-4a7a-aaff-9b8008f89a64.png"
  },
  {
    name: "PNUD",
    logo: "/lovable-uploads/10ecbc84-7958-455d-b92e-09801d6ef5a7.png"
  }
];

export default Home;
